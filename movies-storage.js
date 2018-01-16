export class MoviesStorage {

    constructor(arr, movies) {
        this.movies = localStorage.getItem('movies');
        console.log(this.movies);
            if(this.movies) {
                if(typeof(this.movies) === 'Array') { }
                else {
                  //  this.movies = [];
                    console.log('1')
                    this.getData('https://pastebin.com/9yXnuQwZ')    
                }
            } else {
                //this.movies = [];
                console.log('2')
                this.getData('https://pastebin.com/9yXnuQwZ')          
            }

    }

    
    get1() {      
         return this.movies
    }

    get2(id) {
        
        let promise = new Promise((resolve, reject) => {
            resolve(this.getData);
        })

        promise.then((resolve) =>{
            console.log('jusz')
            this.movies.forEach(function(movie) {
                if(movie.id === id)
                    return movie;
            })
        })
    }

    set1(data) {
        this.movies.push(data);
    }

    set2(id, data) {
        this.movies.forEach(function(movie) {
            if(movie.id === id)
                return movie = data;
        });
    }

    remove(id) {
        movies.forEach(function(movie, i) {
            if(movie.id === id)
                return this.movie = this.movie.splice(i,1);
        })
    }

    getData(url) {  
        console.log('nie ma');
        const correctUrl = [url.slice(0, 21), 'raw/', url.slice(21)].join('');
        return fetch(correctUrl, 
            {
                method: "GET",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                }
            })
            .then((response) => {
                return response.json();
            })
            .then((responseData) => {
                this.movies = responseData;
            })
            .catch(error => console.warn(error));
    }


}
