import { Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from 'components/Sidebar';
import Home from 'pages/Home';
import Counter from 'pages/Counter';
import FormikForm from 'pages/Formik';

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="counter" element={<Counter />} />
        <Route path="formik" element={<FormikForm />} />
      </Routes>
      <Sidebar />
    </>
  );
}

export default App;
