import "./App.css";
import Home from "./pages/home/Home";
import MapDeviceDashboard from "./pages/mapDevice/mapDeviceDashboard";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import RectifierTransformerList from "./pages/rectifierTransformerList/RectifierTransformerList";
import RectifierTransformer from "./pages/product/RectifierTransformer";
import TestPostList from "./pages/testPostList/TestPostList";
import TestPost from "./pages/product/TestPost";
import NewProduct from "./pages/newProduct/NewProduct";
import SignInSide from "./pages/signInUp/signIn";

function App() {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route exact path="/">
            <SignInSide />
          </Route>
          <Route
            path="/home"
            render={() => {
              return localStorage.getItem("accessToken") ? (
                <Home />
              ) : (
                <Redirect to="/" />
              );
            }}
          ></Route>
          <Route path="/mapDevice">
            <MapDeviceDashboard />
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/user/:userId">
            <User />
          </Route>
          <Route path="/newUser">
            <NewUser />
          </Route>
          <Route path="/rectifierTransformerList">
            <RectifierTransformerList />
          </Route>
          <Route path="/rectifierTransformer/:productId">
            <RectifierTransformer />
          </Route>
          <Route path="/testPostList">
            <TestPostList />
          </Route>
          <Route path="/testPost/:productId">
            <TestPost />
          </Route>
          <Route path="/newproduct">
            <NewProduct />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
