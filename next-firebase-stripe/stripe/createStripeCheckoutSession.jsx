import { addDoc, collection } from "firebase/firestore";
import { app, db } from "../firebase/firebaseClient";
import initializeStripe from "./initializeStripe";
import { onSnapshot, doc } from "firebase/firestore";

export async function createCheckoutSession(uid) {
  const docRef = doc(db, "customers", uid);
  const customersRef = collection(docRef, "checkoutSessions");

  const checkoutSessionRef = await addDoc(customersRef, {
    products: "price_0M9zZygJmzQDibAWHcRC3gBX",
    success_url: "http://localhost:3000/",
    cancel_url: "http://localhost:3000/",
  });
  onSnapshot(checkoutSessionRef, async (snap) => {
    const { sessionId } = snap.data();
    if (sessionId) {
      const stripe = await initializeStripe();
      stripe.redirectToCheckout({ sessionId });
    }
  });
}
