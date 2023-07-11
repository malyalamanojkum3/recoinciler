var vDOM = [];
function reconciler(existingDOM, currentDOM) {
    var added = 0;
    var updated = 0;
    var deleted = 0;
    var parentElement = document.getElementById("mainArea");
    currentDOM.forEach((item) => {
        // check if id is same 
        var existingChild = existingDOM.find((element) => { //.find method  iterates array elements if the condition is true 
            return element.id === item.id     // then the argument(array element) value is assigned to variable  
        });
        // compares both Dom's and finds the element in existingDom array with same id of 'item' from currentDom array if present
        if(existingChild){
            updated++;
            existingHtmlItem = document.querySelector(`[data-id='${item.id}']`);
            // finds the html element with id of currentChild array element
            existingHtmlItem.children[0].innerHTML=item.title;
            existingHtmlItem.children[1].innerHTML=item.description;
            // remove  existingChild from existingDOM array 
            existingDOM = existingDOM.filter((child) => {
                return child !== existingChild;
            });
        }
        else {
            added++;
            var childElement = document.createElement("div");
            childElement.dataset.id = item.id;
    
            var grandChildElement1 = document.createElement("span");
            grandChildElement1.innerHTML = item.title;
    
            var grandChildElement2 = document.createElement("span");
            grandChildElement2.innerHTML = item.description;
    
            var grandChildElement3 = document.createElement("button");
            grandChildElement3.innerHTML = "DELETE";
            grandChildElement3.setAttribute("onclick", "delete("+item.id+")")
    
            childElement.appendChild(grandChildElement1);
            childElement.appendChild(grandChildElement2);
            childElement.appendChild(grandChildElement3);
            parentElement.appendChild(childElement);  
        }
    });
    // Any children left in the existingDOM array array no longer exist in the currentDOM, so remove them
    existingDOM.forEach((child) => {
        deleted++;
        var childToRemove = document.querySelector(`[data-id='${child.id}']`);
        parentElement.removeChild(childToRemove)
    })
    console.log(added);
    console.log(updated);
    console.log(deleted);    
}

function updateVDOM(data) {
    var existingDOM = [...vDOM];
    // the current Dom is copied here
    vDOM= data.map((item) => {
        return {
            id : item.id,
            title : item.title,
            description : item.description
        }
    })
    // new Dom is stored here 
    reconciler(existingDOM,vDOM)
}
window.setInterval(() => {
    let todo = [];
    for(var i =0 ; i < Math.floor(Math.random()*100);i++){
        todo.push({
            id : i+1,
            title : "reconciler",
            description : "building it"
        })
    }
    updateVDOM(todo)
},5000)