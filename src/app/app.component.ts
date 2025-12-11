import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RESUME_DATA, ResumeData } from './data/resume-data';
import { trigger, transition, style, animate, stagger, query } from '@angular/animations';

import { ChatWidgetComponent } from './components/chat-widget/chat-widget.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, ChatWidgetComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    animations: [
        trigger('fadeInUp', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(30px)' }),
                animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
            ])
        ]),
        trigger('staggerFadeIn', [
            transition('* => *', [
                query(':enter', [
                    style({ opacity: 0, transform: 'translateY(20px)' }),
                    stagger(100, [
                        animate('0.4s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
                    ])
                ], { optional: true })
            ])
        ])
    ]
})
export class AppComponent {
    resumeData: ResumeData = RESUME_DATA;
    isScrolled = false;
    activeSection = 'hero';

    sections = [
        { id: 'hero', label: 'Home' },
        { id: 'experience', label: 'Experience' },
        { id: 'skills', label: 'Skills' },
        { id: 'projects', label: 'Projects' },
        { id: 'education', label: 'Education' },
        { id: 'achievements', label: 'Achievements' }
    ];

    @HostListener('window:scroll')
    onScroll(): void {
        this.isScrolled = window.scrollY > 50;
        this.updateActiveSection();
    }

    updateActiveSection(): void {
        const sections = this.sections.map(s => document.getElementById(s.id));
        const scrollPos = window.scrollY + 200;

        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            if (section && section.offsetTop <= scrollPos) {
                this.activeSection = this.sections[i].id;
                break;
            }
        }
    }

    scrollTo(sectionId: string): void {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    downloadResume(): void {
        // Placeholder for resume download
        alert('Resume download functionality can be added here');
    }
}
