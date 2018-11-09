console.log('Starting app.');

// 3rd party
const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

// local
const notes = require('./notes');

const argv = yargs.argv;

switch(argv._[0]) {
    case 'create':
        const note = notes.createNote(argv.title, argv.body);
        if(note) {
            console.log('--------');
            console.log('note created');
            console.log('--------');
            console.log('title: ', note.title);
            console.log('body: ', note.body);
        } else console.log("note was not created");
        break;
    case 'read':
        notes.readNote(argv.noteID);
        break;
    case 'update':
        notes.updateNote(argv.noteID,argv.newTitle, argv.newBody);
        break;
    case 'delete':
        const deletedNote = notes.deleteNote(argv.title);
        if(deletedNote) console.log(`Note ${deletedNote} has been deleted`);
        else console.log("Note has not been deleted");
        break;
    case 'list':
        notes.listNote();
        break;
}
