import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth!: boolean
  authSubscription!: Subscription

  constructor(private authService: AuthService,
              private router: Router) { 
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.authSubject.subscribe(
      (auth) => {
        this.isAuth = auth
      }
    )
    this.authService.emitAuthSubject()
  }

  onSignOut() {
    this.authService.signOutUser()
    this.authService.emitAuthSubject()
    this.router.navigate(["/auth/signin"])
  }
}
