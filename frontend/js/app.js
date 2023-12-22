import { API_URL } from './url.js';

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
              <a href="#" class="card-link btn-archive">Archive</a>
              <a href="#" class="card-link btn-delete">Delete</a>
            </div>
          </div>
        </div>
      `;

      listaNotes.innerHTML += notaHTML;
    });
  } catch (error) {
    console.error('Error en la aplicación:', error);
  }
}

function dateConverter(fechaISO) {
  const dateUTC = new Date(fechaISO);

  const dateLocal = dateUTC.toLocaleDateString();
  const hourLocal = dateUTC.toLocaleTimeString();

  const formatedDate = `${dateLocal} ${hourLocal}`;

  return formatedDate;
}

main();
