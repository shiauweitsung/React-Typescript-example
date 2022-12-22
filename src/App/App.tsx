import { GoogleOAuthProvider } from '@react-oauth/google';
import { Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from 'components/Sidebar';
import Home from 'pages/Home';
import Counter from 'pages/Counter';
import FormikForm from 'pages/Formik';
import ScanQRcode from 'pages/ScanQRcode';
import EChart from 'pages/EChart';
import GoogleLoginPage from 'pages/Google';
import ChatRoom from 'pages/ChatRoom';

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId="289230852689-959frpan214vuskh6irl76aihq73u8pm.apps.googleusercontent.com">
        <Routes>
          <Route index element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="counter" element={<Counter />} />
          <Route path="formik" element={<FormikForm />} />
          <Route path="scan" element={<ScanQRcode />} />
          <Route path="echart" element={<EChart />} />
          <Route path="google" element={<GoogleLoginPage />} />
          <Route path="chat" element={<ChatRoom />} />
        </Routes>
        <Sidebar />
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
