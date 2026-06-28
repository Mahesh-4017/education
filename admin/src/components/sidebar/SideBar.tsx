import { ReactNode, useEffect, useState } from 'react'
import style from './style.module.css'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { LoginAdmin, TokenLoginAdmin } from '../../api/AdminUser'
import { AiFillAppstore } from "react-icons/ai";
import { FaAngleRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { PiNewspaperClippingFill } from "react-icons/pi";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { BiSolidUserPin } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa";
import { BiTransferAlt } from "react-icons/bi";
import { IoChatbox } from "react-icons/io5";
import { MdReport } from "react-icons/md";
const routes = [
  {
    name: "Dashboard",
    icon: <AiFillAppstore style={{ backgroundColor: "transparent" }} size={22} />,
    path: "",
    permission: ""
  },
  {
    name: "Admin Users",
    path: "/admin-management",
    icon: <FaUser style={{ backgroundColor: "transparent" }} size={22} />,
    permission: "admin:view"
  }, {
    name: "Blogs",
    path: "/blogs",
    icon: <PiNewspaperClippingFill style={{ backgroundColor: "transparent" }} size={22} />,
    permission: "blog:view"
  },
  {
    name: "CRM",
    icon: <BiSolidMessageSquareEdit style={{ backgroundColor: "transparent" }} size={22} />,
    permission: ["role:view", "category:view", "language:view", "recharge:view"],
    subRoute: [
      {
        name: "Role Management",
        path: '/role-management',
        permission: "role:view"
      }, {
        name: "Category",
        path: "/category",
        permission: "category:view"
      }, {
        name: "Language",
        path: "/language",
        permission: "language:view"
      }, {
        name: "Recharge",
        path: "/recharge",
        permission: "recharge:view"
      },
    ]
  },
  {
    name: "Astrologers",
    icon: <BiSolidUserPin style={{ backgroundColor: "transparent" }} size={22} />,
    permission: "astrologer:view",
    subRoute: [
      {
        name: "All Astrologers",
        path: "/all-astrologers",
        permission: "astrologer:view"
      }, {
        name: "New Application",
        path: "/new-application",
        permission: "astrologer:view"
      }, {
        name: "Blocked & Rejected",
        path: "/blocked-astrologers",
        permission: "astrologer:view"
      }, {
        name: "Profile Updates",
        path: "/profile-drafts",
        permission: "astrologer:view"
      }
    ]
  },
  {
    name: "User",
    icon: <FaUserFriends style={{ backgroundColor: "transparent" }} size={22} />,
    permission: "user:view",
    subRoute: [
      {
        name: "All Users",
        path: "/all-users",
        permission: "user:view"
      }, {
        name: "Blocked & Rejected",
        path: "/blocked-users",
        permission: "user:view"
      }
    ]
  },
  {
    name: "User Transitions",
    path: "/user-transitions",
    icon: <FaMoneyBillWave style={{ backgroundColor: "transparent" }} size={22} />,
    permission: "transition:view"
  },
  {
    name: "Astrologer Transitions",
    path: "/astrologer-transitions",
    icon: <BiTransferAlt style={{ backgroundColor: "transparent" }} size={22} />,
    permission: "transition:view"
  },
  {
    name: "Chats",
    icon: <IoChatbox style={{ backgroundColor: "transparent" }} size={22} />,
    permission: "chat:view",
    subRoute: [
      {
        name: "All Chats",
        path: "/all-chats",
        permission: "chat:view"
      }, {
        name: "All Session",
        path: "/all-session",
        permission: "chat:view"
      }
    ]
  }, {
    name: "Report",
    icon: <MdReport style={{ backgroundColor: "transparent" }} size={22} />,
    permission: "report:view",
    subRoute: [
      {
        name: "All Chats",
        path: "/all-chats",
        permission: "report:view"
      }, {
        name: "All Session",
        path: "/all-session",
        permission: "report:view"
      }
    ]
  },
]
interface SideBarProps {
  children: ReactNode;
}
const SideBar: React.FC<SideBarProps> = ({ children }) => {
  const [active, setActive] = useState(false)
  const [login, setLogin] = useState({ email: "", password: "" })
  const navigate = useNavigate();
  const handelChanges = (e: { target: { name: string; value: string } }) => {
    setLogin({ ...login, [e.target.name]: e.target.value })
  }
  const dispatch = useAppDispatch()
  const { auth, user } = useAppSelector((state: any) => state.adminUserReducer)

  const filteredRoutes = routes.map((route) => {
    if (user?.role?.name === 'Super Admin') return route;

    const hasMainPerm = !route.permission || (
      Array.isArray(route.permission)
        ? route.permission.some(p => user?.role?.permissions?.includes(p))
        : user?.role?.permissions?.includes(route.permission)
    );
    if (!hasMainPerm) return null;

    if (route.subRoute) {
      const filteredSub = route.subRoute.filter(
        (sub) => !sub.permission || user?.role?.permissions?.includes(sub.permission)
      );
      if (filteredSub.length > 0) {
        return { ...route, subRoute: filteredSub };
      }
      return null;
    }
    return route;
  }).filter(Boolean) as typeof routes;
  const handelSubmit = () => {
    if (!active) return
    dispatch(LoginAdmin({ ...login })).unwrap().then(res => {
      if (!res.success) {
        alert(res.message)
      }
    })
  }
  const [activePath, setActivePath] = useState<string>("")
  useEffect(() => {
    const loginFun = async () => {
      const token = await localStorage.getItem("token")
      if (!token) return
      dispatch(TokenLoginAdmin({ token }))
    }
    loginFun()
  }, [])
  useEffect(() => {
    const validate = () => {
      let emailError = "";
      let passwordError = "";
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!login.email) {
        emailError = "Email is required.";
      } else if (!emailPattern.test(login.email)) {
        emailError = "Please enter a valid email address.";
      }

      if (!login.password) {
        passwordError = "Password is required.";
      } else if (login.password.length < 6) {
        passwordError = "Password must be at least 6 characters and contain at least one letter and one number.";
      }
      if (!emailError && !passwordError) {
        setActive(true);
      } else {
        setActive(false);
      }
    };
    validate();
  }, [login])
  return (
    <>
      {
        auth ?
          <div className={`${style.wrapper} ${style.dashboard}`}>
            <div className={`${style.sideBar}`}>
              <img src="/images/logo.png" />
              <br />
              <nav className={style.navMenu}>
                {
                  filteredRoutes.map((e) => {
                    if (e.subRoute) {
                      return (
                        <div key={e.name} className={`${style.routeCon} ${style.subRoute} ${activePath === e.name ? style.activeGroup : ''}`}>
                          <div className={style.routeHeader} onClick={() => {
                            setActivePath(activePath === e.name ? "" : e.name)
                          }}>
                            {e.icon}
                            <h2 style={{ backgroundColor: "transparent" }}>{e.name}</h2>
                            <FaAngleRight style={{ backgroundColor: "transparent" }} className={`${style.icon} ${activePath === e.name ? style.activeIcon : ''}`} />
                          </div>
                          {
                            activePath === e.name && (
                              <div className={`${style.subRouteCon} ${activePath === e.name ? style.activeSubMenu : 's'}`}
                              >
                                {e.subRoute.map((j) => (
                                  <div key={j.path} className={style.subRouteItem} onClick={() => {
                                    navigate(j.path)
                                  }}>
                                    <h2 style={{ backgroundColor: "transparent" }}>{j.name}</h2>
                                  </div>
                                ))}
                              </div>
                            )

                          }
                        </div>
                      )
                    } else {
                      return (
                        <div key={e.path} className={`${style.routeCon}`}>
                          <div className={style.routeHeader} onClick={() => {
                            setActivePath(e.name)
                            navigate(e.path)
                          }}>
                            {e.icon}
                            <h2>{e.name}</h2>
                          </div>
                        </div>

                      )
                    }
                  }
                  )
                }
              </nav>

              {/*  */}
            </div>
            {children}

          </div>
          :
          <div className={`${style.wrapper} ${style.login}`}>
            <div className={`${style.loginForm} `}>
              <img src="/images/logo.png" />

              <div className={`${style.formBox} `}>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="email" onChange={handelChanges} />
              </div>
              <div className={`${style.formBox} `}>
                <label htmlFor="password">Password</label>
                <input type="password" name='password' id="password" onChange={handelChanges} />
              </div>
              <button onClick={handelSubmit} className={`${style.btn} ${active && style.active}`}>Login</button>
            </div>
          </div>
      }

    </>
  )
}

export default SideBar;