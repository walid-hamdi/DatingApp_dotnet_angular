import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
  inject,
} from '@angular/core';
import { TimeagoModule } from 'ngx-timeago';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { MessageService } from '../../services/message.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  @ViewChild('messageContainer') messageContainer!: ElementRef;
  @Input() username?: string;
  messageContent?: string;
  messageThread: any[] = [];
  messageService = inject(MessageService);

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  ngOnInit() {
    this.messageService.messageThread$.subscribe((messages) => {
      this.messageThread = messages;
      this.scrollToBottom();
    });
  }

  sendMessage() {
    this.messageService
      .sendMessage(this.username!, this.messageContent!)
      .then(() => {
        this.messageForm!.reset();
        this.scrollToBottom();
      });
  }

  private scrollToBottom() {
    if (this.messageContainer && this.messageContainer.nativeElement) {
      const container = this.messageContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    }
  }
}
