import { Routes, Route } from 'react-router-dom'

import Header from './components/Header';
import Signup from "./pages/Signup";
import Expenses from "./pages/Expenses";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/expense' element={<Expenses />} />
      </Routes>
    </>
  );
}

export default App;
