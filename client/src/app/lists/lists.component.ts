import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Member } from '../model/member';
import { MembersService } from '../members.service';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MemberCardComponent } from '../members/member-card/member-card.component';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [CommonModule, FormsModule, MemberCardComponent, MatRadioModule],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css',
})
export class ListsComponent implements OnInit {
  members?: Partial<Member[]>;
  predicated = 'liked';
  memberService = inject(MembersService);

  ngOnInit(): void {
    this.loadLikes();
  }

  loadLikes() {
    this.memberService.getLikes(this.predicated).subscribe((response) => {
      this.members = response;
    });
  }
}
