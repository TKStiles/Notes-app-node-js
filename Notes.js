console.log('Starting Notes!');

const fs = require('fs');

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

var getAll = () => {
  console.log("Fetching all notes");
}

var getNote = (title) => {
  console.log("Fetching note");
  notes = fetchNotes();
  var requestedNote = notes.filter((note) => note.title === title);
  return requestedNote[0];
}

var removeNote = (title) => {
  // console.log("Removing Note");
  var rawNotes = fetchNotes();
  notes = rawNotes.filter((note)=>note.title !== title);
  saveNotes(notes);
  return notes.length !== rawNotes.length;
}

var logNote = (note) => {
  console.log("'-----'");
  console.log(note.title);
  console.log(note.body);
  console.log();
}


// module.exports.addNote = () => {
//   console.log('Add Notes');
//   return "New Note";
// }

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
}
