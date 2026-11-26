import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Landing } from './pages/Landing'
import { Discover } from './pages/Discover'
import { TaskDetail } from './pages/TaskDetail'
import { Submit } from './pages/Submit'
import Profile from './pages/Profile'
import Leaderboard from './pages/Leaderboard'
import { Feed } from './pages/Feed'
import { Communities } from './pages/Communities'
import { Notifications } from './pages/Notifications'
import { Dashboard } from './pages/Dashboard'
import { Admin } from './pages/Admin'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />} />
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="discover" element={<Discover />} />
                <Route path="tasks/:id" element={<TaskDetail />} />
                <Route path="submit" element={<Submit />} />
                <Route path="profile/:walletAddress" element={<Profile />} />
                <Route path="leaderboard" element={<Leaderboard />} />
                <Route path="feed" element={<Feed />} />
                <Route path="communities" element={<Communities />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="admin" element={<Admin />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
