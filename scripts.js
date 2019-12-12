var fontSize = 4;

var notes = {};

var noteId;

window.onload = function () {
    var notesList = getValue("notesList");

    if (notesList != null) {
        notes = JSON.parse(notesList);
    }

    var url = new URL(window.location.href)

    var searchText = url.searchParams.get("s");

    if (searchText != null){
        document.getElementById('noteSearch').value = searchText;
    }

    noteId = url.searchParams.get("id");

    if (notes[noteId] != null) {
        //load note
        loadOld();
    } else {
        //new note
        loadNew();

        noteId = generateId();
    }

    loadNav();

    change('fontSize', 0);
};

function newNote() {
    window.location.href = "/index.html?s=" + document.getElementById('noteSearch').value;;
}

function loadNote(id) {
    window.location.href = "?id=" + id + "&s=" + document.getElementById('noteSearch').value;;
}

function loadNav() {
    //clear old
    var oldChildren = document.getElementsByClassName('noteList');

    while (oldChildren.length != 0) {
        oldChildren[0].remove();
    }

    var table = document.getElementsByClassName('navBar-table')[0];

    var search = document.getElementById('noteSearch');

    console.log(search.value)

    for (note in notes) {
        if (notes[note].substring(0, search.value.length).toLowerCase() == search.value.toLowerCase()) {

            var template = document.createElement('template');

            var classes = "noteList";

            if (note == noteId) {
                classes += " currentNote";
            }

            template.innerHTML = '<div class="' + classes + '"><button onclick="loadNote(\'' + note + '\')">' + notes[note] + '</button></div>'

            table.appendChild(template.content.childNodes[0])
        }
    }
}

function saveNote() {
    var refreshNav = false;

    var noteTitle = document.getElementById('note-title').value;
    var noteText = document.getElementById('note').innerHTML;

    if (notes[noteId] != noteTitle) {
        refreshNav = true;
    }

    notes[noteId] = noteTitle;

    saveValue("notesList", JSON.stringify(notes));

    saveValue(noteId + "-title", noteTitle);
    saveValue(noteId + "-text", noteText);

    if (refreshNav) {
        loadNav();
    }
}

function deleteNote() {
    delete notes[noteId];

    deleteValue(noteId + "-title");
    deleteValue(noteId + "-text");

    saveValue("notesList", JSON.stringify(notes));

    newNote();
}

function loadNew() {
    assignValues("New Note", "");
}

function loadOld() {
    assignValues(getValue(noteId + "-title"), getValue(noteId + "-text"));
}

function assignValues(title, text) {
    document.getElementById("note-title").value = title;
    document.getElementById("note").innerHTML = text;
}

function saveValue(key, value) {
    localStorage.setItem(key, value);
}

function getValue(key) {
    return localStorage.getItem(key);
}

 function deleteValue(key){
    localStorage.removeItem(key);
 }

function openNav() {
    document.getElementById("main").style.width = "75%";
    document.getElementById("navBar").style.display = "block";
    document.getElementById("openNav").style.display = 'none';
    document.getElementById("closeNav").style.display = 'inline-block';
}

function closeNav() {
    document.getElementById("main").style.width = "100%";
    document.getElementById("navBar").style.display = "none";
    document.getElementById("openNav").style.display = 'inline-block';
    document.getElementById("closeNav").style.display = 'none';
}

function change(command) {
    document.execCommand(command);
}

function change(command, change) {
    fontSize += change;

    if (fontSize > 7) {
        fontSize = 7;
    } else if (fontSize < 1) {
        fontSize = 1;
    }

    document.execCommand(command, false, fontSize);
}

function generateId() {
    var characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var length = 6;

    while (true) {
        var output = "";

        for (i = 0; i != length; i++) {
            output += characters[Math.floor(Math.random() * characters.length)];
        }

        console.log(output);

        if (notes[output] == null) {
            return output;
        }
    }
}

function twitter(){
    window.location.href = "https://twitter.com/intent/tweet?text=" + document.getElementById("note").innerHTML;
}