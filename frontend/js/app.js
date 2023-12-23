import { API_URL } from './url.js';
import { dateConverter } from './utils.js';

const API_NOTES = API_URL + 'notes/';
const listaNotes = document.getElementById('list-notes');

async function getNotes() {
  try {
    const response = await fetch(API_NOTES);

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

async function postNotes() {
  const noteContent = document.getElementById('txtarea-createNote');
  const isArchive = document.getElementById('cbox-createNote');

  const body = {
    description: noteContent.value,
    isArchive: isArchive.checked,
  };

  try {
    const response = await fetch(API_NOTES, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const note = await response.json();
    noteContent.value = '';
    isArchive.checked = false;

    return note;
  }
  catch (error) {
    console.error('Error al crear notas:', error);
    throw error;
  }
}

async function deleteNotes(id) {
  try {
    const response = await fetch(API_NOTES + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const responseBody = await response.json();

    return responseBody;
  } catch (error) {
    console.error('Error al eliminar notas:', error);
    throw error;
  }
}

async function main() {
  try {
    const notes = await getNotes();

    listaNotes.innerHTML = '';

    notes.notes.forEach(nota => {
      const notaHTML = `
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <p class="card-text">
              ${nota.description}
            </p>
            <p class="card-subtitle mb-2 text-muted txt-time">${dateConverter(nota.createdAt)}</p>
            <div>
              <a href="/frontend/routes/note.html" class="card-link btn-more" id="btnMore-${nota.id}">More</a>
              <a href="" class="card-link btn-delete" id="btnDelete-${nota.id}">Delete</a>
            </div>
          </div>
        </div>
      `;

      listaNotes.innerHTML += notaHTML;
      asignarEventosABotones2();
      asignarEventosABotones();
    });
  } catch (error) {
    console.error('Error en la aplicación:', error);
  }
}

const btnCreateNote = document.getElementById('btn-createNote');
btnCreateNote.addEventListener('click', async (event) => {
  event.preventDefault();

  try {
    const note = await postNotes();
    main();
  } catch (error) {
    console.error('Error al crear nota:', error);
  }
});

function asignarEventosABotones() {
  const buttons2 = document.querySelectorAll('.btn-more');

  buttons2.forEach(button => {
    button.addEventListener('click', async (e) => {
      e.preventDefault();

      try {
        const id = e.target.id.split('-')[1];
        navigateToNotePage(id);
      } catch (error) {
        console.error('Error en la nota:', error);
      }
    });
  });
}


function asignarEventosABotones2() {
  const buttons = document.querySelectorAll('.btn-delete');

  buttons.forEach(button => {
    button.addEventListener('click', async (e) => {
      e.preventDefault();

      try {
        const id = e.target.id.split('-')[1];
        await deleteNotes(id);

        main();
      } catch (error) {
        console.error('Error al eliminar nota:', error);
      }
    });
  });
}

function navigateToNotePage(noteId) {
  window.location.href = `/frontend/routes/note.html?id=${noteId}`;
}

main();
