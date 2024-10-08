import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Pages/Register"
import Login from "./Pages/Login";
import Review from "./Pages/Reviews";
import BookPage from "./Pages/BookPage";
import Profile from "./Components/Profile";
import AddNewBook from "./Pages/AddNewBook";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={< Review/>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route> 
       <Route path="/book/:id" element={<BookPage />}></Route>
       <Route path="/profile" element={<Profile />}></Route>
       <Route path="/addNewBook" element={<AddNewBook />}></Route>
       
       
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);