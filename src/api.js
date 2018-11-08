const getQuotes = () =>
    fetch('http://localhost:3000/quotes')
        .then(resp => resp.json())
        .then(allq => renderQuotes(allq)) 
    
getQuotes()


const postQuotes= (newQuote) =>
    fetch(`http://localhost:3000/quotes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newQuote)
})

const deleteQuote = (quoteId) => {
    fetch(`http://localhost:3000/quotes/${quoteId}`, {
        method: "DELETE"
    })
 }





















































































































