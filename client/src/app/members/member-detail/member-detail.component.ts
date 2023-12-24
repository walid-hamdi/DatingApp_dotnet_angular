import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { TimeagoModule } from 'ngx-timeago';
import { MembersService } from '../../members.service';
import { Member } from '../../model/member';
import { Message } from '../../model/message';
import { MessageService } from '../../services/message.service';
import { MemberMessagesComponent } from '../member-messages/member-messages.component';
import { PresenceService } from '../../services/presence.service';

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
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;
  messages: Message[] = [];
  member?: Member;
  memberService = inject(MembersService);
  activeRouter = inject(ActivatedRoute);
  messageService = inject(MessageService);
  presenceService = inject(PresenceService);

  ngOnInit(): void {
    this.activeRouter.data.subscribe((data) => {
      this.member = data['member'];
    });
  }

  ngAfterViewInit(): void {
    this.activeRouter.queryParams.subscribe((params) => {
      params['tab'] ? this.selectTab(params['tab']) : this.selectTab(0);
    });
  }

  selectTab(index: number) {
    this.tabGroup.selectedIndex = index;
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
