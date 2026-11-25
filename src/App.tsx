import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Discover } from './pages/Discover'
import { TaskDetail } from './pages/TaskDetail'
import { Submit } from './pages/Submit'
import { Profile } from './pages/Profile'
import { Leaderboard } from './pages/Leaderboard'
import { Feed } from './pages/Feed'
import { Communities } from './pages/Communities'
import { Notifications } from './pages/Notifications'
import { Dashboard } from './pages/Dashboard'
import { Admin } from './pages/Admin'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route index element={<Navigate to="/discover" replace />} />
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
                <Route path="*" element={<Navigate to="/discover" replace />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
