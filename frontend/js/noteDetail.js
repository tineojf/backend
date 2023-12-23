import { API_URL } from './url.js';
import { dateConverter } from './utils.js';

const urlParams = new URLSearchParams(window.location.search);
const noteId = urlParams.get('id');

const API_NOTES = API_URL + 'notes/';
const listaNotes = document.getElementById('list-notes');

const h1TitleNote = document.querySelectorAll('.h1-title-note');
const btnArchive = document.querySelector('.btn-archive');
console.log(btnArchive);

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
      <div class="card">
        <p class="card-text">${nota.description}</p>
        <p class="card-subtitle mb-2 text-muted txt-time">
          Created At: ${dateConverter(nota.createdAt)}
        </p>
        <p class="card-subtitle mb-2 text-muted txt-time">
          Updated At: ${dateConverter(nota.createdAt)}
        </p>
        <p class="card-text txtArchive">Archive note?: ${(nota.isArchive) ? 'Yes' : 'No'}</p>
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
      `;

    listaNotes.innerHTML = notaHTML;

  } catch (error) {
    console.error('Error en la aplicación:', error);
  }
}

btnArchive.addEventListener('click', async (e) => {
  e.preventDefault();

  const notes = await updateNote();
  console.log(notes);
  main();
});

async function updateNote() {
  try {
    const response = await fetch(API_NOTES + noteId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: document.querySelector('.card-text').value,
        isArchive: true,
      }),
    });

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

main();