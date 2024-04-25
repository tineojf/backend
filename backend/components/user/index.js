const { getUsers, postUser, getUserID, putUserID, deleteUserID } = require("./controller");
const { Router } = require("express");

const routerUsers = Router();

routerUsers.get("/", getUsers);
routerUsers.post("/", postUser);
routerUsers.get("/:id", getUserID);
routerUsers.put("/:id", putUserID);
routerUsers.delete("/:id", deleteUserID);

module.exports = {
  routerUsers
};