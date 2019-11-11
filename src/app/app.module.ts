import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ProcessService } from './process.service';
import { HttpClientModule } from '@angular/common/http'
import { FileDropModule } from 'ngx-file-drop';
import { DomImageService} from "./dom-image.service";
import { ColorPickerModule } from 'ngx-color-picker';
import { RouterModule,Routes } from '@angular/router'
import { NgxfUploaderModule } from 'ngxf-uploader';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component'
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

import { HomeComponent } from './home/home.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { StartComponent } from './start/start.component';

import { JwtModule } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './TokenInterceptor';
import { from } from 'rxjs';
// ...
export function tokenGetter() {
  return localStorage.getItem('access_token');
}

const route:Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:LoginComponent,},
  {path:'app',component:DashboardComponent,canActivate: [AuthGuard]},
  {path:'**',redirectTo:'/',pathMatch:'full'}
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  HomeComponent,
  DashboardComponent,
  StartComponent
  ],
  imports: [
    TagInputModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    NgxfUploaderModule,
        FileDropModule,
    ColorPickerModule,
    NgSelectModule, FormsModule,
    RouterModule.forRoot(route),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:8080/login','localhost:8080/app'],
        blacklistedRoutes: ['localhost:8080/api/auth']
      }
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },ProcessService,DomImageService,AuthService,
    AuthGuard],
  bootstrap: [HomeComponent],
  exports:[RouterModule]
})
export class AppModule { 

}

