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
		localStorage.setItem("title", document.getElementById('note-title').value);
		
		localStorage.setItem("note", document.getElementById('note').innerHTML);
	}
	
	if(document.getElementById('note1').innerText != document.getElementById('note-title').value){
        document.getElementById('note1').innerText = document.getElementById('note-title').value
    }
    else if(document.getElementById('note1').innerText == document.getElementById('note-title').value){
        localStorage.setItem(document.getElementById('note-title').value, document.getElementById('note').innerHTML);	
    }
    else if(document.getElementById('note1').innerText == "Note 2" && document.getElementById('note1').innerText != document.getElementById('note-title').value){
        document.getElementById('note2').innerText = document.getElementById('note-title').value
    }
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
