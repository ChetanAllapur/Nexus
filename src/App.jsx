import { useMemo, useState, useEffect, useCallback } from "react";
import { Hero } from "./components/Hero";
import { NoteModal } from "./components/NoteModal";
import { Overview } from "./components/Overview";
import { ScheduleView } from "./components/ScheduleView";
import { SearchOverlay } from "./components/SearchOverlay";
import { Tabs } from "./components/Tabs";
import { TopicSection } from "./components/TopicSection";
import { Login } from "./components/Login";
import { auth, db } from "./lib/firebase";

// Check if Firebase is configured
if (!auth || !db) {
  console.error("Firebase not configured. Please create .env.local with VITE_FIREBASE_* keys.");
}
import { onAuthStateChanged, signOut } from "firebase/auth";
import { HERO_PILLS, STACK_COLORS, STACK_ORDER, TABS, TIME_BLOCKS } from "./constants/roadmap";
import { LEVEL_META } from "./data/levelMeta";
import { MONTHS_META } from "./data/monthsMeta";
import { MONTH_HIGHLIGHTS } from "./data/monthHighlights";
import { SCHEDULE } from "./data/schedule";
import { TOPICS } from "./data/topics";
import { NOTES } from "./data/notes";
import { useRoadmapState } from "./hooks/useRoadmapState";
import { useProgress } from "./hooks/useProgress";
import { collection, onSnapshot, doc, setDoc } from "firebase/firestore";

export default function App() {
  const {
    activeMonth,
    activeStack,
    filteredSchedule,
    mainTab,
    openWeeks,
    setActiveMonth,
    setActiveStack,
    setMainTab,
    toggleWeek,
  } = useRoadmapState();

  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Global Timer State
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showFloatingTimer, setShowFloatingTimer] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      alert("⏲️ Session complete!");
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const toggleTimer = () => setIsTimerRunning(!isTimerRunning);
  const resetTimer = (mins = 25) => {
    setIsTimerRunning(false);
    setTimeLeft(mins * 60);
  };

  const { completedTopics, toggleTopic, getTotalProgress, getStackProgress } = useProgress(user?.uid);
  const totalProgress = useMemo(() => getTotalProgress(TOPICS), [getTotalProgress]);
  const stackProgress = useMemo(() => getStackProgress(TOPICS[activeStack]), [getStackProgress, activeStack]);

  const findNextTopic = useCallback(() => {
    for (const stackKey of STACK_ORDER) {
      const stack = TOPICS[stackKey];
      for (const section of stack.sections) {
        for (const item of section.items) {
          if (!completedTopics[item.name]) {
            return { name: item.name, stack: stackKey };
          }
        }
      }
    }
    return null;
  }, [completedTopics]);

  const handleStartNext = () => {
    const next = findNextTopic();
    if (next) {
      setActiveStack(next.stack);
      setMainTab(0); // Switch to Topics tab
      // Give the state a moment to update then open the note
      setTimeout(() => {
        handleSelectNote(next.name);
      }, 100);
    } else {
      alert("🎉 Congratulations! You have completed the entire roadmap!");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out of your Mastery Path?")) {
      signOut(auth);
    }
  };

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [cloudNotes, setCloudNotes] = useState({});
  const [isLoadingNotes, setIsLoadingNotes] = useState(true);

  const [syncStatus, setSyncStatus] = useState("idle");

  const handleManualSync = async () => {
    setSyncStatus("syncing");
    try {
      console.log("Starting manual Masterclass sync...");
      for (const [key, data] of Object.entries(NOTES)) {
        // Sanitize key for Firestore (remove /)
        const safeKey = key.replace(/\//g, "-");
        const preparedData = { ...data, originalKey: key, updatedAt: new Date().toISOString() };
        
        if (preparedData.table && typeof preparedData.table === 'object') {
          preparedData.table = JSON.stringify(preparedData.table);
        }

        await setDoc(doc(db, "notes", safeKey), preparedData, { merge: true });
      }
      setSyncStatus("done");
      alert("✅ Masterclass Sync Complete! Please refresh to see changes.");
    } catch (err) {
      console.error("Sync failed:", err);
      setSyncStatus("error");
      alert("❌ Sync Failed: " + err.message);
    }
  };

  // Real-time fetch from Firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "notes"), (snapshot) => {
      const notesObj = {};
      snapshot.forEach((doc) => {
        const data = doc.data();
        const key = data.originalKey || doc.id;
        notesObj[key] = { ...data, name: key };
      });
      setCloudNotes(notesObj);
      setIsLoadingNotes(false);
    });
    return () => unsub();
  }, []);

  const handleSelectNote = useCallback((itemName) => {
    if (cloudNotes[itemName]) {
      setSelectedNote(cloudNotes[itemName]);
    }
  }, [cloudNotes]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const activeTopics = TOPICS[activeStack];

  const topicSummary = useMemo(() => {
    return STACK_ORDER.map((stackKey) => {
      const stack = TOPICS[stackKey];
      const total = stack.sections.reduce((count, section) => count + section.items.length, 0);
      const essential = stack.sections.reduce(
        (count, section) => count + section.items.filter((item) => item.level === "essential").length,
        0,
      );

      return {
        key: stackKey,
        label: stack.label,
        color: stack.color,
        total,
        essential,
      };
    });
  }, []);

  // Show setup instructions if Firebase isn't configured
  if (!auth || !db) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        background: '#0a0a0f', 
        color: 'white', 
        fontFamily: 'Inter, sans-serif',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ marginBottom: '1rem', color: '#f87171' }}>Firebase Not Configured</h1>
        <p style={{ marginBottom: '1rem', color: '#9ca3af' }}>
          Please create a <code>.env.local</code> file with your Firebase configuration.
        </p>
        <pre style={{ 
          background: '#1f2937', 
          padding: '1rem', 
          borderRadius: '8px', 
          textAlign: 'left',
          fontSize: '0.875rem',
          maxWidth: '500px'
        }}>
{`VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-domain.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXX`}
        </pre>
        <p style={{ marginTop: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
          Copy <code>.env.example</code> to <code>.env.local</code> and add your Firebase values.
        </p>
      </div>
    );
  }

  if (authLoading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0f', color: 'white', fontFamily: 'Inter, sans-serif' }}>
        <div className="loader">Initializing Nexus...</div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="app-shell">
      {isTimerRunning && mainTab !== 1 && (
        <div 
          onClick={() => setMainTab(1)}
          style={{
            position: 'fixed',
            bottom: '2rem',
            left: '2rem',
            zIndex: 9999,
            background: '#0d1520',
            border: '1px solid #6366f1',
            padding: '12px 20px',
            borderRadius: '100px',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            fontFamily: '"DM Mono", monospace',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          <span style={{ color: '#6366f1' }}>⏲️</span>
          <span>{formatTime(timeLeft)}</span>
          <span style={{ fontSize: '10px', opacity: 0.5 }}>TILL BREAK</span>
        </div>
      )}
      <Hero 
        pills={HERO_PILLS} 
        onSearch={() => setIsSearchOpen(true)} 
        progress={totalProgress} 
        user={user}
        onLogout={handleLogout}
      />
      <Tabs 
        tabs={TABS} 
        activeTab={mainTab} 
        onTabChange={setMainTab} 
        onSync={handleManualSync}
        syncStatus={syncStatus}
      />

      <main className="app-body">
        {mainTab === 0 && (
          <TopicSection
            activeStack={activeStack}
            levelMeta={LEVEL_META}
            stackOrder={STACK_ORDER}
            stackColors={STACK_COLORS}
            topicsByKey={TOPICS}
            topic={activeTopics}
            onStackChange={setActiveStack}
            onSelectNote={handleSelectNote}
            completedTopics={completedTopics}
            onToggleTopic={toggleTopic}
            stackProgress={stackProgress}
          />
        )}

        {mainTab === 1 && (
            <ScheduleView
              activeMonth={activeMonth}
              filteredSchedule={filteredSchedule}
              monthsMeta={MONTHS_META}
              onMonthChange={setActiveMonth}
              onToggleWeek={toggleWeek}
              openWeeks={openWeeks}
              onStartNext={handleStartNext}
              completedTopics={completedTopics}
              timeLeft={timeLeft}
              isTimerRunning={isTimerRunning}
              toggleTimer={toggleTimer}
              resetTimer={resetTimer}
            />
        )}

        {mainTab === 2 && (
          <Overview 
            monthHighlights={MONTH_HIGHLIGHTS} 
            monthsMeta={MONTHS_META} 
            stackColors={STACK_COLORS} 
            stackSummary={topicSummary} 
            timeBlocks={TIME_BLOCKS} 
            totalScheduleWeeks={SCHEDULE.length} 
            totalProgress={totalProgress}
            getStackProgress={getStackProgress}
            TOPICS={TOPICS}
          />
        )}
      </main>

      {isSearchOpen && (
        <SearchOverlay
          onClose={() => setIsSearchOpen(false)}
          onSelectNote={handleSelectNote}
          cloudNotes={cloudNotes}
        />
      )}

      {selectedNote && (
        <NoteModal
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
        />
      )}
    </div>
  );
}
