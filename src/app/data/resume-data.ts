export interface Experience {
    company: string;
    role: string;
    duration: string;
    location: string;
    highlights: string[];
}

export interface Project {
    title: string;
    description: string;
    features: string[];
    techStack: string[];
}

export interface SkillCategory {
    category: string;
    icon: string;
    skills: string[];
}

export interface ResumeData {
    name: string;
    title: string;
    phone: string;
    email: string;
    location: string;
    linkedin: string;
    leetcode: string;
    education: {
        degree: string;
        cgpa: string;
        institution: string;
        duration: string;
    };
    experience: Experience[];
    skills: SkillCategory[];
    projects: Project[];
    achievements: string[];
    coursework: string[];
}

export const RESUME_DATA: ResumeData = {
    name: 'Ravi Raj',
    title: 'Software Developer',
    phone: '+91-7779833016',
    email: 'iamraviraj5@gmail.com',
    location: 'Gurugram, India',
    linkedin: 'https://www.linkedin.com/in/raviraj080502/',
    leetcode: 'https://leetcode.com/Ravi-raj/',

    education: {
        degree: 'B.Tech. (Computer Engineering)',
        cgpa: '8.1 CGPA',
        institution: 'J.C. Bose University of Science Technology, YMCA',
        duration: '2018 - 2022'
    },

    experience: [
        {
            company: 'Hostbooks Limited',
            role: 'Software Developer',
            duration: 'Sept 2022 - Current',
            location: 'Gurugram, India',
            highlights: [
                'Developed a scalable Accounting Web App using Angular Spring Boot, enhancing financial data accuracy and user experience',
                'Optimized REST APIs with Spring Boot, reducing API response time by 30% for seamless frontend-backend communication',
                'Implemented secure authentication via Spring Security JWT, improving system security and compliance',
                'Integrated Razorpay payment gateway, processing 100K+ transactions/month, boosting payment efficiency',
                'Refactored backend code (Java, Kotlin), reducing system crashes by 40% and improving maintainability',
                'Designed microservices for core accounting functions, enhancing scalability and fault tolerance',
                'Optimized database performance (Hibernate, JPA, Criteria API), cutting query execution time by 35%',
                'Led HostBooks Pay360 Payroll Software development, streamlining payroll processing, tax compliance, and salary management',
                'Built payroll microservices for 100+ businesses, ensuring seamless compensation processing and compliance with Indian tax laws',
                'Actively contributed in Agile teams, handling sprint planning, code reviews, and mentoring junior developers'
            ]
        },
        {
            company: 'Whale Cloud Technologies Pvt. Ltd.',
            role: 'Java Developer',
            duration: 'Jan 2022 - Aug 2022',
            location: 'Gurugram, India',
            highlights: [
                'Managed customer data in the BSNL/CDR project using Spring Boot, ensuring efficient backend operations',
                'Developed and optimized CRUD operations, improving data handling and system performance',
                'Built dynamic web interfaces with Java Servlets JSP, enhancing user experience',
                'Established robust database connectivity using JDBC and optimized data persistence with JPA'
            ]
        }
    ],

    skills: [
        {
            category: 'Programming',
            icon: '💻',
            skills: ['Java', 'Kotlin', 'TypeScript', 'JavaScript']
        },
        {
            category: 'Frontend',
            icon: '🎨',
            skills: ['Angular', 'React.js', 'HTML', 'CSS', 'PrimeNG']
        },
        {
            category: 'Backend',
            icon: '⚙️',
            skills: ['Spring Boot', 'Spring MVC', 'Spring Security', 'Hibernate', 'JPA']
        },
        {
            category: 'Microservices',
            icon: '🔗',
            skills: ['Spring Cloud', 'REST APIs', 'Eureka', 'API Gateway', 'Feign Client', 'Resilience4j', 'Circuit Breaker', 'Kafka', 'RabbitMQ']
        },
        {
            category: 'Databases',
            icon: '🗃️',
            skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis']
        },
        {
            category: 'DevOps Tools',
            icon: '🔧',
            skills: ['Docker', 'Kubernetes', 'Jenkins', 'Git', 'GitHub', 'Postman', 'Netlify']
        },
        {
            category: 'Cloud Deployment',
            icon: '☁️',
            skills: ['AWS (EC2, S3, RDS, Lambda)', 'CI/CD Pipelines']
        }
    ],

    projects: [
        {
            title: 'E-Commerce Platform with Microservices',
            description: 'Built a scalable e-commerce platform using Spring Boot Angular with microservices architecture for modularity and performance.',
            features: [
                'Implemented JWT OAuth2 authentication, ensuring secure, role-based access',
                'Optimized REST APIs, reducing response time by 30%',
                'Integrated Razorpay Stripe for secure, seamless transactions, handling 100K+ monthly payments'
            ],
            techStack: ['Java', 'Spring Boot', 'Spring Cloud', 'Angular', 'OAuth2', 'JWT', 'PostgreSQL', 'Docker', 'Kubernetes', 'RabbitMQ']
        },
        {
            title: 'Project Management System',
            description: 'Developed a task management system with real-time tracking, role-based access, and collaboration tools.',
            features: [
                'Implemented Spring Security JWT for secure authentication and authorization',
                'Enhanced project efficiency with dynamic task assignments and progress monitoring',
                'Integrated WebSockets for real-time updates and notifications'
            ],
            techStack: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL', 'Spring Security', 'JWT', 'WebSockets', 'Docker']
        }
    ],

    achievements: [
        'Secured All India Rank 14920 in JEE-MAINS 2018 (Top 0.94%)',
        'Certified in Advanced Problem-Solving by Coding Blocks',
        'Solved 300+ DSA problems on LeetCode and TakeYouForward'
    ],

    coursework: [
        'Operating Systems',
        'Computer Networks',
        'Database Management Systems',
        'Object-Oriented Programming with Java and Spring Boot'
    ]
};
