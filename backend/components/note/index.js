const { getNotes, getNoteID, postNote, putNoteID } = require("./controller");
const { Router } = require("express");

const routerNotes = Router();

routerNotes.get("/", getNotes);
routerNotes.post("/", postNote);
routerNotes.get("/:id", getNoteID);
routerNotes.put("/:id", putNoteID);

module.exports = {
  routerNotes
};