import { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import RouteGuard from './shared/components/RouteGuard';

const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Feed = lazy(() => import('./pages/Feed'));

function PageLoader() {
  return (
    <div className="container py-5 text-center">
      <p>Loading...</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route
            path="/login"
            element={
              <RouteGuard requireAuth={false}>
                <Login />
              </RouteGuard>
            }
          />
          <Route
            path="/register"
            element={
              <RouteGuard requireAuth={false}>
                <Register />
              </RouteGuard>
            }
          />
          <Route
            path="/feed"
            element={
              <RouteGuard requireAuth={true}>
                <Feed />
              </RouteGuard>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
