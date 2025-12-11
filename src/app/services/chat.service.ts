import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { RESUME_DATA } from '../data/resume-data';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    sendMessage(message: string, history: any[]): Observable<{ reply: string }> {
        const reply = this.generateResponse(message.toLowerCase().trim());
        return of({ reply }).pipe(delay(400));
    }

    private generateResponse(query: string): string {
        const data = RESUME_DATA;
        // Clean query - remove punctuation for better matching
        const cleanQuery = query.replace(/[?!.,]/g, '').trim();
        const words = cleanQuery.split(/\s+/);

        // Skills - check FIRST before other patterns (high priority)
        if (this.matchesWord(words, ['skill', 'skills', 'technology', 'technologies', 'tech', 'stack', 'proficient', 'knows', 'expertise'])) {
            return `Ravi's a full-stack dev! 🛠️\n\nHe's really strong in Java, Spring Boot, and Angular. Also knows his way around Docker, Kubernetes, AWS, and databases like PostgreSQL & MongoDB.\n\nWant me to go deeper into any area?`;
        }

        // Education - high priority
        if (this.matchesWord(words, ['education', 'degree', 'college', 'university', 'study', 'studied', 'qualification', 'cgpa', 'btech', 'b.tech'])) {
            const edu = data.education;
            return `Ravi did his B.Tech in Computer Engineering from YMCA University (2018-2022) with 8.1 CGPA 🎓`;
        }

        // Projects - high priority
        if (this.matchesWord(words, ['project', 'projects', 'portfolio', 'built', 'build', 'developed', 'made'])) {
            return `Ravi's built some cool stuff! 🏗️\n\n1️⃣ An E-commerce platform with microservices, JWT auth, and Razorpay\n\n2️⃣ A Project Management System with real-time WebSockets\n\nWant details on either?`;
        }

        // Contact - high priority
        if (this.matchesWord(words, ['contact', 'email', 'reach', 'hire', 'mail', 'touch', 'connect'])) {
            return `Sure! You can reach Ravi at:\n\n📧 ${data.email}\n📱 ${data.phone}\n\nHe's always open to new opportunities! 💼`;
        }

        // Experience / Work - high priority
        if (this.matchesWord(words, ['experience', 'work', 'job', 'career', 'company', 'working', 'worked', 'employer'])) {
            const current = data.experience[0];
            return `Ravi's currently a ${current.role} at ${current.company} 💼\n\nHe's been there since Sept 2022, working on accounting software, payment integrations, and microservices.\n\nBefore that, he was at Whale Cloud Technologies!`;
        }

        // Greetings - only match standalone short greetings
        if (this.isGreeting(cleanQuery)) {
            return `Hey there! 👋 What would you like to know about Ravi?`;
        }

        // Thanks
        if (this.matchesWord(words, ['thanks', 'thank', 'thx', 'appreciated', 'awesome', 'great', 'cool', 'nice'])) {
            return `You're welcome! 😊 Anything else you'd like to know?`;
        }

        // Name / Who / About
        if (this.matchesWord(words, ['who', 'introduce', 'about', 'ravi'])) {
            return `Ravi is a ${data.title} based in ${data.location}. He's been building awesome stuff with Java, Spring Boot, and Angular! 🚀`;
        }

        // Phone specifically
        if (this.matchesWord(words, ['phone', 'call', 'number', 'mobile'])) {
            return `📱 Ravi's number is ${data.phone}`;
        }

        // LinkedIn
        if (this.matchesWord(words, ['linkedin', 'profile', 'social'])) {
            return `Here's his LinkedIn: ${data.linkedin} 🔗\n\nFeel free to connect!`;
        }

        // Current role
        if (this.matchesWord(words, ['current', 'currently', 'now', 'present', 'doing'])) {
            const current = data.experience[0];
            return `Right now, Ravi is a ${current.role} at ${current.company}. He's been crushing it since Sept 2022! 💪`;
        }

        // Hostbooks specific
        if (cleanQuery.includes('hostbooks')) {
            return `At Hostbooks, Ravi works on their accounting platform. He's integrated Razorpay (100K+ transactions/month!), built microservices, and optimized APIs. Pretty cool stuff! 🔥`;
        }

        // Programming languages
        if (this.matchesWord(words, ['programming', 'language', 'languages', 'code', 'coding'])) {
            return `Ravi codes mainly in Java and Kotlin for backend, and TypeScript/JavaScript for frontend 💻`;
        }

        // Java / Backend specific
        if (this.matchesWord(words, ['java', 'kotlin', 'spring', 'backend', 'back-end'])) {
            return `Backend is Ravi's jam! 🎯\n\nHe works with Java, Kotlin, Spring Boot, Spring Security, and Hibernate. He's built REST APIs, microservices, the whole nine yards!`;
        }

        // Frontend specific
        if (this.matchesWord(words, ['angular', 'react', 'frontend', 'front-end', 'ui'])) {
            return `For frontend, Ravi uses Angular (his main one) and React.js. He's comfortable with HTML, CSS, and PrimeNG components 🎨`;
        }

        // Database
        if (this.matchesWord(words, ['database', 'databases', 'sql', 'postgres', 'postgresql', 'mysql', 'mongo', 'mongodb', 'redis', 'db'])) {
            return `Databases? Ravi works with PostgreSQL, MySQL, MongoDB, and Redis. He's optimized queries and reduced execution time by 35% at his job! 🗃️`;
        }

        // DevOps / Cloud
        if (this.matchesWord(words, ['devops', 'docker', 'kubernetes', 'k8s', 'jenkins', 'aws', 'cloud', 'deploy', 'deployment', 'cicd', 'ci/cd'])) {
            return `Ravi knows his DevOps! 🚀\n\nDocker, Kubernetes, Jenkins for CI/CD, and AWS (EC2, S3, RDS, Lambda). He's deployed and managed production systems.`;
        }

        // Microservices
        if (this.matchesWord(words, ['microservice', 'microservices', 'distributed', 'kafka', 'rabbitmq', 'eureka'])) {
            return `Ravi's built microservices using Spring Cloud, Eureka, API Gateway, and message queues like Kafka & RabbitMQ. He loves distributed systems! 🔗`;
        }

        // E-commerce project
        if (this.matchesWord(words, ['ecommerce', 'e-commerce', 'shopping', 'shop'])) {
            return `The E-commerce project is a full microservices setup with Spring Boot + Angular. It has OAuth2 auth, handles 100K+ payments/month, and uses Docker + K8s for deployment! 🛒`;
        }

        // Achievements
        if (this.matchesWord(words, ['achievement', 'achievements', 'accomplishment', 'accomplishments', 'award', 'awards'])) {
            return `Some highlights:\n\n🏆 JEE Mains AIR 14920 (Top 0.94%)\n💻 300+ DSA problems solved on LeetCode\n📜 Certified in Advanced Problem-Solving`;
        }

        // JEE / Competitive
        if (this.matchesWord(words, ['jee', 'rank', 'competitive', 'exam'])) {
            return `Ravi scored AIR 14920 in JEE Mains 2018 - that's in the top 0.94%! 🏅`;
        }

        // LeetCode / DSA
        if (this.matchesWord(words, ['leetcode', 'dsa', 'problem', 'problems', 'algorithm', 'algorithms'])) {
            return `Ravi's solved 300+ DSA problems on LeetCode and TakeYouForward. He loves problem-solving! 🧩\n\nCheck his profile: ${data.leetcode}`;
        }

        // Location
        if (this.matchesWord(words, ['location', 'where', 'based', 'city', 'live', 'lives', 'from'])) {
            return `Ravi's based in ${data.location} 📍`;
        }

        // Payment / Razorpay
        if (this.matchesWord(words, ['payment', 'payments', 'razorpay', 'transaction', 'transactions'])) {
            return `Ravi integrated Razorpay at Hostbooks - it processes 100K+ transactions every month! 💳`;
        }

        // Salary / Rate (dodge gracefully)
        if (this.matchesWord(words, ['salary', 'rate', 'cost', 'charge', 'pay', 'ctc', 'package'])) {
            return `For discussions about opportunities and compensation, it's best to connect with Ravi directly!\n\n📧 ${data.email}`;
        }

        // Bye
        if (this.matchesWord(words, ['bye', 'goodbye', 'later', 'cya'])) {
            return `Bye! 👋 Feel free to come back anytime. Good luck!`;
        }

        // Help - moved to end so other keywords take priority
        if (this.matchesWord(words, ['help', 'options', 'menu'])) {
            return `I can tell you about:\n\n💼 Ravi's work experience\n🛠️ His tech skills\n🏗️ Projects he's built\n🎓 Education\n📧 How to contact him\n\nJust ask away!`;
        }

        // Default
        return `Hmm, I'm not sure about that one! 🤔\n\nTry asking about Ravi's skills, experience, projects, or how to contact him!`;
    }

    // Check if query is a standalone greeting
    private isGreeting(query: string): boolean {
        const greetings = ['hi', 'hello', 'hey', 'hola', 'sup', 'yo', 'hii', 'hiii', 'heya', 'howdy'];
        const words = query.split(/\s+/);

        // Match if first word is greeting AND query is short (just a greeting)
        if (greetings.includes(words[0]) && words.length <= 2) {
            return true;
        }
        // Also match common greeting phrases
        if (query === 'hi there' || query === 'hey there' || query === 'hello there') {
            return true;
        }
        return false;
    }

    // Check if any keyword exists as a whole word in the query
    private matchesWord(queryWords: string[], keywords: string[]): boolean {
        return keywords.some(keyword => queryWords.includes(keyword));
    }
}
