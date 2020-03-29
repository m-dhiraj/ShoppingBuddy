import * as firebase from 'firebase';
import 'firebase/auth';
import firestore from 'firebase/firestore';
const settings = {timestampsInSnapshots: true};
var config = {
    apiKey: "AIzaSyBOGzCxsd2Xd9gDlGc9coHmAB5Ieb1SWqM",
    authDomain: "my-awesome-project-6c49b.firebaseapp.com",
    databaseURL: "https://my-awesome-project-6c49b.firebaseio.com",
    projectId: "my-awesome-project-6c49b",
    storageBucket: "my-awesome-project-6c49b.appspot.com",
    messagingSenderId: "315814033958",
};

  firebase.initializeApp(config);


const auth = firebase.auth();
firebase.firestore().settings(settings);
export { auth };
export default firebase;