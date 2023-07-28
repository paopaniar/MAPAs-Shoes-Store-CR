import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { CommonModule } from '@angular/common';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserIndexComponent } from './user-index/user-index.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import {MatDividerModule} from '@angular/material/divider'; 
import {MatDialogModule} from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import {MatCardModule} from '@angular/material/card';



@NgModule({
  declarations: [
    UserCreateComponent,
    UserLoginComponent,
    UserIndexComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDividerModule,
    MatDialogModule,
    MatIconModule,
    LayoutModule,
    MatCardModule,
    ReactiveFormsModule,
    UserRoutingModule
  ],
})
export class UserModule { }
