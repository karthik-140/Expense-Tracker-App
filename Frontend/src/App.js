import { Routes, Route } from 'react-router-dom'

import Header from './components/Header';
import Signup from "./pages/Signup";
import Expenses from "./pages/Expenses";
import ResetLoginPassword from './components/landing/ResetLoginPassword';
import Leaderboard from './components/Expenses/Leaderboard';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/expense' element={<Expenses />} />
        <Route path='/user/leaderboard' element={<Leaderboard />} />
        <Route path='/user/password/resetPassword/:id' element={<ResetLoginPassword />} />
      </Routes>
    </>
  );
}

export default App;
