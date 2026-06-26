'use client';

import { useEffect, useRef, useState } from 'react';
import { Fraunces, Inter, IBM_Plex_Mono } from 'next/font/google';
import styles from './resources.module.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-display',
});
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
});
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
});

const SECTIONS = [
  { id: 'start', num: '01', label: 'Start' },
  { id: 'quickstart', num: '02', label: 'Quick start' },
  { id: 'docs', num: '03', label: 'Documentation' },
  { id: 'tutorials', num: '04', label: 'Tutorials' },
  { id: 'community', num: '05', label: 'Community' },
  { id: 'changelog', num: '06', label: 'Changelog' },
  { id: 'subscribe', num: '07', label: 'Subscribe' },
];

const QUICK_START = [
  {
    num: '01',
    title: 'Install the CLI',
    desc: 'Get the Lattice CLI running on macOS, Linux, or Windows.',
    time: '2 min',
  },
  {
    num: '02',
    title: 'Authenticate a request',
    desc: 'Generate an API key and send your first authenticated call.',
    time: '4 min',
  },
  {
    num: '03',
    title: 'Connect your data',
    desc: 'Point Lattice at a Postgres, BigQuery, or Snowflake instance.',
    time: '6 min',
  },
  {
    num: '04',
    title: 'Deploy to production',
    desc: 'Promote a project from staging to a live environment safely.',
    time: '5 min',
  },
];

const DOC_CATEGORIES = [
  { label: 'Getting Started', count: 18 },
  { label: 'API Reference', count: 142 },
  { label: 'SDKs & Libraries', count: 9 },
  { label: 'Integrations', count: 34 },
  { label: 'Security & Compliance', count: 12 },
  { label: 'Billing & Plans', count: 7 },
];

const TUTORIALS = [
  { title: 'Designing your first pipeline', speaker: 'Mara Osei', duration: '18:24', tag: 'Webinar' },
  { title: 'Zero-downtime schema migrations', speaker: 'Tomas Reyes', duration: '11:05', tag: 'Tutorial' },
  { title: 'Scaling reads with read replicas', speaker: 'Priya Nathan', duration: '24:50', tag: 'Deep dive' },
  { title: 'Office hours: access control Q&A', speaker: 'Lattice team', duration: '32:10', tag: 'Recording' },
];

const COMMUNITY = [
  { label: 'Discussion forum', desc: 'Ask questions and browse answered threads.', meta: '4.2k threads' },
  { label: 'GitHub discussions', desc: 'Track proposals and vote on open issues.', meta: '890 open' },
  { label: 'Discord', desc: 'Talk with the team and other builders live.', meta: '6.1k members' },
];

const SUPPORT = [
  { label: 'Live chat', desc: 'Mon–Fri, 9am–6pm ET. Typical reply under 10 minutes.' },
  { label: 'Email support', desc: 'support@lattice.dev — reply within one business day.' },
  { label: 'Status page', desc: 'Live uptime, incident history, and maintenance windows.' },
];

const CHANGELOG = [
  { date: 'Jun 18', tag: 'Feature', text: 'Row-level access policies now support nested roles.' },
  { date: 'Jun 09', tag: 'Improvement', text: 'Cold start time for serverless functions cut by 40%.' },
  { date: 'May 28', tag: 'Fix', text: 'Resolved a timeout on bulk exports over 5GB.' },
  { date: 'May 14', tag: 'Feature', text: 'Added a native connector for ClickHouse.' },
];

function DocIcon({ index }: { index: number }) {
  const paths = [
    <path key="a" d="M6 4h13v22H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />,
    <path key="b" d="M5 9h20M5 16h20M5 23h12" />,
    <path key="c" d="M16 5 6 11v9l10 6 10-6v-9z" />,
    <path key="d" d="M6 16h9M6 16a4 4 0 1 1 8 0 4 4 0 1 1-8 0Zm14 0a4 4 0 1 1-8 0" />,
    <path key="e" d="M16 4 6 8v9c0 6 5 9 10 11 5-2 10-5 10-11V8Z" />,
    <path key="f" d="M5 9h22v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2ZM5 9l4-5h14l4 5" />,
  ];
  return (
    <svg className={styles.docIcon} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {paths[index % paths.length]}
    </svg>
  );
}

export default function ResourcesPage() {
  const [active, setActive] = useState('start');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: 0 }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className={`${styles.page} ${fraunces.variable} ${inter.variable} ${plexMono.variable}`}>
      <div className={styles.shell}>
        <nav className={styles.rail} aria-label="Resource sections">
          <div className={styles.railMark} aria-hidden="true">L</div>
          <ul className={styles.railList}>
            {SECTIONS.map((s) => {
              const isActive = active === s.id;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    className={`${styles.railButton} ${isActive ? styles.railButtonActive : ''}`}
                    onClick={() => scrollTo(s.id)}
                    aria-current={isActive}
                  >
                    <span className={styles.railTab} aria-hidden="true" />
                    <span className={styles.railNum}>{s.num}</span>
                    <span className={styles.railLabel}>{s.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <main className={styles.main}>
          {/* 01 — Hero */}
          <section
            id="start"
            ref={(el) => { sectionRefs.current.start = el; }}
            className={`${styles.section} ${styles.hero}`}
          >
            <p className={styles.eyebrow}>Resource library</p>
            <h1 className={styles.heroHeading}>
              Everything you need to build with <em>Lattice</em>.
            </h1>
            <p className={styles.heroLede}>
              Guides, reference docs, recorded sessions, and a community of people
              shipping with Lattice every day. Start with the quick-start track
              below, or search the index directly.
            </p>
            <form className={styles.searchRow} onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Search guides, endpoints, or topics…" aria-label="Search resources" />
              <button type="submit">Search</button>
            </form>
            <div className={styles.statRow}>
              <div className={styles.statItem}>
                <span className={styles.statNum}>180+</span>
                <span className={styles.statLabel}>Guides &amp; docs</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNum}>64</span>
                <span className={styles.statLabel}>Video sessions</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNum}>11k</span>
                <span className={styles.statLabel}>Community members</span>
              </div>
            </div>
          </section>

          {/* 02 — Quick start */}
          <section
            id="quickstart"
            ref={(el) => { sectionRefs.current.quickstart = el; }}
            className={styles.section}
          >
            <p className={styles.eyebrow}>Quick start</p>
            <h2 className={styles.heading}>Four steps to a working integration.</h2>
            <p className={styles.lede}>
              Each card is self-contained — follow them in order for a full setup,
              or jump straight to the one you need.
            </p>
            <div className={styles.quickGrid}>
              {QUICK_START.map((card) => (
                <article className={styles.quickCard} key={card.num}>
                  <span className={styles.quickNum}>{card.num}</span>
                  <h3 className={styles.quickTitle}>{card.title}</h3>
                  <p className={styles.quickDesc}>{card.desc}</p>
                  <span className={styles.quickTime}>{card.time} read</span>
                </article>
              ))}
            </div>
          </section>

          {/* 03 — Documentation index */}
          <section
            id="docs"
            ref={(el) => { sectionRefs.current.docs = el; }}
            className={styles.section}
          >
            <p className={styles.eyebrow}>Documentation</p>
            <h2 className={styles.heading}>Browse the full reference index.</h2>
            <p className={styles.lede}>
              Six categories cover everything from your first project to
              enterprise security review.
            </p>
            <div className={styles.docGrid}>
              {DOC_CATEGORIES.map((cat, i) => (
                <a href="#" className={styles.docCard} key={cat.label}>
                  <DocIcon index={i} />
                  <h3 className={styles.docLabel}>{cat.label}</h3>
                  <span className={styles.docCount}>{cat.count} articles</span>
                </a>
              ))}
            </div>
          </section>

          {/* 04 — Tutorials & webinars */}
          <section
            id="tutorials"
            ref={(el) => { sectionRefs.current.tutorials = el; }}
            className={styles.section}
          >
            <p className={styles.eyebrow}>Tutorials &amp; webinars</p>
            <h2 className={styles.heading}>Watch the team build, live and recorded.</h2>
            <p className={styles.lede}>
              Recorded sessions, deep dives, and monthly office hours with the
              engineers behind Lattice.
            </p>
            <div className={styles.tutScroll}>
              {TUTORIALS.map((t) => (
                <article className={styles.tutCard} key={t.title}>
                  <div className={styles.tutThumb}>
                    <span className={styles.tutDuration}>{t.duration}</span>
                    <span className={styles.tutTag}>{t.tag}</span>
                  </div>
                  <div className={styles.tutBody}>
                    <h3 className={styles.tutTitle}>{t.title}</h3>
                    <p className={styles.tutSpeaker}>{t.speaker}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* 05 — Community & support */}
          <section
            id="community"
            ref={(el) => { sectionRefs.current.community = el; }}
            className={styles.section}
          >
            <p className={styles.eyebrow}>Community &amp; support</p>
            <h2 className={styles.heading}>You&apos;re not building alone.</h2>
            <p className={styles.lede}>
              Ask the community, dig into open proposals, or reach the support
              team directly.
            </p>
            <div className={styles.splitGrid}>
              <div>
                <p className={styles.subhead}>Community</p>
                <ul className={styles.commList}>
                  {COMMUNITY.map((c) => (
                    <li className={styles.commItem} key={c.label}>
                      <div className={styles.commLabelGroup}>
                        <span className={styles.commLabel}>{c.label}</span>
                        <span className={styles.commDesc}>{c.desc}</span>
                      </div>
                      <span className={styles.commMeta}>{c.meta}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className={styles.subhead}>Support</p>
                <ul className={styles.supportList}>
                  {SUPPORT.map((s) => (
                    <li className={styles.supportItem} key={s.label}>
                      <div className={styles.supportLabelGroup}>
                        <span className={styles.supportLabel}>{s.label}</span>
                        <span className={styles.supportDesc}>{s.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* 06 — Changelog */}
          <section
            id="changelog"
            ref={(el) => { sectionRefs.current.changelog = el; }}
            className={styles.section}
          >
            <p className={styles.eyebrow}>Changelog</p>
            <h2 className={styles.heading}>What shipped recently.</h2>
            <p className={styles.lede}>
              A running record of features, fixes, and improvements across the
              platform.
            </p>
            <div className={styles.changeList}>
              {CHANGELOG.map((entry) => (
                <div className={styles.changeRow} key={entry.date + entry.text}>
                  <span className={styles.changeDate}>{entry.date}</span>
                  <span className={styles.changeTag}>{entry.tag}</span>
                  <p className={styles.changeText}>{entry.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 07 — Subscribe */}
          <section
            id="subscribe"
            ref={(el) => { sectionRefs.current.subscribe = el; }}
            className={`${styles.section} ${styles.subscribe}`}
          >
            <p className={styles.eyebrow}>Stay current</p>
            <h2 className={styles.heading}>Get the changelog in your inbox.</h2>
            <p className={styles.lede} style={{ color: '#cdd3de' }}>
              One email a month. New guides, shipped features, and nothing else.
            </p>
            <form className={styles.subscribeRow} onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="you@company.com" aria-label="Email address" required />
              <button type="submit">Subscribe</button>
            </form>
            <p className={styles.subscribeNote}>Unsubscribe anytime. No spam, ever.</p>
          </section>
        </main>
      </div>
    </div>
  );
}