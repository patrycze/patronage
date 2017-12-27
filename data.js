function getData(url) {  
    const correctUrl = [url.slice(0, 21), 'raw/', url.slice(21)].join('');

    return fetch(correctUrl, 
        {
            method: "GET",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            }
        })
        .then((response) => response.json())
        .then((responseData) => {
            return responseData;
        })
        .catch(error => console.warn(error));
}

export var movies = [];
getData('https://pastebin.com/9yXnuQwZ')
    .then(responseData => { movies.push(responseData)});
