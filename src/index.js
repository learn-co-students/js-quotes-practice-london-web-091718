//elements need it

const quoteContainer = document.querySelector('.container-center')
const newForm = document.querySelector('#new-quote-form')
const newQuoteValue = document.querySelector('#new-quote')
const newAuthorValue = document.querySelector('#author')


// render one quote 

const quote = (quote) => {
    const newLi = document.createElement('li')
    newLi.className = 'quote-card'
    newLi.innerHTML = `
    <blockquote class = "blockquote">
        <p class = "mb-0"> ${quote.quote} </p> 
        <footer class = "blockquote-footer"> ${quote.author} </footer> 
        <br>
        <button class = 'btn-success'> Likes: <span > ${quote.likes} </span></button >
        <button class = 'btn-danger' data-id=${quote.id}> Delete </button> 
    </blockquote> 
    `
    quoteContainer.appendChild(newLi)
}
//render all quotes

const renderQuotes = (allq) => {
allq.forEach(q => {
    quote(q)
});
}

// post form 

newForm.addEventListener('submit', event =>{
    event.preventDefault()
    //  console.log(event)
    
   let quotevalue = newQuoteValue.value 
   let authorvalue = newAuthorValue.value
    
    const newQuote = {
            author: authorvalue,
            quote: quotevalue,
            likes:0
    } 
    
    quote(newQuote)
    postQuotes(newQuote)
    newForm.reset()
})

// delete quote

quoteContainer.addEventListener("click", (event) => {
  if (event.target.className === "btn-danger") {
      let listBlock = event.target.parentElement.parentElement
      listBlock.remove()
     deleteQuote(event.target.dataset.id) 
     
    }
})