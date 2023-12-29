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
import { ConfirmService } from '../confirm.service';

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
  confirmService = inject(ConfirmService);
  messages: Message[] = [];
  pagination?: Pagination;
  container = 'Unread';
  pageNumber = 1;
  pageSize = 5;
  loading = false;

  radioButtons = [
    { value: 'unread', icon: 'email', label: 'Unread' },
    { value: 'inbox', icon: 'inbox', label: 'Inbox' },
    { value: 'outbox', icon: 'send', label: 'Outbox' },
  ];

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.loading = true;
    this.messageService
      .getMessages(this.pageNumber, this.pageSize, this.container)
      .subscribe((response) => {
        this.messages = response.result;
        this.pagination = response.pagination;
        this.loading = false;
      });
  }

  handleDelete(event: Event, id: number) {
    event.stopPropagation();
    this.deleteMessage(id);
  }

  deleteMessage(id: number) {
    this.confirmService
      .confirm(
        'Delete Confirmation',
        'Are you sure you want to delete this message? This action cannot be undone.',
        'Cancel',
        'Delete'
      )
      .subscribe((confirmed) => {
        if (confirmed) {
          this.messageService.deleteMessage(id).subscribe(() => {
            const findTheId = this.messages.findIndex(
              (message) => message.id === id
            );
            this.messages.splice(findTheId, 1);
          });
        }
      });
  }

  changePage(event: any) {
    if (this.pageNumber !== event.pageIndex + 1) {
      this.pageNumber = event.pageIndex + 1;
      this.loadMessages();
    }
  }
}
