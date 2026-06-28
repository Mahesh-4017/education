import { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AdminAstrologerStatus, GetNewApplication } from '../../api/Astrologer';
import styles from '../newApplication/style.module.css';

function BlockedAstrologers() {
  const [q, setQ] = useState("")
  const [p, setP] = useState(1)
  const [selectedAstro, setSelectedAstro] = useState<Astrologer | null>(null)
  const [actionStatus, setActionStatus] = useState<string | undefined>(undefined)
  const [statusFilter] = useState<string>("BANNED,REJECTED")
  const [iterableData, setIterableData] = useState<Astrologer[]>([])
  const dispatch = useAppDispatch()
  const { newApplication } = useAppSelector((state) => state.AstrologerStore)

  useEffect(() => {
    if (q) {
      setIterableData([...newApplication.filter((e) =>
        e.professionalInfo?.displayName?.toLowerCase().includes(q.toLowerCase()) ||
        e.personal?.fullName?.toLowerCase().includes(q.toLowerCase()) ||
        e.email?.toLowerCase().includes(q.toLowerCase())
      )])
    } else {
      setIterableData([...newApplication])
    }
  }, [newApplication, q])

  useEffect(() => {
    dispatch(GetNewApplication(statusFilter)).then((e) => {
      if ((e.payload as { success: boolean }).success) {
        setP(1)
        setQ("")
      }
    })
  }, [dispatch, statusFilter])

  const closeModal = () => {
    setSelectedAstro(null)
    setActionStatus(undefined)
  }

  const handleSubmit = () => {
    if (actionStatus === undefined) {
      alert("Please select a decision first")
      return
    }
    if (!selectedAstro) return

    dispatch(AdminAstrologerStatus({ _id: selectedAstro._id, status: actionStatus }))
      .then((res) => {
        if ((res.payload as { success: boolean }).success) {
          closeModal()
          dispatch(GetNewApplication(statusFilter)).then((e) => {
            if ((e.payload as { success: boolean }).success) {
              setP(1)
              setQ("")
            }
          })
        }
      })
  }

  const getName = (e: Astrologer) => {
    return e.professionalInfo?.displayName || e.personal?.fullName || "N/A"
  }

  return (<>
    {
      selectedAstro &&
      <div style={{
        height: "100vh", width: "100vw", backgroundColor: "rgba(0, 0, 0, .5)", position: "fixed", top: 0, left: 0, display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,

      }}>
        <div className={styles.formContainer} style={{ maxHeight: "90vh", overflowY: "auto", position: "relative" }}>
          <button
            onClick={closeModal}
            style={{
              position: "absolute", top: "15px", right: "15px",
              background: "#f1f5f9", border: "none", width: "30px", height: "30px", borderRadius: "50%",
              cursor: "pointer", color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: "bold", fontSize: "1.2rem"
            }}
          >&times;</button>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '10px' }}>
            {selectedAstro.professionalInfo?.avatar?.url ? (
              <img
                src={`${import.meta.env.VITE_MAIN_URL}${selectedAstro.professionalInfo.avatar.url}`}
                alt="Profile"
                style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #f8fafc', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
              />
            ) : (
              <div style={{ width: '90px', height: '90px', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '2rem', border: '3px solid #fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                👤
              </div>
            )}
          </div>

          <div className={styles.gridRow}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Display Name</label>
              <input value={getName(selectedAstro)} readOnly type="text" className={styles.inputField} />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Username</label>
              <input value={selectedAstro.professionalInfo?.username || "N/A"} readOnly type="text" className={styles.inputField} />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Email Address</label>
            <input value={selectedAstro.email} readOnly type="text" className={styles.inputField} />
          </div>

          <div className={styles.gridRow}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Experience</label>
              <input value={selectedAstro.professionalInfo?.experienceYears ? `${selectedAstro.professionalInfo.experienceYears} Years` : "N/A"} readOnly type="text" className={styles.inputField} />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Price per Minute</label>
              <input value={selectedAstro.professionalInfo?.ppm ? `₹${selectedAstro.professionalInfo.ppm}` : "N/A"} readOnly type="text" className={styles.inputField} />
            </div>
          </div>

          {selectedAstro.professionalInfo?.about && (
            <div className={styles.fieldGroup}>
              <label className={styles.label}>About</label>
              <textarea value={selectedAstro.professionalInfo.about} readOnly className={styles.inputArea} />
            </div>
          )}

          {selectedAstro.professionalInfo?.skill && selectedAstro.professionalInfo.skill.length > 0 && (
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Skills</label>
              <div className={styles.chipContainer}>
                {selectedAstro.professionalInfo.skill.map((elem) => (
                  <span key={elem._id} className={styles.chip}>{elem.name}</span>
                ))}
              </div>
            </div>
          )}

          {selectedAstro.professionalInfo?.languages && selectedAstro.professionalInfo.languages.length > 0 && (
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Languages</label>
              <div className={styles.chipContainer}>
                {selectedAstro.professionalInfo.languages.map((elem) => (
                  <span key={elem._id} className={styles.chip}>{elem.name}</span>
                ))}
              </div>
            </div>
          )}

          <div className={styles.actionContainer}>
            <h4 className={styles.label} style={{ marginBottom: '12px' }}>Application Decision <span style={{ color: '#ef4444' }}>*</span></h4>
            <div className={styles.actionGroup}>
              <label className={`${styles.radioBtn} ${styles.approve} ${actionStatus === 'APPROVED' ? styles.selected : ''}`}>
                <input
                  type="radio"
                  name="actionStatus"
                  value="APPROVED"
                  checked={actionStatus === 'APPROVED'}
                  onChange={() => setActionStatus('APPROVED')}
                />
                <span style={{ fontSize: '1.2rem', backgroundColor: "transparent" }}>✓</span> Approve
              </label>

              <label className={`${styles.radioBtn} ${styles.reject} ${actionStatus === 'REJECTED' ? styles.selected : ''}`}>
                <input
                  type="radio"
                  name="actionStatus"
                  value="REJECTED"
                  checked={actionStatus === 'REJECTED'}
                  onChange={() => setActionStatus('REJECTED')}
                />
                <span style={{ fontSize: '1.2rem', backgroundColor: "transparent" }}>✕</span> Reject
              </label>

              <label className={`${styles.radioBtn} ${styles.block} ${actionStatus === 'BANNED' ? styles.selected : ''}`}>
                <input
                  type="radio"
                  name="actionStatus"
                  value="BANNED"
                  checked={actionStatus === 'BANNED'}
                  onChange={() => setActionStatus('BANNED')}
                />
                <span style={{ fontSize: '1.2rem', backgroundColor: "transparent" }}>⊘</span> Block
              </label>
            </div>
          </div>

          <button className={styles.submitButton} onClick={handleSubmit} disabled={actionStatus === undefined}>
            Submit Decision
          </button>
        </div>
      </div>
    }

    <div className="wrapper">
      <div className="top">
        Blocked & Rejected Astrologers
      </div>
      <div className="tableContainer" >
        <div className="tableTop">
          <div className="search">
            <IoSearch />
            <input type="text" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or email..." />
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              iterableData?.slice((p - 1) * 5, ((p - 1) * 5) + 5).map((e, i: number) => (
                <tr key={e._id}>
                  <td>{i + 1 + ((p - 1) * 5)}</td>
                  <td>
                    <span
                      onClick={() => setSelectedAstro(e)}
                      style={{ cursor: "pointer", color: "#2563eb", textDecoration: "underline" }}
                    >
                      {getName(e)}
                    </span>
                  </td>
                  <td>{e.email}</td>
                  <td>
                    <span style={{
                      padding: "2px 8px",
                      borderRadius: "4px",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      backgroundColor: e.applicationStatus === "WFA" ? "#fef3c7" : "#dbeafe",
                      color: e.applicationStatus === "WFA" ? "#92400e" : "#1e40af",
                    }}>
                      {e.applicationStatus}
                    </span>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <div className="tableTop" style={{ marginTop: "20px" }}>
          <p className="text" >
            Showing {iterableData.length === 0 ? 0 : p * 5 - 5 + 1} to {p * 5 > iterableData.length ? iterableData.length : p * 5} of {iterableData.length} results
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            <button style={{ cursor: p === 1 ? "no-drop" : "pointer" }} onClick={() => {
              if (p !== 1) {
                setP(p - 1)
              }
            }}>Previous</button>
            {
              [...Array(Math.ceil(iterableData.length / 5))].map((_, i) => {
                if (p === i + 1 || p - 2 === i) {
                  return (
                    <button key={i} className={`${i + 1 === p && "active"}`} onClick={() => setP(i + 1)}>{i + 1}</button>
                  )
                }
                else if (p === 1 && p === i) {
                  return (
                    <button key={i} className={`${i + 1 === p && "active"}`} onClick={() => setP(i + 1)}>{i + 1}</button>
                  )
                }
                return null
              }
              )
            }
            <button style={{ cursor: p * 5 > iterableData.length ? "no-drop" : "pointer" }} onClick={() => {
              if (p * 5 < iterableData.length) {
                setP(p + 1)
              }
            }}>Next</button>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default BlockedAstrologers
