var firebaseConfig = {
    apiKey: "AIzaSyCusMr1PqsMP51zmhOLt8FThfp0h8xkgPo",
    authDomain: "project1-909d1.firebaseapp.com",
    databaseURL: "https://project1-909d1.firebaseio.com",
    projectId: "project1-909d1",
    storageBucket: "project1-909d1.appspot.com",
    messagingSenderId: "387087048955",
    appId: "1:387087048955:web:2a5389698f807035"
  };

firebase.initializeApp(firebaseConfig);
const db=firebase.firestore();


// <--   getting data
var cafelist=document.getElementById('cafelist');



function renderCafe(doc){

var li=document.createElement("li");
var name=document.createElement("span");
var city=document.createElement("span");
var cross=document.createElement("div");
var button=document.createElement("button");

li.setAttribute("id",doc.id);
name.textContent=doc.data().name;
city.textContent=doc.data().city;
cross.textContent="X";
button.textContent="Update";
button.setAttribute("class","b1");


button.addEventListener("click",function(){

  let id=this.parentElement.getAttribute("id");

console.log(id);

var newname=prompt("Enter Update");



console.log(newname);

db.collection("cafes").doc(id).update({

name: newname,

})


  
});

li.appendChild(name);
li.appendChild(city);
li.appendChild(cross);
li.appendChild(button);

cafelist.appendChild(li);


 //<--- Deleting Data 
 
 cross.addEventListener("click",function(event){

event.stopPropagation();

let id = event.target.parentElement.getAttribute("id");

console.log(id);


db.collection("cafes").doc(id).delete();

 });


}


db.collection("cafes").orderBy("city").onSnapshot(function(snapshot){

    var changes = snapshot.docChanges();

    changes.map(function(change){

      console.log(change.doc.data());

      console.log(change.type);

      if(change.type=="added"){

        renderCafe(change.doc);
      } 
      else if(change.type=="removed"){

        let li=document.querySelector("[id="+change.doc.id+"]");

        cafelist.removeChild(li);
      }


    });



});
// getting data ---> 

// <--- Inserting Data 
const form=document.querySelector("#add-cafe-form");

console.log(form);


form.addEventListener("submit",function(event){

event.preventDefault();

var city1 = document.getElementById("city").value;
var name1 =  document.getElementById("name").value;

console.log(city1);
console.log(name1);

db.collection("cafes").add({

  name : name1,
  city : city1
})

form.name.value="";
form.city.value="";


});

// Inserting Data -- >
