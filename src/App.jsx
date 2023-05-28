import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TodoPage, LoginPage, SignUpPage, HomePage } from './pages';

function App() {
  return (
    <div className="app">
    <BrowserRouter>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="todos" element={<TodoPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
