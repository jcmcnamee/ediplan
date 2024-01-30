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
import { Toaster } from 'react-hot-toast';
import AssetTable from './features/assets/AssetTable';

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
              <Route path="equip" element={<AssetTable />} />
              <Route path="rooms" element={<AssetTable />} />
              <Route path="personel" element={<AssetTable />} />
            </Route>
            <Route path="groups" element={<Groups />} />
            <Route path="productions" element={<Productions />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            furation: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '10px 20px',
            backgroundColor: 'var(--color-grey-0)',
            color: 'var(--color-grey-700)',
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
