import { useState } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import { useEffect } from "react/cjs/react.development"
import { key } from '../utils/constants'
import { serverURL } from '../utils/constants'


export default function ReadingList(props) {
    const [newBook, setNewBook] = useState([])

    const { booksData, setReading } = props

    const navigate = useNavigate()

    const {bookId} = useParams()
    const foundBook = booksData.find((book) => {

        return book.id === bookId
    })

    console.log("found book: ", foundBook)

    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes/${foundBook.id}?key=${key}`)
        .then((res) => res.json())
        .then(readingBooks => {
            console.log("readingBooks", readingBooks)

            setNewBook(readingBooks)
        })
    },[])

    const handleBook = event => {
        event.preventDefault()

        const bookToAdd = {
            title: newBook.volumeInfo.title,
            authors: newBook.volumeInfo.authors,
            publisher: newBook.volumeInfo.publisher
        }

        console.log("bookToAdd", bookToAdd)

        const fetchOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bookToAdd)
        }

        fetch(serverURL, fetchOptions)
        .then((res) => res.json())
        .then(readingList => {
            console.log("list", readingList)

            setReading(readingList)
            navigate('/users-reading-list')
        })
    }

    return(
        <>
        <ul>
             <li>
                 <h3>{foundBook.volumeInfo.title}</h3>
                <p>{foundBook.volumeInfo.authors}</p>
                 <p>{foundBook.volumeInfo.publisher}</p>
                <button onClick={handleBook}>Confirm choice</button>
            </li>
        </ul>
        </>
    )
}