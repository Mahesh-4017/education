import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoSearch } from 'react-icons/io5';
import axios from 'axios';
import style from './AstrologerDetail.module.css';
import { BiTransfer } from "react-icons/bi";
import { IoIosArrowRoundForward } from "react-icons/io";
const API = import.meta.env.VITE_API_URL;
const IMG = import.meta.env.VITE_MAIN_URL || '';

type Tab = 'overview' | 'blogs' | 'sessions' | 'reviews' | 'transactions' | 'chats';

interface AstroDetail {
    _id: string;
    email: string;
    applicationStatus: string;
    availabilityStatus?: string;
    personal?: { fullName?: string; phone?: string; country?: string };
    professionalInfo?: {
        displayName?: string;
        username?: string;
        about?: string;
        ppm?: number;
        experienceYears?: number;
        avatar?: { url?: string };
        skill?: { _id: string; name?: string; category?: string }[];
        languages?: { _id: string; name?: string }[];
    };
    balance?: number;
}

export default function AstrologerDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [astro, setAstro] = useState<AstroDetail | null>(null);
    const [tab, setTab] = useState<Tab>('overview');
    const [blogs, setBlogs] = useState<any[]>([]);
    const [sessions, setSessions] = useState<any[]>([]);
    const [reviews, setReviews] = useState<any[]>([]);
    const [transactions, setTransactions] = useState<any[]>([]);
    const [chats, setChats] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedSession, setSelectedSession] = useState<any>(null);
    const [sessionMsgs, setSessionMsgs] = useState<any[]>([]);
    const [msgsLoading, setMsgsLoading] = useState(false);

    const openSessionMessages = async (session: any) => {
        setSelectedSession(session);
        setMsgsLoading(true);
        try {
            const res = await axios.get(`${API}session?sessionId=${session._id}`);
            setSessionMsgs(res.data?.messages || []);
        } catch {
            setSessionMsgs([]);
        } finally {
            setMsgsLoading(false);
        }
    };

    // Advanced Table States
    const [qBlogs, setQBlogs] = useState('');
    const [pBlogs, setPBlogs] = useState(1);
    const [statusFilter, setStatusFilter] = useState('all');

    const [qSessions, setQSessions] = useState('');
    const [pSessions, setPSessions] = useState(1);

    const [qTransactions, setQTransactions] = useState('');
    const [pTransactions, setPTransactions] = useState(1);

    const [sort, setSort] = useState<{ key: string; dir: 'asc' | 'desc' }>({ key: 'createdAt', dir: 'desc' });
    const pageSize = 5;

    const handleSort = (key: string) => {
        setSort(prev => {
            if (prev?.key === key) {
                return { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' };
            }
            return { key, dir: 'desc' };
        });
    };

    const SortIcon = ({ field }: { field: string }) => {
        if (sort?.key !== field) return <BiTransfer style={{ transform: 'rotate(90deg)', fontSize: '1rem' }} />;
        return <IoIosArrowRoundForward style={{ transform: sort.dir === 'asc' ? 'rotate(90deg)' : 'rotate(270deg)', fontSize: '1rem' }} />;
    };

    // Derived Data Logic
    const filteredBlogs = useMemo(() => {
        let list = [...blogs];
        if (statusFilter !== 'all') list = list.filter(b => b.status === statusFilter);
        if (qBlogs) list = list.filter(b => b.title.toLowerCase().includes(qBlogs.toLowerCase()));

        const { key, dir } = sort;
        list.sort((a, b) => {
            let valA = a[key];
            let valB = b[key];
            if (key === 'createdAt') {
                valA = new Date(valA).getTime();
                valB = new Date(valB).getTime();
            }
            return dir === 'asc' ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
        });
        return list;
    }, [blogs, qBlogs, statusFilter, sort]);

    const filteredSessions = useMemo(() => {
        let list = [...sessions];
        if (qSessions) {
            list = list.filter(s => {
                const name = s.user?.name || s.user || '';
                return String(name).toLowerCase().includes(qSessions.toLowerCase());
            });
        }
        const { key, dir } = sort;
        list.sort((a, b) => {
            let valA = a[key];
            let valB = b[key];
            if (key === 'createdAt') {
                valA = new Date(valA).getTime();
                valB = new Date(valB).getTime();
            }
            if (typeof valA === 'string' && typeof valB === 'string') {
                return dir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
            }
            return dir === 'asc' ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
        });
        return list;
    }, [sessions, qSessions, sort]);

    const filteredTransactions = useMemo(() => {
        let list = [...transactions];
        if (qTransactions) {
            list = list.filter(t => {
                const name = t.user?.name || '';
                return String(name).toLowerCase().includes(qTransactions.toLowerCase()) ||
                    String(t.transactionType).toLowerCase().includes(qTransactions.toLowerCase());
            });
        }
        const { key, dir } = sort;
        list.sort((a, b) => {
            let valA = a[key];
            let valB = b[key];
            if (key === 'createdAt') {
                valA = new Date(valA).getTime();
                valB = new Date(valB).getTime();
            }
            return dir === 'asc' ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
        });
        return list;
    }, [transactions, qTransactions, sort]);

    const paginatedBlogs = filteredBlogs.slice((pBlogs - 1) * pageSize, pBlogs * pageSize);
    const paginatedSessions = filteredSessions.slice((pSessions - 1) * pageSize, pSessions * pageSize);
    const paginatedTransactions = filteredTransactions.slice((pTransactions - 1) * pageSize, pTransactions * pageSize);

    // Reset pagination on search
    useEffect(() => setPBlogs(1), [qBlogs, statusFilter]);
    useEffect(() => setPSessions(1), [qSessions]);
    useEffect(() => setPTransactions(1), [qTransactions]);

    useEffect(() => {
        if (!id) return;
        axios.get(`${API}astro/adminGetAstrologers`).then(res => {
            if (res.data?.success) {
                const found = res.data.astrologer.find((a: any) => a._id === id);
                if (found) setAstro(found);
            }
        }).catch(console.error).finally(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        if (!id || tab === 'overview') return;

        if (tab === 'blogs' && blogs.length === 0) {
            axios.get(`${API}blogs?astrologerId=${id}`).then(res => {
                if (res.data?.success) setBlogs(res.data.blogs || []);
            }).catch(console.error);
        }

        if (tab === 'transactions' && transactions.length === 0) {
            axios.get(`${API}astro/transactions?astroId=${id}`).then(res => {
                if (res.data?.success) setTransactions(res.data.transactions || []);
            }).catch(console.error);
        }

        if ((tab === 'sessions' || tab === 'reviews' || tab === 'chats') && sessions.length === 0) {
            axios.get(`${API}chat/sessions?astroId=${id}`).then(res => {
                const all = res.data?.sessions || res.data?.session || [];
                const filtered = all.filter((s: any) => s.astro === id || s.astro?._id === id);
                setSessions(filtered);
                const withReviews = filtered.filter((s: any) => s.review?.rating);
                setReviews(withReviews);
            }).catch(console.error);
        }

        if (tab === 'chats' && chats.length === 0) {
            axios.get(`${API}chat/history?astroId=${id}`).then(res => {
                setChats(res.data?.chats || []);
            }).catch(console.error);
        }
    }, [tab, id]);

    const getName = (a: AstroDetail | null) =>
        a?.professionalInfo?.displayName || a?.personal?.fullName || 'Unknown';

    const avatarSrc = astro?.professionalInfo?.avatar?.url
        ? `${IMG}${astro.professionalInfo.avatar.url}`
        : null;
    const statusColor = (s: string) => {
        const map: Record<string, string> = {
            APPROVED: '#16a34a', REJECTED: '#dc2626', BANNED: '#7f1d1d',
            WFA: '#d97706', SUBMITTED: '#2563eb', DRAFT: '#6b7280', ONLINE: '#16a34a', OFFLINE: '#6b7280'
        };
        return map[s] || '#6b7280';
    };

    if (loading) return <div className={style.loading}>Loading…</div>;
    if (!astro) return <div className={style.loading}>Astrologer not found.</div>;

    const TABS: { key: Tab; label: string; emoji: string }[] = [
        { key: 'overview', label: 'Overview', emoji: '👤' },
        { key: 'blogs', label: 'Blogs', emoji: '📝' },
        { key: 'sessions', label: 'Sessions', emoji: '💬' },
        { key: 'chats', label: 'Chats', emoji: '🗨️' },
        { key: 'reviews', label: 'Reviews', emoji: '⭐' },
        { key: 'transactions', label: 'Transactions', emoji: '💰' },
    ];

    return (
        <div className="wrapper" style={{ display: "flex", flexDirection: "column" }}>
            <div className="top">
                Astrologer Detail
            </div>
            <div className={style.heroCard}>
                <div className={style.heroLeft}>
                    {avatarSrc
                        ? <img src={avatarSrc} alt={getName(astro)} style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #f8fafc', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
                        : <div className={style.avatarPlaceholder}>👤</div>
                    }
                    <div>
                        <h2 className={style.heroName}>{getName(astro)}</h2>
                        <p className={style.heroEmail}>{astro.email}</p>
                        <div className={style.badgeRow}>
                            <span className={style.badge} style={{ background: statusColor(astro.applicationStatus) + '20', color: statusColor(astro.applicationStatus), border: `1px solid ${statusColor(astro.applicationStatus)}40` }}>
                                {astro.applicationStatus}
                            </span>
                            {astro.availabilityStatus && (
                                <span className={style.badge} style={{ background: '#dbeafe', color: '#1d4ed8' }}>
                                    {astro.availabilityStatus}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className={style.heroStats}>
                    <div className={style.statBox}>
                        <span className={style.statVal}>₹{astro.professionalInfo?.ppm ?? '—'}/min</span>
                        <span className={style.statLabel}>Rate</span>
                    </div>
                    <div className={style.statBox}>
                        <span className={style.statVal}>{astro.professionalInfo?.experienceYears ?? '—'} yrs</span>
                        <span className={style.statLabel}>Experience</span>
                    </div>
                    <div className={style.statBox}>
                        <span className={style.statVal}>{astro.personal?.country ?? '—'}</span>
                        <span className={style.statLabel}>Country</span>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className={style.tabs}>
                {TABS.map(t => (
                    <button key={t.key} className={`${style.tab} ${tab === t.key ? style.activeTab : ''}`} onClick={() => setTab(t.key)}>
                        <span>{t.emoji}</span> {t.label}
                    </button>
                ))}
            </div>

            <div className={style.tabContent}>

                {tab === 'overview' && (
                    <div className={style.overviewGrid}>
                        <div className={style.card}>
                            <h3 className={style.cardTitle}>Personal Info</h3>
                            <Field label="Full Name" value={astro.personal?.fullName} />
                            <Field label="Phone" value={astro.personal?.phone} />
                            <Field label="Country" value={astro.personal?.country} />
                            <Field label="Email" value={astro.email} />
                        </div>
                        <div className={style.card}>
                            <h3 className={style.cardTitle}>Professional Info</h3>
                            <Field label="Display Name" value={astro.professionalInfo?.displayName} />
                            <Field label="Username" value={astro.professionalInfo?.username} />
                            <Field label="Price / min" value={astro.professionalInfo?.ppm ? `₹${astro.professionalInfo.ppm}` : undefined} />
                            <Field label="Experience" value={astro.professionalInfo?.experienceYears ? `${astro.professionalInfo.experienceYears} years` : undefined} />
                        </div>
                        {astro.professionalInfo?.about && (
                            <div className={`${style.card} ${style.fullWidth}`}>
                                <h3 className={style.cardTitle}>About</h3>
                                <p className={style.aboutText}>{astro.professionalInfo.about}</p>
                            </div>
                        )}
                        {astro.professionalInfo?.skill && astro.professionalInfo.skill.length > 0 && (
                            <div className={style.card}>
                                <h3 className={style.cardTitle}>Skills</h3>
                                <div className={style.chips}>
                                    {astro.professionalInfo.skill.map((s, i) => (
                                        <span key={i} className={style.chip}>{s.name || s.category}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {astro.professionalInfo?.languages && astro.professionalInfo.languages.length > 0 && (
                            <div className={style.card}>
                                <h3 className={style.cardTitle}>Languages</h3>
                                <div className={style.chips}>
                                    {astro.professionalInfo.languages.map((l, i) => (
                                        <span key={i} className={style.chip}>{l.name}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {tab === 'blogs' && (
                    <div>
                        <div className={style.tableControls}>
                            <div className={style.searchBox}>
                                <IoSearch className={style.searchIcon} />
                                <input type="text" placeholder="Search by title…" value={qBlogs} onChange={e => setQBlogs(e.target.value)} />
                            </div>
                            <div className={style.filterBox}>
                                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                                    <option value="all">All Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </div>
                        </div>
                        {filteredBlogs.length === 0
                            ? <Empty label="No blogs found" />
                            : <div className={style.tableWrapper}>
                                <table className={style.table}>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>
                                                <button className={style.sortBtn} onClick={() => handleSort('title')}>
                                                    Title <SortIcon field="title" />
                                                </button>
                                            </th>
                                            <th>Status</th>
                                            <th>
                                                <button className={style.sortBtn} onClick={() => handleSort('createdAt')}>
                                                    Created <SortIcon field="createdAt" />
                                                </button>
                                            </th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedBlogs.map((b, i) => (
                                            <tr key={b._id}>
                                                <td>{(pBlogs - 1) * pageSize + i + 1}</td>
                                                <td>{b.title}</td>
                                                <td><StatusTag status={b.status} /></td>
                                                <td>{new Date(b.createdAt).toLocaleDateString()}</td>
                                                <td>
                                                    <button className={style.linkBtn} onClick={() => navigate(`/blogs/inspect/${b._id}`)}>Inspect</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <Pagination current={pBlogs} total={filteredBlogs.length} pageSize={pageSize} onPageChange={setPBlogs} />
                            </div>
                        }
                    </div>
                )}

                {tab === 'sessions' && (
                    <div>
                        <div className={style.tableControls}>
                            <div className={style.searchBox}>
                                <IoSearch className={style.searchIcon} />
                                <input type="text" placeholder="Search by user name…" value={qSessions} onChange={e => setQSessions(e.target.value)} />
                            </div>
                        </div>
                        {filteredSessions.length === 0
                            ? <Empty label="No sessions found" />
                            : <div className={style.tableWrapper}>
                                <table className={style.table}>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>User</th>
                                            <th>Duration</th>
                                            <th>
                                                <button className={style.sortBtn} onClick={() => handleSort('amount')}>
                                                    Amount <SortIcon field="amount" />
                                                </button>
                                            </th>
                                            <th>
                                                <button className={style.sortBtn} onClick={() => handleSort('createdAt')}>
                                                    Date <SortIcon field="createdAt" />
                                                </button>
                                            </th>
                                            <th>Review</th>
                                            <th>Messages</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedSessions.map((s, i) => (
                                            <tr key={s._id}>
                                                <td>{(pSessions - 1) * pageSize + i + 1}</td>
                                                <td>
                                                    <button
                                                        onClick={() => { const uid = s.user?._id || s.user; if (uid && typeof uid === 'string') navigate(`/user/${uid}`); }}
                                                        style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontWeight: 600, fontSize: 14, textDecoration: 'underline', padding: 0 }}
                                                    >
                                                        {s.user?.name || '—'}
                                                    </button>
                                                </td>
                                                <td>{s.duration ? `${s.duration} min` : '—'}</td>
                                                <td>{s.amount ? `₹${s.amount}` : '—'}</td>
                                                <td>{new Date(s.createdAt).toLocaleDateString()}</td>
                                                <td>
                                                    {s.review?.rating ? (
                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                                            <Stars rating={s.review.rating} />
                                                            <span style={{ fontSize: 14, color: '#64748b', fontStyle: 'italic' }}>"{s.review.comment}"</span>
                                                        </div>
                                                    ) : '—'}
                                                </td>
                                                <td>
                                                    <button
                                                        onClick={() => openSessionMessages(s)}
                                                        className={style.linkBtn}
                                                        style={{ background: '#2563eb' }}
                                                    >View Msgs</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <Pagination current={pSessions} total={filteredSessions.length} pageSize={pageSize} onPageChange={setPSessions} />
                            </div>
                        }
                    </div>
                )}

                {tab === 'reviews' && (
                    <div>
                        {reviews.length === 0
                            ? <Empty label="No reviews found" />
                            : <div className={style.reviewGrid}>
                                {reviews.map((r) => (
                                    <div key={r._id} className={style.reviewCard}>
                                        <div className={style.reviewHeader}>
                                            <span className={style.reviewUser}>{r.user?.name || 'User'}</span>
                                            <Stars rating={r.review?.rating || 0} />
                                        </div>
                                        <p className={style.reviewComment}>{r.review?.comment || '—'}</p>
                                        <span className={style.reviewDate}>{new Date(r.review?.createdAt || r.createdAt).toLocaleDateString()}</span>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                )}

                {tab === 'transactions' && (
                    <div>
                        <div className={style.tableControls}>
                            <div className={style.searchBox}>
                                <IoSearch className={style.searchIcon} />
                                <input type="text" placeholder="Search by user or type…" value={qTransactions} onChange={e => setQTransactions(e.target.value)} />
                            </div>
                        </div>
                        {filteredTransactions.length === 0
                            ? <Empty label="No transactions found" />
                            : <div className={style.tableWrapper}>
                                <table className={style.table}>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Type</th>
                                            <th>
                                                <button className={style.sortBtn} onClick={() => handleSort('amount')}>
                                                    Amount <SortIcon field="amount" />
                                                </button>
                                            </th>
                                            <th>User</th>
                                            <th>
                                                <button className={style.sortBtn} onClick={() => handleSort('createdAt')}>
                                                    Date <SortIcon field="createdAt" />
                                                </button>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedTransactions.map((t, i) => (
                                            <tr key={t._id}>
                                                <td>{(pTransactions - 1) * pageSize + i + 1}</td>
                                                <td><span className={style.txType} style={{ color: t.transactionType === 'chat' ? '#16a34a' : '#dc2626' }}>{t.transactionType}</span></td>
                                                <td>₹{t.amount}</td>
                                                <td>{t.user?.name || '—'}</td>
                                                <td>{new Date(t.createdAt).toLocaleDateString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <Pagination current={pTransactions} total={filteredTransactions.length} pageSize={pageSize} onPageChange={setPTransactions} />
                                <div className={style.txSummary}>
                                    <strong>Total Earned: ₹{transactions.reduce((sum, t) => sum + (t.amount || 0), 0).toFixed(2)}</strong>
                                </div>
                            </div>
                        }
                    </div>
                )}
                {tab === 'chats' && (<>
                    {
                        chats.length === 0
                            ? <Empty label="No chats found" />
                            : <div className={style.tableWrapper}>
                                <table className={style.table}>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>User</th>
                                            <th>Sessions</th>
                                            <th>Last Message</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {chats.map((c, i) => (
                                            <tr key={c._id}>
                                                <td>{i + 1}</td>
                                                <td>
                                                    <button
                                                        onClick={() => { const uid = c.user?._id || c.user; if (uid) navigate(`/user/${uid}`); }}
                                                        style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontWeight: 600, fontSize: 14, textDecoration: 'underline', padding: 0 }}
                                                    >
                                                        {c.user?.name || '—'}
                                                    </button>
                                                </td>
                                                <td>{sessions.filter((s: any) => String(s.user?._id || s.user) === String(c.user?._id || c.user)).length}</td>
                                                <td style={{ color: '#64748b', fontSize: 13, maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                    {c.latestMessage?.content || c.latestMessage?.message || '—'}
                                                </td>
                                                <td>
                                                    <button
                                                        onClick={() => { const uid = c.user?._id || c.user; if (uid) navigate(`/user/${uid}`); }}
                                                        className={style.linkBtn}
                                                    >View User</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                    }
                </>
                )}
            </div>



            {selectedSession && (
                <div
                    style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'flex-end' }}
                    onClick={() => setSelectedSession(null)}
                >
                    <div
                        style={{ width: 440, maxWidth: '95vw', height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', boxShadow: '-4px 0 32px rgba(0,0,0,0.18)' }}
                        onClick={e => e.stopPropagation()}
                    >
                        <div style={{ padding: '20px 24px', background: '#0B2B23', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: 16 }}>Session Messages</div>
                                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>
                                    {selectedSession.user?.name || 'User'} &bull; {new Date(selectedSession.createdAt).toLocaleString()}
                                </div>
                            </div>
                            <button onClick={() => setSelectedSession(null)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', borderRadius: 6, padding: '6px 14px', cursor: 'pointer', fontWeight: 700, fontSize: 16 }}>✕</button>
                        </div>
                        <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 10, background: '#f8fafc' }}>
                            {msgsLoading ? (
                                <div style={{ textAlign: 'center', padding: '40px 0', color: '#64748b' }}>Loading messages…</div>
                            ) : sessionMsgs.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8' }}>🌙 No messages in this session</div>
                            ) : sessionMsgs.map((m, idx) => {
                                const isAstro = String(m.sender) === String(id) || m.senderType === 'astro';
                                return (
                                    <div key={idx} style={{ display: 'flex', justifyContent: isAstro ? 'flex-end' : 'flex-start' }}>
                                        <div style={{
                                            maxWidth: '78%', padding: '10px 14px',
                                            borderRadius: isAstro ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                                            background: isAstro ? '#0B2B23' : '#fff',
                                            color: isAstro ? '#fff' : '#1e293b',
                                            fontSize: 14, lineHeight: 1.5,
                                            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                                        }}>
                                            <div style={{ fontSize: 10, fontWeight: 700, marginBottom: 4, opacity: 0.6 }}>{isAstro ? 'Astrologer' : (selectedSession.user?.name || 'User')}</div>
                                            <div>{m.content || m.message || m.text || '—'}</div>
                                            <div style={{ fontSize: 10, color: isAstro ? 'rgba(255,255,255,0.5)' : '#94a3b8', marginTop: 4, textAlign: 'right' }}>
                                                {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ── Helper sub-components ─────────────────────────────────────────────────────
function Pagination({ current, total, pageSize, onPageChange }: { current: number; total: number; pageSize: number; onPageChange: (p: number) => void }) {
    const totalPages = Math.ceil(total / pageSize);
    if (totalPages <= 1) return null;

    return (
        <div className={style.paginationWrapper}>
            <p>Showing {Math.min((current - 1) * pageSize + 1, total)} to {Math.min(current * pageSize, total)} of {total} results</p>
            <div className={style.paginationBtns}>
                <button disabled={current === 1} onClick={() => onPageChange(current - 1)}>Previous</button>
                {[...Array(totalPages)].map((_, i) => {
                    const p = i + 1;
                    if (p === 1 || p === totalPages || (p >= current - 1 && p <= current + 1)) {
                        return <button key={p} className={current === p ? style.activePage : ''} onClick={() => onPageChange(p)}>{p}</button>;
                    }
                    if (p === 2 && current > 3) return <span key="dots-start">...</span>;
                    if (p === totalPages - 1 && current < totalPages - 2) return <span key="dots-end">...</span>;
                    return null;
                })}
                <button disabled={current === totalPages} onClick={() => onPageChange(current + 1)}>Next</button>
            </div>
        </div>
    );
}

function Field({ label, value }: { label: string; value?: string | number }) {
    return (
        <div style={{ marginBottom: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1 }}>{label}</span>
            <p style={{ margin: '2px 0 0', color: '#1e293b', fontWeight: 500 }}>{value ?? '—'}</p>
        </div>
    );
}
function StatusTag({ status }: { status: string }) {
    const map: Record<string, { bg: string; color: string }> = {
        pending: { bg: '#fef3c7', color: '#92400e' },
        approved: { bg: '#dcfce7', color: '#166534' },
        rejected: { bg: '#fee2e2', color: '#991b1b' },
    };
    const c = map[status] || { bg: '#f1f5f9', color: '#475569' };
    return <span style={{ padding: '2px 10px', borderRadius: 12, fontSize: 12, fontWeight: 700, background: c.bg, color: c.color }}>{status}</span>;
}
function Empty({ label }: { label: string }) {
    return <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8', fontSize: 16 }}>🌙 {label}</div>;
}
function Stars({ rating }: { rating: number }) {
    return (
        <span style={{ color: '#f59e0b', fontSize: 14 }}>
            {'★'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))}
            <span style={{ color: '#64748b', marginLeft: 4, fontSize: 12 }}>{rating}/5</span>
        </span>
    );
}
