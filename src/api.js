const getQuotes = () => 
    fetch('http://localhost:3000/quotes')
    .then( resp => resp.json() )

const createQuotesDB = quote => {
    fetch('http://localhost:3000/quotes', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(quote)
    }).then(resp => resp.json())
}

const patchLikes = quote => {
    fetch(`http://localhost:3000/quotes/${quote.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({likes: quote.likes})
    }).then(resp => resp.json())
}