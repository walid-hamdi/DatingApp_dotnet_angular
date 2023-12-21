import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TimeagoModule } from 'ngx-timeago';

@Component({
  selector: 'app-member-messages',
  standalone: true,
  imports: [CommonModule, TimeagoModule],
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css',
})
export class MemberMessagesComponent implements OnInit {
  ngOnInit(): void {}
}
