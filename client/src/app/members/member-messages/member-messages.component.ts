import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild, inject } from '@angular/core';
import { TimeagoModule } from 'ngx-timeago';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { Message } from '../../model/message';
import { MessageService } from '../../services/message.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-messages',
  standalone: true,
  imports: [
    CommonModule,
    TimeagoModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
  ],
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css',
})
export class MemberMessagesComponent {
  @ViewChild('messageForm') messageForm?: NgForm;
  @Input() username?: string;
  messageContent?: string;
  messageThread: any[] = [];
  messageService = inject(MessageService);

  ngOnInit() {
    this.messageService.messageThread$.subscribe((messages) => {
      this.messageThread = messages;
    });
  }

  sendMessage() {
    this.messageService
      .sendMessage(this.username!, this.messageContent!)
      .then(() => {
        this.messageForm!.reset();
      });
  }
}
