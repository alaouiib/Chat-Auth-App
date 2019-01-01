import firebase from 'firebase/app'
import firestore from 'firebase/firestore'

var config = {
    apiKey: "AIzaSyDD7IZiySOgO1WacryMZ9oK7Y6x9D4J8k0",
    authDomain: "chatiot.firebaseapp.com",
    databaseURL: "https://chatiot.firebaseio.com",
    projectId: "chatiot",
    storageBucket: "chatiot.appspot.com",
    messagingSenderId: "872988583108"
  };
 const firebaseApp = firebase.initializeApp(config);
 firebaseApp.firestore().settings({ timestampsInSnapshots: true })


// export firestore to be able to interact with the db anywhere
export default firebaseApp.firestore()
