function addNote(title, content, color, pin, tags) {
    const note = {
        title,
        content,
        color,
        pin,
        tags,
        date: new Date().toISOString()
    };

    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

function displayNotes() {
    const notesContainer = document.getElementById('notes-container');
    const searchInput = document.getElementById('search-input');
    const searchTagsInput = document.getElementById('search-tags-input');
    const searchQuery = searchInput.value.toLowerCase();
    const searchTagsQuery = searchTagsInput.value.toLowerCase();
    
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notesContainer.innerHTML = '';
    notes.forEach((note, index) => {
        if (note.title.toLowerCase().includes(searchQuery) || note.content.toLowerCase().includes(searchQuery) || note.tags.toLowerCase().includes(searchTagsQuery)) {
            const div = document.createElement('div');
            div.classList.add('note');
            div.style.backgroundColor = note.color;
            div.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.content}</p>
                <p>Tags: ${note.tags}</p>
                <p>Data utworzenia: ${new Date(note.date).toLocaleString()}</p>
                <button onclick="deleteNote(${index})">Usuń</button>
            `;
            notesContainer.appendChild(div);
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const noteForm = document.getElementById('note-form');
    const searchInput = document.getElementById('search-input');
    const searchTagsInput = document.getElementById('search-tags-input');
    
    noteForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = this.title.value;
        const content = this.content.value;
        const color = this.color.value;
        const pin = this.pin.checked;
        const tags = this.tags.value;
        addNote(title, content, color, pin, tags);
        this.reset();
    });
    
    searchInput.addEventListener('input', displayNotes);
    searchTagsInput.addEventListener('input', displayNotes);

    displayNotes();
});
