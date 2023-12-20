import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RouterModule } from '@angular/router';
import { MembersService } from '../../members.service';
import { Member } from '../../model/member';
import { Pagination } from '../../model/pagination';
import { UserParams } from '../../model/userParams';
import { AccountService } from '../../services/account.service';
import { take } from 'rxjs';
import { User } from '../../model/user';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    MatButtonToggleModule,
    FormsModule,
  ],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css',
})
export class MemberListComponent implements OnInit {
  members?: Member[];
  memberService = inject(MembersService);
  snackBar = inject(MatSnackBar);
  pagination?: Pagination;
  userParams?: UserParams;
  user?: User;
  genderList = [
    { value: 'Male', display: 'Male' },
    { value: 'Female', display: 'Female' },
  ];

  constructor() {
    this.userParams = this.memberService.getUserParams();
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.setUserParams(this.userParams!);
    this.memberService.getMembers(this.userParams!).subscribe((response) => {
      this.members = response.result;
      this.pagination = response.pagination;
    });
  }

  changePage(event: any) {
    this.userParams!.pageNumber = event.pageIndex + 1;
    this.memberService.setUserParams(this.userParams!);
    this.loadMembers();
  }

  resetFilters() {
    this.userParams = this.memberService.resetUserParams();
    this.loadMembers();
  }

  addLike(member: Member) {
    this.memberService.addLike(member.username).subscribe(() => {
      this.openErrorToast(`You have liked ${member.knownAs}`);
    });
  }

  openErrorToast = (message: string) => {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['error-toast'],
    });
  };
}
