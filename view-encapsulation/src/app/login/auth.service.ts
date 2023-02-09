import { Injectable } from "@angular/core";
import { UsersService } from "../users.service";

@Injectable({ providedIn: 'root' })
export class AuthService {
    loggedIn = false;

    constructor(private userSer: UsersService){}

    login(inpUsername: string, password: string) {
        const user: number = this.userSer.users.findIndex((x) => x.email == inpUsername || x.phone == +inpUsername);
        if ( user != -1)
            if (this.userSer.users[user].password == password) {
                localStorage.setItem("userData", JSON.stringify(this.userSer.users[user]));
                this.loggedIn = true;
        }
    }

    autoLogin() {
        if (localStorage.getItem("userData"))
            this.loggedIn = true;
        else
            return;
    }

    logout() {
        localStorage.clear();
        this.loggedIn = false;
    }
}