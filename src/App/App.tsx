import { Route, Routes, Navigate } from 'react-router-dom';
import Home from 'pages/Home';
import Counter from 'pages/Counter';

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="counter" element={<Counter />} />
    </Routes>
  );
}

export default App;
