import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersService } from '../../members.service';
import { Member } from '../../model/member';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css',
})
export class MemberListComponent implements OnInit {
  members: Member[] = [];
  memberService = inject(MembersService);

  ngOnInit(): void {
    this.memberService.getMembers().subscribe((members: any) => {
      this.members = members;
    });
  }
}
