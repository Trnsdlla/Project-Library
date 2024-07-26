const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.toggleReadStatus = function () {
        this.read = !this.read;
    }
};

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    appendBookToDisplay(newBook);
}

function appendBookToDisplay(book) {
    const bookDisplay = document.getElementById('book-display');

    const bookElement = document.createElement('div');
    bookElement.classList.add('book');

    const bookInfo = document.createElement('p');
    bookInfo.textContent = `"${book.title}" by ${book.author}, ${book.pages} pages, ${book.read ? 'Read' : 'Not read yet'}`;
    
    const toggleReadButton = document.createElement('button');
    toggleReadButton.textContent = 'Toggle Read Status';
    toggleReadButton.addEventListener('click', () => {
        book.toggleReadStatus();
        bookInfo.textContent = `"${book.title}" by ${book.author}, ${book.pages} pages, ${book.read ? 'Read' : 'Not read yet'}`;
    });

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(book), 1);
        bookElement.remove(); // Remove the book's element from the display
    });

    bookElement.appendChild(bookInfo);
    bookElement.appendChild(toggleReadButton);
    bookElement.appendChild(removeButton);

    bookDisplay.appendChild(bookElement);
}

document.getElementById('new-book-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    addBookToLibrary(title, author, pages, read);

    document.getElementById('new-book-form').reset();
});