import { memo } from "react";
import styles from "./WeekBlock.module.css";

function WeekBlockComponent({ monthMeta, onToggle, open, week, isComplete }) {
  return (
    <article className={`${styles.weekBlock} ${isComplete ? styles.completeBlock : ""}`}>
      <button
        type="button"
        className={styles.weekHead}
        onClick={() => onToggle(week.week)}
        aria-expanded={open}
      >
        <span className={styles.weekNum}>Week {week.week}</span>
        <span className={styles.weekTheme}>{week.theme}</span>
        {isComplete && (
          <span className={styles.masteryBadge}>
            <span className={styles.badgeIcon}>🏆</span>
            Mastered
          </span>
        )}
        <span className={styles.weekMonth} style={{ background: `${monthMeta.color}18`, color: monthMeta.color }}>
          Month {week.month}
        </span>
        <span className={`${styles.chevron} ${open ? styles.open : ""}`}>v</span>
      </button>

      {open && (
        <div className={styles.dayRows}>
          {week.days.map((day) => (
            <div key={day.day} className={styles.dayRow}>
              <div className={styles.dayLabel}>{day.day}</div>
              {[day.slotA, day.slotB].map((slot, index) => (
                <div key={`${day.day}-${index}`} className={styles.slot}>
                  <div className={styles.slotTime}>{index === 0 ? "11am - 1pm" : "2pm - 4pm"}</div>
                  <div className={`${styles.slotTag} ${styles[slot.focus.toLowerCase()]}`}>{slot.focus}</div>
                  <div className={styles.slotText}>{slot.topic}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

export const WeekBlock = memo(WeekBlockComponent);
