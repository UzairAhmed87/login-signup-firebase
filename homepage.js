import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getAuth, // Correct case
 onAuthStateChanged,
 signOut
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  getFirestore,
  getDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA55ime-pQV4MzzNKzcPPYpAyjMLdzK-mE",
    authDomain: "test-project-5131f.firebaseapp.com",
    projectId: "test-project-5131f",
    storageBucket: "test-project-5131f.appspot.com",
    messagingSenderId: "830994570541",
    appId: "1:830994570541:web:dae988d0ea0ebc4bc507a4",
    measurementId: "G-0X876TG4N4",
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const auth = getAuth();
  const db = getFirestore()

  onAuthStateChanged(auth,(user)=>{
    const loggedInUserId = localStorage.getItem('loggedInUserId')
    
    
    if (loggedInUserId) {
        const docRef = doc(db, "users" , loggedInUserId)
       
        
        getDoc(docRef)
        .then((docSnap)=>{
            
            
            if (docSnap.exists()) {
                const userData = docSnap.data()
                console.log(userData);
                
                document.getElementById('loggedUserFName').innerText = userData.firstName
                document.getElementById('loggedUserLName').innerText = userData.lastName
                document.getElementById('loggedUserEmail').innerText = userData.email
            }else{
                console.log("no document found matching Id")
            }
        })
        .catch((error)=>{
console.log("Error getting document");

        })
  }
else{
    console.log("User Id not found");
    
}
})
const logoutbtn = document.getElementById("logout")

logoutbtn.addEventListener("click",()=>{
    localStorage.removeItem("loggedInUserId")
    signOut(auth)
    .then(()=>{
        window.location.href = "index.html"
    })
    .catch((error)=>{
        console.log("Error signing out",error);
        
    })
})