import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {

    isAuthenticated = false;
    userSub: Subscription;

    constructor(private dataStoreService: DataStorageService, private authSer: AuthService) { }

    ngOnInit(): void {
        this.userSub = this.authSer.user.subscribe(user => {
            this.isAuthenticated = !!user;
        });
    }

    onSaveData() {
        this.dataStoreService.storeRecipes();
    }

    onFetchData() {
        this.dataStoreService.fetchRecipes().subscribe();
    }

    onLogout() {
        this.authSer.logout();
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
}