// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading.

const quoteList = document.querySelector('#quote-list')
const formListen = document.querySelector("#new-quote-form")
const newQuote = document.querySelector("#new-quote") // new comment
const newAuthor = document.querySelector("#author") // new author


let state = {
    quotes: []
}

// render a quote to the page
const renderQuote = (quote) => {
    const quoteItem = document.createElement("div")
    quoteItem.innerHTML = `
    <li class='quote-card'>
        <blockquote class="blockquote">
            <p class="mb-0">${quote.quote}</p>
            <footer class="blockquote-footer">${quote.author}</footer>
            <br>
            <button data-id=${quote.id} class='btn-success'>Likes: <span>${quote.likes}      </span></button>
            <button data-id=${quote.id} class='btn-danger'>Delete</button>
            </blockquote>
  </li>
  `
    quoteList.appendChild(quoteItem)
}

document.addEventListener("click", event => {
    if (event.target.className === "btn-success") {
        const id = event.target.dataset.id
        const foundQuote = state.quotes.find(quote => quote.id === parseInt(id))
        const span = event.target.querySelector(".btn-success > span")
        addLike(foundQuote, span)
    }
    if (event.target.className === "btn-danger") {
        const id = event.target.dataset.id
        const foundQuote = state.quotes.find(quote => quote.id === parseInt(id))

        deleteFoundQuote(foundQuote)
    }
})

formListen.addEventListener("submit", event => {
    event.preventDefault()

    let comment = newQuote.value
    let authorS = newAuthor.value

    quote = {
        quote: comment,
        likes: 0,
        author: authorS
    }

    createQuote(quote)
        .then((respQuote) => {

            state.quotes.push(respQuote)
            quoteList.innerHTML = ""
            renderAllQuotes(state.quotes)
        })

    newQuote.value = ""
    newAuthor.value = ""
})


// deletes the found quote
const deleteFoundQuote = quote => {
    return deleteQuote(quote)
        .then(() => {
            const index = state.quotes.indexOf(quote)
            console.log(index)
            state.quotes.splice(index, 1)
            quoteList.innerHTML = ""
            renderAllQuotes(state.quotes)
            return

        })
        .catch(error => console.log(error))
}

const addLike = (quote, selector) => {
    return updateQuote(quote)
        .then(() => {
            quote.likes += 1
            selector.innerText = quote.likes
        })
}

const renderAllQuotes = (quotes) => {
    quotes.forEach(quote => renderQuote(quote))
}

getQuotes()
    .then(quotes => {
        state.quotes = quotes,
            renderAllQuotes(quotes)
    })