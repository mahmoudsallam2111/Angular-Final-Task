import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  userlist: any;
  constructor(public userservice: UserService) {}
  ngOnInit(): void {
    // observer  // users=data come from observable
    this.userservice.getAllUsers().subscribe((users) => {
      this.userlist = users;
    });
  }
  deletefn(userId: any) {
    if (confirm('Are you sure you want to delete the User?')) {
      this.userservice.deleteUser(userId).subscribe((user) => {
        this.userlist = this.userlist.filter((user: any) => user.id != userId);
      });
    }
  }
}
