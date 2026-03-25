import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Auth, Orders } from "./pages";
import Header from "./components/shared/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
