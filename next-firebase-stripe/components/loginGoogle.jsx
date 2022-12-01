import {
  getAuth,
  signInWithGithub,
  signInWithRedirect,
  signInWithPopup,
  GithubAuthProvider,
  getRedirectResult,
  GoogleAuthProvider,
  getAdditionalUserInfo,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

import { auth, db, googleAuthProvider } from "../firebase/firebaseClient";

export default function LoginGoogle(props) {
  //handler to pass into the button onClick
  const googleHandler = async () => {
    // signInWithRedirect(auth, googleAuthProvider);
    const result = await signInWithPopup(auth, googleAuthProvider);
    // console.log(result);
    if (result) {
      // This is the signed-in user
      const user = result.user;
      const dbRef = collection(db, "customers");
      await addDoc(dbRef, {
        uid: user.uid,
        name: user.displayName,
        authProvider: "Google",
        email: user.email,
      });
    }
  };
  return (
    <div className="div">
      <button onClick={googleHandler}> Sign in with Google </button>
    </div>
  );
}




















// The below is all legacy programming from Firebase v8, v9 offers much more modular and clearer and idomatic usage
// import firebase from "../firebase/firebaseClient";
// import { getFirestore, collection, setDoc} from "firebase/firestore";

// export default function Login(props) {
//   async function signInWithGithub() {
//     const userCredentials = await firebase
//       .auth()
//       .signInWithRedirect(new firebase.auth.GithubAuthProvider());

//     const db = getFirestore();KK:W

//     await setDoc(doc(db,"users",{
//         uid: userCredentials.user.uid,
//         email: userCredentials.user.email,
//         name: userCredentials.user.displayName,
//         provider: userCredentials.user.providerData[0].providerID,
//         photoUrl: userCredentials.user.photoURL,
//       }))

//     // pre-v9 --> firebase.firestore.collection("users").doc(userCredentials.user).set();
//   }
//   return (
//     <div className="div">
//       <button onClick={signInWithGithub}> Sign in with Github </button>
//     </div>
//   );
// }
