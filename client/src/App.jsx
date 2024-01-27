import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Assets from './pages/Assets';
import Bookings from './pages/Bookings';
import Dashboard from './pages/Dashboard';
import Groups from './pages/Groups';
import PageNotFound from './pages/PageNotFound';
import Settings from './pages/Settings';
import Timeline from './pages/Timeline';
import Login from './pages/Login';
import AppLayout from './ui/AppLayout';
import Homepage from './pages/Homepage';
import Productions from './pages/Productions';
import Equipment from './pages/Equipment';
import GlobalStyles from './styles/GlobalStyles';
import Rooms from './pages/Rooms';
import People from './pages/People';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000, // 60 * 1000 milliseconds
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="timeline" element={<Timeline />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="assets" element={<Assets />}>
              <Route index element={<Navigate replace to="equip" />} />
              <Route path="equip" element={<Equipment />} />
              <Route path="rooms" element={<Rooms />} />
              <Route path="people" element={<People />} />
            </Route>
            <Route path="groups" element={<Groups />} />
            <Route path="productions" element={<Productions />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
