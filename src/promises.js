//get quotes
const quotesdb = () => {
    return fetch('http://localhost:3000/quotes')
        .then(quotes => quotes.json())
}

const createQuote = (quote) => {
    return fetch('http://localhost:3000/quotes', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(quote)
    })
        .then(response => response.json())
}

const deleteQuote = (quote) => {
    return fetch(`http://localhost:3000/quotes/${quote.id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(quote)
    })
        .then(response => response.json())
}

const updateQuote = (quote) => {
    return fetch(`http://localhost:3000/quotes/${quote.id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({likes: quote.likes})
    })
        .then(response => response.json())
}