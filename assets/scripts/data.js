const STORAGE_KEY = "BOOKSHELF_APPS";

let books = [];

function isStorageExist() {
    if (typeof (Storage) === undefined) {
        alert("Mohon maaf! Browser Anda tidak mendukung local storage");
        return false;
    }
    return true;
}

function saveData() {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);

    let data = JSON.parse(serializedData);

    if (data !== null)
        books = data;

    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
    if (isStorageExist())
        saveData();
}

function composeBookObject(title, author, year, isComplete) {
    return {
        id: +new Date(),
        title,
        author,
        year,
        isComplete
    };
}

function findBook(bookId) {
    for (book of books) {
        if (book.id === bookId)
            return book;
    }
    return null;
}

function findBookIndex(bookId) {
    let index = 0
    for (book of books) {
        if (book.id === bookId)
            return index;

        index++;
    }

    return -1;
}

function refreshDataFromBooks() {
    const incompleteBookshelfList = document.getElementById(UNCOMPLETED_READ_BOOK_ID);
    const completeBookshelfList = document.getElementById(COMPLETED_READ_BOOK_ID);

    for (book of books) {
        const newBook = makeBook(book.title, `Penulis: ${book.author}`, `Tahun: ${book.year}`, book.isComplete);
        newBook[BOOK_ITEMID] = book.id;

        if (book.isComplete) {
            completeBookshelfList.append(newBook);
        } else {
            incompleteBookshelfList.append(newBook);
        }
    }
}