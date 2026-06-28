import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import SideBar from './components/sidebar/SideBar'
import { Provider } from 'react-redux'
import store from './store.ts'
import RoleManagement from './pages/roleManagement/RoleManagement.tsx'
import AdminManagement from './pages/adminPage/AdminManagement.tsx'
import NewApplication from './pages/newApplication/NewApplication.tsx'
import AllAstrologers from './pages/allAstrologers/AllAstrologers.tsx'
import BlockedAstrologers from './pages/blockedAstrologers/BlockedAstrologers.tsx'
import ProfileDrafts from './pages/profileDrafts/ProfileDrafts.tsx'
import ManageRecharge from './pages/manageRecharge/ManageRecharge.tsx'
import Category from './pages/category/Category.tsx'
import LanguagePage from './pages/language/Language.tsx'
import BlogManagement from './pages/blogs/BlogManagement.tsx'
import BlogInspect from './pages/blogs/BlogInspect.tsx'
import AstrologerDetail from './pages/allAstrologers/AstrologerDetail.tsx'
import UserDetail from './pages/allAstrologers/UserDetail.tsx'

function App() {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/*" element={<SideBar>
              <Routes>
                <Route path='/role-management' element={<RoleManagement />} />
                <Route path='/admin-management' element={<AdminManagement />} />
                <Route path='/new-application' element={<NewApplication />} />
                <Route path='/all-astrologers' element={<AllAstrologers />} />
                <Route path='/blocked-astrologers' element={<BlockedAstrologers />} />
                <Route path='/profile-drafts' element={<ProfileDrafts />} />
                <Route path='/category' element={<Category />} />
                <Route path='/language' element={<LanguagePage />} />
                <Route path='/recharge' element={<ManageRecharge />} />
                <Route path='/blogs' element={<BlogManagement />} />
                <Route path='/blogs/inspect/:id' element={<BlogInspect />} />
                <Route path='/astrologer/:id' element={<AstrologerDetail />} />
                <Route path='/user/:id' element={<UserDetail />} />

              </Routes>
            </SideBar>} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </>
  )
}

export default App
