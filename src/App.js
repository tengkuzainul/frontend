import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";

function app() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default app;
