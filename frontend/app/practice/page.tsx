'use client';

import React, { useState } from 'react';
import styles from './practice.module.css';

/* ── Types ── */
type PracticeType = 'Challenge' | 'Quiz' | 'Project';
type Difficulty = 'Easy' | 'Medium' | 'Hard';

interface PracticeItem {
  id: string;
  title: string;
  description: string;
  type: PracticeType;
  difficulty: Difficulty;
  points: number;
  relatedCourse?: string;
  estimatedTime: string;
}

interface UserProgress {
  completed: Set<string>;
  totalPoints: number;
  streak: number;
  bestStreak: number;
  level: number;
  rank: number;
}

/* ── Data ── */
const practiceItems: PracticeItem[] = [
  { id: 'ch1', title: 'Reverse a String', description: 'Write a function to reverse a string without using built-in methods. Common interview question.', type: 'Challenge', difficulty: 'Easy', points: 50, estimatedTime: '15 min' },
  { id: 'ch2', title: 'Two Sum Algorithm', description: 'Find two numbers in an array that add up to a target. Optimize for O(n) solution.', type: 'Challenge', difficulty: 'Medium', points: 100, relatedCourse: 'algorithms-101', estimatedTime: '30 min' },
  { id: 'ch3', title: 'Fibonacci Sequence', description: 'Generate Fibonacci numbers efficiently. Compare iterative, recursive, and memoized approaches.', type: 'Challenge', difficulty: 'Medium', points: 100, estimatedTime: '25 min' },
  { id: 'ch4', title: 'Binary Tree Traversal', description: 'Implement in-order, pre-order, and post-order traversal for binary trees.', type: 'Challenge', difficulty: 'Hard', points: 200, estimatedTime: '45 min' },
  { id: 'ch5', title: 'Longest Substring', description: 'Find the longest substring without repeating characters using the sliding window technique.', type: 'Challenge', difficulty: 'Hard', points: 200, estimatedTime: '40 min' },
  { id: 'quiz1', title: 'React Hooks Fundamentals', description: 'Test your knowledge of useState, useEffect, useContext, and custom hooks.', type: 'Quiz', difficulty: 'Easy', points: 30, relatedCourse: 'react-fundamentals', estimatedTime: '10 min' },
  { id: 'quiz2', title: 'JavaScript Closures', description: 'Deep dive into closures, scope chains, and lexical scoping in JavaScript.', type: 'Quiz', difficulty: 'Medium', points: 75, estimatedTime: '12 min' },
  { id: 'quiz3', title: 'TypeScript Advanced Types', description: 'Generics, conditional types, mapped types, and type inference patterns.', type: 'Quiz', difficulty: 'Hard', points: 150, relatedCourse: 'typescript-advanced', estimatedTime: '15 min' },
  { id: 'quiz4', title: 'CSS Grid & Flexbox', description: 'Master layout techniques with CSS Grid and Flexbox. Responsive design patterns.', type: 'Quiz', difficulty: 'Medium', points: 75, relatedCourse: 'css-layouts', estimatedTime: '10 min' },
  { id: 'quiz5', title: 'REST API Best Practices', description: 'HTTP methods, status codes, versioning, authentication, and API design principles.', type: 'Quiz', difficulty: 'Medium', points: 75, estimatedTime: '12 min' },
  { id: 'proj1', title: 'Build a Todo App with React', description: 'Create a fully functional todo app with add, edit, delete, and filter features.', type: 'Project', difficulty: 'Easy', points: 150, relatedCourse: 'react-fundamentals', estimatedTime: '120 min' },
  { id: 'proj2', title: 'Weather App with API Integration', description: 'Fetch weather data from a public API and display it with a clean UI. Handle errors gracefully.', type: 'Project', difficulty: 'Medium', points: 250, estimatedTime: '180 min' },
  { id: 'proj3', title: 'E-commerce Product Filter', description: 'Build a product listing with multi-select filters for category, price, and rating.', type: 'Project', difficulty: 'Medium', points: 250, estimatedTime: '150 min' },
  { id: 'proj4', title: 'Real-time Chat Application', description: 'Build a chat app with real-time messaging using WebSockets or Firebase.', type: 'Project', difficulty: 'Hard', points: 500, relatedCourse: 'node-advanced', estimatedTime: '360 min' },
  { id: 'proj5', title: 'Dashboard with Charts & Analytics', description: 'Create an admin dashboard with data visualization, filters, and export functionality.', type: 'Project', difficulty: 'Hard', points: 500, estimatedTime: '300 min' },
  { id: 'proj6', title: 'Authentication System', description: 'Implement JWT-based authentication with login, signup, password reset, and protected routes.', type: 'Project', difficulty: 'Hard', points: 450, relatedCourse: 'node-advanced', estimatedTime: '240 min' },
  { id: 'ch6', title: 'Debounce & Throttle', description: 'Implement debounce and throttle functions. Understand use cases and performance implications.', type: 'Challenge', difficulty: 'Medium', points: 100, estimatedTime: '20 min' },
  { id: 'ch7', title: 'Promise.all & Race', description: 'Master async patterns with Promise.all, Promise.race, and Promise.allSettled.', type: 'Challenge', difficulty: 'Hard', points: 150, estimatedTime: '30 min' },
  { id: 'quiz6', title: 'Next.js App Router', description: 'File-based routing, layouts, dynamic segments, and parallel routes in Next.js 13+.', type: 'Quiz', difficulty: 'Medium', points: 100, relatedCourse: 'nextjs-advanced', estimatedTime: '12 min' },
  { id: 'proj7', title: 'Personal Portfolio Website', description: 'Build a modern portfolio with Next.js, showcasing projects, skills, and contact form.', type: 'Project', difficulty: 'Easy', points: 200, estimatedTime: '240 min' },
];

const leaderboard = [
  { rank: 1, name: 'Alex Chen',    initials: 'AC', color: '#1d9e75', points: 4850, streak: 28, level: 12 },
  { rank: 2, name: 'Jordan Lee',   initials: 'JL', color: '#7c3aed', points: 4320, streak: 21, level: 11 },
  { rank: 3, name: 'Sam Martinez', initials: 'SM', color: '#ea580c', points: 3980, streak: 15, level: 10 },
  { rank: 4, name: 'Casey Morgan', initials: 'CM', color: '#0284c7', points: 3650, streak: 12, level: 9 },
  { rank: 5, name: 'Taylor Swift', initials: 'TS', color: '#7c3aed', points: 3240, streak:  8, level: 8 },
];

const xpLevels = [
  { level: 1, label: 'Newbie', pts: 0 },
  { level: 3, label: 'Coder', pts: 500 },
  { level: 5, label: 'Builder', pts: 1000 },
  { level: 6, label: 'You', pts: 1250, active: true },
  { level: 8, label: 'Expert', pts: 2000 },
  { level: 10, label: 'Master', pts: 3000 },
  { level: 12, label: 'Pro', pts: 5000 },
];

const achievements = [
  { icon: '🔥', name: 'On Fire', desc: '5-day streak', earned: true },
  { icon: '⚡', name: 'Speed Run', desc: 'Finish in under 10 min', earned: true },
  { icon: '💎', name: 'Perfectionist', desc: '100% on a quiz', earned: true },
  { icon: '🧠', name: 'Deep Thinker', desc: 'Solve a Hard challenge', earned: false },
  { icon: '🚀', name: 'Launcher', desc: 'Complete your first project', earned: false },
  { icon: '🏆', name: 'Top 10', desc: 'Reach global top 10', earned: false },
  { icon: '🌟', name: 'All-rounder', desc: 'Complete all 3 types', earned: false },
  { icon: '👑', name: 'Champion', desc: 'Reach level 10', earned: false },
];

type FilterType = 'All' | PracticeType;

export default function PracticePage() {
  const [filter, setFilter] = useState<FilterType>('All');
  const [progress, setProgress] = useState<UserProgress>({
    completed: new Set(),
    totalPoints: 1250,
    streak: 5,
    bestStreak: 12,
    level: 6,
    rank: 87,
  });

  const filteredItems = filter === 'All'
    ? practiceItems
    : practiceItems.filter((i) => i.type === filter);

  const typeCounts = {
    Challenge: practiceItems.filter(i => i.type === 'Challenge').length,
    Quiz:      practiceItems.filter(i => i.type === 'Quiz').length,
    Project:   practiceItems.filter(i => i.type === 'Project').length,
  };

  const handleComplete = (id: string, pts: number) => {
    setProgress((prev) => {
      if (prev.completed.has(id)) return prev;
      const next = new Set(prev.completed);
      next.add(id);
      return {
        ...prev,
        completed: next,
        totalPoints: prev.totalPoints + pts,
        streak: prev.streak + 1,
        bestStreak: Math.max(prev.bestStreak, prev.streak + 1),
      };
    });
  };

  const dailyChallenge = practiceItems.find(i => i.id === 'ch2')!;
  const xpProgress = Math.min((progress.totalPoints / 5000) * 100, 100);

  return (
    <div className={styles.page}>

      {/* ── 1. HERO — SPLIT ── */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroLeft}>
            <div className={styles.heroPill}>✦ Practice Arena</div>
            <h1 className={styles.heroTitle}>
              Level up through <em>real practice</em>
            </h1>
            <p className={styles.heroSubtitle}>
              Challenges, quizzes, and projects that sharpen your skills and build your portfolio. Earn XP, climb the leaderboard.
            </p>
            <div className={styles.heroBtns}>
              <button className={styles.btnGreen}>Start today&apos;s challenge →</button>
              <button className={styles.btnGhost}>Browse all items</button>
            </div>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.heroRightLabel}>Your progress</div>
            <div className={styles.heroStatRow}>
              <div className={styles.heroStat}>
                <span className={styles.heroStatLabel}>Total XP</span>
                <span className={styles.heroStatValue}>{progress.totalPoints.toLocaleString()}</span>
              </div>
              <div className={styles.heroStatBar}>
                <div className={styles.heroStatFill} style={{ width: `${xpProgress}%` }} />
              </div>
              <div className={styles.heroStat}>
                <span className={styles.heroStatLabel}>Completed</span>
                <span className={styles.heroStatValue}>{progress.completed.size} / {practiceItems.length}</span>
              </div>
              <div className={styles.heroStat}>
                <span className={styles.heroStatLabel}>Streak</span>
                <span className={styles.heroStatValue}>🔥 {progress.streak} days</span>
              </div>
            </div>
            <div className={styles.heroRankChip}>
              <div className={styles.heroRankNum}>#{progress.rank}</div>
              <div className={styles.heroRankMeta}>
                <div className={styles.heroRankTitle}>Global rank</div>
                <div className={styles.heroRankSub}>Top 10% · Level {progress.level}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. XP PROGRESS TRACK ── */}
      <div className={styles.xpSection}>
        <div className={styles.xpInner}>
          <div className={styles.xpHeader}>
            <span className={styles.xpTitle}>Your progression path</span>
            <span className={styles.xpLevelBadge}>Level {progress.level}</span>
          </div>
          <div className={styles.xpTrack}>
            <div className={styles.xpLine}>
              <div className={styles.xpLineFill} style={{ width: `${xpProgress}%` }} />
            </div>
            <div className={styles.xpNodes}>
              {xpLevels.map((node, i) => {
                const done = progress.totalPoints >= node.pts && !node.active;
                const active = !!node.active;
                return (
                  <div key={i} className={styles.xpNode}>
                    <span className={`${styles.xpNodeLabel} ${done ? styles.xpNodeLabelDone : ''} ${active ? styles.xpNodeLabelActive : ''}`}>
                      {node.label}
                    </span>
                    <div className={`${styles.xpDot} ${done ? styles.xpDotDone : ''} ${active ? styles.xpDotActive : ''}`}>
                      {done ? '✓' : node.level}
                    </div>
                    <span className={styles.xpNodePts}>{node.pts} xp</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. DAILY CHALLENGE SPOTLIGHT ── */}
      <div className={styles.dailySection}>
        <div className={styles.dailyCard}>
          <div className={styles.dailyLeft}>
            <div className={styles.dailyEyebrow}>⚡ Daily challenge</div>
            <h2 className={styles.dailyTitle}>{dailyChallenge.title}</h2>
            <p className={styles.dailyDesc}>{dailyChallenge.description}</p>
            <div className={styles.dailyTags}>
              <span className={styles.dailyTag}>{dailyChallenge.type}</span>
              <span className={styles.dailyTag}>{dailyChallenge.difficulty}</span>
              <span className={styles.dailyTag}>⏱ {dailyChallenge.estimatedTime}</span>
              <span className={styles.dailyTag}>Resets in 14h 32m</span>
            </div>
          </div>
          <div className={styles.dailyRight}>
            <div className={styles.dailyPoints}>
              <span className={styles.dailyPtsNum}>+{dailyChallenge.points}</span>
              <span className={styles.dailyPtsLabel}>XP bonus</span>
            </div>
            <button
              className={styles.dailyCta}
              onClick={() => handleComplete(dailyChallenge.id, dailyChallenge.points * 1.5)}
            >
              {progress.completed.has(dailyChallenge.id) ? 'Completed ✓' : 'Start now →'}
            </button>
          </div>
        </div>
      </div>

      {/* ── 4. PRACTICE ARENA — SIDEBAR + GRID ── */}
      <div className={styles.arenaSection}>
        <div className={styles.arenaInner}>
          {/* Sidebar */}
          <div className={styles.arenaSidebar}>
            <span className={styles.sidebarLabel}>Filter by type</span>
            {(['All', 'Challenge', 'Quiz', 'Project'] as FilterType[]).map((t) => (
              <button
                key={t}
                className={`${styles.sidebarBtn} ${filter === t ? styles.sidebarBtnActive : ''}`}
                onClick={() => setFilter(t)}
              >
                {t === 'All' ? 'All items' : `${t}s`}
                <span className={filter === t ? styles.sidebarCount : styles.sidebarCountGray}>
                  {t === 'All' ? practiceItems.length : typeCounts[t as PracticeType]}
                </span>
              </button>
            ))}

            <div className={styles.sidebarDivider} />
            <span className={styles.sidebarLabel}>Difficulty</span>
            {(['Easy', 'Medium', 'Hard'] as Difficulty[]).map((d) => (
              <button key={d} className={styles.diffSidebarBtn}>
                <span className={`${styles.diffDot} ${styles[`diffDot${d}`]}`} />
                {d}
              </button>
            ))}
          </div>

          {/* Main grid */}
          <div className={styles.arenaMain}>
            <div className={styles.arenaHeader}>
              <h2 className={styles.arenaTitle}>
                {filter === 'All' ? 'All items' : `${filter}s`}
              </h2>
              <span className={styles.arenaCount}>
                {progress.completed.size}/{practiceItems.length} done
              </span>
            </div>
            <div className={styles.arenaGrid}>
              {filteredItems.map((item) => {
                const done = progress.completed.has(item.id);
                return (
                  <div key={item.id} className={`${styles.card} ${done ? styles.cardDone : ''}`}>
                    <div className={styles.cardTop}>
                      <span className={`${styles.typePill} ${styles[`type${item.type}`]}`}>{item.type}</span>
                      <span className={`${styles.diffPill} ${styles[`diff${item.difficulty}`]}`}>{item.difficulty}</span>
                      {done && <span className={styles.donePill}>✓ Done</span>}
                    </div>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardDesc}>{item.description}</p>
                    <div className={styles.cardFooter}>
                      <span className={styles.cardPoints}>+{item.points} xp</span>
                      <span className={styles.cardTime}>⏱ {item.estimatedTime}</span>
                    </div>
                    <button
                      className={styles.cardCta}
                      onClick={() => handleComplete(item.id, item.points)}
                      disabled={done}
                    >
                      {done ? 'Completed ✓' : 'Start practice →'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── 5. LEADERBOARD — PODIUM + RANKED LIST ── */}
      <div className={styles.leaderSection}>
        <p className={styles.sectionEyebrow}>Top performers</p>
        <h2 className={styles.sectionTitle}>Leaderboard</h2>
        <div className={styles.leaderLayout}>
          {/* Podium */}
          <div className={styles.podium}>
            <p className={styles.podiumTitle}>Top 3 this week</p>
            <div className={styles.podiumStage}>
              {/* 2nd */}
              <div className={styles.podiumSlot}>
                <div className={styles.podiumAvatar} style={{ background: leaderboard[1].color }}>{leaderboard[1].initials}</div>
                <span className={styles.podiumName}>{leaderboard[1].name}</span>
                <span className={styles.podiumPts}>{leaderboard[1].points} xp</span>
                <div className={`${styles.podiumBar} ${styles.podiumBar2}`}>2</div>
              </div>
              {/* 1st */}
              <div className={styles.podiumSlot}>
                <div className={styles.podiumAvatar} style={{ background: leaderboard[0].color }}>{leaderboard[0].initials}</div>
                <span className={styles.podiumName}>{leaderboard[0].name}</span>
                <span className={styles.podiumPts}>{leaderboard[0].points} xp</span>
                <div className={`${styles.podiumBar} ${styles.podiumBar1}`}>1</div>
              </div>
              {/* 3rd */}
              <div className={styles.podiumSlot}>
                <div className={styles.podiumAvatar} style={{ background: leaderboard[2].color }}>{leaderboard[2].initials}</div>
                <span className={styles.podiumName}>{leaderboard[2].name}</span>
                <span className={styles.podiumPts}>{leaderboard[2].points} xp</span>
                <div className={`${styles.podiumBar} ${styles.podiumBar3}`}>3</div>
              </div>
            </div>
          </div>

          {/* Ranked list 4–5 + you */}
          <div className={styles.rankedList}>
            {leaderboard.slice(3).map((entry) => (
              <div key={entry.rank} className={styles.rankedRow}>
                <span className={styles.rankedPos}>{entry.rank}</span>
                <div className={styles.rankedAvatar} style={{ background: entry.color }}>{entry.initials}</div>
                <div className={styles.rankedName}>
                  <div className={styles.rankedNameMain}>{entry.name}</div>
                  <div className={styles.rankedNameSub}>Level {entry.level}</div>
                </div>
                <div className={styles.rankedRight}>
                  <span className={styles.rankedPts}>{entry.points} xp</span>
                  <span className={styles.rankedStreak}>🔥 {entry.streak} days</span>
                </div>
              </div>
            ))}
            {/* You */}
            <div className={styles.rankedRow} style={{ background: '#f0fdf8' }}>
              <span className={styles.rankedPos} style={{ color: '#1d9e75' }}>{progress.rank}</span>
              <div className={styles.rankedAvatar} style={{ background: '#1d9e75' }}>ME</div>
              <div className={styles.rankedName}>
                <div className={styles.rankedNameMain}>You</div>
                <div className={styles.rankedNameSub}>Level {progress.level}</div>
              </div>
              <div className={styles.rankedRight}>
                <span className={styles.rankedPts}>{progress.totalPoints} xp</span>
                <span className={styles.rankedStreak}>🔥 {progress.streak} days</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 6. ACHIEVEMENT BADGES ── */}
      <div className={styles.badgesSection}>
        <div className={styles.badgesInner}>
          <div className={styles.badgesHeader}>
            <div>
              <p className={styles.sectionEyebrow}>Milestones</p>
              <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Achievements</h2>
            </div>
            <span className={styles.badgesEarned}>
              {achievements.filter(a => a.earned).length} / {achievements.length} earned
            </span>
          </div>
          <div className={styles.badgesGrid}>
            {achievements.map((a, i) => (
              <div key={i} className={`${styles.badgeCard} ${a.earned ? '' : styles.badgeCardLocked}`}>
                <div className={styles.badgeIcon}>{a.icon}</div>
                <div className={styles.badgeName}>{a.name}</div>
                <div className={styles.badgeDesc}>{a.desc}</div>
                {a.earned
                  ? <span className={styles.badgeEarnedTag}>Earned</span>
                  : <span className={styles.badgeLockedTag}>Locked</span>
                }
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}