import { GoogleOAuthProvider } from '@react-oauth/google';
import { Route, Routes, Navigate } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { QueryClient, QueryClientProvider } from 'react-query';
import Sidebar from 'components/Sidebar';
import Home from 'pages/Home';
import Counter from 'pages/Counter';
import FormikForm from 'pages/Formik';
import ScanQRcode from 'pages/ScanQRcode';
import EChart from 'pages/EChart';
import GoogleLoginPage from 'pages/Google';
import ChatRoom from 'pages/ChatRoom';
import AnimalHospital from 'pages/AnimalHospital';
import CookiePage from 'pages/Cookie';
import Tables from 'pages/Table';
import TablePagination from 'pages/Table/Paginations';
import ExportToExcel from 'pages/Excel';
import Swipers from 'pages/Swiper';
import NavTabs from 'pages/Tabs';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <CookiesProvider>
        <GoogleOAuthProvider clientId="289230852689-959frpan214vuskh6irl76aihq73u8pm.apps.googleusercontent.com">
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route index element={<Home />} />
              <Route path="*" element={<Navigate to="/" replace />} />
              <Route path="counter" element={<Counter />} />
              <Route path="formik" element={<FormikForm />} />
              <Route path="scan" element={<ScanQRcode />} />
              <Route path="echart" element={<EChart />} />
              <Route path="google" element={<GoogleLoginPage />} />
              <Route path="chat" element={<ChatRoom />} />
              <Route path="animal_hospital" element={<AnimalHospital />} />
              <Route path="cookie" element={<CookiePage />} />
              <Route path="table" element={<Tables />}>
                <Route path="pagination" element={<TablePagination />} />
              </Route>
              <Route path="export_excel" element={<ExportToExcel />} />
              <Route path="swiper" element={<Swipers />} />
              <Route path="navtabs" element={<NavTabs />} />
            </Routes>
            <Sidebar />
          </QueryClientProvider>
        </GoogleOAuthProvider>
      </CookiesProvider>
    </>
  );
}

export default App;
