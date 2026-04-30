import { useState, useMemo, useEffect, useRef } from "react";
import { TOPICS } from "../data/topics";
import styles from "./SearchOverlay.module.css";

export function SearchOverlay({ onClose, onSelectNote, cloudNotes }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const results = useMemo(() => {
    if (!query.trim()) return [];

    const searchResults = [];
    const lowerQuery = query.toLowerCase();

    Object.entries(TOPICS).forEach(([stackKey, stack]) => {
      stack.sections.forEach((section) => {
        section.items.forEach((item) => {
          if (item.name.toLowerCase().includes(lowerQuery)) {
            searchResults.push({
              name: item.name,
              stackLabel: stack.label,
              stackColor: stack.color,
              stackIcon: stack.icon,
              hasNote: !!cloudNotes[item.name],
            });
          }
        });
      });
    });

    return searchResults.slice(0, 8); // Limit to 8 results for clean UI
  }, [query]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <div className={styles.searchBox}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            placeholder="Search topics (e.g. 'closures', 'hooks')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className={styles.kbd}>ESC</span>
        </div>

        <div className={styles.resultsList}>
          {query && results.length === 0 && (
            <div className={styles.noResults}>No topics found for "{query}"</div>
          )}

          {results.map((result) => (
            <div
              key={result.name}
              className={`${styles.resultItem} ${result.hasNote ? styles.clickable : ""}`}
              onClick={() => {
                if (result.hasNote) {
                  onSelectNote(result.name);
                  onClose();
                }
              }}
            >
              <div
                className={styles.stackIcon}
                style={{ background: `${result.stackColor}15`, color: result.stackColor }}
              >
                {result.stackIcon}
              </div>
              <div className={styles.resultInfo}>
                <div className={styles.topicName}>{result.name}</div>
                <div className={styles.stackName}>{result.stackLabel}</div>
              </div>
              {result.hasNote ? (
                <span className={styles.noteTag}>Note</span>
              ) : (
                <span className={styles.comingSoon}>Coming Soon</span>
              )}
            </div>
          ))}

          {!query && (
            <div className={styles.shortcuts}>
              <div className={styles.shortcutTitle}>Try searching for:</div>
              <div className={styles.shortcutGrid}>
                {["Closures", "Hooks", "Event Loop", "Promises"].map((term) => (
                  <button
                    key={term}
                    className={styles.shortcutBtn}
                    onClick={() => setQuery(term)}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
