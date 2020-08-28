import * as firebase from "firebase/app";
import "firebase/messaging";
const initializedFirebaseApp = firebase.initializeApp({
     // Project Settings => Add Firebase to your web app
    apiKey: "AIzaSyC5ke5EpaEpRvCSnVoUDkk1an6zAE0kKZw",
    authDomain: "innocheque-push.firebaseapp.com",
    databaseURL: "https://innocheque-push.firebaseio.com",
    projectId: "innocheque-push",
    storageBucket: "innocheque-push.appspot.com",
    messagingSenderId: "501449367080",
    appId: "1:501449367080:web:da296afb70a2f8f6649f1d"
});
const messaging = initializedFirebaseApp.messaging();
export { messaging };