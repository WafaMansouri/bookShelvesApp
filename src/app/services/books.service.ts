import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})

export class BooksService {

  books: Book[] = []
  booksSubject = new Subject<Book[]>()

  constructor(private httpClient: HttpClient) { }

  emitBooks() {
    this.booksSubject.next(this.books)
  }

  createNewBook(newBook: any) {
    return new Promise(
      (resolve, reject) => {
        this.httpClient.post("https://bookshelves-90b54-default-rtdb.europe-west1.firebasedatabase.app/books.json", newBook)
                        .subscribe({
                          next: ()=> {
                            // this.emitBooks()
                            resolve(true)
                          },
                          error: (error) => {
                            reject(error)
                          }
                        })
      }
    )
  }

  getAllBooks() {
    this.books=[]
    return new Promise(
      (resolve, reject) => {
        this.httpClient.get("https://bookshelves-90b54-default-rtdb.europe-west1.firebasedatabase.app/books.json")
                        .subscribe({
                          next: (response: any) => {
                            for (let i in response) {
                             this.books.push({
                               id: i,
                               title: response[i].title,
                               author: response[i].author
                             })
                            }
                            this.emitBooks()
                            resolve(this.books)
                          },
                          error: (error) => {
                              console.log('Erreur de chargement ! ' + error);
                          }
                        })
      }
    )
  }

  getSingleBook(id: number) {
    return new Promise<Book>(
      (resolve, reject) => {
        resolve(this.books[id])
      }
    )
  }

  deleteBook(id: string) {
    return new Promise(
      (resolve, reject) => {
        this.httpClient.delete(`https://bookshelves-90b54-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json`)
                        .subscribe({
                          next: (res)=> {
                            // this.emitBooks()
                            resolve(true)
                          },
                          error: (error) => {
                            reject(error)
                          }
                        })
      }
    )
  }
}
