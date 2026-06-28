import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { IoSearch } from 'react-icons/io5';

const API = import.meta.env.VITE_API_URL;
const IMG = import.meta.env.VITE_MAIN_URL || '';

export default function UserDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);
    const [sessions, setSessions] = useState<any[]>([]);
    const [walletHistory, setWalletHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState<'overview' | 'sessions' | 'wallet'>('overview');
    const [qSessions, setQSessions] = useState('');
    const [qWallet, setQWallet] = useState('');
    const [selectedSession, setSelectedSession] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [msgLoading, setMsgLoading] = useState(false);

    useEffect(() => {
        if (!id) return;
        axios.get(`${API}user/${id}`)
            .then(res => {
                if (res.data?.success) {
                    setUser(res.data.user);
                    setSessions(res.data.sessions || []);
                    setWalletHistory(res.data.walletHistory || []);
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [id]);

    const openSessionMessages = async (session: any) => {
        setSelectedSession(session);
        setMsgLoading(true);
        try {
            const res = await axios.get(`${API}session?sessionId=${session._id}`);
            setMessages(res.data?.messages || []);
        } catch {
            setMessages([]);
        } finally {
            setMsgLoading(false);
        }
    };

    const filteredSessions = sessions.filter(s => {
        const astroName = s.astro?.professionalInfo?.displayName || s.astro?.personal?.fullName || '';
        return astroName.toLowerCase().includes(qSessions.toLowerCase());
    });

    const filteredWallet = walletHistory.filter(w => {
        const astroName = w.astro?.professionalInfo?.displayName || '';
        return (
            astroName.toLowerCase().includes(qWallet.toLowerCase()) ||
            String(w.transactionType).toLowerCase().includes(qWallet.toLowerCase())
        );
    });

    if (loading) return (
        <div className="wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
            <div style={{ color: '#64748b', fontSize: '1.1rem' }}>Loading user…</div>
        </div>
    );
    if (!user) return (
        <div className="wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
            <div style={{ color: '#64748b', fontSize: '1.1rem' }}>User not found.</div>
        </div>
    );

    const avatarUrl = user.avatar?.url ? `${IMG}${user.avatar.url}` : null;
    const TABS = [
        { key: 'overview', label: '👤 Overview' },
        { key: 'sessions', label: `💬 Sessions (${sessions.length})` },
        { key: 'wallet', label: `💰 Wallet (${walletHistory.length})` },
    ];

    return (
        <div className="wrapper" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="top">User Details</div>

            {/* Hero */}
            <div style={{
                margin: '24px 28px 0', background: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)',
                borderRadius: 16, padding: '28px 32px', display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, color: '#fff',
                boxShadow: '0 4px 24px rgba(37,99,235,0.2)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    {avatarUrl
                        ? <img src={avatarUrl} alt={user.name} style={{ width: 90, height: 90, borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.3)' }} />
                        : <div style={{ width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>👤</div>
                    }
                    <div>
                        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0 0 4px', color: '#fff' }}>{user.name || '—'}</h2>
                        <p style={{ margin: '0 0 10px', color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>{user.email}</p>
                        <div style={{ display: 'flex', gap: 8 }}>
                            <span style={{ padding: '3px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700, background: user.verify ? '#16a34a20' : '#dc262620', color: user.verify ? '#4ade80' : '#f87171', border: `1px solid ${user.verify ? '#4ade8060' : '#f8717160'}` }}>
                                {user.verify ? 'Verified' : 'Unverified'}
                            </span>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                        <span style={{ fontSize: '1.4rem', fontWeight: 800 }}>₹{user.balance ?? 0}</span>
                        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 1 }}>Balance</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                        <span style={{ fontSize: '1.4rem', fontWeight: 800 }}>{sessions.length}</span>
                        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 1 }}>Sessions</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                        <span style={{ fontSize: '1.4rem', fontWeight: 800 }}>{user.zodiac || '—'}</span>
                        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 1 }}>Zodiac</span>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 4, padding: '16px 28px 0', borderBottom: '2px solid #e2e8f0', margin: '24px 0 0', background: '#fff' }}>
                {TABS.map(t => (
                    <button key={t.key} onClick={() => setTab(t.key as any)} style={{
                        background: 'none', border: 'none', borderBottom: tab === t.key ? '3px solid #2563eb' : '3px solid transparent',
                        marginBottom: -2, padding: '10px 20px', cursor: 'pointer', fontSize: 15, fontWeight: 600,
                        color: tab === t.key ? '#2563eb' : '#64748b', borderRadius: '8px 8px 0 0', transition: 'all 0.2s',
                    }}>{t.label}</button>
                ))}
            </div>

            <div style={{ margin: '24px 28px 0', flex: 1, overflowY: 'auto' }}>
                {/* OVERVIEW */}
                {tab === 'overview' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                        <div style={{ background: '#fff', borderRadius: 12, padding: 22, border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', margin: '0 0 18px', textTransform: 'uppercase', letterSpacing: 0.5, paddingBottom: 10, borderBottom: '1px solid #f1f5f9' }}>Personal Info</h3>
                            <InfoField label="Name" value={user.name} />
                            <InfoField label="Email" value={user.email} />
                            <InfoField label="Country" value={user.country} />
                            <InfoField label="Date of Birth" value={user.dob ? new Date(user.dob).toLocaleDateString() : undefined} />
                        </div>
                        <div style={{ background: '#fff', borderRadius: 12, padding: 22, border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', margin: '0 0 18px', textTransform: 'uppercase', letterSpacing: 0.5, paddingBottom: 10, borderBottom: '1px solid #f1f5f9' }}>Astrology Info</h3>
                            <InfoField label="Zodiac" value={user.zodiac} />
                            <InfoField label="Birth Time" value={user.bt} />
                            <InfoField label="Birth Place" value={user.bp} />
                            <InfoField label="Balance" value={`₹${user.balance ?? 0}`} />
                        </div>
                    </div>
                )}

                {/* SESSIONS */}
                {tab === 'sessions' && (
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16, position: 'relative' }}>
                            <IoSearch style={{ position: 'absolute', left: 14, color: '#94a3b8', fontSize: 16 }} />
                            <input
                                type="text" placeholder="Search by astrologer name…" value={qSessions}
                                onChange={e => setQSessions(e.target.value)}
                                style={{ width: '100%', padding: '10px 16px 10px 40px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 14, outline: 'none' }}
                            />
                        </div>
                        {filteredSessions.length === 0
                            ? <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8', fontSize: 16 }}>🌙 No sessions found</div>
                            : <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                                    <thead>
                                        <tr>
                                            {['#', 'Astrologer', 'Duration', 'Amount', 'Date', 'Review', 'Messages'].map(h => (
                                                <th key={h} style={{ background: '#f8fafc', padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.5, borderBottom: '1px solid #e2e8f0' }}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredSessions.map((s, i) => {
                                            const astroName = s.astro?.professionalInfo?.displayName || s.astro?.personal?.fullName || '—';
                                            const astroId = s.astro?._id || s.astro;
                                            return (
                                                <tr key={s._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                    <td style={{ padding: '13px 16px', color: '#334155' }}>{i + 1}</td>
                                                    <td style={{ padding: '13px 16px' }}>
                                                        <button onClick={() => astroId && navigate(`/astrologer/${astroId}`)} style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontWeight: 600, fontSize: 14, textDecoration: 'underline', padding: 0 }}>
                                                            {astroName}
                                                        </button>
                                                    </td>
                                                    <td style={{ padding: '13px 16px', color: '#334155' }}>{s.duration ? `${s.duration} min` : '—'}</td>
                                                    <td style={{ padding: '13px 16px', color: '#334155' }}>{s.amount ? `₹${s.amount}` : '—'}</td>
                                                    <td style={{ padding: '13px 16px', color: '#334155' }}>{new Date(s.createdAt).toLocaleDateString()}</td>
                                                    <td style={{ padding: '13px 16px', color: '#334155' }}>
                                                        {s.review?.rating ? (
                                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                                                <span style={{ color: '#f59e0b' }}>{'★'.repeat(s.review.rating)}{'☆'.repeat(5 - s.review.rating)}</span>
                                                                <span style={{ fontSize: 12, color: '#64748b', fontStyle: 'italic' }}>"{s.review.comment}"</span>
                                                            </div>
                                                        ) : '—'}
                                                    </td>
                                                    <td style={{ padding: '13px 16px' }}>
                                                        <button
                                                            onClick={() => openSessionMessages(s)}
                                                            style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, padding: '5px 12px', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}
                                                        >View Chats</button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        }

                        {/* Session Message Drawer */}
                        {selectedSession && (
                            <div style={{
                                position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(0,0,0,0.5)',
                                display: 'flex', justifyContent: 'flex-end',
                            }} onClick={() => setSelectedSession(null)}>
                                <div style={{
                                    width: '420px', maxWidth: '95vw', height: '100%', background: '#fff',
                                    display: 'flex', flexDirection: 'column', boxShadow: '-4px 0 24px rgba(0,0,0,0.15)',
                                }} onClick={e => e.stopPropagation()}>
                                    <div style={{ padding: '20px 24px', background: '#1e3a5f', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: 16 }}>Session Messages</div>
                                            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>{new Date(selectedSession.createdAt).toLocaleString()}</div>
                                        </div>
                                        <button onClick={() => setSelectedSession(null)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', borderRadius: 6, padding: '6px 12px', cursor: 'pointer', fontWeight: 700 }}>✕</button>
                                    </div>
                                    <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 10, background: '#f8fafc' }}>
                                        {msgLoading ? (
                                            <div style={{ textAlign: 'center', padding: '40px 0', color: '#64748b' }}>Loading messages…</div>
                                        ) : messages.length === 0 ? (
                                            <div style={{ textAlign: 'center', padding: '40px 0', color: '#64748b' }}>No messages in this session</div>
                                        ) : messages.map((m, i) => {
                                            const isUser = String(m.sender) === String(id) || m.senderType === 'user';
                                            return (
                                                <div key={i} style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
                                                    <div style={{
                                                        maxWidth: '75%', padding: '10px 14px', borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                                                        background: isUser ? '#2563eb' : '#fff', color: isUser ? '#fff' : '#1e293b',
                                                        fontSize: 14, lineHeight: 1.5, boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                                                    }}>
                                                        <div>{m.content || m.message || m.text || '—'}</div>
                                                        <div style={{ fontSize: 10, color: isUser ? 'rgba(255,255,255,0.6)' : '#94a3b8', marginTop: 4, textAlign: 'right' }}>
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
                )}

                {/* WALLET */}
                {tab === 'wallet' && (
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16, position: 'relative' }}>
                            <IoSearch style={{ position: 'absolute', left: 14, color: '#94a3b8', fontSize: 16 }} />
                            <input
                                type="text" placeholder="Search by astrologer or type…" value={qWallet}
                                onChange={e => setQWallet(e.target.value)}
                                style={{ width: '100%', padding: '10px 16px 10px 40px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 14, outline: 'none' }}
                            />
                        </div>
                        {filteredWallet.length === 0
                            ? <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8', fontSize: 16 }}>🌙 No wallet records found</div>
                            : <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                                    <thead>
                                        <tr>
                                            {['#', 'Type', 'Amount', 'Astrologer', 'Date'].map(h => (
                                                <th key={h} style={{ background: '#f8fafc', padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.5, borderBottom: '1px solid #e2e8f0' }}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredWallet.map((w, i) => (
                                            <tr key={w._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                <td style={{ padding: '13px 16px', color: '#334155' }}>{i + 1}</td>
                                                <td style={{ padding: '13px 16px' }}>
                                                    <span style={{ padding: '2px 10px', borderRadius: 12, fontSize: 12, fontWeight: 700, background: w.transactionType === 'recharge' ? '#dcfce7' : '#fee2e2', color: w.transactionType === 'recharge' ? '#166534' : '#991b1b' }}>
                                                        {w.transactionType}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '13px 16px', color: '#334155', fontWeight: 600 }}>₹{w.amount}</td>
                                                <td style={{ padding: '13px 16px', color: '#334155' }}>{w.astro?.professionalInfo?.displayName || '—'}</td>
                                                <td style={{ padding: '13px 16px', color: '#334155' }}>{new Date(w.createdAt).toLocaleDateString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div style={{ padding: '14px 16px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', fontSize: 14, textAlign: 'right' }}>
                                    <strong>Total Spent: ₹{walletHistory.filter(w => w.transactionType === 'chat').reduce((s, w) => s + (w.amount || 0), 0).toFixed(2)}</strong>
                                </div>
                            </div>
                        }
                    </div>
                )}
            </div>
        </div>
    );
}

function InfoField({ label, value }: { label: string; value?: string | number }) {
    return (
        <div style={{ marginBottom: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1 }}>{label}</span>
            <p style={{ margin: '2px 0 0', color: '#1e293b', fontWeight: 500 }}>{value ?? '—'}</p>
        </div>
    );
}
