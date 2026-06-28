import { useEffect, useState } from "react"
import { FaArrowLeftLong } from "react-icons/fa6"
import { MdDelete } from "react-icons/md"
import { BiSolidEditAlt } from "react-icons/bi"

import { useAppDispatch, useAppSelector } from "../../hooks"
import { AddRecharge, DeleteRecharge, GetRecharge, UpdateRecharge } from "../../api/Recharge"

function ManageRecharge() {
  const [p, setP] = useState(1)
  const dispatch = useAppDispatch()

  const [add, setAdd] = useState(false)
  const [edit, setEdit] = useState(false)
  const [editId, setEditId] = useState("")

  // NEW fields added, but UI design stays same
  const [recharge, setRecharge] = useState({
    price: 0,
    coin: 0,
    bonusCoin: 0,
    discountPercent: 0,
    validityDays: 0, // 2 / 7 / any
    isActive: true,
  })

  const { recharge: rechargeList } = useAppSelector((state) => state.RechargeStore)

  const handleForm = (e: { target: { name: string; value: string } }) => {
    // allow boolean dropdown
    if (e.target.name === "isActive") {
      setRecharge({ ...recharge, isActive: e.target.value === "true" })
      return
    }

    // numeric guard (your style)
    if (!Number(e.target.value) && e.target.value) return
    setRecharge({ ...recharge, [e.target.name]: Number(e.target.value) })
  }

  useEffect(() => {
    dispatch(GetRecharge())
  }, [dispatch])

  const resetForm = () => {
    setRecharge({
      price: 0,
      coin: 0,
      bonusCoin: 0,
      discountPercent: 0,
      validityDays: 0,
      isActive: true,
    })
    setEditId("")
  }

  if (add || edit) {
    return (
      <div className="wrapper">
        <div className="top">
          <div
            onClick={() => {
              setAdd(false)
              setEdit(false)
              resetForm()
            }}
            className="back"
          >
            <FaArrowLeftLong />
          </div>
          {edit ? "Update Recharge" : "Add Recharge Plan"}
        </div>

        <form
          className="tableContainer"
          onSubmit={(e) => {
            e.preventDefault()
            if (!recharge.price || !recharge.coin) {
              alert("Price and Coin are required")
              return
            }
            if (add) {
              dispatch(AddRecharge({ ...recharge }))
                .unwrap()
                .then((res) => {
                  if (res.success) {
                    setAdd(false)
                    dispatch(GetRecharge())
                    resetForm()
                  } else {
                    alert(res.message || "Failed")
                  }
                })
            }

            if (edit && editId) {
              dispatch(UpdateRecharge({ id: editId, ...recharge }))
                .unwrap()
                .then((res) => {
                  if (res.success) {
                    setEdit(false)
                    dispatch(GetRecharge())
                    resetForm()
                  } else {
                    alert(res.message || "Failed")
                  }
                })
            }
          }}
        >
          <div className="form">
            <div className="inputBox">
              <label htmlFor="price">
                Price<span>*</span>
              </label>
              <div className="search">
                <input type="text" name="price" id="price" value={recharge.price} onChange={handleForm} />
              </div>
            </div>

            <div className="inputBox">
              <label htmlFor="coin">
                Coin<span>*</span>
              </label>
              <div className="search">
                <input type="text" name="coin" id="coin" value={recharge.coin} onChange={handleForm} />
              </div>
            </div>

            {/* NEW: Bonus coin */}
            <div className="inputBox">
              <label htmlFor="bonusCoin">Extra Coin</label>
              <div className="search">
                <input
                  type="text"
                  name="bonusCoin"
                  id="bonusCoin"
                  value={recharge.bonusCoin}
                  onChange={handleForm}
                />
              </div>
            </div>

            {/* NEW: Discount percentage */}
            <div className="inputBox">
              <label htmlFor="discountPercent">Discount %</label>
              <div className="search">
                <input
                  type="text"
                  name="discountPercent"
                  id="discountPercent"
                  value={recharge.discountPercent}
                  onChange={handleForm}
                />
              </div>
            </div>

            {/* NEW: Offer duration in days */}
            <div className="inputBox">
              <label htmlFor="validityDays">Offer Days (2 / 7 / custom)</label>
              <div className="search">
                <input
                  type="text"
                  name="validityDays"
                  id="validityDays"
                  value={recharge.validityDays}
                  onChange={handleForm}
                />
              </div>
            </div>

            {/* NEW: Active flag */}
            <div className="inputBox">
              <label htmlFor="isActive">Active</label>
              <div className="search">
                <select name="isActive" id="isActive" value={String(recharge.isActive)} onChange={handleForm}>
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
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
      <div className="top">Recharge Management</div>

      <div className="tableContainer">
        <div className="tableTop">
          <button
            onClick={() => {
              // optional: open form focusing on discount fields
              setAdd(true)
              setEdit(false)
              resetForm()
            }}
          >
            Add Discount
          </button>

          <button
            onClick={() => {
              setAdd(true)
              setEdit(false)
              resetForm()
            }}
          >
            Add New Offer
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Price</th>
              <th>Coin</th>
              <th>Get</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {rechargeList
              ?.slice((p - 1) * 5, (p - 1) * 5 + 5)
              .map((e, i: number) => (
                <tr key={e._id}>
                  <td>{i + 1 + (p - 1) * 5}</td>
                  <td>{e.price}</td>
                  <td>{e.coin}</td>
                  <td>{e.getCoin}</td>

                  <td style={{ display: "flex", gap: "10px" }}>
                    <div
                      className="delete"
                      onClick={() => {
                        const ok = window.confirm(`Do You Want to delete this recharge plan?`)
                        if (!ok) return

                        dispatch(DeleteRecharge({ id: e._id }))
                          .unwrap()
                          .then((res) => {
                            if (res.success) dispatch(GetRecharge())
                            else {
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
                        setEditId(e._id)

                        setRecharge({
                          price: e.price,
                          coin: e.coin,
                          bonusCoin: Number(e.bonusCoin || 0),
                          discountPercent: Number(e.discountPercent || 0),
                          validityDays: 0, // keep blank on edit, backend will preserve endsAt if you want
                          isActive: e.isActive ?? true,
                        })
                      }}
                    >
                      <BiSolidEditAlt style={{ cursor: "pointer", fontSize: "1.3rem" }} />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="tableTop" style={{ marginTop: "20px" }}>
          <p className="text">
            Showing {p * 5 - 5 + 1} to {p * 5 > rechargeList.length ? rechargeList.length : p * 5} of{" "}
            {rechargeList.length} results
          </p>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              style={{ cursor: p === 1 ? "no-drop" : "pointer" }}
              onClick={() => p !== 1 && setP(p - 1)}
            >
              Previous
            </button>

            {[...Array(Math.ceil(rechargeList.length / 5))].map((_, i) => {
              if (p === i + 1 || p - 2 === i) {
                return (
                  <button key={i} className={`${i + 1 === p && "active"}`} onClick={() => setP(i + 1)}>
                    {i + 1}
                  </button>
                )
              } else if (p === 1 && p === i) {
                return (
                  <button key={i} className={`${i + 1 === p && "active"}`} onClick={() => setP(i + 1)}>
                    {i + 1}
                  </button>
                )
              }
              return null
            })}

            <button
              style={{ cursor: p * 5 > rechargeList.length ? "no-drop" : "pointer" }}
              onClick={() => p * 5 < rechargeList.length && setP(p + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageRecharge
