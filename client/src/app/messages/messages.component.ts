import { Component, inject } from '@angular/core';
import { Message } from '../model/message';
import { Pagination } from '../model/pagination';
import { MessageService } from '../services/message.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TimeagoModule } from 'ngx-timeago';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TimeagoModule,
    MatPaginatorModule,
    MatButtonToggleModule,
    MatIconModule,
    MatTableModule,
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
})
export class MessagesComponent {
  messageService = inject(MessageService);
  messages: Message[] = [];
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
