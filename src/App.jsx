import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Books from "./components/Books";
import ReadingList from "./components/ReadingList";
import UserReadingList from "./components/UserReadingList";
import "./styles.css";
import { key } from "./utils/constants";
import { serverURL } from "./utils/constants";


export default function App() {
  const [booksData, setBooksData] = useState([])
  const [reading, setReading] = useState([])
  const [userInput, setUserInput] = useState("")
  const [selectedState, setSelectedState] = useState("")

  const searchUrl = `https://www.googleapis.com/books/v1/volumes?q=${userInput}+inauthor:keyes&key=${key}`

  useEffect(() => {
    if (userInput !== "") {
      fetch(searchUrl)
      .then((res) => res.json())
      .then((books) => {

        setBooksData(books.items)
      })
    }
  }, [userInput])

  useEffect(() => {
    fetch(serverURL)
    .then((res) => res.json())
    .then((books) => {
      setReading(books)
    })
  }, [])

  console.log("reading: ", reading)

  console.log("booksData: ", booksData)

  const handleUserInput = (event) => {
    event.preventDefault()

    setUserInput(event.target.value);
  };

  const handleStateSubmit = (event) => {
    event.preventDefault();

      const selectedStateInputClean = selectedStateInput
      .toLowerCase()
      .split(" ")
      .join("_");

    setSelectedState(selectedStateInputClean)
  };


  return (
    <React.Fragment>
    <Routes>
      <Route exact path="/" element={<Books
       booksData={booksData} 
       reading={reading} 
       setReading={setReading}
       serverUrl={serverURL}
       userInput={userInput}
       setUserInput={setUserInput}
       handleUserInput={handleUserInput}
       handleStateSubmit={handleStateSubmit} />} />
       <Route path="/reading-list/:bookId" element={<ReadingList
       reading={reading}
       booksData={booksData}
       setReading={setReading}  />} />
       <Route path="/users-reading-list" element={<UserReadingList
       reading={reading} 
       />} />
    </Routes>
    </React.Fragment>
  );
}
