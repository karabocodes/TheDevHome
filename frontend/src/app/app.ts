import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { ChatbotComponent } from './shared/chatbot/chatbot.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, ChatbotComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
