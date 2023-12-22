import { API_URL } from './url.js';

const API_NOTES = API_URL + 'notes/';

async function getNotes() {
  const response = await fetch(API_NOTES);
  const notes = await response.json();
  return notes;
}

async function main() {
  const notes = await getNotes();
  console.log(notes);




}

main();