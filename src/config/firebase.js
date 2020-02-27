import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwGpF19Ue148hROEdU6CT_V_cB-Y4_k5s",
  authDomain: "viajjar-a2557.firebaseapp.com",
  databaseURL: "https://viajjar-a2557.firebaseio.com",
  projectId: "viajjar-a2557",
  storageBucket: "viajjar-a2557.appspot.com",
  messagingSenderId: "886364689240",
  appId: "1:886364689240:web:dd9faf658a6fc95a590b2d",
  measurementId: "G-G8VLC683EG"
};
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);