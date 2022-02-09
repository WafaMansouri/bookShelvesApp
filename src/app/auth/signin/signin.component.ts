import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signInForm!: FormGroup
  errorMessage!: string
  connectedUser!: any

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
   this.initForm()
  }

  initForm = () => {
    this.signInForm = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]],
      password:['', Validators.required]
    })
  }

  onSignIn() {
    const email = this.signInForm.get('email')?.value
    const password = this.signInForm.get('password')?.value
    this.authService.signInUser(email, password).then(()=> {
      this.connectedUser = email
      this.router.navigate(["/books"])
    }).catch(err => {
      this.errorMessage = err
    })
  }

}
