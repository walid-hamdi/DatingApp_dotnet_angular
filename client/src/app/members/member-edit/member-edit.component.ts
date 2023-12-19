import {
  Component,
  HostListener,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Member } from '../../model/member';
import { User } from '../../model/user';
import { AccountService } from '../../services/account.service';
import { take } from 'rxjs';
import { MembersService } from '../../members.service';
import { Form, FormsModule, NgForm } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PhotoEditorComponent } from '../photo-editor/photo-editor.component';
import { TimeagoModule } from 'ngx-timeago';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    PhotoEditorComponent,
    TimeagoModule,
  ],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css',
})
export class MemberEditComponent implements OnInit {
  member?: Member;
  user?: User;
  @ViewChild('editForm') public editForm?: NgForm;
  // @HostListener('window.beforeunload', ['$event']) unloadNotification(
  //   $event: any
  // ) {
  //   if (this.editForm?.dirty) {
  //     $event.returnValue = true;
  //   }
  // }

  private accountUser = inject(AccountService);
  private memberService = inject(MembersService);
  private snackBar = inject(MatSnackBar);

  openErrorToast = (message: string) => {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['error-toast'],
    });
  };

  constructor() {
    this.accountUser.currentUser$.pipe(take(1)).subscribe((user: any) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.memberService.getMember(this.user?.username!).subscribe((member) => {
      this.member = member;
    });
  }

  updateMember() {
    this.memberService.updateMember(this.member!).subscribe(() => {
      this.openErrorToast('Profile Updated successfully.');
      this.editForm?.reset(this.member);
    });
  }
}
