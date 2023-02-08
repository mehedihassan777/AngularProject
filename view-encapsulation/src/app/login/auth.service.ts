import { Injectable } from "@angular/core";
import { UsersService } from "../users.service";

@Injectable({ providedIn: 'root' })
export class AuthService {
    loggedIn = false;

    constructor(private userSer: UsersService){}

    login(inpUsername: string, password: string) {
        if (this.userSer.users[this.userSer.users.findIndex((x) => x.email == inpUsername || x.phone == +inpUsername)].password == password)
        this.loggedIn = true;
    }

    logout() {
        this.loggedIn = false;
    }
}