import { auth } from "../firebase/firebaseClient";
import { useState, useEffect } from "react";
import isUserPro from "./isUserPro";

export default function useProStatus() {
  const [proStatus, setProStatus] = useState(false);
  useEffect(() => {
    if (auth.currentUser) {
      const checkProStatus = async function () {
        setProStatus(await isUserPro());
      };
      checkProStatus();
    }
  }, [auth.currentUser]);
  return proStatus;
}
