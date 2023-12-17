import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { MembersService } from '../../members.service';
import { Member } from '../../model/member';
import { Pagination } from '../../model/pagination';

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
  ],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css',
})
export class MemberListComponent implements OnInit {
  members?: Member[];
  memberService = inject(MembersService);
  pagination?: Pagination;
  pageNumber = 0;
  pageSize = 5;

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService
      .getMembers(this.pageNumber, this.pageSize)
      .subscribe((response) => {
        this.members = response.result;
        this.pagination = response.pagination;
      });
  }

  changePage(event: any) {
    this.pageNumber = event.pageIndex + 1;
    this.loadMembers();
  }
}
