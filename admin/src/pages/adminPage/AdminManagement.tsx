import React, { useEffect, useState } from 'react'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { GetRoles } from '../../api/RoleReducers'
import { IoSearch } from 'react-icons/io5'
import { MdDelete } from 'react-icons/md'
import { BiSolidEditAlt } from 'react-icons/bi'
import { AddAdminUsers, GetAdminUsers, UpdateAdminUsers } from '../../api/AdminUser'

function AdminManagement() {
    const [p, setP] = useState(1)
    const dispatch = useAppDispatch()
    const [q, setQ] = useState("")
    const [add, setAdd] = useState(false)
    const [employee, setEmployee] = useState({ name: "", email: "", password: "", role: "" })
    const { roles } = useAppSelector((state) => state.RoleStore)
    const { admins, user } = useAppSelector((state) => state.adminUserReducer)
    const [iterableAdmin, setIterableAdmin] = useState<User[]>([...admins])
    const [edit, setEdit] = useState(false)
    // const [updateEmployee, setUpdateEmployee] = useState<{ name: string, email: string, password: string, role: string }>({ name: "", email: "", password: "", role: "" })
    const handleForm = (e: { target: { name: string; value: string } }) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        setIterableAdmin([...admins])
    }, [admins])
    useEffect(() => {
        if (q) {
            setIterableAdmin([...admins.filter((e) => e.name?.includes(q))])
        }
        else {
            setIterableAdmin([...admins])
        }
    }, [q, roles])
    useEffect(() => {
        dispatch(GetRoles())
        dispatch(GetAdminUsers())
    }, [])
    if (add || edit) {
        return (<>
            <div className="wrapper">
                <div className="top">
                    <div onClick={() => {
                        setAdd(false)
                        setEdit(false)
                    }} className="back">
                        <FaArrowLeftLong />
                    </div>
                    {
                        edit ? "Update Employee" : "Add New Employee"
                    }
                </div>
                <form className="tableContainer" onSubmit={(e) => {
                    e.preventDefault()
                    // if (!rollPermission.name) {
                    //     alert("fill all require felids")
                    // }
                    // else 
                    if (add) {
                        dispatch(AddAdminUsers({ ...employee })).unwrap().then((e) => {
                            if (e.success) {
                                setAdd(false)
                            }
                            else{
                                alert(e.message)
                            }
                        })
                    }
                    else if (edit && user?._id) {

                        dispatch(UpdateAdminUsers({ ...employee, userId: user._id })).unwrap().then((e) => {
                            if (e.success) {
                                setEdit(false)
                            }
                        })

                    }
                    // else if (edit && rollPermission._id) {
                    // }
                }} >
                    <div className="form" >
                        <div className="inputBox">
                            <label htmlFor="name">Name<span>*</span></label>
                            <div className="search" >
                                <input type="text" name="name" id="name" value={employee.name} onChange={handleForm} />
                            </div>
                        </div>
                        <div className="inputBox">
                            <label htmlFor="email">Email<span>*</span></label>
                            <div className="search" >
                                <input type="text" name="email" id="email" value={employee.email} onChange={handleForm} />
                            </div>
                        </div>
                        <div className="inputBox">
                            <label htmlFor="password">Password<span>*</span></label>
                            <div className="search">
                                <input type="password" name="password" id="password" value={employee.password} onChange={handleForm} />
                            </div>
                        </div>
                        <div className="inputBox">
                            <label htmlFor="role">Role<span>*</span></label>
                            <div className="search">
                                <select name="role" id="role" value={employee.role} onChange={handleForm} >
                                    <option defaultValue={""}>select role</option>
                                    {
                                        roles.map((e) => (
                                            <option value={e._id}>{e.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>

                    <button style={{ marginTop: "20px" }} type="submit" >Submit</button>
                </form >
            </div >
        </>)
    }
    return (
        <div className="wrapper">
            <div className="top">
                Employee List
            </div>
            <div className="tableContainer" >
                <div className="tableTop">
                    <div className="search">
                        <IoSearch />
                        <input type="text" value={q} onChange={(e) => setQ(e.target.value)} />
                    </div>
                    <button onClick={() => setAdd(true)}>Add New Employee</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th >Name</th>
                            <th >Email</th>
                            <th >Role</th>
                            <th >Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            iterableAdmin?.slice((p - 1) * 5, ((p - 1) * 5) + 5).map((e, i: number) => (
                                <tr key={e._id}>
                                    <td>{i + 1 + ((p - 1) * 5)}</td>
                                    <td>{e.name}</td>
                                    <td>{e.email
                                        // e.permissions.map((j: any, i: number) => (
                                        //   <>
                                        //     {j}{e.permissions.length - 1 !== i ? ", " : ""}
                                        //   </>
                                        // ))
                                    }</td>
                                    <td>{e?.role?.name}</td>
                                    <td style={{ display: "flex", gap: "10px" }}>
                                        <div className="delete" onClick={() => {
                                            const a = window.confirm(`Do You Want to delete "${e.name}" role`)
                                            // a && dispatch(DelRole({ id: e._id })).then((e: { payload: { success: any; }; }) => {
                                            //   if (e.payload.success) {
                                            //     alert("successfully delete role")
                                            //     dispatch(GetRole({ s: 5, p, q })).then((e: { payload: { count: any; }; }) => {
                                            //       setA(e.payload.count || 0)
                                            //     })
                                            //   }
                                            // })
                                        }} ><MdDelete style={{ cursor: "pointer", fontSize: "1.3rem" }} /></div><div className="delete" onClick={() => {
                                            setEdit(true)
                                            setEmployee({ name: e.name, email: e.email, password: "", role: e.role._id })
                                        }} ><BiSolidEditAlt style={{ cursor: "pointer", fontSize: "1.3rem" }} /></div>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
                <div className="tableTop" style={{ marginTop: "20px" }}>
                    <p className="text" >
                        Showing {p * 5 - 5 + 1} to {p * 5 > iterableAdmin.length ? iterableAdmin.length : p * 5} of {iterableAdmin.length} results
                    </p>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <button style={{ cursor: p === 1 ? "no-drop" : "pointer" }} onClick={() => {
                            if (p !== 1) {
                                setP(p - 1)

                            }
                        }}>Previous</button>
                        {
                            [...Array(Math.ceil(iterableAdmin.length / 5))].map((_, i) => {
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
                        <button style={{ cursor: p * 5 > iterableAdmin.length ? "no-drop" : "pointer" }} onClick={() => {
                            if (p * 5 < iterableAdmin.length) {
                                setP(p + 1)

                            }
                        }}>Next</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminManagement
