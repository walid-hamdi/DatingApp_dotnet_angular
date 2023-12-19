import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Member } from '../../model/member';
import { MembersService } from '../../members.service';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { TimeagoModule } from 'ngx-timeago';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    TimeagoModule,
  ],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css',
})
export class MemberDetailComponent implements OnInit {
  member?: Member;
  memberService = inject(MembersService);
  activeRouter = inject(ActivatedRoute);

  ngOnInit(): void {
    const username = this.activeRouter.snapshot.paramMap.get('username');

    if (username) {
      this.memberService.getMember(username).subscribe((member) => {
        this.member = member;
      });
    }
  }
}
