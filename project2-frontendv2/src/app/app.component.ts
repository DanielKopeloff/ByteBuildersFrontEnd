import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  isAuthenticated = false;
  private userSub: Subscription;

  storage :Storage = sessionStorage;

  title = 'project2-frontendv2';
  constructor(private authService: AuthService){}

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }

  ngOnInit(){

    let data = JSON.parse(this.storage.getItem('byteU'))

    if(data !=  null){
      this.isAuthenticated = true
    }
    else{
      this.isAuthenticated = false;
    }

    this.userSub = this.authService.user.subscribe(user =>{
      this.isAuthenticated = !!user;//!user ? false : true;
      console.log(!user);
      console.log(!!user);
    });
  }
}

