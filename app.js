console.log('Starting app');

const fs = require('fs');
const os = require('os');

const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./Notes.js');

var user = os.userInfo();
//var res = notes.addNote();

const argv = yargs.argv;
var command = argv._[0];
//console.log('process argv ', process.argv);
//console.log('yargs argv ', argv);

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
  notes.getAll();
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


// fs.appendFile('greetings.txt', 'Hello World!'+ '\n' + '- '+ user.username , function (err){
//   if(err){
//     console.log('Error!');
//   }
// });
