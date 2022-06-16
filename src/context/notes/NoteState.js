import React from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const notesInitial = [
        {
          "_id": "62a196d481fcb06217f640fc",
          "user": "629d95fbceb22fcfc8c6af8b",
          "title": "My Title",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "2022-06-09T06:44:36.156Z",
          "__v": 0
        },
        {
          "_id": "62a1a3158aa66e1e3c2a9132",
          "user": "629d95fbceb22fcfc8c6af8b",
          "title": "My Title updated",
          "description": "Please wake up early updated",
          "tag": "personal",
          "date": "2022-06-09T07:36:53.593Z",
          "__v": 0
        },
        {
          "_id": "62a2ec2fc6697f2b3ccf5cea",
          "user": "629d95fbceb22fcfc8c6af8b",
          "title": "My Title",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "2022-06-10T07:01:03.505Z",
          "__v": 0
        }
      ]

      const [notes, setnotes] = useState(notesInitial)

    return (
    <NoteContext.Provider value={{notes, setnotes}}>
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
// };