console.log('Starting app.');

// 3rd party
const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

// local
const notes = require('./notes');

const argv = yargs.argv;

const logNote = (method, title, body) => {
    console.log('--------');
    console.log(`note ${method}`);
    console.log('--------');
    console.log('title: ', title);
    console.log('body: ', body);
}

switch(argv._[0]) {
    case 'create':
        const note = notes.createNote(argv.title, argv.body);
        if(note) {
            logNote('created', note.title, note.body);
        } else console.log("duplicate title");
        break;
    case 'read':
        const chosenNote = notes.readNote(argv.title);
        if(chosenNote) logNote('found', chosenNote.title, chosenNote.body);
        else console.log("note not found");
        break;
    case 'update':
        notes.updateNote(argv.noteID,argv.newTitle, argv.newBody);
        break;
    case 'delete':
        const deletedNote = notes.deleteNote(argv.title);
        const message = deletedNote ? `Note ${argv.title} has been deleted` : "Note does not exist";
        console.log(message);
        break;
    case 'list':
        notes.listNote();
        break;
}