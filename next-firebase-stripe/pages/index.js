import styles from "../styles/Home.module.css";
import LoginGithub from "../components/loginGithub";
import LoginGoogle from "../components/loginGoogle";
import { useAuthState } from "react-firebase-hooks/auth";
import { createCheckoutSession } from "../stripe/createStripeCheckoutSession";
import useProStatus from "../stripe/useProStatus";
import { auth } from "../firebase/firebaseClient";

export default function Home() {
  const [user, userLoading] = useAuthState(auth);

  const userIsPro = useProStatus(user);

  return (
    <div className={styles.container}>
      {/* <LoginGithub /> */}
      {!user && userLoading && <h1> Loading...brt!</h1>}
      {!user && !userLoading && <LoginGoogle />}
      {user && !userLoading && (
        <div>
          <h1> Hey there, {user.displayName}</h1>
        {!userIsPro ? (
            <button onClick={() => createCheckoutSession(user.uid)}>
                You can upgrade now and get the full prospect list, a virtual assistant and email alerts before the free users get them the next day!!
            </button>
        ): (<h1> Hey {user.displayName} thanks for a being a valued Pro member! </h1>)}
        </div>
      )}
    </div>
  );
}
