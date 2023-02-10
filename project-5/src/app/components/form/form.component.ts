import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  userform = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  get getemail() {
    return this.userform.controls['email'];
  }
  get getpassword() {
    return this.userform.controls['password'];
  }

  login(e: any) {
    e.preventDefault();
    if (this.userform.status == 'VALID') {
      // console.log(this.userform);
      console.log('succeed added');
    } else {
      // console.log('falied');
    }
  }
  email: string = '';
  password: string = '';

  flag: boolean = false;

  myuser: any = new User(this.email, this.password);
  userID: any;
  constructor(
    public route: Router,
    public userservice: UserService,
    activatedroute: ActivatedRoute
  ) {
    this.userID = activatedroute.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.userservice.getUserById(this.userID).subscribe((response) => {
      this.myuser = response;
    });
  }
  myfun() {
    if (this.userID) {
      this.updatefn();
    } else {
      this.addnewuser();
    }
  }

  updatefn() {
    this.userservice
      .editUser(this.userID, this.myuser)
      .subscribe((response) => {
        this.route.navigate(['/users/']);
      });
  }
  addnewuser() {
    //let emaivalidation: any = /[a-z0-9]+@[a-z]+.[a-z]{2,3}/;
    if (this.userform.status == 'VALID') {
      this.userservice.addUser(this.myuser).subscribe((user) => {});
      this.flag = !this.flag;
    } else {
      console.log('falied to add user');
    }
  }

  clearfields() {
    this.flag = false;
    this.email = '';
    this.password = '';
  }
}
