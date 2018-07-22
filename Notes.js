
const fs = require('fs');
//Internal function, retrieves notes from text file.
var fetchNotes = () => {
  try {
    var notesString = fs.readFileSync('notes-data.json');
    return  JSON.parse(notesString);
  } catch (e) {
    return [];
  }
};

var saveNotes = (notes) =>{
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
    // file saving to , content being written to the file.
}
//function for add command
var addNote = (title, body) => {
  var notes = fetchNotes();
  var note = {
    title,
    body
  };
  //In es6 if the property and its variable is the same you can just state the property name.

  var duplicateNotes = notes.filter((note)=>note.title === title);
  if(duplicateNotes.length === 0){
    notes.push(note);
    saveNotes(notes);
    return note;
  }
}
//fuction for list command
var getAll = () => {
  console.log("Fetching all notes");
  return fetchNotes();
}
//function for read command
var getNote = (title) => {
  console.log("Fetching note");
  notes = fetchNotes();
  var requestedNote = notes.filter((note) => note.title === title);
  return requestedNote[0];
}
//function for remove command
var removeNote = (title) => {
  var rawNotes = fetchNotes();
  notes = rawNotes.filter((note)=>note.title !== title);
  saveNotes(notes);
  return notes.length !== rawNotes.length;
}
//Prints specified note
var logNote = (note) => {
  console.log("'-----'");
  console.log(note.title);
  console.log(note.body);
  console.log();
}


module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
}
