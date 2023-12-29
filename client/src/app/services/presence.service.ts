import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { User } from '../model/user';
import { BehaviorSubject, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PresenceService {
  snackBar = inject(MatSnackBar);
  hubUrl = environment.hubUrl;
  private hubConnection?: HubConnection;
  onlineUsersSource: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
    []
  );
  onlineUsers$ = this.onlineUsersSource.asObservable();

  createHubConnection(user: User) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${this.hubUrl}/presence`, {
        accessTokenFactory: () => user.token,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch((err) => this.openErrorToast(err));

    this.hubConnection.on('UserIsOnline', (username) => {
      this.onlineUsers$.pipe(take(1)).subscribe((usernames) => {
        this.onlineUsersSource.next([...usernames, username]);
      });
    });

    this.hubConnection.on('UserIsOffline', (username) => {
      this.onlineUsers$.pipe(take(1)).subscribe((usernames) => {
        this.onlineUsersSource.next([
          ...usernames.filter((name) => name !== username),
        ]);
      });
    });

    this.hubConnection.on('GetOnlineUsers', (usernames: string[]) => {
      this.onlineUsersSource.next(usernames);
    });

    this.hubConnection.on('NewMessageReceived', ({ username, knownAs }) => {
      this.openErrorToast(knownAs + ' has sent you a new message!');

      // TODO:
      // this.router.navigateByUrl(`/members/${username}?tab=3`)
    });
  }

  stopConnection() {
    this.hubConnection?.stop().catch((err) => this.openErrorToast(err));
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
