import { FirebaseError } from "firebase/app";

const AUTH_MESSAGES: Record<string, string> = {
  "auth/invalid-email": "El correo no es válido.",
  "auth/user-disabled": "Esta cuenta está deshabilitada.",
  "auth/user-not-found": "No existe una cuenta con ese correo.",
  "auth/wrong-password": "Contraseña incorrecta.",
  "auth/invalid-credential": "Correo o contraseña incorrectos.",
  "auth/email-already-in-use": "Ese correo ya está registrado.",
  "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
  "auth/too-many-requests": "Demasiados intentos. Espera un momento.",
  "auth/network-request-failed": "Sin conexión. Revisa tu internet.",
  "auth/email-not-verified":
    "Debes verificar tu correo antes de entrar. Revisa tu bandeja de entrada.",
};

const FIRESTORE_MESSAGES: Record<string, string> = {
  "permission-denied":
    "Permisos de Firestore insuficientes. Publica firestore.rules en Firebase Console.",
  "unavailable": "Firebase no está disponible. Intenta más tarde.",
  "failed-precondition":
    "Falta un índice en Firestore. Revisa la consola de Firebase.",
};

export function mapFirebaseError(error: unknown): string {
  if (error instanceof FirebaseError) {
    if (error.code.startsWith("auth/")) {
      return AUTH_MESSAGES[error.code] ?? error.message;
    }
    return FIRESTORE_MESSAGES[error.code] ?? error.message;
  }
  if (error instanceof Error) return error.message;
  return "Ocurrió un error inesperado.";
}
