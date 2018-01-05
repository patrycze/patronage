import { moviesData } from './data.js';

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

const ul = document.getElementById('moviesList');
const moviesCounterAll = document.getElementById('moviesCounterAll');
const moviesCounterSeen = document.getElementById('moviesCounterSeen');

function moviesCounterSeenOnUI() {
    moviesCounterSeen.textContent = moviesCounterSeen_value;
}

function changeSeenStatusInData(movie, status) {
    movie.seen = status;
}

function changeSeenStatus(btn, movie) {
    if (btn.style.color == '')
        {
            btn.style.color = '#f47121';
            changeMoviesCounterSeen(1)
            moviesCounterSeenOnUI()
            changeSeenStatusInData(movie, "T");
            
        }
    else   
        {
            btn.style.color = '';
            changeMoviesCounterSeen(-1)
            moviesCounterSeenOnUI()
            changeSeenStatusInData(movie, "N");
        }
}

let moviesCounterSeen_value = 0;

function changeMoviesCounterSeen(value) {
    moviesCounterSeen_value += value;
}

setTimeout(function(){
    moviesData.map((movie, index) => {
        
            let li = createNode('li');
            let span = createNode('span');
            let btn = createNode('i');

            btn.className = `btn`;
            
            btn.id = `btn-${index}`;
            span.id = `span-${index}`
            
            span.onmouseover = function() { span.style.textShadow="1px 1px 5px grey"  }
            span.onmouseout = function() { span.style.textShadow=""  }            
            btn.onclick = function() { changeSeenStatus(btn, movie) };
            
            span.innerHTML = `${movie.title}, ${movie.year}, ${movie.genre}, ${movie.summary}`;
            btn.innerHTML = ` &#10003 <br></br>`;
            
            append(span, btn);
            append(li, span);
            append(ul, li);
            
            moviesCounterAll.textContent = moviesData.length;
            
            if(movie.seen === "T") {
                changeSeenStatus(btn, movie); 
            }
        }); 
     }, 400);

