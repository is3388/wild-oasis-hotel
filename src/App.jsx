import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Account from './pages/Account';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import GlobalStyles from './styles/GlobalStyles';
import AppLayout from './ui/AppLayout';


// since we don't want index element the same as dashboard route
// we use Navigate component provided by react-router to redirect immediately to dashboard page
// localhost:5173 => localhost:5173/dashboard but it won't be in history stack
// as we use replace, so that URL gets replaced in history stack

// set up cache and query client using new QueryClient
// staleTime is the amt of time that data in cache still stay fresh and valid
// until it is refetched again
/*const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000 // 60 secs and 1000 min secs
    }
  }
})*/
export default function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to='dashboard' />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='bookings' element={<Bookings />} />
            <Route path='cabins' element={<Cabins />} />
            <Route path='users' element={<Users />} />
            <Route path='settings' element={<Settings />} />
            <Route path='account' element={<Account />} />
          </Route>
          <Route path='login' element={<Login />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      </>
  );
}
