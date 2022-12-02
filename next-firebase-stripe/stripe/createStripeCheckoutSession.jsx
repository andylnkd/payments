import { addDoc, collection } from "firebase/firestore";
import { app, db } from "../firebase/firebaseClient";
import initializeStripe from "./initializeStripe";
import { onSnapshot, doc } from "firebase/firestore";

export async function createCheckoutSession(uid) {
  const docRef = doc(db, "customers", uid);
  const customersRef = collection(docRef, "checkout_sessions");

  const checkoutSessionRef = await addDoc(customersRef, {
    price: "price_0MA3a7gJmzQDibAWfw3X2sHT",
    success_url: "https://paymentstest1.herokuapp.com/",
    cancel_url: "https://paymentstest1.herokuapp.com/",
  });
  onSnapshot(checkoutSessionRef, async (snap) => {
    
    const {sessionId}  = snap.data();
    
    console.log('entering with '+sessionId)
    if (sessionId) {
      const stripe = await initializeStripe();
      stripe.redirectToCheckout({ sessionId });
    }
  });
}
