// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getAuth, // Correct case
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  getFirestore,
  setDoc,
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

function showMessage(message, divId) {
  var messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(() => {
    messageDiv.style.opacity = 0;
  }, 5000);
}

const signUp = document.getElementById("submitSignUp");
signUp.addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.getElementById("rEmail").value;
  const password = document.getElementById("rPassword").value;
  const firstName = document.getElementById("fName").value;
  const lastName = document.getElementById("lName").value;

  const auth = getAuth(app); // Correct method name
  const db = getFirestore();

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        email: email,
        firstName: firstName,
        lastName: lastName,
      };
      // alert("Account created successfully");
        showMessage("Account created successfully", "signUpMessage");
      const docRef = doc(db, "users", user.uid);
      return setDoc(docRef, userData);
    })
    .then(() => {
      window.location.href = "index.html";
    })
    .catch((error) => {
      const errorCode = error.code; // Correct property for error code
      if (errorCode === "auth/email-already-in-use") {
        // Correct error code string
        // alert("Email Address Exists !!!");
        showMessage("Email Address Exists !!!", "signUpMessage");
      } else {
        showMessage("Unable to Create User", "signUpMessage");
        // alert("Unable to Create User");
      }
    });
});

const signIn = document.getElementById("submitSignIn");
signIn.addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      showMessage("Login Successful","signInMessage")
      // alert("Login Successful");
      const user = userCredential.user;
      localStorage.setItem("loggedInUserId", user.uid);
      window.location.href="homepage.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode == "auth/invalid-credential") {
        showMessage("Incorrect Email or Password","signInMessage")
        // alert("Incorrect Email or Password");
      } else {
        showMessage("Account does not exist","signInMessage")
        // alert("Account does not exist");
      }
    });
});
