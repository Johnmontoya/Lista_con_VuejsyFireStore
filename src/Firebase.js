import * as firebase from 'firebase/app';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyAEspYGW7teTumj0gQXTkQ9tPxhOgL_0g8",
    authDomain: "ingresosyegresos-a7cc6.firebaseapp.com",
    databaseURL: "https://ingresosyegresos-a7cc6.firebaseio.com",
    projectId: "ingresosyegresos-a7cc6",
    storageBucket: "",
    messagingSenderId: "670820275667",
    appId: "1:670820275667:web:da451ff1d48a9d46"
};
firebase.initializeApp(config);

firebase.firestore();

export default firebase;