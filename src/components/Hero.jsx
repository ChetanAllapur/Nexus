import { memo } from "react";
import styles from "./Hero.module.css";

function HeroComponent({ pills, onSearch, progress, user, onLogout }) {
  return (
    <header className={styles.hero}>
      <div className={styles.heroTop}>
        <div className={styles.eyebrow}>Developer Roadmap - 4 Months</div>
        <div className={styles.heroActions}>
          {progress !== undefined && (
            <div className={styles.progressChip}>
              <div className={styles.progressInner} style={{ width: `${progress}%` }} />
              <span className={styles.progressText}>{progress}% Done</span>
            </div>
          )}
          <button className={styles.searchTrigger} onClick={onSearch}>
            <span className={styles.searchIcon}>🔍</span>
            <span className={styles.searchHint}>Search topics...</span>
            <span className={styles.searchKbd}>⌘K</span>
          </button>
          {user && (
            <div className={styles.userProfile}>
              <img 
                src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email || 'User')}&background=6366f1&color=fff`} 
                alt="Profile" 
                className={styles.avatar} 
              />
              <div className={styles.userDetails}>
                <span className={styles.userName}>{user.displayName || user.email?.split('@')[0] || 'User'}</span>
              </div>
              <button onClick={onLogout} className={styles.logoutBtn}>
                <span className={styles.logoutIcon}>⏻</span>
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
      <h1 className={styles.title}>
        Nexus Roadmap
      </h1>
      <p className={styles.subtitle}>
        JavaScript to React to React Native to Node.js. 4 hrs/day split across 11am-1pm and 2pm-4pm.
        Learn then build, every single day.
      </p>

      <div className={styles.pillRow}>
        {pills.map((pill) => (
          <span
            key={pill.label}
            className={styles.pill}
            style={{
              background: `${pill.color}10`,
              borderColor: `${pill.color}44`,
              color: pill.color,
            }}
          >
            {pill.label}
          </span>
        ))}
      </div>
    </header>
  );
}

export const Hero = memo(HeroComponent);
