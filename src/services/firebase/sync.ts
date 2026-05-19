import { isFirebaseConfigured } from "./config";
import {
  getUserProfile,
  getUserRoutines,
  getAllHairCareLogs,
} from "./firestore";

export type SyncedUserData = {
  profile: Awaited<ReturnType<typeof getUserProfile>>;
  routines: Awaited<ReturnType<typeof getUserRoutines>>;
  hairLogs: Awaited<ReturnType<typeof getAllHairCareLogs>>;
};

/**
 * Carga perfil, rituales y todos los registros capilares desde Firestore.
 */
export async function syncUserData(userId: string): Promise<SyncedUserData> {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase no configurado");
  }

  const [profile, routines, hairLogs] = await Promise.all([
    getUserProfile(userId),
    getUserRoutines(userId),
    getAllHairCareLogs(userId),
  ]);

  return { profile, routines, hairLogs };
}
