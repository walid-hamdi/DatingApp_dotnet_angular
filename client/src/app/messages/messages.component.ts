import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from '../model/message';
import { Pagination } from '../model/pagination';
import { MessageService } from '../services/message.service';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    CommonModule,
    MatRadioModule,
    MatIconModule,
    FormsModule,
    MatTableModule,
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
})
export class MessagesComponent implements OnInit {
  messageService = inject(MessageService);
  messages?: Message[];
  pagination?: Pagination;
  container = 'Outbox';
  pageNumber = 1;
  pageSize = 5;

  radioButtons = [
    { value: 'unread', icon: 'email', label: 'Unread' },
    { value: 'inbox', icon: 'inbox', label: 'Inbox' },
    { value: 'outbox', icon: 'send', label: 'Outbox' },
  ];

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.messageService
      .getMessages(this.pageNumber, this.pageSize, this.container)
      .subscribe((response) => {
        this.messages = response.result;
        this.pagination = response.pagination;
      });
  }
  changePage(event: any) {
    if (this.pageNumber !== event.pageIndex + 1) {
      this.pageNumber = event.pageIndex + 1;
      this.loadMessages();
    }
  }
}
