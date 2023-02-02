import { Injectable } from "@angular/core";
import { User } from "./user.model";

@Injectable({ providedIn: 'root' })
export class UsersService {
    users: User[] = [];

    getUser(id: number) {
        return this.users[id];
    }

    addUser(user: User) {
        this.users.push(user);
    }

    updateUser(id: number, user: User) {
        this.users[id] = user;
    }
}