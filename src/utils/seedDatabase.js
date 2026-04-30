import { db } from "../lib/firebase";
import { collection, doc, writeBatch } from "firebase/firestore";
import { NOTES } from "../data/notes";

/**
 * SEEDING SCRIPT
 * This function will take all notes from notes.js and push them to Firestore.
 * Each key in the NOTES object becomes a document ID in the 'notes' collection.
 */
export const seedNotesToFirestore = async () => {
  console.log("Starting database seeding...");
  
  const batch = writeBatch(db);
  const notesCollection = collection(db, "notes");

  try {
    const noteKeys = Object.keys(NOTES);
    let count = 0;

    for (const key of noteKeys) {
      const noteData = { ...NOTES[key] };
      
      // Firestore doesn't support nested arrays (rows in tables)
      // We stringify the table object to preserve the structure
      if (noteData.table) {
        noteData.table = JSON.stringify(noteData.table);
      }

      // Sanitize the key to avoid path segment errors (Firestore treats / as a sub-collection)
      const sanitizedKey = key.replace(/\//g, "-");

      const noteRef = doc(notesCollection, sanitizedKey);
      batch.set(noteRef, {
        ...noteData,
        originalKey: key, // Keep original key for reference
        updatedAt: new Date().toISOString(),
      });
      count++;
    }

    await batch.commit();
    console.log(`Successfully seeded ${count} notes to Firestore!`);
    return { success: true, count };
  } catch (error) {
    console.error("Error seeding database:", error);
    return { success: false, error: error.message };
  }
};
