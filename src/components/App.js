import React from 'react'
import './../styles/App.css'

const App = () => {
	return (
		<div className='app'>
      {/* 	Develop an application that fetches a list of books from an API, displays them, and allows users to sort the list by Title, Author, or Publisher. */}
      <header>
        <h1>Books List</h1>
        <div>
          <label>Order{' '}
            <select>
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="publisher">Publisher</option>
            </select>
          </label>
          <label>Sort By{' '}
            <select>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </label>
        </div>
      </header>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Book Title</td>
            <td>Book Author</td>
            <td>Book Publisher</td>
          </tr>
          <tr>
            <td>Book Title</td>
            <td>Book Author</td>
            <td>Book Publisher</td>
          </tr>
        </tbody>
      </table>

		</div>
	)
}

export default App
