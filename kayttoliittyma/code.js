function init() {
    let infoText = document.getElementById("infoText");
    infoText.innerHTML = "Ladataan tehtävälista palvelimelta, odota...";
    //loadTodos()
    loadTodos(); // otetaan tämä käyttöön, kun alkuvaih. testaus tehty
  }
  
  async function loadTodos() {
    console.log("Konsoliin pitaisi tulla, tietokannan tietoa: ");
  
    let response = " ";
    response = await fetch("/todos");


    let todos = " ";
    todos = await response.json();
  
    console.log(todos);
    //showTodos(todos)
    showTodos(todos); // otetaan tämä käyttöön, kun alkuvaih. testaus tehty
  }
  



  function createTodoListItem(todo) {
    // luodaan uusi LI-elementti
    let li = document.createElement("li");
    // luodaan uusi id-attribuutti
    let li_attr = document.createAttribute("id");
    // kiinnitetään tehtävän/todon id:n arvo luotuun attribuuttiin
    li_attr.value = todo._id;
    // kiinnitetään attribuutti LI-elementtiin
    li.setAttributeNode(li_attr);
    // luodaan uusi tekstisolmu, joka sisältää tehtävän/todon tekstin
    let text = document.createTextNode(todo.text);
    // lisätään teksti LI-elementtiin
    li.appendChild(text);
  


    let span_attr = document.createAttribute("class");
    // kiinnitetään attribuuttiin delete-arvo, ts. class="delete", jotta saadaan tyylit tähän kiinni
    span_attr.value = "delete";
    // luodaan uusi SPAN-elementti, käytännössä x-kirjan, jotta tehtävä saadaan poistettua
    let span = document.createElement("span");
    // kiinnitetään SPAN-elementtiin yo. attribuutti
    span.setAttributeNode(span_attr);
  
    // luodaan uusi class-attribuutti
    let span_attribute = document.createAttribute("class");
    // kiinnitetään attribuuttiin edit-arvo, ts. class="edit", jotta saadaan tyylit tähän kiinni
    span_attribute.value = "edit";
  
    // luodaan uusi SPAN-elementti,EDIT, jotta tehtävä saadaan muokattua
    let spanni = document.createElement("span");
    // kiinnitetään SPAN-elementtiin yo. attribuutti
    spanni.setAttributeNode(span_attribute);
  


    // EDITOINTINAPPI
    let editointi = document.createTextNode(" EDITOI ");
    spanni.appendChild(editointi);
  
    // määritetään SPAN-elementin onclick-tapahtuma kutsumaan editTodo-funkiota
    spanni.onclick = function () {
      editTodo(todo._id);
    };

  
    // TUHOA NAPPI;    luodaan tekstisolmu arvolla x
    let x = document.createTextNode(" x ");
    // kiinnitetään x-tekstisolmu SPAN-elementtiin (näkyville)
    span.appendChild(x);
    // määritetään SPAN-elementin onclick-tapahtuma kutsumaan removeTodo-funkiota
    span.onclick = function () {
      removeTodo(todo._id);
    };
  
    // lisätään SPAN-elementit LI-elementtiin
    li.appendChild(spanni);
    li.appendChild(span);
    // palautetaan luotu LI-elementti
    // on siis muotoa: <li id="mongoIDXXXXX">Muista soittaa...<span class="delete">x</span><span class="edit">EDITOI</span></li>
    return li;
  }
  


  
  function showTodos(todos) {
    let todosList = document.getElementById("todosList");
    let infoText = document.getElementById("infoText");
    // no todos
    if (todos.length === 0) {
      infoText.innerHTML = "Ei tehtäviä";
    } else {
      todos.forEach((todo) => {
        let li = createTodoListItem(todo);
        todosList.appendChild(li);
      });
      infoText.innerHTML = "";
    }
  }
  

  async function addTodo() {
    let newTodo = document.getElementById("newTodo");
    const data = { text: newTodo.value };
    const response = await fetch("/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let todo = await response.json();
    let todosList = document.getElementById("todosList");
    let li = createTodoListItem(todo);
    todosList.appendChild(li);
  
    let infoText = document.getElementById("infoText");
    infoText.innerHTML = "";
    newTodo.value = "";
  }
  

  async function removeTodo(id) {
    const response = await fetch("/todos/" + id, {
      method: "DELETE",
    });
    let responseJson = await response.json();
    let li = document.getElementById(id);
    li.parentNode.removeChild(li);
  
    let todosList = document.getElementById("todosList");
    if (!todosList.hasChildNodes()) {
      let infoText = document.getElementById("infoText");
      infoText.innerHTML = "Ei tehtäviä";
    }
  }
  

    // Lisätty uusi funktio,  jolla voidaan  muokata  olemassa olevaa  Todo tehtävää.

    async function editTodo(id) {
      let todoText = "";
          todoText = prompt("Muokkaa tekstiä:");

          //todoText = "titi";
          
      if (todoText === null) {
        return;
      }
    
      console.log(todoText);          // tämä näkyy Internet Selaimen, kehittäjä työkalujen  Konsolissa.      

      const data = { text: todoText };
      const response = await fetch("/todos/" + id, {               // tämä tallentaa uuden muokatun arvon tietokantaan PUT käskyllä.
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),        
      });

      // poistetaan  listasta,    vanha  tieto
      let vanha_li = document.getElementById(id);
      vanha_li.parentNode.removeChild(vanha_li);
      // tämä toimii,  vanha tieto  poistuu  listasta




      // uutta muokattua  pitaisi saada  listalle lisattya,  kokeillaan
      //let muokattu_li = createTodoListItem("jotain");
      //todosList.appendChild(muokattu_li);





    //showTodos(id);


    // Ladataan uudestaan  tietokannasta   tehtävät,  että nähdään,  menikö muutos,  PUT:lla perille.
    // loatTodos()  pitäisi ladata tiedot uudestaan ruudulle.
    // mutta se jatti listan alkuun vanhat tiedot.
   

    // lisatty loadTodos() funktioon  tyhjennys,  niin  voi ladata listan aina uudestaan tietokannasta.

    init();

    }
    



