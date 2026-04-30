import { memo, useState, useEffect } from "react";
import { WeekBlock } from "./WeekBlock";
import styles from "./ScheduleView.module.css";

const BUILD_IDEAS = {
  0: "Explore any stack and build a small proof-of-concept.",
  1: "Build a custom Hook or a complex UI pattern using CSS Grid.",
  2: "Integrate a native device API like Camera or Location into an Expo app.",
  3: "Build a secure REST API endpoint with full validation and error handling.",
  4: "Deploy a full-stack feature and test it with real users."
};

function ScheduleViewComponent({
  activeMonth,
  filteredSchedule,
  monthsMeta,
  onMonthChange,
  onToggleWeek,
  openWeeks,
  onStartNext,
  completedTopics,
  timeLeft,
  isTimerRunning,
  toggleTimer,
  resetTimer,
}) {
  const [customMins, setCustomMins] = useState(25);
  const [isSticky, setIsSticky] = useState(false);
  
  const totalSeconds = customMins * 60;
  const progress = (timeLeft / totalSeconds) * 283;

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <section className={styles.container}>
      {isSticky && isTimerRunning && (
        <div className={styles.stickyIsland}>
          <div className={styles.stickyTime}>{formatTime(timeLeft)}</div>
          <div className={styles.stickyControls}>
            <button className={styles.eliteBtn} onClick={toggleTimer}>
              {isTimerRunning ? "⏸" : "▶"}
            </button>
            <button className={styles.eliteBtn} onClick={() => resetTimer(customMins)}>
              ↺
            </button>
          </div>
        </div>
      )}

      <div className={`${styles.todayFocus} ${isTimerRunning ? styles.focusModeActive : ""}`}>
        <div className={styles.focusHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.focusLabel}>{isTimerRunning ? "🔴 DEEP FOCUS ACTIVE" : "TODAY'S FOCUS"}</div>
            <div className={styles.focusMonth}>
              {activeMonth === 0 ? "Full Roadmap Overview" : `Month ${activeMonth}: ${monthsMeta[activeMonth - 1]?.label}`}
            </div>
          </div>
          
          <div className={styles.eliteTimerContainer}>
            <div className={styles.progressRing}>
              <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" className={styles.ringBg} />
                <circle 
                  cx="50" cy="50" r="45" 
                  className={styles.ringFill} 
                  style={{ strokeDashoffset: 283 - progress }} 
                />
              </svg>
              <div className={styles.timerContent}>
                <div className={styles.timerTime}>{formatTime(timeLeft)}</div>
              </div>
            </div>

            <div className={styles.timerControls}>
              <button className={styles.eliteBtn} onClick={toggleTimer}>
                {isTimerRunning ? "⏸" : "▶"}
              </button>
              <button className={styles.eliteBtn} onClick={() => resetTimer(customMins)}>
                ↺
              </button>
            </div>

            <div className={styles.timerConfig}>
              <div className={styles.presets}>
                {[5, 25, 45].map(m => (
                  <button 
                    key={m}
                    className={`${styles.presetBtn} ${customMins == m ? styles.presetActive : ""}`}
                    onClick={() => {
                      setCustomMins(m);
                      resetTimer(m);
                    }}
                  >
                    {m}m
                  </button>
                ))}
              </div>
              <div className={styles.inputGroup}>
                <input 
                  type="number" 
                  className={styles.eliteInput}
                  value={customMins}
                  onChange={(e) => setCustomMins(e.target.value)}
                  placeholder="Mins"
                />
                <button 
                  className={styles.setBtn}
                  onClick={() => resetTimer(customMins)}
                >
                  SET
                </button>
              </div>
            </div>
          </div>

          <button className={styles.nextBtn} onClick={onStartNext}>
            Start Next Lesson 🚀
          </button>
        </div>
        <div className={styles.focusGrid}>
          <div className={styles.focusCard}>
            <div className={styles.focusTime}>11:00 AM - 1:00 PM</div>
            <div className={styles.focusAction}>Deep Learning</div>
            <div className={styles.focusDesc}>Master theory, read premium notes, and watch documentation.</div>
          </div>
          <div className={styles.focusCard} style={{ borderColor: '#a78bfa33' }}>
            <div className={styles.focusTime} style={{ color: '#a78bfa' }}>2:00 PM - 4:00 PM</div>
            <div className={styles.focusAction}>Hands-on Build</div>
            <div className={styles.focusDesc}>
              <strong>Challenge:</strong> {BUILD_IDEAS[activeMonth] || BUILD_IDEAS[0]}
            </div>
          </div>
        </div>
        <div className={styles.focusFooter}>
          <span className={styles.focusTip}>💡 Pro Tip:</span> Protect the 1-hour lunch gap. Your brain needs to cool down to switch from "Reading" to "Building."
        </div>
      </div>

      <div className={styles.monthFilter}>
        <button
          type="button"
          className={`${styles.filterBtn} ${activeMonth === 0 ? styles.active : ""}`}
          style={activeMonth === 0 ? { background: "#61dafb", color: "#080c10" } : undefined}
          onClick={() => onMonthChange(0)}
        >
          All Weeks
        </button>

        {monthsMeta.map((month) => (
          <button
            key={month.num}
            type="button"
            className={`${styles.filterBtn} ${activeMonth === month.num ? styles.active : ""}`}
            style={activeMonth === month.num ? { background: month.color, color: "#080c10" } : undefined}
            onClick={() => onMonthChange(month.num)}
          >
            Month {month.num}: {month.label}
          </button>
        ))}
      </div>

      <div className={styles.weeks}>
        {filteredSchedule.map((week) => {
          const monthMeta = monthsMeta[week.month - 1];

          return (
            <WeekBlock
              key={week.week}
              monthMeta={monthMeta}
              onToggle={onToggleWeek}
              open={Boolean(openWeeks[week.week])}
              week={week}
              isComplete={week.items ? week.items.every(item => completedTopics?.[item]) : false}
            />
          );
        })}
      </div>
    </section>
  );
}

export const ScheduleView = memo(ScheduleViewComponent);
