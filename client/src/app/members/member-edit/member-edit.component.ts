import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Member } from '../../model/member';
import { User } from '../../model/user';
import { AccountService } from '../../account.service';
import { take } from 'rxjs';
import { MembersService } from '../../members.service';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css',
})
export class MemberEditComponent implements OnInit {
  member?: Member;
  user?: User;
  accountUser = inject(AccountService);
  memberService = inject(MembersService);

  constructor() {
    this.accountUser.currentUser$.pipe(take(1)).subscribe((user: any) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.memberService.getMember(this.user?.username!).subscribe((member) => {
      this.member = member;
    });
  }
}
