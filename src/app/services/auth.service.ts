import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authSubject= new Subject<boolean>()
  isAuth = false;
  constructor(private httpClient: HttpClient) { }

  emitAuthSubject() {
    this.authSubject.next(this.isAuth)
  }

  createNewUser(newUser: any) {
    return new Promise(
      (resolve, reject) => {
        this.httpClient
        .post('https://bookshelves-90b54-default-rtdb.europe-west1.firebasedatabase.app/users.json', newUser)
        .subscribe({
          next: () => {
            this.isAuth = true;
            this.emitAuthSubject()
            resolve("true")
          },
          error: (error) => {
            reject(error)
          }
        })
      }
    )
  }

  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        this.httpClient
        .get('https://bookshelves-90b54-default-rtdb.europe-west1.firebasedatabase.app/users.json')
        .subscribe({
          next: (response: any) => {
            for (let i in response) {
                if (response[i].email === email) {
                  if(response[i].password!==password) {
                    this.isAuth =false
                    reject("Wrong password!")
                  }
                  else {
                    this.isAuth = true
                    this.emitAuthSubject()
                  }
                }
            }
            if (!this.isAuth) {
              reject("Email not exist!")
            }
            resolve(email)
          },
          error: (error) => {
              console.log('Erreur de chargement ! ' + error);
              reject(error)
          }
        })
      }
    )
  }

  signOutUser() {
    this.isAuth = false
  }

  getToken() {
    console.log("testt");
    
  }
}
