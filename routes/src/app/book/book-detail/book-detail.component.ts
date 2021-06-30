import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  book$: Observable<Book> = null;
  index: number;
  authors: string[];

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router) { }

  ngOnInit() {
    console.log('Index: ', this.route.snapshot.paramMap.get('index'));
    this.book$ = this.route.paramMap
      .pipe( 
        tap((params: ParamMap) => this.index = +params.get('index')),
        switchMap((params: ParamMap) => this.bookService.get( +params.get('index') )),
        tap((b) => this.authors = (b) ? b.authors: [] ));

      //.subscribe((params: ParamMap) => console.log("Index: ", params.get('index')))
  }

  remove() {
    this.bookService.remove(this.index);
    this.router.navigateByUrl("books");
  }

  goAuthors() {
    let url = '/books/' + this.index + '/authors';
    this.router.navigate([url, {authors: this.authors}])
  }

}
