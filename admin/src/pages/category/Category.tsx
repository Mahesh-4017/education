import { useEffect, useMemo, useState } from "react"
import { FaArrowLeftLong } from "react-icons/fa6"
import { IoSearch } from "react-icons/io5"
import { MdDelete } from "react-icons/md"
import { BiSolidEditAlt } from "react-icons/bi"

import { useAppDispatch, useAppSelector } from "../../hooks"
import {
  AddCategory,
  DeleteCategory,
  GetCategories,
  UpdateCategory,
} from "../../api/Category" 

type Category = {
  _id: string
  name: string
}

function CategoryPage() {
  const dispatch = useAppDispatch()

  const { categories } = useAppSelector((state) => state.CategoryStore) // <-- reducer key
  // if your store key is different, update this line

  const [p, setP] = useState(1)
  const [q, setQ] = useState("")
  const [add, setAdd] = useState(false)
  const [edit, setEdit] = useState(false)

  const [selectedId, setSelectedId] = useState<string>("")
  const [form, setForm] = useState<{ name: string }>({ name: "" })

  useEffect(() => {
    dispatch(GetCategories())
  }, [dispatch])

  // reset pagination when search changes
  useEffect(() => {
    setP(1)
  }, [q])

  const filteredCategories = useMemo(() => {
    if (!q.trim()) return categories
    const qq = q.toLowerCase()
    return categories.filter((c: Category) => c.name?.toLowerCase().includes(qq))
  }, [categories, q])

  const pageSize = 5
  const totalPages = Math.ceil(filteredCategories.length / pageSize)
  const pageItems = filteredCategories.slice((p - 1) * pageSize, (p - 1) * pageSize + pageSize)

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
          {edit ? "Update Category" : "Add New Category"}
        </div>

        <form
          className="tableContainer"
          onSubmit={(e) => {
            e.preventDefault()

            if (!form.name.trim()) {
              alert("Category name is required")
              return
            }

            if (add) {
              dispatch(AddCategory({ name: form.name.trim() }))
                .unwrap()
                .then((res) => {
                  if (res.success) {
                    dispatch(GetCategories())
                    closeForm()
                  } else {
                    alert(res.message || "Something went wrong")
                  }
                })
            }

            if (edit && selectedId) {
              dispatch(UpdateCategory({ id: selectedId, name: form.name.trim() }))
                .unwrap()
                .then((res) => {
                  if (res.success) {
                    dispatch(GetCategories())
                    closeForm()
                  } else {
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
      <div className="top">Category List</div>

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
            Add New Category
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
            {pageItems.map((c: Category, i: number) => (
              <tr key={c._id}>
                <td>{i + 1 + (p - 1) * pageSize}</td>
                <td>{c.name}</td>

                <td style={{ display: "flex", gap: "10px" }}>
                  <div
                    className="delete"
                    onClick={() => {
                      const ok = window.confirm(`Do you want to delete "${c.name}" category?`)
                      if (!ok) return

                      dispatch(DeleteCategory({ id: c._id }))
                        .unwrap()
                        .then((res) => {
                          if (res.success) {
                            dispatch(GetCategories())
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
                      setSelectedId(c._id)
                      setForm({ name: c.name })
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
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="tableTop" style={{ marginTop: "20px" }}>
          <p className="text">
            Showing{" "}
            {filteredCategories.length === 0 ? 0 : (p - 1) * pageSize + 1} to{" "}
            {Math.min(p * pageSize, filteredCategories.length)} of{" "}
            {filteredCategories.length} results
          </p>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              style={{ cursor: p === 1 ? "no-drop" : "pointer" }}
              onClick={() => p !== 1 && setP(p - 1)}
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, i) => {
              // same display logic you had (shows current and previous)
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
              style={{ cursor: p * pageSize >= filteredCategories.length ? "no-drop" : "pointer" }}
              onClick={() => p * pageSize < filteredCategories.length && setP(p + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryPage
