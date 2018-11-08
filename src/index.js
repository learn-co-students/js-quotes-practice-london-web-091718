// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading.

let quoteContainer = document.querySelector('.container-center')
let quoteInput = document.querySelector("#new-quote")
let authorInput = document.querySelector("#author");

let quoteForm = document.querySelector("#new-quote-form")

quotesdb()
    .then(quotes => quotes.forEach(quote => {
        renderQuotes(quote)
    }));

const renderQuotes = (quote) => {
    let orderedList = document.querySelector('#quote-list')
    let infoContainer = document.createElement('li')
        infoContainer.className = `quote-card-${quote.id}`;
        infoContainer.innerHTML = `
        <blockquote class="blockquote">
        <p class="mb-0">${quote.quote}</p>
        <footer class="blockquote-footer">${quote.author}</footer> 
        <br>
        <button class="btn-success" id='btn-success-${quote.id}'>Likes: <span>${quote.likes}</span></button>
        <button class="btn-danger" id='btn-danger-${quote.id}'>Delete</button>
        </blockquote>
    `
    orderedList.appendChild(infoContainer)

    orderedList.addEventListener('click', event => {
        if (event.target.id === `btn-success-${quote.id}`) {
            console.log('clicked')
            console.log(quote.likes)
            quote.likes += 1
            updateQuote(quote)
                .then(() => {
                    infoContainer.querySelector('span').innerHTML = quote.likes
                })
        } else if (event.target.id === `btn-danger-${quote.id}`) {
            console.log(event.target.dataset.id)
            console.log(quote)
            deleteQuote(quote)
            
            orderedList.removeChild(infoContainer);
        }
    })
}


quoteForm.addEventListener( 'submit', event => {
    event.preventDefault()
    const newQuote = {
        quote: quoteInput.value,
        author: authorInput.value,
        likes: 0
    }

    createQuote(newQuote)
        .then(quotes => {
            renderQuotes(quotes);
        })
    
    
    quoteInput.value = ""
    authorInput.value = ""
})

