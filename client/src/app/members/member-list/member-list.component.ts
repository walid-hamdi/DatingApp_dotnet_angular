import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersService } from '../../members.service';
import { Member } from '../../model/member';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css',
})
export class MemberListComponent implements OnInit {
  members$?: Observable<Member[]>;
  memberService = inject(MembersService);

  ngOnInit(): void {
    this.members$ = this.memberService.getMembers();
  }
}
