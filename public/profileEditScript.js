function addSubject() {
	var txt = document.getElementById("subjects").value;
    const subject = prompt("Subject name:", "English");
    if (!(subject == null || subject == "")) {
    	txt += ", "+subject;
    } 
    document.getElementById("subjects").value = txt;
}