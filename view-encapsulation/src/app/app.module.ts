import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ChildComponent } from './child/child.component';
import { ParentComponent } from './parent/parent.component';
import { HomeComponent } from './home/home.component';
import { TdFormComponent } from './td-form/td-form.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { QparamsComponent } from './qparams/qparams.component';
import { QparamsuserComponent } from './qparamsuser/qparamsuser.component';



const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'parent', component: ParentComponent },
  { path: 'tdform', component: TdFormComponent },
  { path: 'rform', component: ReactiveFormComponent },
  { path: 'qprams/:id', component: QparamsComponent },
  { path: 'qpramsuser/:id/:name', component: QparamsuserComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    ChildComponent,
    ParentComponent,
    HomeComponent,
    TdFormComponent,
    ReactiveFormComponent,
    QparamsComponent,
    QparamsuserComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    [RouterModule.forRoot(appRoutes)]
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
