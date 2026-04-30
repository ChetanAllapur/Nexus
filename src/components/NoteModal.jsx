import { useEffect, useState } from "react";
import styles from "./NoteModal.module.css";

export function NoteModal({ note, onClose }) {
  console.log("💎 Current Note Data:", note);
  const [isInterviewMode, setIsInterviewMode] = useState(() => {
    return localStorage.getItem("interview_mode") === "true";
  });
  const [revealedSections, setRevealedSections] = useState({
    "Quick Answer": true,
    Analogy: true,
  });
  const [codeOutputs, setCodeOutputs] = useState({});
  const [isRunning, setIsRunning] = useState(false);
  const [editableCode, setEditableCode] = useState(note.example || "");
  const [isEditing, setIsEditing] = useState(false);

  const displayTitle = note.analogy ? `💎 Masterclass: ${note.title}` : note.title;

  useEffect(() => {
    setEditableCode(note.example || "");
    setIsEditing(false);
    setCodeOutputs({});
  }, [note]);

  const runCode = (label, codeToRun) => {
    setIsRunning(true);
    const logs = [];
    const originalLog = console.log;
    
    console.log = (...args) => {
      logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
    };

    try {
      eval(codeToRun);
      setCodeOutputs(prev => ({ ...prev, [label]: logs.length ? logs.join('\n') : "// Code executed (no output)" }));
    } catch (err) {
      setCodeOutputs(prev => ({ ...prev, [label]: `Error: ${err.message}` }));
    } finally {
      console.log = originalLog;
      setIsRunning(false);
    }
  };

  const toggleInterviewMode = () => {
    const next = !isInterviewMode;
    setIsInterviewMode(next);
    localStorage.setItem("interview_mode", next.toString());
    setRevealedSections({});
  };

  const toggleReveal = (label) => {
    setRevealedSections((prev) => ({ ...prev, [label]: !prev[label] }));
  };
  const tableData = typeof note.table === 'string' ? JSON.parse(note.table) : note.table;

  const noteSections = [
    { label: "Analogy", value: note.analogy },
    { label: "Quick Answer", value: note.quickAnswer },
    { label: "Definition", value: note.definition },
    { label: "Why it matters", value: note.why },
    { label: "Comparison Table", value: tableData, type: "table" },
    { label: "Example", value: note.example, type: "code" },
    { label: "Junior vs Senior", value: note.juniorVsSenior, type: "code", isMasterclass: true },
    { label: "Interview Question", value: note.interviewQuestion, highlight: true },
    { label: "Answer", value: note.answer },
    { label: "Follow-up", value: note.followUp },
  ].filter((section) => section.value)
   .map(section => {
     // Handle stringified tables from Firestore
     if (section.type === "table" && typeof section.value === "string") {
       try {
         return { ...section, value: JSON.parse(section.value) };
       } catch (err) {
         console.error("Failed to parse table data:", err);
       }
     }
     return section;
   });

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
        <header className={styles.header}>
          <div className={styles.titleGroup}>
            <span className={styles.eyebrow}>{note.eyebrow ?? "Interview prep"}</span>
            <h2 className={styles.title}>{displayTitle}</h2>
          </div>
          <div className={styles.headerActions}>
            <button 
              className={`${styles.modeToggle} ${isInterviewMode ? styles.modeActive : ""}`}
              onClick={toggleInterviewMode}
              title="Toggle Interview Mode (Flashcards)"
            >
              {isInterviewMode ? "🧠 Quiz Mode: ON" : "🎓 Study Mode"}
            </button>
            <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close note">
              &times;
            </button>
          </div>
        </header>

        <div className={styles.content}>
          {note.badges?.length > 0 && (
            <div className={styles.badgeRow}>
              {note.badges.map((badge) => (
                <span key={badge} className={styles.badge}>
                  {badge}
                </span>
              ))}
            </div>
          )}

          <div className={styles.studyStack}>
            {noteSections.map((section) => (
              <section
                key={section.label}
                className={`${styles.studySection} ${section.highlight ? styles.questionSection : ""}`}
              >
                <div className={styles.sectionLabel}>{section.label}</div>
                
                {isInterviewMode && (section.label === "Answer" || section.label === "Quick Answer") && !revealedSections[section.label] ? (
                  <button 
                    className={styles.revealBtn} 
                    onClick={() => toggleReveal(section.label)}
                  >
                    Tap to reveal answer
                  </button>
                ) : (
                  <>
                    {section.type === "table" ? (
                      <div className={styles.tableWrap}>
                        <table className={styles.compareTable}>
                          <thead>
                            <tr>
                              {section.value.headers.map((header) => (
                                <th key={header}>{header}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {section.value.rows.map((row) => (
                              <tr key={row.join("-")}>
                                {row.map((cell, cellIndex) => (
                                  <td key={`${cell}-${cellIndex}`}>{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : section.type === "code" ? (
                      <div className={`${styles.codeContainer} ${section.isMasterclass ? styles.masterclassCode : ""}`}>
                        {section.isMasterclass && (
                          <div className={styles.masterclassBanner}>
                            <span className={styles.masterclassIcon}>💎</span>
                            <span>SENIOR GRADE PATTERNS</span>
                          </div>
                        )}
                        <div className={styles.codeHeader}>
                          <div className={styles.codeHeaderLeft}>
                            <span>JavaScript</span>
                            {!section.isMasterclass && (
                              <button 
                                className={styles.editBtn} 
                                onClick={() => setIsEditing(!isEditing)}
                              >
                                {isEditing ? "Done Editing" : "✎ Edit Code"}
                              </button>
                            )}
                            {isEditing && !section.isMasterclass && (
                              <button 
                                className={styles.resetBtn} 
                                onClick={() => setEditableCode(section.value)}
                              >
                                ↺ Reset
                              </button>
                            )}
                          </div>
                          <button 
                            className={styles.runBtn} 
                            onClick={() => runCode(section.label, (!section.isMasterclass && isEditing) ? editableCode : section.value)}
                            disabled={isRunning}
                          >
                            {isRunning ? "Running..." : "▶ Run Snippet"}
                          </button>
                        </div>
                        
                        {isEditing && !section.isMasterclass ? (
                          <textarea
                            className={styles.editor}
                            value={editableCode}
                            onChange={(e) => setEditableCode(e.target.value)}
                            spellCheck="false"
                          />
                        ) : (
                          <pre className={styles.example}>{(!section.isMasterclass && isEditing) ? editableCode : section.value}</pre>
                        )}

                        {codeOutputs[section.label] && (
                          <div className={styles.outputArea}>
                            <div className={styles.outputLabel}>Console Output</div>
                            <pre className={styles.outputContent}>{codeOutputs[section.label]}</pre>
                            <button 
                              className={styles.clearBtn} 
                              onClick={() => setCodeOutputs(prev => {
                                const next = { ...prev };
                                delete next[section.label];
                                return next;
                              })}
                            >
                              Clear
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p 
                        className={styles.sectionText}
                        dangerouslySetInnerHTML={{ 
                          __html: typeof section.value === 'string' 
                            ? section.value.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                            : section.value 
                        }} 
                      />
                    )}
                    {isInterviewMode && (section.label === "Answer" || section.label === "Quick Answer") && (
                      <button 
                        className={styles.hideBtn} 
                        onClick={() => toggleReveal(section.label)}
                      >
                        Hide again
                      </button>
                    )}
                  </>
                )}
              </section>
            ))}
          </div>

          {note.takeaway && (
            <div className={styles.takeaway}>
              <div className={styles.takeawayLabel}>Takeaway</div>
              <p className={styles.takeawayText}>{note.takeaway}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
