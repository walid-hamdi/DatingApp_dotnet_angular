import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Member } from '../model/member';
import { MembersService } from '../members.service';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MemberCardComponent } from '../members/member-card/member-card.component';
import { Pagination } from '../model/pagination';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserParams } from '../model/userParams';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MemberCardComponent,
    MatRadioModule,
    MatPaginatorModule,
  ],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css',
})
export class ListsComponent implements OnInit {
  members?: Partial<Member[]>;
  predicated = 'liked';
  memberService = inject(MembersService);
  pageNumber = 1;
  pageSize = 5;
  pagination?: Pagination;

  ngOnInit(): void {
    this.loadLikes();
  }

  loadLikes() {
    this.memberService
      .getLikes(this.predicated, this.pageNumber, this.pageSize)
      .subscribe((response) => {
        this.members = response.result;
        this.pagination = response.pagination;
      });
  }

  changePage(event: any) {
    this.pageNumber = event.event.pageIndex + 1;
    this.loadLikes();
  }
}
