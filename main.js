const usernameElement = document.getElementById("username");

const messageElement = document.getElementById("message");

const button = document.getElementById("submitButton");

button.addEventListener("click",updateDB);

const Div= document.querySelector(".allMessages");


//Set database object here
const db = firebase.firestore();

/**
 * Updates the database with the username and message.
 */
function updateDB(event){
    event.preventDefault();
    const username        = usernameElement.value;
    const message         = messageElement.value;
    const newP= document.createElement("p");

 
 newP.innerText= `${username} : ${message}`;

 Div.append(newP);
    usernameElement.value = "";
    messageElement.value  = "";


    console.log(username + " : " + message);

    //Update database here
    db.collection("message")
    .add({
        username: username,
        message: message,
        create:firebase.firestore.FieldValue.serverTimestamp()
    })
    .then (function (docRef){
        console.log(docRef);
        
    })
    .catch(function(error) {
        console.error( error);
    });
}

// get database collection messages
db.collection("message")

.get()

.then(function(response){

    console.log(response);

    //take the response and iterate through each document

    response.forEach(function(doc){

console.log(doc.data())

 const newP= document.createElement("p");

 
 newP.innerText= `${doc.data().username} : ${doc.data().message}`;

 Div.append(newP);
    
    })
})