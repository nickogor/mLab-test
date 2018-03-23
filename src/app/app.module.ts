import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UserService } from './services/user.service';
import { HttpClientModule } from "@angular/common/http";
import { NgDatepickerModule } from "ng2-datepicker";



@NgModule({
  declarations: [
    AppComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgDatepickerModule,
    ReactiveFormsModule
  ],
  providers: [HttpClientModule, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
