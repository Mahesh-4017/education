import { useEffect, useState } from 'react';
import axios from 'axios';
import style from './style.module.css';
import { useNavigate } from 'react-router-dom';

interface Blog {
    _id: string;
    title: string;
    slug: string;
    content: string;
    status: 'pending' | 'approved' | 'rejected';
    banner?: { url: string };
    astrologerId?: { name: string; profilePhoto?: string };
    createdAt: string;
    updatedAt: string;
}

export default function BlogManagement() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
    const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
    const navigate = useNavigate();
    const fetchBlogs = async () => {
        try {
            const url = import.meta.env.VITE_API_URL + (filter === 'all' ? 'blogs' : `blogs?status=${filter}`);
            const res = await axios.get(url);
            if (res.data?.success) {
                setBlogs(res.data.blogs);
            }
        } catch (error) {
            console.error('Failed to fetch blogs', error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, [filter]);

    const updateStatus = async (id: string, status: 'approved' | 'rejected') => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.put(
                import.meta.env.VITE_API_URL + `blogs/${id}`,
                { status },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (res.data?.success) {
                alert(`Blog ${status} successfully!`);
                setSelectedBlog(null);
                fetchBlogs();
            }
        } catch (error) {
            console.error('Update status failed:', error);
            alert('Failed to update blog status');
        }
    };

    return (
        <div className={style.container}>
            <div className={style.header}>
                <h2>Blog Management</h2>
                <div className={style.filters}>
                    <button className={filter === 'all' ? style.activeFilter : ''} onClick={() => setFilter('all')}>All</button>
                    <button className={filter === 'pending' ? style.activeFilter : ''} onClick={() => setFilter('pending')}>Pending</button>
                    <button className={filter === 'approved' ? style.activeFilter : ''} onClick={() => setFilter('approved')}>Approved</button>
                    <button className={filter === 'rejected' ? style.activeFilter : ''} onClick={() => setFilter('rejected')}>Rejected</button>
                </div>
            </div>

            <div className={style.tableContainer}>
                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>Astrologer</th>
                            <th>Banner</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Updated At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map(blog => (
                            <tr key={blog._id}>
                                <td>{blog.astrologerId?.name || 'Unknown'}</td>
                                <td>
                                    {blog.banner?.url ? (
                                        <img src={blog.banner.url} alt="banner" className={style.bannerThumb} />
                                    ) : 'No Banner'}
                                </td>
                                <td>{blog.title}</td>
                                <td>
                                    <span className={`${style.statusTag} ${style[blog.status]}`}>{blog.status}</span>
                                </td>
                                <td>{new Date(blog.updatedAt).toLocaleDateString()}</td>
                                <td>
                                    <button className={style.actionBtn} onClick={() => navigate(`/blogs/inspect/${blog._id}`)}>Review & Compare</button>
                                    {/* <a
                                        href={`http://localhost:5173/blog/inspect/${blog._id}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={style.actionBtn}
                                        style={{ marginLeft: "0.5rem", textDecoration: "none", display: "inline-block" }}
                                    >
                                        Inspect
                                    </a> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {blogs.length === 0 && <p className={style.empty}>No blogs found.</p>}
            </div>

            {selectedBlog && (
                <div className={style.modalOverlay}>
                    <div className={style.modalContent}>
                        <div className={style.modalHeader}>
                            <h3>Review Blog: {selectedBlog.title}</h3>
                            <button className={style.closeBtn} onClick={() => setSelectedBlog(null)}>✕</button>
                        </div>
                        <div className={style.modalBody}>
                            <div className={style.authorInfo}>
                                <strong>Author:</strong> {selectedBlog.astrologerId?.name} |
                                <strong> Status:</strong> {selectedBlog.status} |
                                <strong> Created:</strong> {new Date(selectedBlog.createdAt).toLocaleString()}
                            </div>
                            {selectedBlog.banner?.url && (
                                <img src={selectedBlog.banner.url} alt="banner" className={style.modalBanner} />
                            )}
                            <div className={style.contentPreview} dangerouslySetInnerHTML={{ __html: selectedBlog.content }} />
                        </div>
                        <div className={style.modalFooter}>
                            <button className={style.rejectBtn} onClick={() => updateStatus(selectedBlog._id, 'rejected')}>Reject</button>
                            <button className={style.approveBtn} onClick={() => updateStatus(selectedBlog._id, 'approved')}>Approve</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
