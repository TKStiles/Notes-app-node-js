
const fs = require('fs');
const os = require('os');

const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./Notes.js');

var user = os.userInfo();

const titleOptions = {
  describe: 'Title of Note',
  demand: true,
  alias: 't'
};
const bodyOptions = {
  describe: 'Body of Note' ,
  demand: true,
  alias: 'b'
};

const argv = yargs
.command('add', 'Add a new note', {
  title: titleOptions,
  body: bodyOptions
})
.command('list', 'List all notes')
.command('read', 'Read a note.', {
  title: titleOptions
})
.command("remove", "Removes a Note", {
  title: titleOptions
})
.help()
.argv;
var command = argv._[0];

if("add" === command){
  var note = notes.addNote(argv.title, argv.body);
  if(!note){
    console.log("Note with that title already exists. New note was not created.");
  }
  else {
    console.log("Note saved successfully!");
    notes.logNote(note);
  }
}
else if ("list" === command) {
  var allNotes = notes.getAll();
  console.log('Printing ',  allNotes.length, ' notes(s).');
  allNotes.forEach((note)=> notes.logNote(note));
}
else if ("read" === command) {
  var note = notes.getNote(argv.title);
  if(note !== undefined){
    notes.logNote(note);
  }
  else {
    console.log("Note not found.");
  }
}
else if ("remove" === command ){
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? 'Note was removed!' : 'Note not found!';
  console.log(message);
}
else{
  console.log("Command not recognized.");
}
