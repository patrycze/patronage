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
        .then((response) => {
            return response.json();
        })
        .then((responseData) => {
             moviesData = responseData;
        })
        .catch(error => console.warn(error));
}

export var moviesData;

getData('https://pastebin.com/9yXnuQwZ')
