const BASE_URL = 'http://localhost:3000/quotes'
const quoteList = document.getElementById('quote-list')
const newQuoteForm = document.getElementById('new-quote-form')
let sortByAuthor = false

const getAllQuotes = () => {
  quoteList.innerHTML = ""
  fetch(BASE_URL)
  .then(res => res.json())
  .then(quotes => {
    if(sortByAuthor){
      quotes = quotes.sort((a,b) => a.author.localeCompare(b.author))
      console.log(quotes)
    }
    quotes.forEach(quote => {
      renderQuote(quote)
    });
  })
}

const renderQuote = (quote) => {
  let quoteLi = document.createElement('li')
  quoteLi.className = 'quote-card'
  quoteLi.innerHTML = `
    <blockquote class="blockquote" data-id="${quote.id}" data-likes="${quote.likes}">
      <p class="mb-0">${quote.quote}</p>
      <footer class="blockquote-footer">${quote.author}</footer>
      <br>
      <button class='btn-success'>Likes: <span>${quote.likes}</span></button>
      <button class='btn-info'>Edit</button>
      <button class='btn-danger'>Delete</button>
    </blockquote>
  `
  quoteList.appendChild(quoteLi)
}

const addNewQuote = (e) => {
  e.preventDefault()
  const content = e.target.querySelector('#new-quote').value
  const author = e.target.querySelector('#author').value
  if(content !== "" && author !== ""){
    return fetch(BASE_URL, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({quote: content, author: author, likes: 0})
    })
    .then(res => res.json())
    .then(quote => {
      renderQuote(quote)
      newQuoteForm.reset()
    })
  }
}

const likeQuote = (id, likes) => {
  return fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({likes: Number(likes) + 1})
  })
  .then(res => res.json())
  .then(data => data.likes)
}

const editQuote = (id, quote, author) => {
  return fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({quote: quote, author: author})
  })
  .then(res => res.json())
}

const deleteQuote = (id) => {
  return fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  })
}

const addSortBtn = () => {
  let targetDiv = quoteList.parentElement
  let sortBtn = document.createElement('button')
  sortBtn.id = "sort"
  sortBtn.className = "btn-info"
  sortBtn.innerHTML = "Sort by Author"
  sortBtn.addEventListener('click', () => {
    sortByAuthor = !sortByAuthor
    getAllQuotes()
    sortBtn.innerHTML = sortByAuthor ? "Sort normally" : "Sort by Author"
  })
  targetDiv.insertBefore(sortBtn, quoteList)
}

const renderEditForm = (id, quote, author, quoteEle, authorEle) => {
  let editFormHolder = document.createElement('div')
  editFormHolder.id = "edit-form-holder"
  let editForm = document.createElement('form')
  editForm.id = "edit-quote-form"
  editForm.innerHTML = `
  <div class="form-group">
    <label for="edit-quote">Edit Quote</label>
    <input type="text" class="form-control" id="edit-quote" value="${quote}">
  </div>
  <div class="form-group">
    <label for="Author">Author</label>
    <input type="text" class="form-control" id="edit-author" value="${author}">
  </div>
  <button type="submit" data-id="${id}" class="btn btn-primary">Submit</button>
  <button class="btn btn-danger">Cancel</button>
  `
  editForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const editedContent = e.target.querySelector('#edit-quote').value
    const editedAuthor = e.target.querySelector('#edit-author').value
    const quoteId = e.target.querySelector('button.btn-primary').dataset.id
    editQuote(quoteId, editedContent, editedAuthor)
    .then(q => {
      quoteEle.innerHTML = q.quote
      authorEle = q.author
    })
    .then(() => editFormHolder.remove())
  })
  editForm.querySelector('button.btn-danger').addEventListener('click', (e) => {
    e.preventDefault()
    editFormHolder.remove()
  })
  editFormHolder.appendChild(editForm)
  document.body.appendChild(editFormHolder)
}

const init = () => {
  console.log('loaded')
  newQuoteForm.addEventListener('submit', addNewQuote)
  quoteList.addEventListener('click', (e) => {
    if(e.target.className === 'btn-success') {
      let quoteBlock = e.target.parentElement
      let quoteLikesSpan = quoteBlock.querySelector('button span')
      likeQuote(quoteBlock.dataset.id, quoteBlock.dataset.likes)
      .then(likes => {
        quoteBlock.dataset.likes = likes
        quoteLikesSpan.innerHTML = likes
      })
    } else if (e.target.className === 'btn-danger') {
      let quoteBlock = e.target.parentElement
      deleteQuote(quoteBlock.dataset.id)
      .then(() => quoteBlock.parentElement.remove())
    } else if (e.target.className === 'btn-info') {
      let quoteBlock = e.target.parentElement
      let quote = quoteBlock.querySelector('p')
      let author = quoteBlock.querySelector('footer')
      renderEditForm(quoteBlock.dataset.id, quote.innerHTML, author.innerHTML, quote, author)
    }
  })
  addSortBtn()
  getAllQuotes()
}

document.addEventListener("DOMContentLoaded", init);
