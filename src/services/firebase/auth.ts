import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  reload,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { getFirebaseAuth, isFirebaseConfigured } from "./config";

export async function signInEmail(email: string, password: string) {
  const { user } = await signInWithEmailAndPassword(
    getFirebaseAuth(),
    email.trim(),
    password,
  );
  return user;
}

export async function registerEmail(
  email: string,
  password: string,
  displayName: string,
) {
  const { user } = await createUserWithEmailAndPassword(
    getFirebaseAuth(),
    email.trim(),
    password,
  );
  await updateProfile(user, { displayName: displayName.trim() });
  await sendEmailVerification(user);
  return user;
}

export async function resendVerificationEmail(user: User) {
  await sendEmailVerification(user);
}

export async function reloadAuthUser(user: User) {
  await reload(user);
  return user;
}

export async function signOutUser() {
  await signOut(getFirebaseAuth());
}

export function subscribeAuth(callback: (user: User | null) => void) {
  if (!isFirebaseConfigured) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(getFirebaseAuth(), callback);
}
