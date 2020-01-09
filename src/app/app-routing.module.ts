import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MailListComponent } from './component/mail-list/mail-list.component';
import { WelcomeComponent } from './component/welcome/welcome.component';


const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'list', component: MailListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
