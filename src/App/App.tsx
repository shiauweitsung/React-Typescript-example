import { Route, Routes, Navigate } from 'react-router-dom';
import Home from 'pages/Home';

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
