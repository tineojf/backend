import { API_URL } from './url.js';
import { dateConverter } from './utils.js';

const urlParams = new URLSearchParams(window.location.search);
const noteId = urlParams.get('id');

const API_NOTES = API_URL + 'notes/';
const listaNotes = document.getElementById('list-notes');

const h1TitleNote = document.querySelectorAll('.h1-title-note');

async function getNoteID(noteId) {
  try {
    const response = await fetch(API_NOTES + noteId);

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const notes = await response.json();
    return notes;
  } catch (error) {
    console.error('Error al obtener notas:', error);
    throw error;
  }
}

async function main() {
  try {
    const notes = await getNoteID(noteId);
    const nota = notes.note

    h1TitleNote.forEach((h1) => {
      h1.innerHTML = `Note #00${nota.id}`;
    })

    const notaHTML = `
      <div class="card" style="width: 18rem">
        <div class="card-body">
          <p class="card-text">${nota.description}</p>
          <p class="card-subtitle mb-2 text-muted txt-time">
            Created At: ${dateConverter(nota.createdAt)}
          </p>
          <p class="card-subtitle mb-2 text-muted txt-time">
            Updated At: ${dateConverter(nota.createdAt)}
          </p>
          <div>
            <a href="" class="card-link btn-archive" id="btnArchive-${nota.id}"
            >Archive</a
            >
            <a href="" class="card-link btn-update" id="btnUpdate-${nota.id}"
              >Update</a
            >
            <a href="" class="card-link btn-delete" id="btnDelete-${nota.id}"
              >Delete</a
            >
          </div>
        </div>
      </div>
      `;

    listaNotes.innerHTML = notaHTML;
  } catch (error) {
    console.error('Error en la aplicación:', error);
  }
}

main();