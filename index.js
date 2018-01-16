import { MoviesStorage } from './movies-storage.js';
import { setCounterTo } from './movies-counter.js';



const movies = new MoviesStorage();


function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    parent.appendChild(el);
}

const ul = document.getElementById('moviesList');


function moviesCounterSeenOnUI() {
    setCounterTo('#moviesCounterSeen', moviesCounterSeen_value)
}

function changeSeenStatusInData(movie, status) {
    movie.seen = status;
}

function changeIconState(icon) {
    icon.style.color ?  icon.style.color = '' : icon.style.color = '#f47121'; 
}

function changeSeenStatus(icon, movie) {
    if(movie.seen === "F") {
        changeIconState(icon)
        changeMoviesCounterSeen(1)
        moviesCounterSeenOnUI()
        changeSeenStatusInData(movie, "T"); 
    } 
    else {
        changeIconState(icon)
        changeMoviesCounterSeen(-1)
        moviesCounterSeenOnUI()
        changeSeenStatusInData(movie, "F");
    }
}

let moviesCounterSeen_value = 0;

function changeMoviesCounterSeen(value) {
    moviesCounterSeen_value += value;
}

setTimeout(function(){
    movies.get1().map((movie, index) => {
        
        let li = createNode('li');
        let span = createNode('span');
        let icon = createNode('i');

        icon.className = `icon`;
        
        icon.id = `icon-${index}`;
        span.id = `span-${index}`;

        
        span.className = `span`;          
        icon.onclick = function() { changeSeenStatus(icon, movie) };
        
        span.innerHTML = `${movie.title}, ${movie.year}, ${movie.genre}, ${movie.summary}`;
        icon.innerHTML = ` &#10003 <br></br>`;
        
        append(span, icon);
        append(li, span);
        append(ul, li);
        
        setCounterTo('#moviesCounterAll', movies.get1().length)
        
        if(movie.seen == "T") {
            changeMoviesCounterSeen(1)
            moviesCounterSeenOnUI()
            changeIconState(icon)
        }
    }); 
}, 500);

