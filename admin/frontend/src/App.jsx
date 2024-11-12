import './App.css';
import 'rsuite/dist/rsuite.min.css';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from './components/routes/database/view';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/admin/database" element={<MainLayout/>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
