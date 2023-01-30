import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './components/home-page/home-page.component';
import { ShowUsersComponent } from './components/userOperations/show-users/show-users.component';

const routes: Routes = [
  {path:'',component:HomePageComponent},
  {path:'users', component:ShowUsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
