import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
<<<<<<< HEAD
import { AuthGuard } from './guards/auth.guard';
=======
import { authGuard } from './guards/auth.guard';
>>>>>>> bb1389e547808fd7019b84a2a6b99f0a655836f2

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      {
        path: 'members',
        component: MemberListComponent,
      },
      {
        path: 'members/:id',
        component: MemberDetailComponent,
      },
      {
        path: 'lists',
        component: ListsComponent,
      },
      {
        path: 'messages',
        component: MessagesComponent,
      },
    ],
  },

  {
<<<<<<< HEAD
    path: 'members',
    component: MemberListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'members/:id',
    component: MemberDetailComponent,
  },
  {
    path: 'lists',
    component: ListsComponent,
  },
  {
    path: 'messages',
    component: MessagesComponent,
  },
  {
=======
>>>>>>> bb1389e547808fd7019b84a2a6b99f0a655836f2
    path: '**',
    component: HomeComponent,
    pathMatch: 'full',
  },
];
