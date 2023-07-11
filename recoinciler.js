function reconciler(data) {
    var added = 0;
    var updated = 0;
    var deleted = 0;
    var parentElement = document.getElementById("mainArea");
    var currentChild = Array.from(parentElement.children);
    data.forEach((item) => {
        // check if id is same 
        var existingChild = currentChild.find((element) => { //.find method  iterates array elements if the condition is true 
            return element.dataset.id === String(item.id)     // then the argument(array element) value is assigned to variable  
        });
        if(existingChild){
            updated++;
            existingChild.children[0].innerHTML=item.title;
            existingChild.children[1].innerHTML=item.description;
            // remove  existingChild from currentChild array 
            currentChild = currentChild.filter((child) => {
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
    // Any children left in the currentChildren array no longer exist in the data, so remove them
    currentChild.forEach((child) => {
        deleted++;
        parentElement.removeChild(child)
    })
    console.log(added);
    console.log(updated);
    console.log(deleted);    
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
    reconciler(todo)
},5000)