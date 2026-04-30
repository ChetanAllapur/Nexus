import { memo } from "react";
import styles from "./Overview.module.css";

const RANKS = [
  { min: 0, label: "Code Newbie", icon: "🐣", color: "#94a3b8" },
  { min: 11, label: "Junior Architect", icon: "🏗️", color: "#61dafb" },
  { min: 41, label: "Full-Stack Power User", icon: "⚡", color: "#a78bfa" },
  { min: 71, label: "Production Ready", icon: "🛡️", color: "#6cc24a" },
  { min: 91, label: "Nexus Master", icon: "👑", color: "#f59e0b" },
];

function OverviewComponent({ monthHighlights, monthsMeta, stackColors, stackSummary, timeBlocks, totalScheduleWeeks, totalProgress, getStackProgress, TOPICS }) {
  const currentRank = [...RANKS].reverse().find(r => totalProgress >= r.min) || RANKS[0];
  const nextRankIndex = RANKS.indexOf(currentRank) + 1;
  const nextRank = RANKS[nextRankIndex] || null;
  
  const xpProgress = nextRank 
    ? ((totalProgress - currentRank.min) / (nextRank.min - currentRank.min)) * 100 
    : 100;

  return (
    <section className={styles.container}>
      <div className={styles.masteryRankSection}>
        <div className={styles.rankCard}>
          <div className={styles.rankIcon}>{currentRank.icon}</div>
          <div className={styles.rankDetails}>
            <div className={styles.rankLabel}>CURRENT STATUS</div>
            <div className={styles.rankTitle} style={{ color: currentRank.color }}>{currentRank.label}</div>
            <div className={styles.xpBarWrap}>
              <div className={styles.xpBar}>
                <div className={styles.xpFill} style={{ width: `${xpProgress}%`, background: currentRank.color }} />
              </div>
              <div className={styles.xpInfo}>
                <span>{totalProgress}% Mastery</span>
                {nextRank && <span>Next: {nextRank.label}</span>}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.statsOverview}>
          <div className={styles.readinessGauge}>
            <div className={styles.gaugeTitle}>Interview Readiness</div>
            <div className={styles.gaugeValue}>{totalProgress}%</div>
            <div className={styles.gaugeSub}>Core Concepts Mastered</div>
          </div>
          <div className={styles.stackProgressList}>
            {Object.keys(TOPICS).map(key => {
              const prog = getStackProgress(TOPICS[key]);
              return (
                <div key={key} className={styles.stackMiniStat}>
                  <div className={styles.stackMiniInfo}>
                    <span className={styles.stackMiniName}>{key}</span>
                    <span className={styles.stackMiniPercent}>{prog}%</span>
                  </div>
                  <div className={styles.stackMiniBarWrap}>
                    <div className={styles.stackMiniBar} style={{ width: `${prog}%`, background: stackColors[key] }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.summaryGrid}>
        {monthsMeta.map((month) => (
          <article key={month.num} className={styles.monthCard}>
            <div className={styles.cardHeader}>
              <div className={styles.monthTag} style={{ background: `${month.color}20`, color: month.color }}>
                Month {month.num}
              </div>
              <div className={styles.weekTag}>Weeks {month.weeks}</div>
            </div>
            <h3 className={styles.monthTitle}>{month.label}</h3>
            <div
              className={styles.monthBar}
              style={{ background: `linear-gradient(90deg, ${month.color}, ${month.color}44)` }}
            />
            <ul className={styles.monthItems}>
              {monthHighlights[month.num].map((item) => (
                <li key={item} className={styles.monthItem}>
                  <span className={styles.dot} style={{ background: month.color }} />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className={styles.rulePanel}>
        <div className={styles.ruleTitle}>The Core Rule</div>
        <p className={styles.ruleText}>
          <span className={styles.ruleHighlightLearn}>11am-1pm is sacred learning time.</span> No building yet -
          just understand the concept fully. <span className={styles.ruleHighlightBuild}>2pm-4pm is building time.</span>{" "}
          No new concepts - just apply what you learned. If you skip the lunch break, you will start the build session
          with a tired brain. Protect the gap.
        </p>
      </div>

      <div className={styles.statsGrid}>
        {stackSummary.map((stack) => (
          <article key={stack.key} className={styles.statCard} style={{ borderColor: `${stackColors[stack.key]}22` }}>
            <div className={styles.statLabel} style={{ color: stackColors[stack.key] }}>
              {stack.label}
            </div>
            <div className={styles.statValue}>{stack.total}</div>
            <div className={styles.statCaption}>topics total</div>
            <div className={styles.statDivider} />
            <div className={styles.statMeta}>
              <span style={{ color: "#ff6b6b" }}>{stack.essential}</span> essential
              <span className={styles.statMetaSpacer}>-</span>
              <span style={{ color: "#3a5060" }}>{stack.total - stack.essential}</span> others
            </div>
          </article>
        ))}
      </div>

      <div className={styles.timeBlockWrap}>
        <div className={styles.timeTitle}>Why the split works</div>
        <div className={styles.timeBlocks}>
          {timeBlocks.map((block) => (
            <article key={block.time} className={styles.timeBlock}>
              <div className={styles.timeBlockTime}>{block.time}</div>
              <div className={styles.timeBlockLabel}>{block.label}</div>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.footerNote}>16 weeks total - {totalScheduleWeeks} weekly blocks of structured practice.</div>
    </section>
  );
}

export const Overview = memo(OverviewComponent);
