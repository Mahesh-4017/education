import { useEffect, useMemo, useState } from "react"
import { FaArrowLeftLong } from "react-icons/fa6"
import { IoSearch } from "react-icons/io5"
import { MdDelete } from "react-icons/md"
import { BiSolidEditAlt } from "react-icons/bi"

import { useAppDispatch, useAppSelector } from "../../hooks"
import {
  AddLanguage,
  DeleteLanguage,
  GetLanguages,
  UpdateLanguage,
} from "../../api/Language" // <-- change path if needed

type Language = {
  _id: string
  name: string
}

function LanguagePage() {
  const dispatch = useAppDispatch()

  // change reducer key if yours is different
  const { languages } = useAppSelector((state) => state. LanguageStore)

  const [p, setP] = useState(1)
  const [q, setQ] = useState("")
  const [add, setAdd] = useState(false)
  const [edit, setEdit] = useState(false)

  const [selectedId, setSelectedId] = useState<string>("")
  const [form, setForm] = useState<{ name: string }>({ name: "" })

  useEffect(() => {
    dispatch(GetLanguages())
  }, [dispatch])

  useEffect(() => {
    setP(1)
  }, [q])

  const filteredLanguages = useMemo(() => {
    if (!q.trim()) return languages
    const qq = q.toLowerCase()
    return languages.filter((l: Language) => l.name?.toLowerCase().includes(qq))
  }, [languages, q])

  const pageSize = 5
  const totalPages = Math.ceil(filteredLanguages.length / pageSize)
  const pageItems = filteredLanguages.slice(
    (p - 1) * pageSize,
    (p - 1) * pageSize + pageSize
  )

  const closeForm = () => {
    setAdd(false)
    setEdit(false)
    setSelectedId("")
    setForm({ name: "" })
  }

  if (add || edit) {
    return (
      <div className="wrapper">
        <div className="top">
          <div onClick={closeForm} className="back">
            <FaArrowLeftLong />
          </div>
          {edit ? "Update Language" : "Add New Language"}
        </div>

        <form
          className="tableContainer"
          onSubmit={(e) => {
            e.preventDefault()

            if (!form.name.trim()) {
              alert("Language name is required")
              return
            }

            if (add) {
              dispatch(AddLanguage({ name: form.name.trim() }))
                .unwrap()
                .then((res) => {
                  if (res.success) {
                    dispatch(GetLanguages())
                    closeForm()
                  } else {
                    // @ts-ignore
                    alert(res.message || "Something went wrong")
                  }
                })
            }

            if (edit && selectedId) {
              dispatch(UpdateLanguage({ id: selectedId, name: form.name.trim() }))
                .unwrap()
                .then((res) => {
                  if (res.success) {
                    dispatch(GetLanguages())
                    closeForm()
                  } else {
                    // @ts-ignore
                    alert(res.message || "Something went wrong")
                  }
                })
            }
          }}
        >
          <div className="form">
            <div className="inputBox">
              <label htmlFor="name">
                Name<span>*</span>
              </label>
              <div className="search">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ name: e.target.value })}
                />
              </div>
            </div>
          </div>

          <button style={{ marginTop: "20px" }} type="submit">
            Submit
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="wrapper">
      <div className="top">Language List</div>

      <div className="tableContainer">
        <div className="tableTop">
          <div className="search">
            <IoSearch />
            <input type="text" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>

          <button
            onClick={() => {
              setAdd(true)
              setEdit(false)
              setForm({ name: "" })
            }}
          >
            Add New Language
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {pageItems.map((l: Language, i: number) => (
              <tr key={l._id}>
                <td>{i + 1 + (p - 1) * pageSize}</td>
                <td>{l.name}</td>

                <td style={{ display: "flex", gap: "10px" }}>
                  <div
                    className="delete"
                    onClick={() => {
                      const ok = window.confirm(
                        `Do you want to delete "${l.name}" language?`
                      )
                      if (!ok) return

                      dispatch(DeleteLanguage({ id: l._id }))
                        .unwrap()
                        .then((res) => {
                          if (res.success) {
                            dispatch(GetLanguages())
                          } else {
                            // @ts-ignore
                            alert(res.message || "Delete failed")
                          }
                        })
                    }}
                  >
                    <MdDelete style={{ cursor: "pointer", fontSize: "1.3rem" }} />
                  </div>

                  <div
                    className="delete"
                    onClick={() => {
                      setEdit(true)
                      setAdd(false)
                      setSelectedId(l._id)
                      setForm({ name: l.name })
                    }}
                  >
                    <BiSolidEditAlt style={{ cursor: "pointer", fontSize: "1.3rem" }} />
                  </div>
                </td>
              </tr>
            ))}

            {pageItems.length === 0 && (
              <tr>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  No languages found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="tableTop" style={{ marginTop: "20px" }}>
          <p className="text">
            Showing {filteredLanguages.length === 0 ? 0 : (p - 1) * pageSize + 1} to{" "}
            {Math.min(p * pageSize, filteredLanguages.length)} of{" "}
            {filteredLanguages.length} results
          </p>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              style={{ cursor: p === 1 ? "no-drop" : "pointer" }}
              onClick={() => p !== 1 && setP(p - 1)}
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, i) => {
              if (p === i + 1 || p - 2 === i) {
                return (
                  <button
                    key={i}
                    className={`${i + 1 === p && "active"}`}
                    onClick={() => setP(i + 1)}
                  >
                    {i + 1}
                  </button>
                )
              }
              if (p === 1 && p === i) {
                return (
                  <button
                    key={i}
                    className={`${i + 1 === p && "active"}`}
                    onClick={() => setP(i + 1)}
                  >
                    {i + 1}
                  </button>
                )
              }
              return null
            })}

            <button
              style={{
                cursor: p * pageSize >= filteredLanguages.length ? "no-drop" : "pointer",
              }}
              onClick={() => p * pageSize < filteredLanguages.length && setP(p + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LanguagePage
