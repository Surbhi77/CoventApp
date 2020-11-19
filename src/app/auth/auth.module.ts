import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { NbMenuModule } from '@nebular/theme';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../@theme/theme.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    ThemeModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
