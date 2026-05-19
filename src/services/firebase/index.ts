export {
  isFirebaseConfigured,
  getFirebaseApp,
  getFirebaseAuth,
  getFirestoreDb,
  getFirebaseStorage,
} from "./config";

export {
  signInEmail,
  registerEmail,
  signOutUser,
  subscribeAuth,
  resendVerificationEmail,
  reloadAuthUser,
} from "./auth";
export { mapFirebaseError } from "./errors";
export { syncUserData, type SyncedUserData } from "./sync";
export * from "./firestore";
