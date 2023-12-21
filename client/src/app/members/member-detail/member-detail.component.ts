import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Member } from '../../model/member';
import { MembersService } from '../../members.service';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { TimeagoModule } from 'ngx-timeago';
import { MemberMessagesComponent } from '../member-messages/member-messages.component';
import { Message } from '../../model/message';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    TimeagoModule,
    MemberMessagesComponent,
  ],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css',
})
export class MemberDetailComponent implements OnInit {
  messages: Message[] = [];
  member?: Member;
  memberService = inject(MembersService);
  activeRouter = inject(ActivatedRoute);
  messageService = inject(MessageService);
  selectedTabIndex = 0;

  ngOnInit(): void {
    const username = this.activeRouter.snapshot.paramMap.get('username');

    if (username) {
      this.memberService.getMember(username).subscribe((member) => {
        this.member = member;
      });
    }
  }

  tabChanged(event: any) {
    if (event.index === 3 && this.messages.length !== 0) {
      this.loadMessages();
    }
  }

  loadMessages() {
    this.messageService
      .getMessageThread(this.member?.username!)
      .subscribe((messages) => {
        this.messages = messages;
      });
  }
}
