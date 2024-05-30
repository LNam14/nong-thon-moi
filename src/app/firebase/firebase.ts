import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export async function fireStoreConfig() {
  let app = null;

  if (getApps().length === 0) {
    const firebaseConfig: any = {
      apiKey: "AIzaSyAMyo0PzHXpQFBl-QjUMtINZQe5-xKwQYU",
      authDomain: "image-krong-ana.firebaseapp.com",
      projectId: "image-krong-ana",
      storageBucket: "image-krong-ana.appspot.com",
      messagingSenderId: "262480666659",
      appId: "1:262480666659:web:6959c4fd6372f3fbfc9196",
      measurementId: "G-NLNXSD8QBL",
    };

    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }

  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const storage = getStorage(app);

  return { auth, firestore, storage };
}
