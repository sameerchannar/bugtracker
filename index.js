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

class ResolveButton {
    constructor(id) {
        this.button = document.createElement('button');
        this.button.innerHTML = "Mark Resolved";
        this.button.onclick = function() {
            bugs[id].setResolved(true);
            displayBugs();
        }
    }
    getButton() {
        return this.button;
    }
}

rows = []

function displayBugs() {
    var bugTable = document.getElementById('bugTable');
    bugTable.innerHTML = "";
    for (var i = 0; i < bugs.length; i++) {
        var newRow = bugTable.insertRow();
        var id = newRow.insertCell();
        id.innerHTML = bugs[i].getId();
        var status = newRow.insertCell();
        status.innerHTML = bugs[i].getResolved();
        var summary = newRow.insertCell();
        summary.innerHTML = bugs[i].getSummary();
        var description = newRow.insertCell();
        description.innerHTML = bugs[i].getIssue();
        var time = newRow.insertCell();
        time.innerHTML = bugs[i].getTime();
        
        //button
        var btn = new ResolveButton(i);
        newRow.append(btn.getButton());
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
    displayBugs();
}


