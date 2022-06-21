import React from "react";
import { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial)

  // Get All Notes
  const getNotes = async () => {
    // TODO : API Call
    const response = await fetch(`${host}/api/notes//fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5ZDk1ZmJjZWIyMmZjZmM4YzZhZjhiIn0sImlhdCI6MTY1NDQ5NDcxNX0.gy-ID2SBUv4GEGXBos0NGdyVagDICG8r9aRuGJ4jZ6I'
      },
    });
    
    const json = await response.json()
    console.log(json)
    setNotes(json)
  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO : API Call
    const response = await fetch(`${host}/api/notes//addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5ZDk1ZmJjZWIyMmZjZmM4YzZhZjhiIn0sImlhdCI6MTY1NDQ5NDcxNX0.gy-ID2SBUv4GEGXBos0NGdyVagDICG8r9aRuGJ4jZ6I'
      },
      body: JSON.stringify({title, description, tag})
    });

    console.log("Adding a new note")
    const note = {
      "_id": "62a2ec2fc6697f2b3ccf5cea",
      "user": "629d95fbceb22fcfc8c6af8b",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2022-06-10T07:01:03.505Z",
      "__v": 0
    };
    setNotes(notes.concat(note));
  }
  
  // Delete a Note
  const deleteNote = async (id) => {
    // TODO : API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5ZDk1ZmJjZWIyMmZjZmM4YzZhZjhiIn0sImlhdCI6MTY1NDQ5NDcxNX0.gy-ID2SBUv4GEGXBos0NGdyVagDICG8r9aRuGJ4jZ6I'
      },
    });
    const json = response.json();
    console.log(json)

    console.log("Deleting the note with id" + id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes);
  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5ZDk1ZmJjZWIyMmZjZmM4YzZhZjhiIn0sImlhdCI6MTY1NDQ5NDcxNX0.gy-ID2SBUv4GEGXBos0NGdyVagDICG8r9aRuGJ4jZ6I'
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = response.json();

    //Logic to edit in Client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
};

export default NoteState;

// const NoteState = (props) => {
//     const s1 = {
//         "name": "Ayush",
//         "class": "5b"
//     }
//     const [state, setState] = useState(s1);
//     const update = () => {
//         setTimeout(() => {
//             setState({
//                 "name": "AyushJain",
//                 "class": "5b"
//             })
//         }, 1000);
//     }
//     return (
//     <NoteContext.Provider value={{state, update}}>
//         {props.children}
//     </NoteContext.Provider>
//     )


  // const notesInitial = [
    //   {
      //     "_id": "62a196d481fcb06217f640fc",
  //     "user": "629d95fbceb22fcfc8c6af8b",
  //     "title": "My Title",
  //     "description": "Please wake up early",
  //     "tag": "personal",
  //     "date": "2022-06-09T06:44:36.156Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "62a1a3158aa66e1e3c2a9132",
  //     "user": "629d95fbceb22fcfc8c6af8b",
  //     "title": "My Title updated",
  //     "description": "Please wake up early updated",
  //     "tag": "personal",
  //     "date": "2022-06-09T07:36:53.593Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "62a2ec2fc6697f2b3ccf5cea",
  //     "user": "629d95fbceb22fcfc8c6af8b",
  //     "title": "My Title",
  //     "description": "Please wake up early",
  //     "tag": "personal",
  //     "date": "2022-06-10T07:01:03.505Z",
  //     "__v": 0
  //   }
  // ]
// };