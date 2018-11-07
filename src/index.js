// Initial Setup
let quotes = []
const quotesList = document.querySelector("#quote-list")
const quotesForm = document.querySelector("#new-quote-form")

// API
getQuotes = () => {
    fetch("http://localhost:3000/quotes")
    .then(res =>  res.json())
    .then(quotesResponse => quotes = quotesResponse.reverse())
    .then(() => showQuotes())
}

addQuote = (quote) => {
    fetch("http://localhost:3000/quotes", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(quote)
    }).then(() => getQuotes())
}

deleteQuote = (quoteId) => {
    fetch(`http://localhost:3000/quotes/${quoteId}`, {
        method: "DELETE"
    }).then(() => getQuotes())
}

addLike = (quoteId, like) => {
    fetch(`http://localhost:3000/quotes/${quoteId}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json", Accept: "application/json"},
        body: JSON.stringify(like)
    }).then(() => getQuotes())
}

// Functions
showQuotes = () => {
    quotesList.innerHTML = ""
    quotes.forEach(quote => {
        let el = createQuoteItem(quote)
        quotesList.appendChild(el)})
}

createQuoteItem = (quote) => {
    let item = document.createElement("li")
    item.className = "quote-card"
    item.innerHTML = `
        <blockquote class="blockquote">
            <p class="mb-0">${quote.quote}</p>
            <footer class="blockquote-footer">${quote.author}</footer>
            <br>
            <button class='btn-success' data-id=${quote.id} data-likes=${quote.likes}>Likes: ${quote.likes}</button>
            <button class='btn-danger' data-id=${quote.id}>Delete</button>
        </blockquote>
    `
    return item
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    getQuotes()
})

quotesList.addEventListener("click", (event) => {
    if (event.target.className === "btn-success") {
        const like = {
            likes: parseInt(event.target.dataset.likes) + 1
        }
        addLike(event.target.dataset.id, like)
    } else if (event.target.className === "btn-danger") {
        deleteQuote(event.target.dataset.id)
    }
})

quotesForm.addEventListener("submit", () => {
    let quoteInput = quotesForm.querySelector("#new-quote")
    let authorInput = quotesForm.querySelector("#author")
    const newQuote = {
        quote: quoteInput.value,
        author: authorInput.value,
        likes: 0
    }
    addQuote(newQuote)
})

