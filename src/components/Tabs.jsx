import { memo } from "react";
import styles from "./Tabs.module.css";

function TabsComponent({ activeTab, onTabChange, tabs, onSync, syncStatus }) {
  return (
    <div className={styles.container}>
      <nav className={styles.tabs} aria-label="Roadmap sections">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            type="button"
            className={`${styles.tab} ${activeTab === index ? styles.active : ""}`}
            onClick={() => onTabChange(index)}
          >
            {tab}
          </button>
        ))}
      </nav>
      <button 
        className={`${styles.syncBtn} ${syncStatus === "syncing" ? styles.syncing : ""}`} 
        onClick={onSync}
        disabled={syncStatus === "syncing"}
      >
        {syncStatus === "syncing" ? "⏳ Syncing..." : "🔄 Push Updates"}
      </button>
    </div>
  );
}

export const Tabs = memo(TabsComponent);
