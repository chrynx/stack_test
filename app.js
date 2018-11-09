// 3rd party
const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

// local
const notes = require('./notes');

const argv = yargs.argv;

switch (argv._[0]) {
    case 'create':
        const note = notes.createNote(argv.title, argv.body);
        if (note) notes.logNote('created', note.title, note.body);
        else console.log("duplicate title");
        break;
    case 'read':
        const chosenNote = notes.readNote(argv.title);
        if (chosenNote) notes.logNote('found', chosenNote.title, chosenNote.body);
        else console.log("note not found");
        break;
    case 'update':
        const updatedNote = notes.updateNote(argv.title, argv.body);
        if(updatedNote) notes.logNote('updated', updatedNote.title, updatedNote.body);
        else console.log("note not found");
        break;
    case 'delete':
        const deletedNote = notes.deleteNote(argv.title);
        const message = deletedNote ? `Note ${argv.title} has been deleted` : "Note does not exist";
        console.log(message);
        break;
    case 'list':
        const allNotes = notes.listNote();
        console.log("-----------------------");
        console.log('listing all notes');
        allNotes.map(note => {
            console.log("-----------------------");
            console.log("title: ", note.title);
            console.log("body: ", note.body);
        });
        break;
    default:

        console.log("methods: ['create','read','update','delete','list']");
        
        console.log("\ncreate: \n");
        console.log("--title    title of note to be created");
        console.log("--body     body of note to be created");

        console.log("\nread: \n");
        console.log("--title    title of note to be read");

        console.log("\nupdate: \n");
        console.log("--title    title of note to be updated");
        console.log("--body     updated body of note");

        console.log("\ndelete: \n");
        console.log("--title    title of note to be deleted");
}