// import app css file
import "./App.css";
// importing header component
import Header from "./components/header/header";
// import login component
import Login from "./pages/login/login";
// import router element
import {
  BrowserRouter as Router,
  Routes,
  Route,
  HashRouter,
} from "react-router-dom";
// import not found page
import NotFound from "./pages/not-found/notFound";
// import home component
import Home from "./pages/home/home";
// import mobile navbar
import Nav from "./components/navbar-mobile/nav";
import { useEffect, useState } from "react";
// import notifications component
import Notifications from "./pages/notifications/notifications";
// import Messages component
import Messages from "./pages/messages/messages";
// import User component
import User from "./pages/user/user";
// import post details component
import Details from "./pages/post-details/details";
// dark light mode switch

function App() {
  // set user login status
  const [user, setUser] = useState(false);
  // check if user is already loged in

  useEffect(() => {
    const login = localStorage.getItem("user-login");
    if (login) {
      setUser(true);
    }
  });

  return (
    <HashRouter>
      {user && <Header />}

      <div className="App">
        <Routes>
          <Route exact path="/" element={user ? <Home /> : <Login />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/profile" element={<User />} />
          <Route path="/posts/details/:any" element={<Details />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {user && <Nav />}
    </HashRouter>
  );
}

export default App;
