import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { requireFirestore } from "./helpers";
import type { Routine } from "@/types/user";
import type { HairActivity } from "@/types/lunar";

const COLLECTION = "routines";

export async function getUserRoutines(userId: string): Promise<Routine[]> {
  const db = requireFirestore();
  const q = query(
    collection(db, COLLECTION),
    where("userId", "==", userId),
    orderBy("scheduledAt", "asc"),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Routine);
}

export async function createRoutine(
  userId: string,
  data: Omit<Routine, "id" | "userId" | "createdAt">,
): Promise<Routine> {
  const db = requireFirestore();
  const ref = doc(collection(db, COLLECTION));
  const now = new Date().toISOString();
  const routine: Routine = {
    id: ref.id,
    userId,
    ...data,
    createdAt: now,
  };
  await setDoc(ref, routine);
  return routine;
}

export async function updateRoutine(
  id: string,
  data: Partial<Pick<Routine, "title" | "description" | "scheduledAt" | "activity" | "completed" | "reminderEnabled">>,
): Promise<void> {
  const db = requireFirestore();
  await updateDoc(doc(db, COLLECTION, id), data);
}

export async function toggleRoutineComplete(
  id: string,
  completed: boolean,
): Promise<void> {
  const db = requireFirestore();
  await updateDoc(doc(db, COLLECTION, id), { completed });
}

export async function deleteRoutine(id: string): Promise<void> {
  const db = requireFirestore();
  await deleteDoc(doc(db, COLLECTION, id));
}

export type CreateRoutineInput = {
  title: string;
  scheduledAt: string;
  activity: HairActivity;
  description?: string;
  reminderEnabled?: boolean;
};
