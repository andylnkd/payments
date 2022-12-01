import {
  getAuth,
  signInWithGithub,
  signInWithRedirect,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";

import { auth, githubAuthProvider } from "../firebase/firebaseClient";

export default function LoginGithub(props) {
  const gitHubHandler = async () => {
    signInWithRedirect(auth, githubAuthProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;   
        // The signed-in user info.
        const user = result.user;
        // redux action? --> dispatch({ type: SET_USER, user });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <div className="div">
      <button onClick={gitHubHandler}> Sign in with GitHub </button>
    </div>
  );
}
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
