import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UsersService } from "../users.service";

@Injectable({ providedIn: 'root' })
export class AuthService {
    loggedIn = false;
    autoLogoutHandler;

    constructor(private userSer: UsersService, private router: Router) { }

    login(inpUsername: string, password: string) {
        const user: number = this.userSer.users.findIndex((x) => x.email == inpUsername || x.phone == +inpUsername);
        if (user != -1)
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

    autoLogout(time: number) {
        this.autoLogoutHandler = setTimeout(() => {
            this.logout();
        }, time);
    }

    logout() {
        localStorage.clear();
        this.loggedIn = false;
        this.router.navigate(['/home']);
        clearTimeout(this.autoLogoutHandler);
    }
}