import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { NbMenuModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../@theme/theme.module';
import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, AuthComponent],
  imports: [
    ThemeModule,
    CommonModule,
    FormsModule,
    NbMenuModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
