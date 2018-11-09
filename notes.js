console.log('starting notes.js');

const fs = require('fs');

const fetchNotes = () => {
    try { return JSON.parse(fs.readFileSync('notes-data.json')); }
    catch (e) { }
};

const saveNotes = (notes) => fs.writeFileSync('notes-data.json', JSON.stringify(notes));

const createNote = (title, body) => {
    let notes = fetchNotes();
    const note = {
        title,
        body
    };

    const duplicateNotes = notes.filter((note) => note.title === title);

    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    } else return false;
}

const readNote = (title) => {
    let notes = fetchNotes();
    const matchedNote = notes.filter(note => note.title === title);

    if (matchedNote.length) return matchedNote[0];
    else return false;
};

const updateNote = (id, newTitle, newBody) => console.log('Updating Note: ', id, newTitle, newBody);

const deleteNote = (title) => {
    let notes = fetchNotes();

    const remainingNotes = notes.filter((note) => note.title !== title);
    saveNotes(remainingNotes);

    return notes.length !== remainingNotes.length;
}
const listNote = () => console.log('Getting all notes');

const logNote = (method, title, body) => {
    console.log('--------');
    console.log(`note ${method}`);
    console.log('--------');
    console.log('title: ', title);
    console.log('body: ', body);
}

module.exports = {
    createNote,
    readNote,
    updateNote,
    deleteNote,
    listNote,
    logNote
}