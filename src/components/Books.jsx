import React from 'react'
import {useNavigate} from 'react-router-dom'

export default function Books(props) {

    const navigate = useNavigate()

    const {booksData, userInput, handleUserInput, handleStateSubmit} = props

    return(
        <>
        <form onSubmit={handleStateSubmit}>
            <input 
            id="select-state"
            name="select-state"
            type="text"
            placeholder='Search by author'            
            onChange={handleUserInput}
            value={userInput}
            />
        </form>
            <ul>
      {booksData.slice(0, 5).map((books, index) => {
        return(
          <>
          <li key={index}>
          <h3>Title: {books.volumeInfo.title}</h3>
           <p>Authors: {books.volumeInfo.authors}</p>
           <p>Publishing company: {books.volumeInfo.publisher}</p>
           <button onClick={() => navigate(`/reading-list/${books.id}`)}>Add to reading list</button>
          </li>
          </>
        )
      })}
    </ul>
        </>
    )
}