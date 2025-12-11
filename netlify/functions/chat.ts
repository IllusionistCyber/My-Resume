
import { Handler } from '@netlify/functions';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { RESUME_DATA } from '../../src/app/data/resume-data';
import * as nodemailer from 'nodemailer';

const genAI = new GoogleGenerativeAI(process.env['GEMINI_API_KEY'] || '');

// Email Transporter Setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env['EMAIL_USER'],
        pass: process.env['EMAIL_PASS'],
    },
});

const SYSTEM_PROMPT = `
You are an AI assistant for Ravi Raj, a Software Developer.
Your goal is to answer questions about Ravi using the provided resume context.
    You also have the ability to send emails to Ravi on behalf of the user if they want to get in touch.

        Context:
${JSON.stringify(RESUME_DATA, null, 2)}

Rules:
1. Be professional, friendly, and concise.
2. If the user wants to contact Ravi or hire him, ASK for their email address and a message(if they haven't provided one).
3. Once you have the user's email and message, call the \`sendEmail\` function.
4. After the function is called, confirm to the user that the email has been sent.
`;

const tools = [
    {
        functionDeclarations: [
            {
                name: 'sendEmail',
                description: 'Sends an email to Ravi Raj with the user\'s contact details and message.',
                parameters: {
                    type: SchemaType.OBJECT,
                    properties: {
                        userEmail: {
                            type: SchemaType.STRING,
                            description: 'The email address of the user who wants to contact Ravi.',
                        },
                        message: {
                            type: SchemaType.STRING,
                            description: 'The message the user wants to send to Ravi.',
                        },
                    },
                    required: ['userEmail', 'message'],
                } as any,
            },

        ],
    },
];

export const handler: Handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const body = JSON.parse(event.body || '{}');
        const userMessage = body.message;
        // We maintain a simple stateless history for this demo, effectively just the current turn + system
        // For a real app, you'd pass the history from the frontend or store it.
        // To make function calling work in a single turn, we usually need the conversation history.
        // For simplicity, we will assume a stateless "smart" turn or just simple history handling if passed.
        // LET'S IMPROVE: Let the frontend pass 'history' if it exists, otherwise init.
        // NOTE: The current frontend only sends 'message'. We will use a simplified single-turn approaches for now, but function calling works best with history.
        // TO FIX: We need to enable multi-turn chat on the backend or pass history.
        // Strategy: We will just start a new chat each time but keep the system prompt.
        // LIMITATION: Without persistent history, the model won't remember it "asked" for the email.
        // FIX: We should accept 'history' from the frontend update.
        // For now, let's try to infer from the single message, assuming the user provides all info or we prompt them.
        // Actually, for the "Ask for email -> User gives email -> Send" flow to work, we NEED history.
        // I will update the backend to rely on the frontend passing the FULL conversation history if possible,
        // OR (Simpler for this specific request): Just start a chat session.
        // The Gemini Node SDK 'startChat' maintains history in-memory for the object instance.
        // Since Netlify Functions are stateless, we lose history between requests.
        // CRITICAL: We need the frontend to send the history.
        // STEP 1: Update Frontend to send 'history'. (I will do this in the next tool call)
        // STEP 2: Update Backend to use that history.

        // Let's implement Step 2 (Backend) now, assuming frontend sending `history` array.
        const history = body.history || [];

        const model = genAI.getGenerativeModel({
            model: 'gemini-2.0-flash',
            tools: tools,
        });

        const chat = model.startChat({
            history: [
                {
                    role: 'user',
                    parts: [{ text: SYSTEM_PROMPT }],
                },
                {
                    role: 'model',
                    parts: [{ text: 'Understood. I am ready to assist.' }],
                },
                ...history.map((h: any) => ({
                    role: h.sender === 'user' ? 'user' : 'model',
                    parts: [{ text: h.text }],
                }))
            ],
        });

        const result = await chat.sendMessage(userMessage);
        const response = await result.response;
        const functionCalls = response.functionCalls();

        if (functionCalls && functionCalls.length > 0) {
            const call = functionCalls[0];
            if (call.name === 'sendEmail') {
                const { userEmail, message } = call.args as any;

                // Execute the actual email sending logic
                try {
                    await transporter.sendMail({
                        from: process.env['EMAIL_USER'],
                        to: 'iamraviraj5@gmail.com', // Ravi's email (hardcoded or env)
                        replyTo: userEmail,
                        subject: `[Resume Bot] New Contact from ${userEmail} `,
                        text: `Message from: ${userEmail} \n\n${message} `,
                    });

                    // Send success back to the model
                    const functionResponse = await chat.sendMessage([
                        {
                            functionResponse: {
                                name: 'sendEmail',
                                response: { status: 'success', boad: 'Email sent successfully via nodemailer' }
                            }
                        }
                    ]);

                    return {
                        statusCode: 200,
                        body: JSON.stringify({ reply: functionResponse.response.text() }),
                    };

                } catch (emailError) {
                    console.error("Email Error", emailError);
                    const functionResponse = await chat.sendMessage([
                        {
                            functionResponse: {
                                name: 'sendEmail',
                                response: { status: 'error', error: 'Failed to send email due to server error.' }
                            }
                        }
                    ]);
                    return {
                        statusCode: 200,
                        body: JSON.stringify({ reply: "I tried to send the email, but encountered a technical error. Please try again later or email Ravi directly." }),
                    };
                }
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ reply: response.text() }),
        };

    } catch (error: any) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to process request', details: error.message }),
        };
    }
};
