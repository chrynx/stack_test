// 3rd party
const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

// local
const notes = require('./notes');

const commandTitle = (desc) => {
    return {
        describe: desc,
        demand: true,
        alias: 't'
    }
}

const commandBody = (desc) => {
    return {
        describe: desc,
        demand: true,
        alias: 'b'
    }
}

const argv = yargs
.command('create','Add a new note', {
    title: commandTitle('Title of note to be create'),
    body: commandBody('Body of the note')
})
.command('read','Chooses a note', {
    title: commandTitle('Title to be read')
})
.command('update','Updates a note', {
    title: commandTitle('Title of the note to be updated'),
    body: commandBody('Updated body of the note')
})
.command('delete','Deletes a note', {
    title: commandTitle('Title of note to be deleted')
})
.command('list','Lists all notes')
.help()
.argv;

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
}