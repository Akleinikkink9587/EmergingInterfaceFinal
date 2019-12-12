var fontSize = 4;

function setup() {
    change('fontSize', 0);
	restoreText();
	updateShares();
}

function change(command){
    document.execCommand(command);
}

function change (command, change){
    fontSize += change;

    if (fontSize > 7) {
        fontSize = 7;
    } else if (fontSize < 1) {
        fontSize = 1;
    }

    document.execCommand(command, false, fontSize);
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

  
function saveText(){
	if(typeof localStorage != "undefined"){
        localStorage.setItem(document.getElementById('note-title').value, document.getElementById('note').innerHTML);	
    }
    //something along these lines to change notes to proper name

    if(document.getElementById('note1').innerText == "Note 1"){
        document.getElementById('note1').innerText = document.getElementById('note-title').value
    }
    else if(document.getElementById('note2').innerText == "Note 2" && document.getElementById('note1').innerText !="Note 1" ){
        document.getElementById('note2').innerText = document.getElementById('note-title').value
    }
    else if(document.getElementById('note3').innerText == "Note 3" && document.getElementById('note2').innerText !="Note 2" && document.getElementById('note1').innerText !="Note 1"){
        document.getElementById('note3').innerText = document.getElementById('note-title').value
    }

    alert("Note saved to Local Storage!");
    updateShares();
}
  
function restoreText(){
	if(typeof localStorage != "undefined"){
		document.getElementById("note-title").value = localStorage.getItem("title");
		
		document.getElementById("note").innerHTML = localStorage.getItem("note");
	}
}

function updateShares(){
	document.getElementById('twitterShare').innerHTML = "<button onclick='window.location.href = `https://twitter.com/intent/tweet?text= " + document.getElementById("note").innerHTML + "`;'>Share on Twitter</button>";
}

function deleteNote(){
    if(typeof localStorage != "undefined"){
		localStorage.removeItem(document.getElementById('note-title').value, document.getElementById('note').innerHTML);
        document.getElementById('note-title') = "";
        document.getElementById('note') = "";
        //localStorage.setItem("note", document.getElementById('note').innerHTML);
    }
    
    alert("Note Deleted!");
}

/*function displayNote(){
    var x = localStorage.getItem(document.getElementById('note-title'));

    document.getElementById("note-title").innerHTML = x;
}*/

function newNote(){
    document.getElementById('note-title').value = "";
    document.getElementById('note').innerHTML = "";

       /* Hide/Show Divs ??
       
       var x = document.getElementById("navBar");
        if (x.style.display === "none") {
          x.style.display = "none";
        } else {
          x.style.display = "block";
        }*/
    

}

function displayNote1(){
    document.getElementById('note-title').value = document.getElementById('note1').innerText;
    document.getElementById('note').innerHTML = localStorage.getItem(document.getElementById('note1').innerText)
    //document.getElementById('note1').innerText = document.getElementById('note-title').value
}

function displayNote2(){
    document.getElementById('note-title').value = document.getElementById('note2').innerText;
    document.getElementById('note').innerHTML = localStorage.getItem(document.getElementById('note2').innerText)
    //document.getElementById('note1').innerText = document.getElementById('note-title').value
}

function displayNote3(){
    document.getElementById('note-title').value = document.getElementById('note3').innerText;
    document.getElementById('note').innerHTML = localStorage.getItem(document.getElementById('note3').innerText)
    //document.getElementById('note1').innerText = document.getElementById('note-title').value
}
