import { memo, useMemo, useState } from "react";
import { NOTES } from "../data/notes";
import { NoteModal } from "./NoteModal";
import styles from "./TopicSection.module.css";

function TopicSectionComponent({
  activeStack,
  levelMeta,
  onStackChange,
  stackColors,
  stackOrder,
  topicsByKey,
  topic,
  onSelectNote,
  completedTopics,
  onToggleTopic,
  stackProgress,
}) {

  const notePackSummary = useMemo(() => {
    return topic.sections
      .map((section) => {
        const notes = section.items
          .filter((item) => NOTES[item.name])
          .map((item) => ({ key: item.name, ...NOTES[item.name] }));

        return {
          count: notes.length,
          firstNote: notes[0] ?? null,
          title: section.title,
        };
      })
      .filter((section) => section.count > 0);
  }, [topic.sections]);

  const totalNotes = useMemo(() => {
    return notePackSummary.reduce((sum, section) => sum + section.count, 0);
  }, [notePackSummary]);

  const handleItemClick = (itemName) => {
    onSelectNote(itemName);
  };

  const handleNoteKeyDown = (event, itemName) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleItemClick(itemName);
    }
  };

  return (
    <section>
      <div className={styles.legend}>
        {Object.entries(levelMeta).map(([key, meta]) => (
          <div key={key} className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: meta.dot }} />
            <span>{meta.label}</span>
          </div>
        ))}
        <div className={styles.stackProgress}>
          <div className={styles.progressLabel}>Stack Progress</div>
          <div className={styles.progressValue}>{stackProgress}%</div>
        </div>
      </div>

      {notePackSummary.length > 0 && (
        <div className={styles.featuredNote}>
          <div className={styles.featuredNoteTop}>
            <div>
              <div className={styles.featuredLabel}>{topic.label} interview prep</div>
              <h3 className={styles.featuredTitle}>Mastery Path</h3>
            </div>
            <div className={styles.syncIndicator}>
              <span className={styles.syncDot} />
              Cloud Synced
            </div>
          </div>
          <p className={styles.featuredSummary}>
            Every topic now follows the same interview-prep pattern: definition, example, and interview
            question.
          </p>
        </div>
      )}

      <div className={styles.stackTabs}>
        {stackOrder.map((stackKey) => {
          const isActive = activeStack === stackKey;

          return (
            <button
              key={stackKey}
              type="button"
              className={`${styles.stackBtn} ${isActive ? styles.active : ""}`}
              style={isActive ? { background: stackColors[stackKey], color: "#080c10" } : undefined}
              onClick={() => onStackChange(stackKey)}
            >
              {topicsByKey[stackKey].label}
            </button>
          );
        })}
      </div>

      {topic.sections.map((section) => (
        <article key={section.title} className={styles.topicSection}>
          <div className={styles.sectionHeader}>{section.title}</div>

          <div className={styles.topicGrid}>
            {section.items.map((item) => {
              const meta = levelMeta[item.level];
              const hasNote = !!NOTES[item.name];
              const isCompleted = !!completedTopics[item.name];

              return (
                <div
                  key={item.name}
                  className={`${styles.topicRow} ${hasNote ? styles.clickable : ""} ${isCompleted ? styles.completed : ""}`}
                >
                  <div 
                    className={styles.rowContent}
                    onClick={() => handleItemClick(item.name)}
                    role={hasNote ? "button" : undefined}
                    tabIndex={hasNote ? 0 : undefined}
                    onKeyDown={hasNote ? (event) => handleNoteKeyDown(event, item.name) : undefined}
                  >
                    <span className={styles.topicDot} style={{ background: meta.dot }} />
                    <span className={styles.topicName}>{item.name}</span>
                    {hasNote && <span className={styles.noteIndicator}>Note</span>}
                  </div>

                  <button
                    type="button"
                    className={`${styles.checkbox} ${isCompleted ? styles.checked : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleTopic(item.name);
                    }}
                    style={isCompleted ? { background: meta.dot, borderColor: meta.dot } : {}}
                    aria-label={isCompleted ? "Mark as incomplete" : "Mark as completed"}
                  >
                    {isCompleted && "✓"}
                  </button>
                </div>
              );
            })}
          </div>
        </article>
      ))}
    </section>
  );
}

export const TopicSection = memo(TopicSectionComponent);
