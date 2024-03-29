import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserIndexComponent } from './user-index/user-index.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserListComponent } from './user-list/user-list.component';
import { AuthGuard } from '../share/guards/auth.guard';
import { UserListInactivosComponent } from './user-list-inactivos/user-list-inactivos.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserMetodoComponent } from './user-metodo/user-metodo.component';
import { UserDireccionComponent } from './user-direccion/user-direccion.component';

const routes: Routes = [
  {
    path: 'usuario',
    component: UserIndexComponent,
    children: [
      { path: 'registrar', component: UserCreateComponent },
      { path: 'login', component: UserLoginComponent },
    ],
  },
  {path: 'usuario/perfil/:id', component: UserEditComponent},
  {path: 'usuario/metodo', component: UserMetodoComponent},
  {path: 'usuario/direccion', component: UserDireccionComponent},

  {path: 'usuario/lista', component: UserListComponent,
  canActivate:[AuthGuard],
  data:{
    roles: ['Administrador']
  }},
  {path: 'usuario/inactivo', component: UserListInactivosComponent,
canActivate:[AuthGuard],
  data:{
    roles: ['Administrador']
  }}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
