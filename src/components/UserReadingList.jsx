import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { serverURL } from "../utils/constants"

export default function UserReadingList(props) {
    const [newRead, setNewRead] = useState([])

    console.log("reader: ", newRead)

    const navigate = useNavigate()

    useEffect(() => {
        fetch(serverURL)
        .then((res) => res.json())
        .then((books) => {
          console.log("db books: ", books)
          setNewRead(books)
        })
      }, [])

    return(
        <>
        <ul>
            <h2>Reading list</h2>
            {newRead.map((book, index) => {
                return(
                    <li key={index}>
                        <h3>Title: {book.title}</h3>
                        <p>Authors: {book.authors}</p>
                        <p>Publisher: {book.publisher}</p>
                    </li>
                )
            })}
        </ul>
        <button onClick={() => navigate('/')}>Return to search</button>
        </>
    )
}