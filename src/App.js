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

function App() {
  // set user login status
  const [authentificated, setAuthentificated] = useState(false);
  const [user, setUser] = useState(false);
  // Loader content charging state
  const [isLoading, setIsLoading] = useState(true);

  // check if user is already loged in
  setInterval(() => {
    const login = localStorage.getItem("user-login");
    if (login) {
      setUser(true);
    }
  }, 1);

  // set athentification to true to redirect user to home page
  useEffect(() => {
    if (user) {
      setAuthentificated(true);
      setIsLoading(false);
    }
  });

  return !isLoading ? (
    <HashRouter>
      {user && <Header />}

      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={authentificated ? <Home /> : <Login />}
          />
          <Route
            path="/notifications"
            element={authentificated ? <Notifications /> : <Login />}
          />
          <Route
            path="/messages"
            element={authentificated ? <Messages /> : <Login />}
          />
          <Route
            path="/profile"
            element={authentificated ? <User /> : <Login />}
          />
          <Route path="/posts/details/:any" element={<Details />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {user && <Nav />}
    </HashRouter>
  ) : (
    <div class="loader">
      <div class="justify-content-center jimu-primary-loading"></div>
    </div>
  );
}

export default App;
