import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class UsersService {
    users: User[] = [];

    constructor(private http: HttpClient) { }

    setUsers() {
        this.http.get<User[]>('https://mehedihassan.xyz/api/emp/read.php').subscribe(users => {
            this.users = users;
        });
    }

    getUserForPage(currentPage: number, itemPerPage: number, searchText?: string) {
        if (searchText) {
            let findUsers = this.users.filter(user => {
                return user.fname.toLowerCase().match(searchText.toLowerCase()) || user.lname.toLowerCase().match(searchText.toLowerCase());
            });

            return { users: findUsers.slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage), totalUsers: findUsers.length };
        }

        else
            return { users: this.users.slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage), totalUsers: this.users.length };
    }

    searchSuggestion() {
        const distinctUsers = this.users.filter((obj, index, self) =>
            index === self.findIndex((t) => t.fname === obj.fname && t.lname === obj.lname)
        );
        const allNames: string[] = [];
        distinctUsers.map(user => allNames.push.apply(allNames, [user.fname, user.lname]));
        const distinctUserNames: string [] = allNames.filter((obj, index, self) =>
            index === self.findIndex((t) => t === obj)
        );
        return distinctUserNames;
    }

    getUser(id: number) {
        return this.users[this.users.findIndex((x) => x.id == id)];
    }

    addUser(user: User) {
        this.users.push(user);
    }

    updateUser(user: User) {
        this.users[this.users.findIndex((x) => x.id == user.id)] = user;
    }

    deleteUser(id: number) {
        this.users.splice(this.users.findIndex((x) => x.id == id), 1);
    }
}
