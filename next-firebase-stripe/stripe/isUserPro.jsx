import { auth } from "../firebase/firebaseClient";

export default async function isUserPro() {
  await auth.currentUser?.getIdToken(true); //get users JWT for Firebase services
  const decodedToken = await auth.currentUser?.getIdTokenResult(); //get a refresh done regardless of the earlier JWT
  return decodedToken?.claims?.stripeRole ? true : false;
}
