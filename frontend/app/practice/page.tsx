'use client';

import React, { useState, useEffect } from 'react';
import styles from './practice.module.css';

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
  attempts: Record<string, number>;
  totalPoints: number;
  streak: number;
  bestStreak: number;
  level: number;
  rank: number;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  streak: number;
  level: number;
}

const practiceItems: PracticeItem[] = [
  {
    id: 'ch1',
    title: 'Reverse a String',
    description: 'Write a function to reverse a string without using built-in methods. Common interview question.',
    type: 'Challenge',
    difficulty: 'Easy',
    points: 50,
    estimatedTime: '15 min',
  },
  {
    id: 'ch2',
    title: 'Two Sum Algorithm',
    description: 'Find two numbers in an array that add up to a target. Optimize for O(n) solution.',
    type: 'Challenge',
    difficulty: 'Medium',
    points: 100,
    relatedCourse: 'algorithms-101',
    estimatedTime: '30 min',
  },
  {
    id: 'ch3',
    title: 'Fibonacci Sequence',
    description: 'Generate Fibonacci numbers efficiently. Compare iterative, recursive, and memoized approaches.',
    type: 'Challenge',
    difficulty: 'Medium',
    points: 100,
    estimatedTime: '25 min',
  },
  {
    id: 'ch4',
    title: 'Binary Tree Traversal',
    description: 'Implement in-order, pre-order, and post-order traversal for binary trees.',
    type: 'Challenge',
    difficulty: 'Hard',
    points: 200,
    estimatedTime: '45 min',
  },
  {
    id: 'ch5',
    title: 'Longest Substring',
    description: 'Find the longest substring without repeating characters using the sliding window technique.',
    type: 'Challenge',
    difficulty: 'Hard',
    points: 200,
    estimatedTime: '40 min',
  },
  {
    id: 'quiz1',
    title: 'React Hooks Fundamentals',
    description: 'Test your knowledge of useState, useEffect, useContext, and custom hooks.',
    type: 'Quiz',
    difficulty: 'Easy',
    points: 30,
    relatedCourse: 'react-fundamentals',
    estimatedTime: '10 min',
  },
  {
    id: 'quiz2',
    title: 'JavaScript Closures',
    description: 'Deep dive into closures, scope chains, and lexical scoping in JavaScript.',
    type: 'Quiz',
    difficulty: 'Medium',
    points: 75,
    estimatedTime: '12 min',
  },
  {
    id: 'quiz3',
    title: 'TypeScript Advanced Types',
    description: 'Generics, conditional types, mapped types, and type inference patterns.',
    type: 'Quiz',
    difficulty: 'Hard',
    points: 150,
    relatedCourse: 'typescript-advanced',
    estimatedTime: '15 min',
  },
  {
    id: 'quiz4',
    title: 'CSS Grid & Flexbox',
    description: 'Master layout techniques with CSS Grid and Flexbox. Responsive design patterns.',
    type: 'Quiz',
    difficulty: 'Medium',
    points: 75,
    relatedCourse: 'css-layouts',
    estimatedTime: '10 min',
  },
  {
    id: 'quiz5',
    title: 'REST API Best Practices',
    description: 'HTTP methods, status codes, versioning, authentication, and API design principles.',
    type: 'Quiz',
    difficulty: 'Medium',
    points: 75,
    estimatedTime: '12 min',
  },
  {
    id: 'proj1',
    title: 'Build a Todo App with React',
    description: 'Create a fully functional todo app with add, edit, delete, and filter features.',
    type: 'Project',
    difficulty: 'Easy',
    points: 150,
    relatedCourse: 'react-fundamentals',
    estimatedTime: '120 min',
  },
  {
    id: 'proj2',
    title: 'Weather App with API Integration',
    description: 'Fetch weather data from a public API and display it with a clean UI. Handle errors gracefully.',
    type: 'Project',
    difficulty: 'Medium',
    points: 250,
    estimatedTime: '180 min',
  },
  {
    id: 'proj3',
    title: 'E-commerce Product Filter',
    description: 'Build a product listing with multi-select filters for category, price, and rating.',
    type: 'Project',
    difficulty: 'Medium',
    points: 250,
    estimatedTime: '150 min',
  },
  {
    id: 'proj4',
    title: 'Real-time Chat Application',
    description: 'Build a chat app with real-time messaging using WebSockets or Firebase.',
    type: 'Project',
    difficulty: 'Hard',
    points: 500,
    relatedCourse: 'node-advanced',
    estimatedTime: '360 min',
  },
  {
    id: 'proj5',
    title: 'Dashboard with Charts & Analytics',
    description: 'Create an admin dashboard with data visualization, filters, and export functionality.',
    type: 'Project',
    difficulty: 'Hard',
    points: 500,
    estimatedTime: '300 min',
  },
  {
    id: 'proj6',
    title: 'Authentication System',
    description: 'Implement JWT-based authentication with login, signup, password reset, and protected routes.',
    type: 'Project',
    difficulty: 'Hard',
    points: 450,
    relatedCourse: 'node-advanced',
    estimatedTime: '240 min',
  },
  {
    id: 'ch6',
    title: 'Debounce & Throttle',
    description: 'Implement debounce and throttle functions. Understand use cases and performance implications.',
    type: 'Challenge',
    difficulty: 'Medium',
    points: 100,
    estimatedTime: '20 min',
  },
  {
    id: 'ch7',
    title: 'Promise.all & Race',
    description: 'Master async patterns with Promise.all, Promise.race, and Promise.allSettled.',
    type: 'Challenge',
    difficulty: 'Hard',
    points: 150,
    estimatedTime: '30 min',
  },
  {
    id: 'quiz6',
    title: 'Next.js App Router',
    description: 'File-based routing, layouts, dynamic segments, and parallel routes in Next.js 13+.',
    type: 'Quiz',
    difficulty: 'Medium',
    points: 100,
    relatedCourse: 'nextjs-advanced',
    estimatedTime: '12 min',
  },
  {
    id: 'proj7',
    title: 'Personal Portfolio Website',
    description: 'Build a modern portfolio with Next.js, showcasing projects, skills, and contact form.',
    type: 'Project',
    difficulty: 'Easy',
    points: 200,
    estimatedTime: '240 min',
  },
];

const leaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'Alex Chen', points: 4850, streak: 28, level: 12 },
  { rank: 2, name: 'Jordan Lee', points: 4320, streak: 21, level: 11 },
  { rank: 3, name: 'Sam Martinez', points: 3980, streak: 15, level: 10 },
  { rank: 4, name: 'Casey Morgan', points: 3650, streak: 12, level: 9 },
  { rank: 5, name: 'Taylor Swift', points: 3240, streak: 8, level: 8 },
];

export default function PracticePage() {
  const [filter, setFilter] = useState<'All' | PracticeType>('All');
  const [progress, setProgress] = useState<UserProgress>({
    completed: new Set(),
    attempts: {},
    totalPoints: 1250,
    streak: 5,
    bestStreak: 12,
    level: 6,
    rank: 87,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading progress from localStorage
    setTimeout(() => setIsLoading(false), 300);
  }, []);

  const filteredItems =
    filter === 'All' ? practiceItems : practiceItems.filter((item) => item.type === filter);

  const handleComplete = (itemId: string, points: number) => {
    setProgress((prev) => {
      const newCompleted = new Set(prev.completed);
      const wasCompleted = newCompleted.has(itemId);

      if (!wasCompleted) {
        newCompleted.add(itemId);
        return {
          ...prev,
          completed: newCompleted,
          totalPoints: prev.totalPoints + points,
          streak: prev.streak + 1,
          bestStreak: Math.max(prev.bestStreak, prev.streak + 1),
        };
      }
      return prev;
    });
  };

  const typeStats = {
    challenges: practiceItems.filter((item) => item.type === 'Challenge').length,
    quizzes: practiceItems.filter((item) => item.type === 'Quiz').length,
    projects: practiceItems.filter((item) => item.type === 'Project').length,
  };

  return (
    <div className={styles.container}>
      {/* Hero / Stats Dashboard */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Master Your Skills</h1>
          <p className={styles.subtitle}>
            Practice challenges, quizzes, and mini-projects to level up your abilities
          </p>

          {/* Stats Grid */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statValue}>{progress.totalPoints}</div>
              <div className={styles.statLabel}>Total Points</div>
              <div className={styles.statBar}>
                <div
                  className={styles.statFill}
                  style={{ width: `${Math.min((progress.totalPoints / 5000) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.streakValue}>
                <span className={styles.streakFlame}>🔥</span>
                {progress.streak}
              </div>
              <div className={styles.statLabel}>Current Streak</div>
              <div className={styles.statSubtext}>Best: {progress.bestStreak}</div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statValue}>Level {progress.level}</div>
              <div className={styles.statLabel}>Current Level</div>
              <div className={styles.levelProgress}>
                <span className={styles.levelDot}></span>
                <span className={styles.levelDot}></span>
                <span className={styles.levelDot}></span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statValue}>#{progress.rank}</div>
              <div className={styles.statLabel}>Global Rank</div>
              <div className={styles.statSubtext}>Top 10%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard Section */}
      <div className={styles.leaderboardSection}>
        <h2 className={styles.sectionTitle}>Leaderboard</h2>
        <div className={styles.leaderboard}>
          {leaderboard.map((entry) => (
            <div key={entry.rank} className={styles.leaderboardRow}>
              <div className={styles.leaderboardRank}>
                <span className={styles.rankBadge}>{entry.rank}</span>
              </div>
              <div className={styles.leaderboardName}>
                <div className={styles.name}>{entry.name}</div>
                <div className={styles.nameSubtext}>Level {entry.level}</div>
              </div>
              <div className={styles.leaderboardStats}>
                <div className={styles.leaderboardStat}>
                  <span className={styles.statValueSmall}>{entry.points}</span>
                  <span className={styles.statLabelSmall}>pts</span>
                </div>
                <div className={styles.leaderboardStat}>
                  <span className={styles.statValueSmall}>🔥{entry.streak}</span>
                  <span className={styles.statLabelSmall}>streak</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Practice Items Section */}
      <div className={styles.practiceSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Practice Items</h2>
          <div className={styles.itemCount}>
            {progress.completed.size} / {practiceItems.length} completed
          </div>
        </div>

        {/* Filter Tabs */}
        <div className={styles.filterTabs}>
          {['All', 'Challenge', 'Quiz', 'Project'].map((tab) => (
            <button
              key={tab}
              className={`${styles.filterTab} ${filter === tab ? styles.filterTabActive : ''}`}
              onClick={() => setFilter(tab as 'All' | PracticeType)}
            >
              {tab === 'All' ? 'All Items' : tab}
              {tab !== 'All' && (
                <span className={styles.filterCount}>
                  {typeStats[`${tab.toLowerCase()}s` as keyof typeof typeStats]}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className={styles.grid}>
          {filteredItems.map((item) => {
            const isCompleted = progress.completed.has(item.id);

            return (
              <div
                key={item.id}
                className={`${styles.card} ${isCompleted ? styles.cardCompleted : ''}`}
              >
                {/* Type & Difficulty */}
                <div className={styles.cardHeader}>
                  <span
                    className={`${styles.typeBadge} ${styles[`type${item.type.replace(' ', '')}`]}`}
                  >
                    {item.type}
                  </span>
                  <span
                    className={`${styles.difficultyBadge} ${styles[`diff${item.difficulty}`]}`}
                  >
                    {item.difficulty}
                  </span>
                  {isCompleted && <span className={styles.completedBadge}>✓ Done</span>}
                </div>

                {/* Content */}
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDescription}>{item.description}</p>

                {/* Meta */}
                <div className={styles.cardMeta}>
                  <span className={styles.metaItem}>⏱ {item.estimatedTime}</span>
                  <span className={styles.metaItem}>⭐ +{item.points} pts</span>
                  {item.relatedCourse && (
                    <span className={styles.metaItem}>📚 Related Course</span>
                  )}
                </div>

                {/* CTA */}
                <button
                  className={`${styles.cta} ${isCompleted ? styles.ctaCompleted : ''}`}
                  onClick={() => handleComplete(item.id, item.points)}
                  disabled={isCompleted}
                >
                  {isCompleted ? 'Completed ✓' : 'Start Practice'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}