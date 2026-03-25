import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Auth, Orders } from "./pages";
import Header from "./components/shared/Header";
import Tables from "./pages/Tables";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/tables" element={<Tables />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
