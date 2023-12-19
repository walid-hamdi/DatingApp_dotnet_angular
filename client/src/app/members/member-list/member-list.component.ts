import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { MembersService } from '../../members.service';
import { Member } from '../../model/member';
import { Pagination } from '../../model/pagination';
import { UserParams } from '../../model/userParams';
import { AccountService } from '../../services/account.service';
import { take } from 'rxjs';
import { User } from '../../model/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css',
})
export class MemberListComponent implements OnInit {
  members?: Member[];
  private memberService = inject(MembersService);
  private accountService = inject(AccountService);
  pagination?: Pagination;
  userParams?: UserParams;
  user?: User;
  genderList = [
    { value: 'Male', display: 'Male' },
    { value: 'Female', display: 'Female' },
  ];

  constructor() {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      this.user = user!;
      this.userParams = new UserParams(user!);
    });
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers(this.userParams!).subscribe((response) => {
      this.members = response.result;
      this.pagination = response.pagination;
    });
  }

  changePage(event: any) {
    this.userParams!.pageNumber = event.pageIndex + 1;
    this.loadMembers();
  }

  resetFilters() {
    this.userParams = new UserParams(this.user!);
    this.loadMembers();
  }
}
