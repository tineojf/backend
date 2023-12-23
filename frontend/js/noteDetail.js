import { API_URL } from './url.js';
import { dateConverter } from './utils.js';
const API_NOTES = API_URL + 'notes/';

const urlParams = new URLSearchParams(window.location.search);
const noteId = urlParams.get('id');

const listaNotes = document.getElementById('section-note');
const h1Title = document.getElementById('h1-note');
const btnArchive = document.querySelector('.btn-archived');
console.log(btnArchive);
const btnUpdate = document.querySelector('.btn-update');
const btnDelete = document.querySelector('.btn-delete');

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

    h1Title.innerText = `NOTE #0${(nota.id > 9) ? nota.id : '0' + nota.id}`;

    const notaHTML = `
      <div class="card">
        <div class="card-body">
          <p><strong>Content:</strong></p>
          <p id="txt-note">${nota.description}</p>
        </div>
      </div>

      <div class="card">
        <div class="card-body">
          <p class="card-subtitle mb-2 text-muted txt-time">
            Created At: ${dateConverter(nota.createdAt)}
          </p>
          <p class="card-subtitle mb-2 text-muted txt-time">
            Updated At: ${dateConverter(nota.createdAt)}
          </p>
          <p>Archive note?: ${(nota.isArchive) ? 'Yes' : 'No'}</p>
        </div>
      </div>
    `;

    btnArchive.classList.add(`btnArchive-${nota.id}`);
    btnUpdate.classList.add(`btnUpdate-${nota.id}`);
    btnDelete.classList.add(`btnDelete-${nota.id}`);
    listaNotes.innerHTML = notaHTML;

  } catch (error) {
    console.error('Error en la aplicación:', error);
  }
}

async function archiveNote() {
  try {
    const response = await fetch(API_NOTES + noteId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: document.getElementById('txt-note').innerText,
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


document.addEventListener('DOMContentLoaded', () => {
  btnArchive.addEventListener('click', async () => {
    try {
      await archiveNote();
      window.location.reload();
    } catch (error) {
      console.error('Error al archivar la nota:', error);
    }
  });

  btnDelete.addEventListener('click', async () => {
    try {
      const response = await fetch(API_NOTES + noteId, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }

      const notes = await response.json();
      window.location.href = '../../index.html';
      return notes;
    } catch (error) {
      console.error('Error al obtener notas:', error);
      throw error;
    }
  });

  main();
});