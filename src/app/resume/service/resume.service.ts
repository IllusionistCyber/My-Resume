import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private apiUrl = 'http://localhost:8080/chatbot/ask'; // Change this if your backend is hosted elsewhere

  constructor(private http: HttpClient) {}

  sendMessage(question: string): Observable<{ answer: string }> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' // ✅ Ensure JSON content type
    });
    return this.http.post<{ answer: string }>(this.apiUrl, { question }, { headers });
  }
}
