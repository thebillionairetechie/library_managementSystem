class Book {
    #isbn;
    constructor(title, author, isbn, available = true) {
        this.title = title;
        this.author = author;
        this.#isbn = isbn;
        this.available = available;
    }

    // Using getter and setter
    get isbn() {
        return this.#isbn;
    }

    set isbn(value) {
        if (typeof value === "string") {
            this.#isbn = value;
        } else {
            console.error(`${value} must be a string.`);
        }
    }
// This is an added method I created that converts each book to a JSON format.
    toJson() {
        return {
            title: this.title,
            author: this.author,
            isbn: this.#isbn,
            available: this.available
        };
    }

    borrowBook() {
        if (this.available) {
            this.available = false;
            return `You have successfully borrowed ${this.title}.`;
        } else {
            return `This ${this.title} is not available for borrowing.`;
        }
    }

    returnBook() {
        if (!this.available) {
            this.available = true;
            return `You have successfully returned ${this.title}.`;
        } else {
            return `This ${this.title} was not borrowed.`;
        }
    }
}

const book1 = new Book("Goldie", "Amy Stuart", "4567", true);
const book2 = new Book("Loving Me", "Peace Amudipe", "2345", false);
const book3 = new Book("Becoming Deborah", "Oluwaferanmi", "1235", true);

class Library {
    constructor(books = []) {
        this.books = books;
    }

    addBook(book) {
        if (book instanceof Book) {
            this.books.push(book);
            return this.books;
        } else {
            console.error("Invalid book object.");
        }
    }
// I added an additional method to view each book in a JSON format
    viewBooks() {
        console.log(JSON.stringify(this.books.map(book => book.toJson()), null, 2));
    }

    removeBook(isbn) {
        const index = this.books.findIndex(book => book.isbn === isbn);
        if (index !== -1) {
            this.books.splice(index, 1);
            return `The book with ISBN ${isbn} has been successfully removed.`;
        } else {
            return "Invalid operation.";
        }
    }

    findBookByTitle(title) {
        const index = this.books.findIndex(book => book.title.toLowerCase() === title.toLowerCase());
        if (index !== -1) {
            const foundBook = this.books[index];
            return `Book found: ${foundBook.title}, by ${foundBook.author}.`;
        } else {
            return "Not found. Sorry. :(";
        }
    }
}

const library = new Library();
// Testing some of the borrow and return methods
console.log(book1.borrowBook());  // You have successfully borrowed Goldie.
console.log(book1.borrowBook());  // This Goldie is not available for borrowing.
console.log(book1.returnBook());  // You have successfully returned Goldie.

// Testing the add method
library.addBook(book1);
library.addBook(book2);
library.addBook(book3);

// Testing more methods
library.viewBooks();
console.log(library.removeBook("1235"));
console.log(library.findBookByTitle("Loving Me"));

class DigitalLibrary extends Library {
    constructor(books = [], downloadableBooks = []) {
        super(books);
        this.downloadableBooks = downloadableBooks;
    }

    downloadBook(bookIsbn) {
        const book = this.books.find(book => book.isbn === bookIsbn);
        if (book && this.downloadableBooks.includes(bookIsbn) && book.available) {
            return "Book can be downloaded.";
        } else {
            return "Not available for download.";
        }
    }
    // Additional feature
    searchByAuthor(authorName){
        const booksByAuthor = this.books.filter(book => book.author.toLowerCase() === authorName.toLowerCase())
        if(booksByAuthor.length > 0){
            return booksByAuthor.map(book => book.toJson())
        }else{
            return `Sorry, no books found by ${authorName}.`
        }
    }
    // This feature filters through the book[] array and returns all books by the named author, if none, it returns the error message.
}

// Testing the inheritance
const digitalLibrary = new DigitalLibrary([book1, book2, book3], ["4567", "2345", "1235"]);

// Testing downloadBook method
console.log(digitalLibrary.downloadBook("2345"));  // Book can be downloaded.
console.log(digitalLibrary.downloadBook("4567"));  // Not available for download since it was removed.
// Testing the additional feature 
console.log(digitalLibrary.searchByAuthor("Amy Stuart"));  // This would list books by Amy Stuart.
