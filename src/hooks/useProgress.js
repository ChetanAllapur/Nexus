import { useState, useEffect, useCallback } from "react";
import { db } from "../lib/firebase";
import { doc, onSnapshot, setDoc, getDoc } from "firebase/firestore";

const STORAGE_KEY = "roadmap_progress";

export function useProgress(userId) {
  const [completedTopics, setCompletedTopics] = useState({});
  const [isSyncing, setIsSyncing] = useState(false);

  // 1. Listen for Firestore updates
  useEffect(() => {
    if (!userId) {
      setCompletedTopics({});
      return;
    }

    const docRef = doc(db, "user_progress", userId);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setCompletedTopics(docSnap.data().topics || {});
      } else {
        // Initial state for new cloud user
        setCompletedTopics({});
      }
    });

    return () => unsubscribe();
  }, [userId]);

  // 2. Migration from LocalStorage to Cloud
  useEffect(() => {
    const migrate = async () => {
      if (!userId) return;
      
      const localData = localStorage.getItem(STORAGE_KEY);
      if (!localData) return;

      try {
        const parsed = JSON.parse(localData);
        if (Object.keys(parsed).length > 0) {
          const docRef = doc(db, "user_progress", userId);
          const docSnap = await getDoc(docRef);
          
          // Only migrate if cloud is empty or we want to merge
          if (!docSnap.exists() || Object.keys(docSnap.data().topics || {}).length === 0) {
            await setDoc(docRef, { topics: parsed }, { merge: true });
            console.log("Migration successful");
            localStorage.removeItem(STORAGE_KEY);
          }
        }
      } catch (e) {
        console.error("Migration failed", e);
      }
    };

    migrate();
  }, [userId]);

  const toggleTopic = useCallback(async (topicName) => {
    if (!userId) return;

    setIsSyncing(true);
    // Use functional update or latest state closure
    setCompletedTopics((prev) => {
      const nextTopics = { ...prev };
      if (nextTopics[topicName]) {
        delete nextTopics[topicName];
      } else {
        nextTopics[topicName] = true;
      }
      
      // Update Firestore asynchronously
      const docRef = doc(db, "user_progress", userId);
      setDoc(docRef, { topics: nextTopics }, { merge: true })
        .catch(e => console.error("Sync error:", e))
        .finally(() => setIsSyncing(false));
        
      return nextTopics;
    });
  }, [userId]);

  const getStackProgress = useCallback((stackData) => {
    let total = 0;
    let completed = 0;

    stackData.sections.forEach((section) => {
      section.items.forEach((item) => {
        total++;
        if (completedTopics[item.name]) {
          completed++;
        }
      });
    });

    return total === 0 ? 0 : Math.round((completed / total) * 100);
  }, [completedTopics]);

  const getTotalProgress = useCallback((topicsByKey) => {
    let total = 0;
    let completed = 0;

    Object.values(topicsByKey).forEach((stack) => {
      stack.sections.forEach((section) => {
        section.items.forEach((item) => {
          total++;
          if (completedTopics[item.name]) {
            completed++;
          }
        });
      });
    });

    return total === 0 ? 0 : Math.round((completed / total) * 100);
  }, [completedTopics]);

  return {
    completedTopics,
    toggleTopic,
    getStackProgress,
    getTotalProgress,
    isSyncing,
  };
}
