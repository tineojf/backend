const { getNotes, getNoteID, postNote } = require("./controller");
const { Router } = require("express");

const routerNotes = Router();

routerNotes.get("/", getNotes);
routerNotes.post("/", postNote);
routerNotes.get("/:id", getNoteID);

module.exports = {
  routerNotes
};