// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0Ji5qmQA6xxz6JTvzgsMZAlqZpHrSW4Q",
  authDomain: "grupo4-codigo-g14.firebaseapp.com",
  projectId: "grupo4-codigo-g14",
  storageBucket: "grupo4-codigo-g14.appspot.com",
  messagingSenderId: "47468767952",
  appId: "1:47468767952:web:a0993e2f33d519ca42ccd5",
  measurementId: "G-GM1N4YKT29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);






// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, addDoc } from "firebase/firestore";
// import fs from "fs"; // Importa el módulo fs para leer archivos

// const firebaseConfig = {
//     apiKey: "AIzaSyD0Ji5qmQA6xxz6JTvzgsMZAlqZpHrSW4Q",
//     authDomain: "grupo4-codigo-g14.firebaseapp.com",
//     projectId: "grupo4-codigo-g14",
//     storageBucket: "grupo4-codigo-g14.appspot.com",
//     messagingSenderId: "47468767952",
//     appId: "1:47468767952:web:a0993e2f33d519ca42ccd5",
//     measurementId: "G-GM1N4YKT29"
//   };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Obtén una referencia a la colección en Firestore
// const db = getFirestore(app);
// const collectionRef = collection(db, "productos");

// // Lee el archivo JSON de manera síncrona
// const jsonData = JSON.parse(fs.readFileSync("../Json/Productos.json", "utf-8"));

// // Itera sobre los datos y agrégalos a Firestore
// jsonData.forEach(async data => {
//   try {
//     await addDoc(collectionRef, data);
//     console.log("Documento agregado exitosamente:", data);
//   } catch (error) {
//     console.error("Error al agregar el documento:", error);
//   }
// });