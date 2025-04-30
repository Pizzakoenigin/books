'use strict'

const myLibrary = []

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID()
}

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read'}`
}

Book.prototype.changeReadStatus = function () {
    this.read = !this.read
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read))
}

function createDOMElement(parentElement, elementType, elementClass, innerText) {
    let elementName = document.createElement(elementType);
    elementName.classList.add(elementClass);
    if (innerText) {
        elementName.textContent = `${innerText}`
    }
    document.querySelector(parentElement).appendChild(elementName)

}

function addText(element, innerText) {
    document.querySelector(`${element}`).textContent = `${innerText}`
}

function createLibrary() {
    createDOMElement('body', 'div', 'library-container', false);
    createDOMElement('.library-container', 'div', 'display-library', false)
    myLibrary.forEach(book => {
        createDOMElement('.display-library', 'div', 'book-container', false);
        createDOMElement('.book-container', 'h2', 'book-title', book.title);
        createDOMElement('.book-container', 'p', 'book-author', 'written by ' + book.author);
        createDOMElement('.book-container', 'p', 'book-pages', book.pages + ' pages');
        createDOMElement('.book-container', 'p', 'book-status', `${book.read ? 'read' : 'not read'}`)
        createDOMElement('.book-container', 'button', `remove-book-button-${book.id}`, 'Remove book');
        document.querySelector(`.remove-book-button-${book.id}`).addEventListener("click", () => removeBook(book.id))
    }
    )

    createDOMElement('.library-container', 'button', 'create-add-book-form', 'Add Book')
    document.querySelector('.create-add-book-form').addEventListener("click", createNewBookForm(),
    )
}

function removeBook(id) {
    let findID = myLibrary.findIndex((book) => book.id == id)
    myLibrary.splice(findID, 1)
    document.querySelector('.library-container').innerHTML = ''
    createLibrary()
}

function createNewBookForm() {
    document.querySelector('.create-add-book-form').remove()
    createDOMElement('.library-container', 'form', 'add-book-form', '')

    createDOMElement('.add-book-form', 'label', 'add-book-title-label', 'Title')
    document.querySelector('.add-book-title-label').htmlFor = 'book_title';
    createDOMElement('.add-book-form', 'input', 'add-book-title-input', false)
    document.querySelector('.add-book-title-input').id = 'book_title'

    createDOMElement('.add-book-form', 'label', 'add-book-author-label', 'Author')
    document.querySelector('.add-book-author-label').htmlFor = 'book_author';
    createDOMElement('.add-book-form', 'input', 'add-book-author-input', false)
    document.querySelector('.add-book-author-input').id = 'book_author'

    createDOMElement('.add-book-form', 'label', 'add-book-pages-label', 'Pages')
    document.querySelector('.add-book-pages-label').htmlFor = 'book_pages';
    createDOMElement('.add-book-form', 'input', 'add-book-pages-input', false)
    document.querySelector('.add-book-pages-input').id = 'book_pages'
    document.querySelector('.add-book-pages-input').type = 'number'

    createDOMElement('.add-book-form', 'h3', 'add-book-read-heading', 'Have you read the book?')

    createDOMElement('.add-book-form', 'label', 'add-book-read-label', 'Read')
    document.querySelector('.add-book-read-label').htmlFor = 'book_read';
    createDOMElement('.add-book-form', 'input', 'add-book-read-input', false)
    document.querySelector('.add-book-read-input').id = 'book_read'
    document.querySelector('.add-book-read-input').type = 'radio'
    document.querySelector('.add-book-read-input').name = 'book_read_selection'
    // document.querySelector('.add-book-read-input').value = true

    // createDOMElement('.add-book-form', 'label', 'add-book-not-read-label', 'No')
    // document.querySelector('.add-book-not-read-label').htmlFor = 'book_not_read';
    // createDOMElement('.add-book-form', 'input', 'add-book-not-read-input', false)
    // document.querySelector('.add-book-not-read-input').id = 'book_not_read'
    // document.querySelector('.add-book-not-read-input').type = 'radio'
    // document.querySelector('.add-book-not-read-input').name = 'book_read_selection'
    // document.querySelector('.add-book-not-read-input').value = false

    createDOMElement('.add-book-form', 'button', 'add-book-button', 'Add book')
    document.querySelector('.add-book-button').addEventListener("click", (event) => addBookToLibraryFromForm(event),)
}

function addBookToLibraryFromForm(event) {
    event.preventDefault()
    addBookToLibrary(document.querySelector('.add-book-title-input').value, document.querySelector('.add-book-author-input').value, document.querySelector('.add-book-pages-input').value, document.querySelector('.add-book-read-input').checked)
    document.querySelector('.library-container').innerHTML = ''
    createLibrary()
}

addBookToLibrary('It', 'Stephen King', 300, true)
addBookToLibrary('The Shining', 'Stephen King', 350, true)
addBookToLibrary('Watchmen', 'Alan Moore', 150, true)
addBookToLibrary('Firetrucks', 'Fred F. Firetruck', 432, false)
createLibrary()





