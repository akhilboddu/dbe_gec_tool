// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { Mixpanel } from "./mixpanel";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCL78bwOxTujHQyVfLug8EEJz2S3V4dTOM",
  authDomain: "dbe-system.firebaseapp.com",
  projectId: "dbe-system",
  storageBucket: "dbe-system.appspot.com",
  messagingSenderId: "283774430566",
  appId: "1:283774430566:web:550ae98453e23f4d4faca7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const logout = (navigate) => {
  const user = JSON.parse(localStorage.getItem("user"));
  signOut(auth)
    .then(() => {
      //console.log("Successfully signed out");
      localStorage.removeItem("user");

      Mixpanel.reset();

      if (user.role === "teacher") {
        navigate({ to: "/login/teacher", replace: true });
      } else {
        navigate({ to: "/login/", replace: true });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getUserProfile = async (collection, userId) => {
  const docRef = doc(db, collection, userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // Spread out the data object and remove the uid field
    const { uid, ...userDataWithoutUid } = docSnap.data();
    /*  console.log("Document data:", {
      ...userDataWithoutUid,
      id: uid,
    }); */
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...userDataWithoutUid,
        id: uid,
      })
    );

    return {
      ...userDataWithoutUid,
      id: uid,
    };
  } else {
    // docSnap.data() will be undefined in this case
    console.log("Acess Denied!");
    return null;
  }
};
