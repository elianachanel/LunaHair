import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  where,
} from "firebase/firestore";
import { requireFirestore } from "./helpers";
import type { HairCareLog } from "@/types/hairLog";

const COLLECTION = "hairCareLogs";

export function hairLogDocId(userId: string, date: string): string {
  return `${userId}_${date}`;
}

export async function getHairCareLog(
  userId: string,
  date: string,
): Promise<HairCareLog | null> {
  const db = requireFirestore();
  const ref = doc(db, COLLECTION, hairLogDocId(userId, date));
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return snap.data() as HairCareLog;
}

export async function getHairCareLogsForMonth(
  userId: string,
  year: number,
  month: number,
): Promise<HairCareLog[]> {
  const db = requireFirestore();
  const prefix = `${year}-${String(month).padStart(2, "0")}`;
  const q = query(collection(db, COLLECTION), where("userId", "==", userId));
  const snap = await getDocs(q);
  return snap.docs
    .map((d) => d.data() as HairCareLog)
    .filter((l) => l.date.startsWith(prefix));
}

export async function getAllHairCareLogs(userId: string): Promise<HairCareLog[]> {
  const db = requireFirestore();
  const q = query(collection(db, COLLECTION), where("userId", "==", userId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as HairCareLog);
}

export async function upsertHairCareLog(log: HairCareLog): Promise<void> {
  const db = requireFirestore();
  const ref = doc(db, COLLECTION, log.id);
  await setDoc(
    ref,
    { ...log, updatedAt: new Date().toISOString() },
    { merge: true },
  );
}
