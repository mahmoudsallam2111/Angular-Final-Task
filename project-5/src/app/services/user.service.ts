import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  URL: string = 'http://localhost:3005/users';
  constructor(private client: HttpClient) {}
  getAllUsers() {
    return this.client.get(this.URL);
  }
  getUserById(userId: any) {
    return this.client.get(`${this.URL}/${userId}`);
  }
  addUser(user: any) {
    return this.client.post(this.URL, user);
  }

  editUser(userId: any, user: any) {
    return this.client.put<User>(`${this.URL}/${userId}`, user);
  }

  deleteUser(userId: any) {
    return this.client.delete(`${this.URL}/${userId}`);
  }
}
