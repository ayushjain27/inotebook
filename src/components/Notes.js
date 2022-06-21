import React, { useContext, useEffect, useRef } from "react"
import noteContext from "../context/notes/noteContext"
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes } = context;
    useEffect(() => {
        getNotes();
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)

    const updateNote = (note) => {
        ref.current.click();
    }
    
    return (
        <>
            <AddNote />
            <button ref={ref} type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    return <Noteitem key={note.id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes