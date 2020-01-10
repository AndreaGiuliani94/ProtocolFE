import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MailListComponent } from './component/mail-list/mail-list.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { FormComponent } from './component/form/form.component';
import { MobileListComponent } from './component/mobile-list/mobile-list.component';


const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'list', component: MailListComponent },
  { path: 'form', component: FormComponent },
  { path: 'mobile', component: MobileListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
