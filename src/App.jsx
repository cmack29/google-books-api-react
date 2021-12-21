import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Books from "./components/Books";
import ReadingList from "./components/ReadingList";
import UserReadingList from "./components/UserReadingList";
import "./styles.css";


export default function App() {
  const [booksData, setBooksData] = useState([])
  const [reading, setReading] = useState([])
  const [userInput, setUserInput] = useState("")
  const [selectedState, setSelectedState] = useState("")

  const { key } = require('./utils/constants')

  const searchUrl = `https://www.googleapis.com/books/v1/volumes?q=${userInput}+inauthor:keyes&key=${key}`

  const { serverURL } = require('./utils/constants')


  useEffect(() => {
    if (userInput !== "") {
      fetch(searchUrl)
      .then((res) => res.json())
      .then((books) => {
        // console.log("api books: ", books)

        setBooksData(books.items)
      })
    }
  }, [userInput])

  useEffect(() => {
    fetch(serverURL)
    .then((res) => res.json())
    .then((books) => {
      // console.log("db books: ", books)
      setReading(books)
    })
  }, [])

  console.log("reading: ", reading)

  console.log("booksData: ", booksData)

  const handleUserInput = (event) => {
    // console.log("Inside handleNameInput: ", event.target.value);
    event.preventDefault()

    setUserInput(event.target.value);
  };

  const handleStateSubmit = (event) => {
    // console.log("Inside handleStateSubmit: ", handleStateSubmit);
    event.preventDefault();

    // console.log(
    //   "Inside handleSelectStateForm: ",
    //   event.target["select-state"].value)

      const selectedStateInputClean = selectedStateInput
      .toLowerCase()
      .split(" ")
      .join("_");

    setSelectedState(selectedStateInputClean)
  };


  return (
    <>
    <Routes>
      <Route path="/" element={<Books
       booksData={booksData} 
       reading={reading} 
       setReading={setReading}
       serverUrl={serverUrl}
       userInput={userInput}
       setUserInput={setUserInput}
       handleUserInput={handleUserInput}
       handleStateSubmit={handleStateSubmit} />} />
       <Route path="/reading-list/:bookId" element={<ReadingList
       reading={reading}
       booksData={booksData}
       setReading={setReading}  />} />
       <Route path="/users-reading-list" element={<UserReadingList
       reading={reading} />} />
    </Routes>

    </>
  );
}
