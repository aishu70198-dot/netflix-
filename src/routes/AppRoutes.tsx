import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import { MyListProvider } from '../context/MyListContext'
import { AppLayout } from '../components/layout/AppLayout'
import { LoginPage } from '../pages/LoginPage'
import { SignupPage } from '../pages/SignupPage'
import { DashboardPage } from '../pages/DashboardPage'
import { ProtectedRoute } from './ProtectedRoute'

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MyListProvider>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </MyListProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

