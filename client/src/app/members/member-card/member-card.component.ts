import { Component, Input, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Member } from '../../model/member';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MembersService } from '../../members.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { PresenceService } from '../../services/presence.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [RouterModule, MatCardModule, MatIconModule, CommonModule],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css',
})
export class MemberCardComponent implements OnInit {
  @Input() member: any;
  memberService = inject(MembersService);
  snackBar = inject(MatSnackBar);
  presenceService = inject(PresenceService);

  ngOnInit(): void {}

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
