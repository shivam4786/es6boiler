import '../css/style.css'
import axios from 'axios';
import { parse } from 'path';

// const arrow = () => 'Hey Man'
// // console.log(arrow());

//Defining URL
const url = 'https://jsonplaceholder.typicode.com/posts';

//Declaring Array to Store the Response from URL
let arr = [];

//CurrentPage 
let currPage = 0;

//Array Containing starting Index
const page = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];

//Grabbing The Main Container
let container = document.querySelector('.container');

//Search String
let str = "";

//Inserting Search Bar
let searchBar =
    `<div class="searchDiv">
        <div class="searchDiv-inside">
            <label class="inline">Search by ID</label>
            <input type="search" placeholder="Search By IDs" class="searchId" />
            <label class="inline">Search by Name</label>
            <input type="search" placeholder="Search By Name" class="searchName" />
        </div>
    </div>`;

container.insertAdjacentHTML('afterbegin', searchBar);

//Creating Overlay Div
let overLay = '<div class="overlay"></div>';
container.insertAdjacentHTML('beforeend', overLay);

//Selecting OverLay Div
let overLayDiv = document.querySelector('.overlay');

//Removing Overlay
const removeOverLay = () => {
    overLayDiv.style.display = 'none';
}
overLayDiv.addEventListener('dblclick', removeOverLay);


//Creating Div for OverLay Content
let matchPostWrapper = '<div class="matchPostWrapper"></div>';
overLayDiv.insertAdjacentHTML('beforeend', matchPostWrapper);

//Clearing Previous Posts 
const clrPara = () => {
    // console.log(document.querySelector('.matchPost'));
    let el = document.querySelector('.matchPost');
    el.remove();
}

//Display Relevant Results
const displayResultByStr = (str) => {
    let num = document.querySelector('.matchPostWrapper').childElementCount;
    console.log(num);
    while(num > 0){
        console.log('calling clrPara Funtion');
        clrPara();
        num--;
    }
    let matchArr = [];
    console.log(str);
    arr.filter((item) => {
        if(str == item.id || (item.title.match(str) && item.body.match(str))){
            matchArr.push(item);
            // console.log(item.body);
            // overLayDiv.style.display = 'block';
            // overLayDivPara.innerHTML = `${item.body}`;
        }       
        // console.log(matchArr);
    });
    let matchPost = '<div class="matchPost">';
    matchArr.forEach((matchItem) => {
        matchPost += '<div class="blogTitle">'
        matchPost += `<p id="para"><span class="para-span">Title :</span> ${matchItem.title}</p>`
        matchPost += `<p id="para"><span>Body :</span> ${matchItem.body}</p>`
        matchPost += '</div>'
    });
    const showDetail = () => {
       console.log('Elabrorated'); 
    }
    document.querySelector('.blogTitle').addEventListener("click", showDetail);
    matchPost += '</div>';
    document.querySelector('.matchPostWrapper').insertAdjacentHTML('beforeend', matchPost);
    overLayDiv.style.display = 'block';
}

//Empty String
const resetStr = () => {
    console.log('resetStr ');
    str = "";
}

//Searching Posts 
const searchPosts = (e) => {
    // console.log(e.key);
    if (e.key == "Backspace" || e.key == "Delete"){
        str = str.slice(0,-1);
    }
    else if(e.key == "Enter"){
        console.log('Pressed Enter');
    }
    else{
        str = str + e.key;
    }
    displayResultByStr(str);
}

//Targeting characters in SearchBar
let searchBarId = document.querySelector('.searchId');
searchBarId.addEventListener("keydown", searchPosts);
searchBarId.addEventListener("change", resetStr);

let searchBarName = document.querySelector('.searchName');
searchBarName.addEventListener("keydown", searchPosts);
searchBarName.addEventListener("change", resetStr);





//Inserting Footer in Main Container
let footer = '<div class="footer"><div class="footer-inside"></div></div>';
container.insertAdjacentHTML('beforeend', footer);

//Clearing HTML in Post Container
const clrHtml = () => {
    document.querySelector('.post-container').remove();
}

//Defining getTarget Function
const getTarget = (e) => {
    // console.log(e);
    if (e.target.classList[1] == 'prev') {
        console.log('clicked Previous Button');
        if (currPage >= 1) {
            clrHtml();
            currPage = currPage - 1;
            display(page[currPage]);

        }
    }
    else if (e.target.classList[1] == 'first') {
        console.log('clicked First Button');
        clrHtml();
        currPage = 1;
        console.log(currPage);
        display(page[0]);
    }
    else if (e.target.classList[1] == 'last') {
        console.log('clicked Last Button');
        clrHtml();
        currPage = page.length - 1;
        console.log(currPage);
        display(page[page.length - 1]);
    }
    else if (e.target.classList[1] == 'next') {
        console.log('clicked Next Button');
        if (currPage < page.length - 1) {
            clrHtml();
            currPage = currPage + 1;
            display(page[currPage]);
            console.log(currPage);
        }
    }
    else if (e.target.classList[0] == 'btn') {
        console.log(e.target.classList[1]);
        currPage = parseInt(e.target.dataset.start) / 10;
        console.log('Value of Curr Page', currPage);
        clrHtml();
        display(e.target.dataset.start);
    }
}

//Defining Click Function on Footer
document.querySelector('.footer').addEventListener('click', getTarget);

//Creating Buttons
const createButton = () => {
    let btn = `<button class="btn first" data-start='${page[0]}' >First</button>`;
    btn += `<button class="btn prev" data-start="" >Previous</button>`;
    for (let i = 0; i < 10; i++) {
        btn += `<button class='btn btn_${i}' data-start='${page[i]}' >Page : ${i}</button>`;
    }
    btn += `<button class="btn next" data-start="" >Next</button>`;
    btn += `<button class="btn last"data-start='${page[9]}'>Last</button>`;
    document.querySelector('.footer-inside').insertAdjacentHTML('beforeend', btn);
}

//Displaying Fetched Data
const display = (num) => {
    console.log('value of Curr Page ', currPage);
    console.log('num in display func ', num);
    let start = num;
    console.log('start ', start);
    let end = parseInt(start) + 10;
    console.log('end ', end);
    const newArr = arr.slice(start, end);
    console.log(newArr);
    let domEl = `<div class="post-container">`;

    newArr.forEach((blog) => {
        domEl += `<div class='blogId'><span>Id : ${blog.id}</span></div>`
        domEl += `<div class='blogTitle'><span>Title : </span> ${blog.title}</div>`
        domEl += `<div class='blogBody'><span>Body : </span> ${blog.body}</div>`
    });

    domEl += `</div>`;

    document.querySelector('.footer').insertAdjacentHTML('beforebegin', domEl);
}

//Storing Fetched Data
const destructuring = (res) => {
    arr = res;
    display(page[0]);
    createButton();
}

//Calling URL and Fetching Data
const getPosts = () => {
    axios.get(url)
        .then((data) => { destructuring(data.data) })
        .catch((err) => { console.log(err) });
}

//Calling URL and Displaying Posts
getPosts();
