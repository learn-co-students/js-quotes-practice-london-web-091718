// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading.

const newQuoteInput = document.getElementById('new-quote')
const newAuthorInput = document.getElementById('author')
const form = document.getElementById('new-quote-form')
const quoteList = document.getElementById('quote-list')

let state = {
    quotes: [],
    quote: {}
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed')
    // pageLoad()
})

//Page Load
const pageLoad = () =>
    getQuotes().then(quotes => {
        state.quotes = quotes
        quoteList.innerHTML = ''
        renderAllQuotes(quotes)
    })

// Rendering Singular Quote
const renderQuote = quote => {
    const quoteEl = document.createElement('li')
    quoteEl.classList.add('quote-card')
    quoteEl.innerHTML = `
    <blockquote class='blockquote'>
        <p class='mb-0'>${quote.quote}</p>
        <footer class="blockquote-footer">${quote.author}</footer>
            <br>
        <button class='btn-success' data-id='${quote.id}'>
            Likes: <span>${quote.likes}</span>
        </button >
        <button class='btn-danger' data-id='${quote.id}'>
            Delete
        </button>
    </blockquote>
    `
    quoteList.appendChild(quoteEl)
}

// Rendering All Quotes
const renderAllQuotes = quotes => {
    quotes.forEach( quote => renderQuote(quote))
}

// Submiting Quote
form.addEventListener('submit', event => {
    event.preventDefault()

    const quote = {
        quote: newQuoteInput.value,
        author: newAuthorInput.value,
        likes: 1
    }
    state.quotes.push(quote)
    createQuotesDB(quote)
    renderAllQuotes(state.quotes)
})

// Adding 'like' counter after creating 'Liking quotes' below
const addLike = id => {
    state.quote = state.quotes.find(obj => obj.id === id)
    state.quote.likes += 1
    console.log(state.quote)
}

// const addLike = quote => {
//     quote.likes += 1
//     patchLikes(quote)
// }

// Liking Quotes
document.addEventListener('click', event => {
    if (event.target.className === 'btn-success') {
        const likeId = parseInt(event.target.dataset.id)
        addLike(likeId)
        patchLikes(state.quote)
        console.log('loaded page')
    }
    pageLoad()
})

pageLoad()