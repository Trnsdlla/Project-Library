const myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleReadStatus() {
        this.read = !this.read;
    }
}

   function addBookToLibrary(title, author, pages, read) {
        const newBook = new Book(title, author, pages, read);
        myLibrary.push(newBook);
        appendBookToDisplay(newBook);
    }

    function removeBookFromLibrary(book) {
        const index = this.myLibrary.indexOf(book);
        if (index > -1) {
            myLibrary.splice(index, 1);
        
            const bookDisplay = document.getElementById('book-display');
            const bookElement = bookDisplay.querySelector(`[data-id="${index}"]`);
            if (bookElement) {
                bookElement.remove();
            }
            updateDataIds();
        }
    }

    function createBookElement(book) {
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');
        bookElement.setAttribute('data-id', myLibrary.indexOf(book)); // add data-id

        const bookInfo = document.createElement('p');
        bookInfo.textContent = `"${book.title}" by ${book.author}, ${book.pages} pages, ${book.read ? 'Read' : 'Not read yet'}`;

        const toggleReadButton = document.createElement('button');
        toggleReadButton.textContent = 'Toggle Read Status';
        toggleReadButton.addEventListener('click', () => {
            book.toggleReadStatus();
            updateBookDisplay(bookElement, book);
        });

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            removeBookFromLibrary(book);
        });

        bookElement.appendChild(bookInfo);
        bookElement.appendChild(toggleReadButton);
        bookElement.appendChild(removeButton);

        return bookElement
    }

    function appendBookToDisplay(book) {
        const bookDisplay = document.getElementById('book-display');
        const bookElement = createBookElement(book);
        bookDisplay.appendChild(bookElement);
    }

    function updateDataIds() {
        const bookDisplay = document.getElementById('book-display');
        const bookElements = bookDisplay.querySelectorAll('.book');
        bookElements.forEach((element, index) => {
            element.setAttribute('data-id', index);
        });
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