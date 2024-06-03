import { Routes, Route } from 'react-router-dom'

import Signup from "./pages/Signup";
import Expenses from "./pages/Expenses";

function App() {
  return (
    <>
      <nav className="py-4 text-center text-white font-bold text-xl bg-blue-600">Expense Tracker</nav>
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/expense' element={<Expenses />} />
      </Routes>
    </>
  );
}

export default App;
