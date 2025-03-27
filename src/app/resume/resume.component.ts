import {Component, OnInit} from '@angular/core';
import {ResumeService} from "./service/resume.service";

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css'
})
export class ResumeComponent implements OnInit {


  ngOnInit(): void {
  }

  downloadCV() {
    const resumeLink = "https://drive.google.com/file/d/1Du8FDl7jPkGXDEar2pPnNIzyG0p9r2MS/view";
    window.open(resumeLink, '_blank');
  }

  userMessage = '';
  messages: { type: string; text: string }[] = [];

  constructor(private chatbotService: ResumeService) {}

  sendMessage() {
    if (!this.userMessage.trim()) return;

    this.messages.push({ type: 'user', text: this.userMessage });

    this.chatbotService.sendMessage(this.userMessage).subscribe(response => {
      this.messages.push({ type: 'bot', text: response.answer });
    });

    this.userMessage = ''; // Clear input field
  }
}
