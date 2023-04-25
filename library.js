const addBook = document.querySelector('img[src="icons/add-svgrepo-com.svg"]');
const closeModalBtn = document.querySelector("#close-modal-btn");
const modal = document.querySelector(".modal");
const cards = document.querySelector(".cards");

// Display modal when "add" buttton is clicked
addBook.addEventListener("click", () => {
  modal.style.display = "block";
});

// close the modal when the close button is clicked
closeModalBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

let myLibrary = [];

// function Book(title, author, pages, read) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.read = read;
// }

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function validateForm() {
  let form = document.getElementById("add-book");
  let formInputs = form.getElementsByTagName("input");
  for (let i = 0; i < formInputs.length; i++) {
    if (formInputs[i].hasAttribute("required") && formInputs[i].value == "") {
      return false;
    }
  }
  return true;
}

function addBookToLibrary() {
  // Get the inputs
  let titleInput = document.getElementById("title");
  let authorInput = document.getElementById("author");
  let pagesInput = document.getElementById("pages");
  let readInput = document.getElementById("read");

  let title = titleInput.value;
  let author = authorInput.value;
  let pages = pagesInput.value;
  let read = readInput.checked;

  // If the form is valid
  if (validateForm()) {
    // Make a new instance of book
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
    // Close the modal dialog box
    modal.style.display = "none";
    // Clear the inputs
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    readInput.checked = false;

    updateDisplay();
  }
}

function displayCard(bookNum) {
  const card = document.createElement("div");
  card.className = "card";

  const content = document.createElement("div");
  content.className = "content";

  card.appendChild(content);

  // Print the book title , author, pages
  const title = document.createElement("h3");
  title.textContent = myLibrary[bookNum].title;
  content.appendChild(title);

  const author = document.createElement("h4");
  author.textContent = `By ${myLibrary[bookNum].author}`;
  content.appendChild(author);

  const pages = document.createElement("h5");
  pages.textContent = `Pages ${myLibrary[bookNum].pages}`;
  content.appendChild(pages);

  card.appendChild(content);

  const action = document.createElement("div");
  action.className = "action";

  // create read and delete buttons
  const readButton = document.createElement("button");
  // Read - show not read status
  if (myLibrary[bookNum].read === true) {
    readButton.textContent = "Not Read";
    card.style.boxShadow = "5px 5px 10px 1px green";
    readButton.addEventListener("click", () => {
      if (readButton.textContent === "Not Read") {
        myLibrary[bookNum].read = false;
        readButton.textContent = "Read";
        card.style.boxShadow = "5px 5px 10px 1px yellow";
      } else {
        myLibrary[bookNum].read = true;
        readButton.textContent = "Not Read";
        card.style.boxShadow = "5px 5px 10px 1px green";
      }
    });
  }
  // Not read - show read status
  else {
    readButton.textContent = "Read";
    card.style.boxShadow = "5px 5px 10px 1px yellow";
    readButton.addEventListener("click", () => {
      if (readButton.textContent === "Read") {
        myLibrary[bookNum].read = true;
        readButton.textContent = "Not Read";
        card.style.boxShadow = "5px 5px 10px 1px green";
      } else {
        myLibrary[bookNum].read = false;
        readButton.textContent = "Read";
        card.style.boxShadow = "5px 5px 10px 1px yellow";
      }
    });
  }
  readButton.addEventListener;
  readButton.id = bookNum;
  action.appendChild(readButton);

  // Delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    myLibrary.splice(bookNum, 1);
    updateDisplay();
  });
  action.appendChild(deleteButton);

  card.appendChild(action);

  cards.appendChild(card);
}

function updateDisplay() {
  const cardElements = document.querySelectorAll(".card");
  // Clear all books on display
  for (let i = 0; i < cardElements.length; i++) {
    cards.removeChild(cardElements[i]);
  }

  // Display books in mylibrary
  for (let i = 0; i < myLibrary.length; i++) {
    displayCard(i);
  }
}

// Initialise a book as an example in the begining
let book = new Book("Atomic Habits", "James Clear", 288, false);
myLibrary.push(book);
updateDisplay();
