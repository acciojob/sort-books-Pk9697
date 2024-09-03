import React, { useEffect, useState } from 'react'
import './../styles/App.css'
import {
	fetchBooksError,
	fetchBooksStart,
	fetchBooksSuccess,
	sortBooks,
} from '../redux/bookSlice'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
	const dispatch = useDispatch()
	const { status, books, error } = useSelector((state) => state.book)
	const [formData, setFormData] = useState({
		sortBy: 'title',
		order: 'asc',
	})

	useEffect(() => {
		dispatch(sortBooks(formData))
	}, [formData,books])

	useEffect(() => {
		const fetchBooks = () => {
			const url =
				'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=h6eqpxt4Jh5hAWifB2n9zGa54Dmu3HeB'
			dispatch(fetchBooksStart())
			fetch(url)
				.then((res) => res.json())
				.then((data) => {
					if (data.status === 'OK') {
						dispatch(fetchBooksSuccess(data.results.books))
					} else {
						dispatch(fetchBooksError(data?.fault?.faultstring || 'Error'))
					}
				})
				.catch((err) => {
					dispatch(fetchBooksError(err || 'Error'))
					console.error(err)
				})
		}

		status === 'idle' && fetchBooks()
	}, [])

	const handleOptionChange = (e) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}


	return (
		<div className='app'>
			<header>
				<h1>Books List</h1>
				<div>
					<label>
						Sort by:{' '}
						<select
							name='sortBy'
							value={formData.sortBy}
							onChange={handleOptionChange}
						>
							<option value='title'>Title</option>
							<option value='author'>Author</option>
							<option value='publisher'>Publisher</option>
						</select>
					</label>
					<label>
						Order:{' '}
						<select
							name='order'
							value={formData.order}
							onChange={handleOptionChange}
						>
							<option value='asc'>Ascending</option>
							<option value='desc'>Descending</option>
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
					{status === 'rejected' && (
						<tr>
							<td colSpan={3}>{error}</td>
						</tr>
					)}
					{status === 'pending' && (
						<tr>
							<td colSpan={3}>Loading...</td>
						</tr>
					)}
					{books.map((book, idx) => (
						<tr key={`book-${idx}`}>
							<td>{book.title}</td>
							<td>{book.author}</td>
							<td>{book.publisher}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default App
