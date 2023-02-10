import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.css'],
})
export class UsersDetailsComponent implements OnInit {
  userId: number;
  userdetails: any;
  constructor(
    public activatedRoute: ActivatedRoute,
    public userService: UserService
  ) {
    this.userId = activatedRoute.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.userService.getUserById(this.userId).subscribe((response) => {
      this.userdetails = response;
    });
  }
}
