import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { TimeagoModule } from 'ngx-timeago';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { Message } from '../../model/message';

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
  ],
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css',
})
export class MemberMessagesComponent {
  @Input() messages: Message[] = [];
  @Input() username?: string;
}
