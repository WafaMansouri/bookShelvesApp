import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from '../models/book.model';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books!: Book[]
  booksSubscription!: Subscription

  constructor(private booksService: BooksService,
              private router: Router) { }

  ngOnInit() {
    this.booksSubscription = this.booksService.booksSubject.subscribe(
      (books: Book[]) => {
        this.books = books
      }
    )
    this.booksService.getAllBooks()
  }

  onViewBook(id: number) {
    this.router.navigate([`books/view/${id}`])
  }
  onDeleteBook(book: any) {
    this.booksService.deleteBook(book.id).then(
      () => {
        this.router.navigate(['/books'])
      }
    )
  }

  onNewBook() {
    this.router.navigate(['/books', 'new'])
  }
}
