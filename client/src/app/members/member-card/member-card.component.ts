import { Component, Input, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Member } from '../../model/member';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MembersService } from '../../members.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [RouterModule, MatCardModule, MatIconModule],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css',
})
export class MemberCardComponent {
  @Input() member: any;
  memberService = inject(MembersService);
  snackBar = inject(MatSnackBar);

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
