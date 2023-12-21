const { getNotes, postNotes } = require("./controller");
const { Router } = require("express");

const routerNotes = Router();

routerNotes.get("/", getNotes);
routerNotes.post("/", postNotes);

module.exports = {
  routerNotes
};