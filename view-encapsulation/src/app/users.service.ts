import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { User } from "./user.model";

@Injectable({ providedIn: 'root' })
export class UsersService {
    users: User[] = [];
    userChanged = new Subject<string>();

    getUser(id: string) {
        return this.users[id];
    }

    addUser(user: User) {
        this.users.push(user);
        this.userChanged.next('User Added');
    }

    updateUser(id: string, user: User) {
        this.users[id] = user;
        this.userChanged.next('User Updated');
    }

    deleteUser(id: number) {
        this.users.splice(id, 1);
        this.userChanged.next('User Deleted');
    }
}