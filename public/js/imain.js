var id = document.getElementById("code");
var button = document.getElementById("button");

function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
  });
}

button.addEventListener("click",function(){
    id.innerHTML = 	uuidv4();
	document.getElementById("my").href= "/snake?name="+id.textContent+"hoast";

})
	