import { MoviesStorage } from './movies-storage.js';
import { setCounterTo } from './movies-counter.js';

export class UIController {
    
    static append(place, text) {
       
        //console.log(place, text);
        UIController.updateClassName(place);

        let table = document.getElementById('table1');
        let row = table.insertRow(place);
        row.id = 'error';
        row.className = parseInt(place) + 1;
        var cell1 = row.insertCell(0);
        var cell1 = row.insertCell(1).innerHTML = text;
    }

    static updateClassName(becouseof) {
 
        const table = document.getElementById('table1');

        const rows = table.rows.length;

        for(let i = rows; i>becouseof; i--) {
            let el = document.getElementsByClassName(i);
            el.id = '';
            let temp = el[0].className;
            el[0].className = parseInt(temp) + 1;
        //    console.log(temp);
        }
        
    }
}


export class Validator extends UIController {

   

constructor(form, config) {
  
    super();
    this.valitationErrors = new Array();
    this.prevent = 0;
    this.elForm = form;
    this.els = config.fields || {}
    this.init();
    this.movies = new MoviesStorage();    
}



init() {
    this.addFormListener();
}

addFormListener() {
    let formSelector = this.elForm 
    let elForm = document.querySelector(formSelector);
    elForm.addEventListener('submit', this.validate.bind(this), false);
}

validate(e) {

    if(!this.prevent) {
        e.preventDefault();
    }

    this.prevent = 1;
    console.log(this.prevent);
    const elFields = this.els;
    for(let field in elFields) {
        
        let el = document.querySelector(field);
        let elVal = el.value;
        //console.log(this.els);
        if(elFields[field].required) {
            console.log(elVal.length);
            if(elVal.length === 0) {
                UIController.append(el.className,`${el.name} is required`);  
                this.valitationErrors.push(1);
            } 
        }
        if(elVal.length > elFields[field].maxlength) {
            UIController.append(el.className,`${el.name} is too long`);
            this.valitationErrors.push(1);                
        }
        if(elFields[field].length) {
            if(elVal.length !== elFields[field].length) {
                this.valitationErrors.push(1);    
                UIController.append(el.className,`${el.name} must have ${elFields[field].length} `);  
            }       
        }
        if(elFields[field].type) {
            if(elVal != 'undefined') {
                console.log(Number.isInteger(elVal)) 
                if(!parseInt(elVal)) {
                    this.valitationErrors.push(1);
                    UIController.append(el.className,`${el.name} must be ${elFields[field].type}`);      
                }
            }           
        }
    }

    if(this.valitationErrors.length == 0) {
       // this.movies['movies'].includes(document.getElementById('title_input').value)
       console.log(this.checkTitleInArray());
       if(!this.checkTitleInArray()) {
           let seen = document.getElementById('checkBox').checked ? "T" : "F";
            this.movies.set1({
                id: this.movies['movies'][this.movies['movies'].length-1].id + 1,
                title: document.getElementById('title_input').value,
                year: document.getElementById('year_input').value,
                genre: document.getElementById('genre_input').value,
                summary: document.getElementById('summary_input').value,
                seen: seen
            });
            setCounterTo('#anotherMoviesCounterAll', this.movies['movies'].length);
            this.changeStatusOfSeenMovies();
            this.clearForm();
        }
        this.clearForm();
    }
    
    console.log(this.movies['movies']);
    console.log(document.getElementById('checkBox').checked)
    }


    changeStatusOfSeenMovies() {
        let count = 0;
        this.movies['movies'].forEach((el) => {
            if(el.seen === "T") {
                count++;
            }
        })
        setCounterTo('#anotherMoviesCounterSeen', count)  
    }

    clearForm() {
        const elFields = this.els;
        for(let field in elFields) {
            
            let el = document.querySelector(field);
            let elVal = el.value;
            el.value = '';
        }
    }

    checkTitleInArray() {
        let is = false
        console.log(this.movies['movies'].length);
        this.movies['movies'].forEach(el => {
            if(el.title == document.getElementById('title_input').value) {
                is = true;
            }
        })
        return is;
    }
}

const form = new Validator('#form1', {
    fields: {
        '#title_input': {
            required: true,
            //maxlength: 2
        },
        '#year_input': {
            required: true,
             //length: 4,
             type: 'number'
        },
        '#genre_input': {
            required: true,
            //maxlength: 2
        }
    }
})

const movies = new MoviesStorage();

setTimeout(function() {
    console.log(movies.get1().length);
    let count = 0;
    movies.get1().forEach((el) => {
        if(el.seen === "T") {
            count++;
        }
    })
    setCounterTo('#anotherMoviesCounterAll', movies.get1().length)     
    setCounterTo('#anotherMoviesCounterSeen', count)     
    
}, 500)