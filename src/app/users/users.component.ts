import { Component, OnInit } from '@angular/core';
import {User} from "../interfaces/user";
import {UserService} from "../services/user.service";
import {FormBuilder, FormControl, FormGroup, Validators, FormGroupDirective} from "@angular/forms";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  editing: number = 0;

  users : User[];
  userPush: object = {
    _id: "27",
    user_name: "Nassada",
    last_name: "Wetya",
    birth_date: new Date(1993, 2, 2),
    email: "email@as.com"
  };
  userForm: FormGroup;
  validForm: boolean = true;




  constructor(private userService: UserService, fb: FormBuilder) {
    this.userForm = fb.group({
          user_name: new FormControl('',Validators.required),
          last_name: new FormControl('',Validators.required),
          birth_date: new FormControl('',Validators.required),
          email: new FormControl('', Validators.email)
        }
    );
  }

  ngOnInit() {
    this.getUsers();

  }

  createUser(){
    let a: object;
    let id: number = parseInt(this.users[this.users.length-1]._id)+1;
    if (this.userForm.valid){
      this.validForm = true;
       a = {
        _id: id,
        user_name: this.userForm.controls['user_name'].value,
        last_name: this.userForm.controls['last_name'].value,
        birth_date: this.userForm.controls['birth_date'].value,
        email: this.userForm.controls['email'].value
      }
    }else{
      this.validForm = false;
    }
    this.users.push(a);
    this.userService.addUser(a);
  }

  getUsers(): void {
    this.userService.getUsers()
        .subscribe(users => this.users = users);
  }

  delUser(user: User){
    let removeIndex = this.users.map(function(it) { return it._id; }).indexOf(user._id);
    this.users.splice(removeIndex, 1);
    this.userService.delUser(user);
  }

  updateUser(user: User){
    this.userService.upUser(user);
    return 0;
  }
}
