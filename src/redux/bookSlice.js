import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	status: 'idle',
	books: [],
	error: null,
}

const bookSlice = createSlice({
	name: 'book',
	initialState,
	reducers: {
		fetchBooksStart: (state) => {
			state.status = 'pending'
		},
		fetchBooksSuccess: (state, action) => {
			state.status = 'fulfilled',
		    state.books = action.payload,
			state.error = null
		},
		fetchBooksError: (state, action) => {
            state.status = 'rejected',
            state.error = action.payload
        },
        sortBooks:(state,action)=>{
            state.books.sort((a, b) => {
                if(action.payload.order==='asc'){
                    return a[action.payload.sortBy].localeCompare(b[action.payload.sortBy])
                } else {
                    return b[action.payload.sortBy].localeCompare(a[action.payload.sortBy])
                }
            })
        }
	},
	extraReducers: (builder) => {},
})

export const { fetchBooksStart, fetchBooksSuccess, fetchBooksError ,sortBooks} =
	bookSlice.actions

export default bookSlice.reducer
