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

function changeSeenStatusInData() {

}

function changeSeenStatus(btn, movie) {
    if (btn.style.color == '')
        {
            btn.style.color = '#f47121';
            changeMoviesCounterSeen(1)
            moviesCounterSeenOnUI()
            movie.seen = "T"
            console.log(moviesData)
        }
    else   
        {
            btn.style.color = '';
            changeMoviesCounterSeen(-1)
            moviesCounterSeenOnUI()
            movie.seen = "N" 
            console.log(moviesData)
            

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

            btn.id = `btn-${index}`;
            btn.className = `btn`;
            btn.onclick = function() { changeSeenStatus(btn, movie) };
            
            console.log(movie);
            
            span.innerHTML = `${movie.title}`;
            btn.innerHTML = ` &#10003`;
            
            append(span, btn);
            append(li, span);
            append(ul, li);
            
            moviesCounterAll.textContent = moviesData.length;
            
            if(movie.seen === "T") {
                changeSeenStatus(btn, movie); 
            }
        });
        
     }, 1000);

