import './App.css';
import 'rsuite/dist/rsuite.min.css';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from './components/routes/database/view';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <RoleProvider>
          <Routes>
            <Route path="/database" element={<MainLayout/>} />
          </Routes>
        </RoleProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
