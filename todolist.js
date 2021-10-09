let todoLists = [];

let currentChange;
let flag = true;

console.log(todoLists);
 var Page=document.querySelector("#page");


function initialisation() {
  if (flag) {
    document.getElementById("page2").style.display = "none";
    document.getElementById("page").style.display = "block";
    document.getElementById("page").style.visibility= "visible";

  } else {
    document.getElementById("page").style.display = "none";
    document.getElementById("page2").style.display = "block";
    document.getElementById("page2").style.visibility= "visible";

  }
  if (todoLists.length === 0) {
    console.log(document.getElementById("noTodo"));
    console.log(todoLists);
    document.getElementById("noTodo").style.display = "block";
  } else {
    console.log("inside");
    document.getElementById("noTodo").style.display = "none";
  }
}

initialisation();

function addbutton(){
    console.log("add is hitted");
    document.querySelector("#Popup").style.visibility="visible";
    document.querySelector("#page").style.filter='blur(0.4em)';
    
}


function addlists(){
  console.log(todoLists.length);
    var heading =document.getElementById("listpopupinput").value;
    if (heading !=="") {
        const todo = {
            heading,
            checked: false,
            subTask:[],
            id: Date.now(),
          };    
    todoLists.push(todo);
  
      document.getElementById('Popup').style.visibility="hidden";
      document.getElementById("listpopupinput").value='';
      Page.style.filter='';
      flag=true;
      renderlists();
      console.log(todoLists.length);
    }
}


function renderlists(todo){
  initialisation();

    const list = document.getElementById("card");
    let child=list.lastElementChild;
    console.log(child);
    while (child) {
      list.removeChild(child);
      child = list.lastElementChild;
    }
    for(let i=0;i<todoLists.length;i++){
        const node = document.createElement('div');
        node.setAttribute("class",'todo-cards');
        node.setAttribute("data-key", todoLists[i].id);
        node.getAttribute("data-key");
        node.innerHTML=`
        <div class="trip-card-1" onclick="redirect(this)">
            ${todoLists[i].heading}
        </div>
        <hr class="hr-margin">
        <br>
        <ul class="MyList" id="myList" style="list-style-type:none;">
        </ul>
        <button class="card-trash" id="remove-list-icon" onclick="removecard(this)"><i class="far fa-trash-alt" aria-hidden="true"></i></button><span><button class=" icon-pluscircle card-icon" id="add-new-list" onclick="addNewItem(this)"><i class="fas fa-plus-circle"></i></button></span>
            
        
        `;
        //console.log(node.childNodes);
        list.append(node);

        let currentTodo = todoLists[i];


      for (let j = 0; j < currentTodo.subTask.length; j++) {
        let classToPut = currentTodo.subTask[j].marked
        ? "card-item card-item-checked"
        : "card-item";
        let rest = currentTodo.subTask[j].marked
        ? ""
        : '<button class = "markDone" onclick="markCompleted(this)">Mark Done</button>';
        const liNode = document.createElement("li");
         liNode.setAttribute("class", classToPut);
         liNode.setAttribute("data-key", currentTodo.subTask[j].id);
         liNode.innerHTML = ` ${currentTodo.subTask[j].name} ${rest}`;
         node.childNodes[7].append(liNode);
      }
    }
}

console.log(todoLists);
console.log(todoLists.length);
   

function removecard(element) {
  let Todocard=element.parentElement;
  console.log(Todocard);
  for (let i = 0; i < todoLists.length; i++) {
    if (todoLists[i].id == Todocard.getAttribute("data-key")) {
      todoLists.splice(i, 1);
    }
    flag=true;
    renderlists(todoLists);
  }
}
    

function addNewItem(element){
  
document.querySelector("#Popup2").style.visibility="visible";   
document.querySelector("#page").style.filter='blur(0.4em)';
document.querySelector("#page2").style.filter='blur(0.4em)';

currentkey=element;
}


function addItem(){
    console.log(currentkey);
    
    let cardskey=currentkey.parentElement.parentElement;
    console.log(cardskey);
    let id=cardskey.getAttribute("data-key");
    console.log(id);
    let cardsKeY=currentkey.parentElement.parentElement.childNodes[7].nodeName;
    console.log(cardsKeY);

    let list;
    if (flag) {
      list = currentkey.parentElement.parentElement.childNodes[7];
    } else {
      list = currentkey.parentElement.parentElement.childNodes[5];
      listName=currentkey.parentElement.parentElement.childNodes[5].nodename;
      console.log(list);
      console.log(listName);
    }

    let txtVal =document.getElementById("itempopupinput").value;
       
    
    const liNode = document.createElement("LI");
    liNode.setAttribute("class",flag ? `card-item` : `card-item-2`);
    liNode.setAttribute("data-key", Date.now());
    liNode.innerHTML = ` ${txtVal}<button class = 'markDone' onclick="markCompleted(this)">Mark Done</button>`;
    let currentTodo;

    //Find in the todo array
        for (let i = 0; i < todoLists.length; i++) {
            if (todoLists[i].id == id) {
              todoLists[i].subTask.push({
                name: txtVal,
                marked: false,
                id: liNode.getAttribute("data-key"),
              });
              console.log(todoLists[i]);
            }
          }
    list.append(liNode);
    console.log(list);   
    toggle();
}

function markCompleted(element) {
 
  let classToPut = flag
    ? "card-item card-item-checked"
    : "card-item-2 card-item-checked";
  element.parentNode.setAttribute("class", classToPut);
  let id = element.parentNode.parentNode.parentNode.getAttribute("data-key");
  let subTaskId = element.parentNode.getAttribute("data-key");

  // Find in the todo array
  for (let i = 0; i < todoLists.length; i++) {
    if (todoLists[i].id == id) {
      for (let j = 0; j < todoLists[i].subTask.length; j++) {
        if (todoLists[i].subTask[j].id == subTaskId) {
          todoLists[i].subTask[j].marked = true;
        }
      }
    }
  }
  element.parentNode.removeChild(element);
 }



function toggle(){
    document.getElementById("listpopupinput").value='';
    document.getElementById('Popup').style.visibility="hidden";
    document.getElementById("itempopupinput").value='';
    document.getElementById('Popup2').style.visibility="hidden";
    document.querySelector("#page2").style.filter='';
    Page.style.filter='';

}


function redirect(element) {
  let id = element.parentNode.getAttribute("data-key");

  let currentTodo;
  //Find in the todo array
  for (let i = 0; i < todoLists.length; i++) {
    if (todoLists[i].id == id) {
      currentTodo = todoLists[i];
    }
  }
  flag = false;
  initialisation();
 

  document.getElementById("currentHeading").textContent = currentTodo.heading;
  document.getElementById("currentHeading-11").textContent = currentTodo.heading;
  document.getElementById("currentHeading-1").textContent = currentTodo.heading;
  
  document
    .getElementById("currentHeading-1")
    .parentNode.setAttribute("data-key", currentTodo.id);

  console.log(currentTodo);

  let e = document.getElementById("singleList");
  var child = e.lastElementChild;
  while (child) {
    e.removeChild(child);
    child = e.lastElementChild;
  }
  for (let i = 0; i < currentTodo.subTask.length; i++) {
    let classToPut = currentTodo.subTask[i].marked
      ? "card-item-2 card-item-checked"
      : "card-item-2";
    let rest = currentTodo.subTask[i].marked
      ? ""
      : '<button class = "markDone" onclick="markCompleted(this)">Mark Done</button>';
    const node = document.createElement("li");
    node.setAttribute("class", classToPut);
    node.setAttribute("data-key", currentTodo.subTask[i].id);
    node.innerHTML = ` ${currentTodo.subTask[i].name} ${rest}`;
    console.log(node.childNodes);
    let e = document.getElementById("singleList");

    e.append(node);
  }
}

function goBack(){
      flag=true;
      renderlists();
}


  