
// get all the quotes
const getQuotes = () =>
    fetch("http://localhost:3000/quotes")
        .then(resp => resp.json())

// get a single quote
const updateQuote = quote =>
    fetch(`http://localhost:3000/quotes/${quote.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(quote)
    }).then(resp => resp.json()) // the object returned gets turned into a string

const createQuote = quote =>
    fetch(`http://localhost:3000/quotes`, {
        method: 'POST',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(quote)
    }).then(resp => resp.json())

const deleteQuote = quote =>
    fetch(`http://localhost:3000/quotes/${quote.id}`, {
        method: 'DELETE'
})