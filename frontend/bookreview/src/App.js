import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Reviews from "./Pages/Reviews";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Reviews />}></Route>
        <Route path="/login" element={<Login />}></Route>
          
          
       
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);