import {loadStripe} from '@stripe/stripe-js'

const initializeStripe = async () => {
    const stripePromise = await loadStripe("pk_test_nGfdBGt8mRdeCpB6JCX60Mz9");
    return stripePromise;
}


export default initializeStripe;