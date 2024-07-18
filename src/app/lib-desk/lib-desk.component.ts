import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzButtonComponent, NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { IntellibraryComponent } from '../intellibrary/intellibrary.component';
import { FormsModule } from '@angular/forms';
import { BookService } from '../services/book.service';
interface Book {
  id: number;
  title: string;
  description: string;
}
@Component({
  selector: 'app-lib-desk',
  standalone: true,
  imports: [FormsModule,IntellibraryComponent,CommonModule,RouterModule,NzLayoutModule,NzButtonModule,NzButtonComponent],
  templateUrl: './lib-desk.component.html',
  styleUrl: './lib-desk.component.css'
})
export class LibDeskComponent {
  constructor(private bookService: BookService) {}
  apiUrl = 'http://localhost:5000/api';
  @Output() closeDeskEvent = new EventEmitter<void>();
  recentBooks = [
    { 
      title: 'Cuốn sách A', 
      description: 'Mô tả về cuốn sách A.' 
    },
    { 
      title: 'Cuốn sách B', 
      description: 'Mô tả về cuốn sách B.' 
    },
    { 
      title: 'Cuốn sách C', 
      description: 'Mô tả về cuốn sách C.' 
    },
    { 
      title: 'Cuốn sách A', 
      description: 'Mô tả về cuốn sách A.' 
    },
    { 
      title: 'Cuốn sách B', 
      description: 'Mô tả về cuốn sách B.' 
    },
    { 
      title: 'Cuốn sách C', 
      description: 'Mô tả về cuốn sách C.' 
    }
    // Thêm các cuốn sách khác tại đây
  ];
  templates = [
    { 
      title: 'Mẫu 1', 
      description: 'Đây là mô tả cho mẫu 1.' 
    },
    { 
      title: 'Mẫu 2', 
      description: 'Đây là mô tả cho mẫu 2.' 
    },
    { 
      title: 'Mẫu 3', 
      description: 'Đây là mô tả cho mẫu 3.' 
    }
    // Thêm các mẫu khác tại đây nếu cần
  ];
  currentTemplateIndex = 0; // Track the index of the currently displayed template
  currentBookIndex = 0; // Track the index of the currently displayed book
  isAddingBook: boolean = false;
  isAddingShelf: boolean = false;
  newBookTitle: string = '';
  newBookDescription: string = '';
  newShelfName: string = '';
  selectedBooks: number[] = []; // Array to hold selected book IDs
  books: Book[] = [
    { id: 1, title: 'Book 1', description: 'Description of Book 1' },
    { id: 2, title: 'Book 2', description: 'Description of Book 2' },
    { id: 3, title: 'Book 3', description: 'Description of Book 3' }
    // Add more books as needed
  ];
  
  openAddBook() {
    this.isAddingBook = true;
    this.isAddingShelf = false;
  }

  closeAddBook() {
    this.isAddingBook = false;
  }

  addBook() {
    // Thêm logic để xử lý thêm sách vào dữ liệu
    const newBook: Book = {
      id: 0, // Tạm thời để 0, backend sẽ gán id
      title: this.newBookTitle,
      description: this.newBookDescription
    };
  
    this.bookService.addBook(newBook).subscribe((book: Book) => {
      console.log('Added new book:', book);
      this.closeAddBook();
      this.books.push(book); // Thêm sách vào danh sách hiển thị
    });
    // Sau khi thêm xong, đóng modal thêm sách
    this.closeAddBook();
  }

  openAddShelf() {
    this.isAddingShelf = true;
    this.isAddingBook=false;
  }

  closeAddShelf() {
    this.isAddingShelf = false;
    this.resetShelfForm();
   
  }

  addShelf() {
    // Add logic to save new shelf
    console.log('Adding new shelf:', this.newShelfName, this.selectedBooks);
    this.closeAddShelf();
   
  }

  resetShelfForm() {
    this.newShelfName = '';
    this.selectedBooks = [];
  }

  search() {
    // Logic để tìm kiếm
  }

  delete() {
    // Logic để xóa
  }
  addingBook: boolean = false;
  newBook = {
    title: '',
    description: ''
  };


  prevTemplate() {
    if (this.currentTemplateIndex === 0) {
      this.currentTemplateIndex = this.templates.length - 1;
    } else {
      this.currentTemplateIndex--;
    }
  }

  nextTemplate() {
    if (this.currentTemplateIndex === this.templates.length - 1) {
      this.currentTemplateIndex = 0;
    } else {
      this.currentTemplateIndex++;
    }
  }

  prevBook() {
    if (this.currentBookIndex === 0) {
      this.currentBookIndex = this.recentBooks.length - 1;
    } else {
      this.currentBookIndex--;
    }
  }

  nextBook() {
    if (this.currentBookIndex === this.recentBooks.length - 1) {
      this.currentBookIndex = 0;
    } else {
      this.currentBookIndex++;
    }
  }
  closeDesk() {
    this.closeDeskEvent.emit();

  }
  }
