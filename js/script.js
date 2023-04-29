let bookformbtn =document.querySelector(".book-add")
let bookform=document.querySelector(".book-form")
let closeform=document.querySelector(".book-form .close")

let bookBox=`
<div class="box glass">
    <h2>Add Book</h2>
    <div class="book-input">
        <label for="title">Title</label>
        <input type="text" id="title" value="">
    </div>
    <div class="book-input">
        <label for="auther">Auther</label>
        <input type="text" id="auther" value="">
    </div>
    <div class="book-input">
        <label for="pn">Page Number</label>
        <input type="number" id="pn" value="1">
    </div>
    <span class="close" onclick="closebookform()">&#215;</span>
    <button id="book-add" onclick="addbooks()">Add</button>
</div>
`
function showbookform(){
    bookform.innerHTML=bookBox;
    bookform.style.transform="scale(1)"
}
function closebookform(){
    bookform.style.transform="scale(0)"
    title.value=""
    auther.value=""
    pagenumber.value=1
}

let bookContainer=document.querySelector(".book-container")
let books=localStorage.getItem("books")?JSON.parse(localStorage.getItem("books")):[];
function editbook(id){
    let editbookBox=`
    <div class="box glass">
        <h2>Edit Book</h2>
        <div class="book-input">
            <label for="title">Title</label>
            <input type="text" id="title" value="${books[id].title}">
        </div>
        <div class="book-input">
            <label for="auther">Auther</label>
            <input type="text" id="auther" value="${books[id].auther}">
        </div>
        <div class="book-input">
            <label for="pn">Page Number</label>
            <input type="number" id="pn" value="${books[id].page}">
        </div>
        <span class="close" onclick="closebookform()">&#215;</span>
        <button id="book-add" onclick="edititem(${id})">Edit</button>
    </div>
    `
    bookform.innerHTML=editbookBox;
    bookform.style.transform="scale(1)"
}
function edititem(id){
    let title =document.querySelector("#title");
    let auther =document.querySelector("#auther");
    let pagenumber =document.querySelector("#pn");
    books[id].title=title.value;
    books[id].auther=auther.value;
    books[id].page=pagenumber.value;
    localStorage.setItem("books",JSON.stringify(books));
    showbookitems();
    closebookform()
}
function showbookitems(){
   let items= books.map((e,index)=>{
        return(
            `
            <div class="book-item" key=${e.id}>
            <h3>Title : <b>${e.title}</b></h3>
            <h3>Auther : <b>${e.auther}</b></h3>
            <p>Pagse : <b>${e.page}</b></p>
            <button class="read-toggle ${e.readstatus}" onclick="changestatue(${index})">
            ${e.status}
            </button>
            <button class="remove" onclick="editbook(${index})">&#9998;</button>
            <button class="remove" onclick="removebook(${e.id})">Remove</button>
            </div>
            `
        )
    }).join("")
    bookContainer.innerHTML=items
}
showbookitems()
function changestatue(id){
    switch (books[id].readstatus) {
        case "notreading":
            books[id].readstatus="reading"
            books[id].status="Reading"
            break;
        case "reading":
            books[id].readstatus="notreading"
            books[id].status="Not Reading"
            break;
        default:
            break;
    }
   showbookitems()
}

function removebook(id) {
    let nfilter=books.filter( (e)=> e.id !== id )
    books=nfilter;
    localStorage.setItem("books",JSON.stringify(books));
    console.log(books)
    showbookitems()
}

// add system

function addbooks(){
    let title =document.querySelector("#title");
    let auther =document.querySelector("#auther");
    let pagenumber =document.querySelector("#pn");
    let cuid=books.length+1
    let book={
    id:cuid,
    title:title.value,
    auther:auther.value,
    page:pagenumber.value,
    readstatus:"notreading",
    status:"Not Reading"
    }
    books.push(book)
    localStorage.setItem("books",JSON.stringify(books));
    showbookitems()
    closebookform()
    title.value=""
    auther.value=""
    pagenumber.value=1
}