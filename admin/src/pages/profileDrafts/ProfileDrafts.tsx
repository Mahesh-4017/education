import { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5"
import { useAppDispatch } from '../../hooks'
import { GetProfileDrafts, ReviewProfileDraft } from '../../api/Astrologer'
import styles from './style.module.css'

interface DraftItem {
  _id: string
  astrologerId: string
  email: string
  status: string
  submittedAt: string
  data: {
    displayName?: string
    username?: string
    languages?: string[]
    skills?: string[]
    avatar?: { url?: string }
    ppm?: number
    experienceYears?: number
    about?: string
  }
  currentProfile: {
    displayName?: string
    username?: string
    languages?: { _id: string; name: string }[]
    skills?: { _id: string; name: string }[]
    avatar?: { url?: string }
    ppm?: number
    experienceYears?: number
    about?: string
  } | null
}

function ProfileDrafts() {
  const [drafts, setDrafts] = useState<DraftItem[]>([])
  const [selectedDraft, setSelectedDraft] = useState<DraftItem | null>(null)
  const [rejectionReason, setRejectionReason] = useState("")
  const [q, setQ] = useState("")
  const [p, setP] = useState(1)
  const dispatch = useAppDispatch()

  const loadDrafts = () => {
    dispatch(GetProfileDrafts()).then((res) => {
      if ((res.payload as { success: boolean }).success) {
        setDrafts((res.payload as any).drafts || [])
      }
    })
  }

  useEffect(() => {
    loadDrafts()
  }, [dispatch])

  const filtered = q
    ? drafts.filter((d) =>
        d.email?.toLowerCase().includes(q.toLowerCase()) ||
        d.data?.displayName?.toLowerCase().includes(q.toLowerCase())
      )
    : drafts

  const handleApprove = () => {
    if (!selectedDraft) return
    if (!window.confirm("Are you sure you want to approve these changes?")) return
    dispatch(ReviewProfileDraft({ draftId: selectedDraft._id, action: 'approve' }))
      .then((res) => {
        if ((res.payload as { success: boolean }).success) {
          alert("Draft approved! Profile has been updated.")
          setSelectedDraft(null)
          loadDrafts()
        }
      })
  }

  const handleReject = () => {
    if (!selectedDraft) return
    if (!rejectionReason.trim()) { alert("Please provide a rejection reason"); return }
    dispatch(ReviewProfileDraft({ draftId: selectedDraft._id, action: 'reject', rejectionReason }))
      .then((res) => {
        if ((res.payload as { success: boolean }).success) {
          alert("Draft rejected.")
          setSelectedDraft(null)
          setRejectionReason("")
          loadDrafts()
        }
      })
  }

  const isChanged = (field: string, draft: DraftItem) => {
    const oldVal = (draft.currentProfile as any)?.[field]
    const newVal = (draft.data as any)?.[field]
    if (newVal === undefined || newVal === null) return false
    if (typeof newVal === 'object') return JSON.stringify(oldVal) !== JSON.stringify(newVal)
    return String(oldVal) !== String(newVal)
  }

  const getProfileValue = (obj: any, field: string) => {
    if (!obj) return "—"
    const val = obj[field]
    if (val === undefined || val === null) return "—"
    if (Array.isArray(val)) {
      if (val.length === 0) return "—"
      if (typeof val[0] === 'object' && val[0].name) return val.map((v: any) => v.name).join(", ")
      return val.join(", ")
    }
    if (field === 'ppm') return `₹${val}`
    if (field === 'experienceYears') return `${val} years`
    return String(val)
  }

  return (<>
    {selectedDraft && (
      <div style={{
        height: "100vh", width: "100vw", backgroundColor: "rgba(0, 0, 0, .5)", position: "fixed", top: 0, left: 0,
        display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000,
      }}>
        <div className={styles.draftModal} style={{ maxHeight: "90vh", overflowY: "auto" }}>
          <button
            onClick={() => { setSelectedDraft(null); setRejectionReason("") }}
            style={{
              position: "absolute", top: "15px", right: "15px",
              background: "#f1f5f9", border: "none", width: "30px", height: "30px", borderRadius: "50%",
              cursor: "pointer", color: "#64748b", fontWeight: "bold", fontSize: "1.2rem",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >&times;</button>

          <h2 style={{ margin: "0 0 4px", color: "#1e293b" }}>Profile Update Review</h2>
          <p style={{ margin: "0 0 16px", color: "#64748b" }}>{selectedDraft.email} • Submitted {new Date(selectedDraft.submittedAt).toLocaleDateString()}</p>

          <div className={styles.comparisonGrid}>
            <div className={`${styles.comparisonColumn} ${styles.currentCol}`}>
              <h3>📋 Current Profile</h3>
              {['displayName', 'username', 'experienceYears', 'ppm', 'about'].map((field) => (
                <div key={field} className={styles.fieldRow}>
                  <label>{field.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}</label>
                  <div className={styles.value}>{getProfileValue(selectedDraft.currentProfile, field)}</div>
                </div>
              ))}
              <div className={styles.fieldRow}>
                <label>Skills</label>
                <div className={styles.value}>{getProfileValue(selectedDraft.currentProfile, 'skills')}</div>
              </div>
              <div className={styles.fieldRow}>
                <label>Languages</label>
                <div className={styles.value}>{getProfileValue(selectedDraft.currentProfile, 'languages')}</div>
              </div>
            </div>

            <div className={`${styles.comparisonColumn} ${styles.newCol}`}>
              <h3>✨ Proposed Changes</h3>
              {['displayName', 'username', 'experienceYears', 'ppm', 'about'].map((field) => (
                <div key={field} className={styles.fieldRow}>
                  <label>{field.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}</label>
                  <div className={`${styles.value} ${isChanged(field, selectedDraft) ? styles.changed : ''}`}>
                    {getProfileValue(selectedDraft.data, field)}
                  </div>
                </div>
              ))}
              <div className={styles.fieldRow}>
                <label>Skills</label>
                <div className={`${styles.value} ${isChanged('skills', selectedDraft) ? styles.changed : ''}`}>
                  {getProfileValue(selectedDraft.data, 'skills')}
                </div>
              </div>
              <div className={styles.fieldRow}>
                <label>Languages</label>
                <div className={`${styles.value} ${isChanged('languages', selectedDraft) ? styles.changed : ''}`}>
                  {getProfileValue(selectedDraft.data, 'languages')}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.actionBar}>
            <input
              className={styles.rejectInput}
              placeholder="Rejection reason (required to reject)..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />
            <button className={styles.rejectBtn} onClick={handleReject}>✕ Reject</button>
            <button className={styles.approveBtn} onClick={handleApprove}>✓ Approve</button>
          </div>
        </div>
      </div>
    )}

    <div className="wrapper">
      <div className="top">Profile Update Requests</div>
      <div className="tableContainer">
        <div className="tableTop">
          <div className="search">
            <IoSearch />
            <input type="text" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or email..." />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className={styles.emptyState}>
            <span style={{ fontSize: "3rem" }}>📭</span>
            <h2>No Pending Requests</h2>
            <p>There are no profile update requests awaiting review.</p>
          </div>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Astrologer</th>
                  <th>Email</th>
                  <th>Submitted</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.slice((p - 1) * 5, ((p - 1) * 5) + 5).map((d, i) => (
                  <tr key={d._id}>
                    <td>{i + 1 + ((p - 1) * 5)}</td>
                    <td>
                      <span
                        onClick={() => setSelectedDraft(d)}
                        style={{ cursor: "pointer", color: "#2563eb", textDecoration: "underline" }}
                      >
                        {d.data?.displayName || "N/A"}
                      </span>
                    </td>
                    <td>{d.email}</td>
                    <td>{new Date(d.submittedAt).toLocaleDateString()}</td>
                    <td><span className={`${styles.badge} ${styles.badgeReview}`}>In Review</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="tableTop" style={{ marginTop: "20px" }}>
              <p className="text">
                Showing {filtered.length === 0 ? 0 : (p - 1) * 5 + 1} to {p * 5 > filtered.length ? filtered.length : p * 5} of {filtered.length} results
              </p>
              <div style={{ display: "flex", gap: "10px" }}>
                <button style={{ cursor: p === 1 ? "no-drop" : "pointer" }} onClick={() => { if (p !== 1) setP(p - 1) }}>Previous</button>
                {[...Array(Math.ceil(filtered.length / 5))].map((_, i) => {
                  if (p === i + 1 || p - 2 === i || (p === 1 && p === i)) {
                    return <button key={i} className={`${i + 1 === p && "active"}`} onClick={() => setP(i + 1)}>{i + 1}</button>
                  }
                  return null
                })}
                <button style={{ cursor: p * 5 > filtered.length ? "no-drop" : "pointer" }} onClick={() => { if (p * 5 < filtered.length) setP(p + 1) }}>Next</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  </>)
}

export default ProfileDrafts
