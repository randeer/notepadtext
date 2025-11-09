import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCo-dliYA6nyWNRD6w8k1fV8qAiAbebdJ4",
  authDomain: "testlala-8e34d.firebaseapp.com",
  projectId: "testlala-8e34d",
  databaseURL: "https://testlala-8e34d-default-rtdb.firebaseio.com",
  storageBucket: "testlala-8e34d.appspot.com",
  messagingSenderId: "1003271711310",
  appId: "1:1003271711310:web:4c5e188cd9ef166a2c711f",
  measurementId: "G-R6Z9Q70TQP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
