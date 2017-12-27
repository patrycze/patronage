const url = 'https://pastebin.com/9yXnuQwZ';
const correctUrl = [url.slice(0, 21), 'raw/', url.slice(21)].join('');
fetch(correctUrl)
    .then((resp) => resp.json())
    .then(function(data) {
        console.log(data); 
    });
