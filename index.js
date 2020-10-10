bugs = []

class Bug {
    constructor(time, issue, summary) {
        this.time = time;
        this.issue = issue;
        this.resolved = false;
        this.id = bugs.length;
        this.summary = summary;
        
    }
    getTime() {
        return this.time;
    }
    getId() {
        return this.id;
    }
    getIssue() {
        return this.issue;
    }
    getResolved() {
        return this.resolved;
    }
    getSummary() {
        return this.summary;
    }
    getButton() {
        return this.button;
    }
    setTime(time) {
        this.time = time;
    }
    setIssue(issue) {
        this.issue = issue;
    }
    setResolved(resolved) {
        this.resolved = resolved;
    }
    setSummary(summary) {
        this.summary = summary;
    }

}

class ResolveButtons {
    constructor(id) {
        this.button = document.createElement('button');
        if (bugs[id].getResolved() == false) {
            this.button.innerHTML = "Mark Resolved";
            this.button.onclick = function() {
                bugs[id].setResolved(true);
                this.resolveMode = false;
                displayBugs();
            }
        }
        else {
            this.button.innerHTML = "Mark Unresolved";
            this.button.onclick = function() {
                bugs[id].setResolved(false);
                this.resolveMode = true;
                displayBugs();
            }
        }
    }
    getButton() {
        return this.button;
    }
    
}

rows = []

function displayBugs() {
    
    //table
    var bugTable = document.getElementById('bugTable');
    bugTable.innerHTML = "";

    if (bugs.length > 0) { //if there are any bugs

    
        //header
        var header = bugTable.insertRow();
        header.innerHTML = "<th>Bug ID</th><th>Status</th><th>Bug Nickname</th><th>Description</th><th>Bug Created</th><th>Actions</th>"

        //populate row
        for (var i = 0; i < bugs.length; i++) {
            var newRow = bugTable.insertRow();

            //bug information
            var id = newRow.insertCell();
            id.innerHTML = bugs[i].getId() + 1;
            var status = newRow.insertCell();
            if (bugs[i].getResolved()) {
                status.innerHTML = "Resolved";
            }
            else {
                status.innerHTML = "Unresolved";
            }
            var summary = newRow.insertCell();
            summary.innerHTML = bugs[i].getSummary();
            var description = newRow.insertCell();
            description.innerHTML = bugs[i].getIssue();
            var time = newRow.insertCell();
            time.innerHTML = bugs[i].getTime();
            
            //buttons
            var btn = new ResolveButtons(i);
            newRow.append(btn.getButton());

            if (bugs[i].getResolved()) {
                newRow.setAttribute("class", "resolved-row");
            }
            else {
                newRow.setAttribute("class", "unresolved-row");

            }
            
        }
    
    }
    else {
        bugTable.innerHTML = "<i>No bugs to display.</i>"
        bugTable.style.borderStyle = "none";
    }
    
}


window.onload = function() {
    console.log("loaded");
    
    displayBugs();
}


//creates a bug and pushes it to buglist
function createBug() {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    var newBug = new Bug(dateTime, document.getElementById("descriptionField").value, document.getElementById("summaryField").value);
    bugs.push(newBug);
    document.getElementById("descriptionField").value = "";
    document.getElementById("summaryField").value = "";
    displayBugs();
}


