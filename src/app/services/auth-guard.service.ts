import { Injectable, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, OnInit{

  isAuth!: boolean
  authSubscription!: Subscription

  constructor(private router: Router,
              private authService: AuthService) {}

  ngOnInit() {
    this.authSubscription = this.authService.authSubject.subscribe(
      (auth) => {
        this.isAuth = auth
      }
    )
    this.authService.emitAuthSubject()
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
  
    if( this.authService.isAuth ) {
      return true
    } else {
      this.router.navigate(['/auth', 'signin'])
      return false
    }
  }
}
