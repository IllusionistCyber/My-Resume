import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

interface ChatMessage {
    text: string;
    sender: 'user' | 'agent';
    timestamp: Date;
}

@Component({
    selector: 'app-chat-widget',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './chat-widget.component.html',
    styleUrls: ['./chat-widget.component.css'],
    animations: [
        trigger('dialogState', [
            state('void', style({
                transform: 'translateY(20px) scale(0.9)',
                opacity: 0
            })),
            state('*', style({
                transform: 'translateY(0) scale(1)',
                opacity: 1
            })),
            transition('void => *', animate('200ms ease-out')),
            transition('* => void', animate('200ms ease-in'))
        ])
    ]
})
export class ChatWidgetComponent implements AfterViewChecked {
    @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

    private readonly welcomeMessage: ChatMessage = {
        text: "Hi! 👋 I can help you learn about Ravi. Ask me about his experience, skills, projects, or how to contact him!",
        sender: 'agent',
        timestamp: new Date()
    };

    isOpen = false;
    messages: ChatMessage[] = [{ ...this.welcomeMessage, timestamp: new Date() }];
    userInput = '';
    isLoading = false;

    constructor(private chatService: ChatService) { }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    toggleChat() {
        this.isOpen = !this.isOpen;

        // Clear chat history when closing
        if (!this.isOpen) {
            this.messages = [{ ...this.welcomeMessage, timestamp: new Date() }];
            this.userInput = '';
        }
    }

    sendMessage() {
        if (!this.userInput.trim() || this.isLoading) return;

        const text = this.userInput;
        this.messages.push({ text, sender: 'user', timestamp: new Date() });
        this.userInput = '';
        this.isLoading = true;

        // map UI messages to history format expected by backend
        const history = this.messages.map(msg => ({
            sender: msg.sender,
            text: msg.text
        }));

        this.chatService.sendMessage(text, history).subscribe({
            next: (response) => {
                this.messages.push({
                    text: response.reply,
                    sender: 'agent',
                    timestamp: new Date()
                });
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Chat error:', error);
                this.messages.push({
                    text: "Sorry, I'm having trouble connecting right now. Please try again later.",
                    sender: 'agent',
                    timestamp: new Date()
                });
                this.isLoading = false;
            }
        });
    }

    private scrollToBottom(): void {
        try {
            this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
        } catch (err) { }
    }
}
