import { useState, ChangeEvent, useEffect } from 'react'
import { IoSearch } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";
import { AddRole, GetRoles, UpdateRole, GetPermissions, DelRole } from '../../api/RoleReducers';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { BiSolidEditAlt } from "react-icons/bi";
const RoleManagement = () => {
  const [p, setP] = useState(1)
  const dispatch = useAppDispatch()
  const [q, setQ] = useState("")
  const [add, setAdd] = useState(false)
  const [permission, setPermission] = useState<{ name: string, value: string[] }[]>([])
  useEffect(() => {
    dispatch(GetPermissions()).unwrap().then(res => {
      if (res && res.success) {
        const mapped = res.permissions.map(perm => {
          const [feature, action] = perm.split(':');
          const val = [perm];
          if (action === "create" || action === "update" || action === "delete") {
            val.push(`${feature}:view`);
          }
          return { name: `${feature} ${action}`, value: val };
        });
        setPermission(mapped);
      }
    });
  }, [dispatch]);

  const { roles } = useAppSelector((state) => state.RoleStore)
  const { user } = useAppSelector((state) => state.adminUserReducer)
  const [iterableRole, setIterableRole] = useState<Role[]>([...roles])
  const [edit, setEdit] = useState(false)
  useEffect(() => {
    if (q) {
      setIterableRole([...roles.filter((e) => e.name?.includes(q))])
    }
    else {
      setIterableRole([...roles])
    }
  }, [q, roles])

  useEffect(() => {
    if (!edit && !add) {
      dispatch(GetRoles()).then((e) => {
        if ((e.payload as { success: boolean }).success) {
          setP(1)
          setQ("")
        }
      })
    }
  }, [edit, add])
  const [rollPermission, setRollPermission] = useState<{ name: string, permissions: string[], _id?: string }>({ name: "", permissions: [], _id: "" })
  const { permissions } = rollPermission
  const handlePermission = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    const x = value.split(",")
    if (checked) {
      setRollPermission({
        ...rollPermission,
        permissions: [...permissions, ...x],
      });
    }
    else {
      const resultArray = [];
      const removedItems: { [key: string]: boolean } = {};
      for (const item of permissions) {
        if (!x.includes(item) || removedItems[item]) {
          resultArray.push(item)
        } else {
          removedItems[item] = true
        }
      }
      setRollPermission({ ...rollPermission, permissions: [...resultArray] });
    }
  }
  if (add || edit) {
    return (
      <>
        <div className="wrapper">
          <div className="top">
            <div onClick={() => {
              setAdd(false)
              setEdit(false)
            }} className="back">
              <FaArrowLeftLong />
            </div>
            {
              edit ? "Update Role" : "Add New Role"
            }
          </div>
          <form className="tableContainer" onSubmit={(e) => {
            e.preventDefault()
            if (!rollPermission.name) {
              alert("fill all require felids")
            }
            else if (add) {
              dispatch(AddRole({ name: rollPermission.name, permissions: rollPermission.permissions })).unwrap().then((e) => {
                if (e.success) {
                  setAdd(false)
                }
              })
            }
            else if (edit && rollPermission._id) {
              dispatch(UpdateRole({ name: rollPermission.name, id: rollPermission._id, permissions: rollPermission.permissions })).unwrap().then((e) => {
                if (e.success) {
                  setEdit(false)
                }
              })
            }
          }} >
            <div className="form" >
              <div className="inputBox">
                <label htmlFor="name">Name<span>*</span></label>
                <div className="search" style={{ maxWidth: "100px", }}>
                  <input type="text" id="name" value={rollPermission.name} onChange={(e) => setRollPermission({ ...rollPermission, name: e.target.value })} />
                </div>
              </div>
            </div>
            <div className="inputBox" style={{ marginTop: "10px", }}>
              <label >Permissions<span>*</span></label>
              <div className="search" style={{ display: "flex", flexWrap: 'wrap', width: "100%", alignContent: 'flex-start', maxHeight: "300px", overflow: 'auto', }}>
                {
                  permission.map((p, i) => (
                    <>
                      <div key={i} style={{ display: "flex", gap: "10px", alignItems: "center", height: "50px", width: "24%", minWidth: "200px" }}>
                        <input type="checkbox" checked={p.value.every(permission => permissions.includes(permission))} onChange={handlePermission} name={p.name} id={p.name} value={p.value} />
                        <label style={{ fontSize: "18px" }} htmlFor={p.name}>{p.name}</label>
                      </div>
                    </>
                  ))
                }
              </div>
            </div>
            <button style={{ marginTop: "20px" }} type="submit" >Submit</button>
          </form >
        </div >
      </>
    )
  }
  return (
    <div className="wrapper">
      <div className="top">
        Roles List
      </div>
      <div className="tableContainer" >
        <div className="tableTop">
          <div className="search">
            <IoSearch />
            <input type="text" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <button onClick={() => setAdd(true)}>Add New Role</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th >Name</th>
              <th >Permissions</th>
              <th >Action</th>
            </tr>
          </thead>
          <tbody>
            {
              iterableRole?.slice((p - 1) * 5, ((p - 1) * 5) + 5).map((e, i: number) => (
                <tr key={e._id}>
                  <td>{i + 1 + ((p - 1) * 5)}</td>
                  <td>{e.name}</td>
                  <td>{
                    e.permissions.map((j: any, i: number) => (
                      <>
                        {j}{e.permissions.length - 1 !== i ? ", " : ""}
                      </>
                    ))
                  }</td>
                  <td style={{ display: "flex", gap: "10px" }}>
                    {e._id !== user?.role?._id && (
                      <>
                        <div className="delete" onClick={() => {
                          const a = window.confirm(`Do You Want to delete "${e.name}" role`)
                          a && dispatch(DelRole({ id: e._id })).unwrap().then((payload: any) => {
                            if (payload.success) {
                              alert("successfully delete role")
                              dispatch(GetRoles())
                            }
                          })
                        }} ><MdDelete style={{ cursor: "pointer", fontSize: "1.3rem" }} /></div>

                        <div className="delete" onClick={() => {
                          setEdit(true)
                          setRollPermission({ name: e.name, permissions: e.permissions, _id: e._id })
                        }} ><BiSolidEditAlt style={{ cursor: "pointer", fontSize: "1.3rem" }} /></div>
                      </>
                    )}
                  </td>
                </tr>
              ))
            }

          </tbody>
        </table>
        <div className="tableTop" style={{ marginTop: "20px" }}>
          <p className="text" >
            Showing {p * 5 - 5 + 1} to {p * 5 > iterableRole.length ? iterableRole.length : p * 5} of {iterableRole.length} results
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            <button style={{ cursor: p === 1 ? "no-drop" : "pointer" }} onClick={() => {
              if (p !== 1) {
                setP(p - 1)

              }
            }}>Previous</button>
            {
              [...Array(Math.ceil(iterableRole.length / 5))].map((_, i) => {
                if (p === i + 1 || p - 2 === i) {
                  return (
                    <button className={`${i + 1 === p && "active"}`}>{i + 1}</button>
                  )
                }
                else if (p === 1 && p === i) {
                  return (
                    <button className={`${i + 1 === p && "active"}`}>{i + 1}</button>
                  )
                }
                return null
              }
              )
            }
            <button style={{ cursor: p * 5 > iterableRole.length ? "no-drop" : "pointer" }} onClick={() => {
              if (p * 5 < iterableRole.length) {
                setP(p + 1)

              }
            }}>Next</button>

          </div>
        </div>
      </div>
    </div>
  )
}

export default RoleManagement
