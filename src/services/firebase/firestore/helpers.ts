import { getFirestoreDb, isFirebaseConfigured } from "../config";
import type { Firestore } from "firebase/firestore";

export function requireFirestore(): Firestore {
  if (!isFirebaseConfigured) {
    throw new Error(
      "Firebase no está configurado. Copia .env.example a .env y añade tus credenciales.",
    );
  }
  return getFirestoreDb();
}
