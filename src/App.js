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
import ResetPassword from "./pages/resetPaswword/resetPassword";

function App() {
  // set user login status
  const [authentificated, setAuthentificated] = useState(false);

  // Loader content charging state
  const [isLoading, setIsLoading] = useState(true);

  // set athentification to true to redirect user to home page
  useEffect(() => {
    const login = localStorage.getItem("user-login");
    // if token exist authentificate user and stop loader if is loged in
    if (login) {
      if (login === "true") {
        setAuthentificated(true);
        setIsLoading(false);
      } else {
        setAuthentificated(false);
        setIsLoading(false);
      }
    } else {
      // if no teken registred yet redirect user to login and stop loader
      setIsLoading(false);
    }
  });

  return !isLoading ? (
    <HashRouter>
      {authentificated && <Header />}

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
          <Route
            path="/login/reset-password"
            element={authentificated ? <User /> : <ResetPassword />}
          />
          <Route path="/posts/details/:any" element={<Details />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {authentificated && <Nav />}
    </HashRouter>
  ) : (
    <div class="app-loader">
      <div class="dot-spinner">
        <div class="dot-spinner__dot"></div>
        <div class="dot-spinner__dot"></div>
        <div class="dot-spinner__dot"></div>
        <div class="dot-spinner__dot"></div>
        <div class="dot-spinner__dot"></div>
        <div class="dot-spinner__dot"></div>
        <div class="dot-spinner__dot"></div>
        <div class="dot-spinner__dot"></div>
      </div>
    </div>
  );
}

export default App;
