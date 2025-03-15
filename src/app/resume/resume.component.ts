import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css'
})
export class ResumeComponent implements OnInit {


  ngOnInit(): void {
  }

  downloadCV() {
    const resumeLink = "https://drive.google.com/file/d/1q3l95YuDxW5VaHv28kqJNQvL1_SdMwkp/view";
    window.open(resumeLink, '_blank');
  }

}
