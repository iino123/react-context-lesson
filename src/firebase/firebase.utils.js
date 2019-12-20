import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDtpNLhY8ooJydD5ZuqsKwKQUSU5W6jlL8",
  authDomain: "ec-sample-b8820.firebaseapp.com",
  databaseURL: "https://ec-sample-b8820.firebaseio.com",
  projectId: "ec-sample-b8820",
  storageBucket: "ec-sample-b8820.appspot.com",
  messagingSenderId: "890474208192",
  appId: "1:890474208192:web:f395628fff3cc4d9828625",
  measurementId: "G-HK7V7XC58Z"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
