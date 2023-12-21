const { getNotes, getNoteID, postNote, putNoteID, getNoteArchive, getNoteNotArchive, deleteNoteID } = require("./controller");
const { Router } = require("express");

const routerNotes = Router();

routerNotes.get("/", getNotes);
routerNotes.post("/", postNote);
routerNotes.get("/archive", getNoteArchive);
routerNotes.get("/notarchive", getNoteNotArchive);
routerNotes.get("/:id", getNoteID);
routerNotes.put("/:id", putNoteID);
routerNotes.delete("/:id", deleteNoteID);

module.exports = {
  routerNotes
};