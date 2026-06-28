import { useParams, useNavigate } from 'react-router-dom';
import style from './style.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

type Status = 'pending' | 'approved' | 'rejected';

function BlogInspect() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [currentStatus, setCurrentStatus] = useState<Status>('pending');
    const [isUpdating, setIsUpdating] = useState(false);
    const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

    /* Fetch the blog's current status on mount */
    useEffect(() => {
        if (!id) return;
        axios
            .get(import.meta.env.VITE_API_URL + `blogs/${id}?inspect=true`)
            .then(res => {
                if (res.data?.success) setCurrentStatus(res.data.blog.status);
            })
            .catch(console.error);
    }, [id]);

    /* Show toast then auto-dismiss */
    const showToast = (msg: string, type: 'success' | 'error') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    /* PATCH blog status */
    const updateStatus = async (newStatus: Status) => {
        if (!id || isUpdating) return;
        setIsUpdating(true);
        try {
            const res = await axios.put(
                import.meta.env.VITE_API_URL + `blogs/${id}`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (res.data?.success) {
                setCurrentStatus(newStatus);
                showToast(
                    newStatus === 'approved'
                        ? '✅ Blog approved successfully!'
                        : '❌ Blog rejected.',
                    'success'
                );
            }
        } catch (err: any) {
            showToast(err.response?.data?.message || 'Failed to update status.', 'error');
        } finally {
            setIsUpdating(false);
        }
    };

    const statusColors: Record<Status, { bg: string; color: string; label: string }> = {
        pending: { bg: '#fff3cd', color: '#856404', label: 'Pending Review' },
        approved: { bg: '#d4edda', color: '#155724', label: 'Approved' },
        rejected: { bg: '#f8d7da', color: '#721c24', label: 'Rejected' },
    };
    const badge = statusColors[currentStatus];

    return (
        <div className={style.container} style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 0 }}>

            {/* ── Header ── */}
            <div className={style.header} style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #eee', flexShrink: 0, marginBottom: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button
                        onClick={() => navigate(-1)}
                        style={{ background: '#eee', border: 'none', borderRadius: '50%', width: 34, height: 34, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}
                    >←</button>
                    <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Blog Inspect</h2>
                    {/* Live status badge */}
                    <span style={{
                        background: badge.bg, color: badge.color,
                        padding: '3px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                    }}>{badge.label}</span>
                </div>

                {/* Action buttons */}
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <button
                        onClick={() => updateStatus('rejected')}
                        disabled={isUpdating || currentStatus === 'rejected'}
                        className={style.rejectBtn}
                        style={{
                            opacity: (isUpdating || currentStatus === 'rejected') ? 0.5 : 1,
                            cursor: (isUpdating || currentStatus === 'rejected') ? 'not-allowed' : 'pointer',
                            padding: '0.5rem 1.5rem', borderRadius: 6, fontWeight: 700, fontSize: 14,
                        }}
                    >
                        {isUpdating ? '…' : 'Reject'}
                    </button>

                    <button
                        onClick={() => updateStatus('approved')}
                        disabled={isUpdating || currentStatus === 'approved'}
                        className={style.approveBtn}
                        style={{
                            opacity: (isUpdating || currentStatus === 'approved') ? 0.5 : 1,
                            cursor: (isUpdating || currentStatus === 'approved') ? 'not-allowed' : 'pointer',
                            padding: '0.5rem 1.5rem', borderRadius: 6, fontWeight: 700, fontSize: 14,
                        }}
                    >
                        {isUpdating ? '…' : 'Approve'}
                    </button>
                </div>
            </div>

            {/* ── Blog preview iframe ── */}
            <div style={{ flex: 1, overflow: 'hidden' }}>
                {id ? (
                    <iframe
                        src={`http://localhost:5173/blog/inspect/${id}`}
                        title="Blog Preview"
                        style={{ width: '100%', height: '100%', border: 'none' }}
                    />
                ) : (
                    <p style={{ padding: '2rem', color: '#888' }}>No blog ID found.</p>
                )}
            </div>

            {/* ── Toast notification ── */}
            {toast && (
                <div style={{
                    position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999,
                    background: toast.type === 'success' ? '#0B2B23' : '#dc3545',
                    color: '#fff', padding: '0.75rem 1.5rem', borderRadius: 10,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)', fontWeight: 600, fontSize: 14,
                    animation: 'slideIn 0.25s ease',
                }}>
                    {toast.msg}
                </div>
            )}

            <style>{`
                @keyframes slideIn {
                    from { transform: translateY(20px); opacity: 0; }
                    to   { transform: translateY(0);    opacity: 1; }
                }
            `}</style>
        </div>
    );
}

export default BlogInspect;