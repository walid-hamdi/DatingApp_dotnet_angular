import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeagoModule } from 'ngx-timeago';
import { MembersService } from '../../members.service';
import { Member } from '../../model/member';
import { MessageService } from '../../services/message.service';
import { MemberMessagesComponent } from '../member-messages/member-messages.component';
import { PresenceService } from '../../services/presence.service';
import { AccountService } from '../../services/account.service';
import { User } from '../../model/user';
import { take } from 'rxjs';

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
export class MemberDetailComponent implements OnInit, OnDestroy {
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;
  member?: Member;
  memberService = inject(MembersService);
  activeRouter = inject(ActivatedRoute);
  messageService = inject(MessageService);
  presenceService = inject(PresenceService);
  accountService = inject(AccountService);
  // router = inject(Router);
  user?: User;

  constructor() {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user: User | null) => {
        this.user = user!;
      });
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

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
    if (
      event.index === 3
      // && this.messages.length > 0
    ) {
      this.messageService.createHubConnection(
        this.user!,
        this.member?.username!
      );
    } else {
      this.messageService.stopHubConnection();
    }
  }

  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }
}
