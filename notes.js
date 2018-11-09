console.log('starting notes.js');

const fs = require('fs');

const fetchNotes = () => {
    try {
        const notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    }
};

const saveNotes = (notes) => fs.writeFileSync('notes-data.json', JSON.stringify(notes));

const createNote = (title, body) => {
    let notes = fetchNotes();
    const note = {
        title,
        body
    };

    const duplicateNotes = notes.filter((note) => note.title === title);

    if(duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    } else console.log('ERROR: duplicate title');
}

const readNote = (id) => console.log('Reading Note: ', id);

const updateNote = (id, newTitle, newBody) => console.log('Updating Note: ', id, newTitle, newBody);

const deleteNote = (title) => {
    let notes = fetchNotes();
    const remainingNotes = notes.filter((note) => note.title !== title);
    saveNotes(remainingNotes);
    return title;
}
const listNote = () => console.log('Getting all notes');

module.exports = {
    createNote,
    readNote,
    updateNote,
    deleteNote,
    listNote
}