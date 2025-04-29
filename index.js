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
        createDOMElement('.book-container', 'p', 'book-title', 'written by ' + book.author);
        createDOMElement('.book-container', 'p', 'book-title', book.pages + ' pages');
    }
    )

    createDOMElement('.library-container', 'button', 'add-book', 'Add Book')
    document.querySelector('.add-book').addEventListener("click", (event) => addBookToLibraryFromForm(event),
    )
}

function addBookToLibraryFromForm(event) {
    event.preventDefault()
    document.querySelector('.add-book').remove()
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

    createDOMElement('.add-book-form', 'label', 'add-book-read-label', 'Yes')
    document.querySelector('.add-book-read-label').htmlFor = 'book_read';
    createDOMElement('.add-book-form', 'input', 'add-book-read-input', false)
    document.querySelector('.add-book-read-input').id = 'book_read'
    document.querySelector('.add-book-read-input').type = 'radio'
    document.querySelector('.add-book-read-input').name = 'book_read_selection'
    document.querySelector('.add-book-read-input').value = 'read'

    createDOMElement('.add-book-form', 'label', 'add-book-not-read-label', 'No')
    document.querySelector('.add-book-not-read-label').htmlFor = 'book_not_read';
    createDOMElement('.add-book-form', 'input', 'add-book-not-read-input', false)
    document.querySelector('.add-book-not-read-input').id = 'book_not_read'
    document.querySelector('.add-book-not-read-input').type = 'radio'
    document.querySelector('.add-book-not-read-input').name = 'book_read_selection'
    document.querySelector('.add-book-not-read-input').value = 'not-read'


}

addBookToLibrary('It', 'Stephen King', 300, true)
addBookToLibrary('The Shining', 'Stephen King', 350, true)
addBookToLibrary('Watchmen', 'Alan Moore', 150, true)
createLibrary()





