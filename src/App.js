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
import DocumentsList from "./pages/documents/documentsList";
import NewDocument from "./pages/newDocuments/NewDocument";
import SignInSide from "./pages/signInUp/signIn";
import LandingPage from "./pages/SaaSProductLandingPage";

function App() {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/login">
            <SignInSide />
          </Route>
          <Route
            path="/home"
            render={() => {
              if (localStorage.getItem("accessToken")) {
                return <Home />;
              } else {
                return <Redirect to="/" />;
              }
            }}
          ></Route>
          <Route
            path="/mapDevice"
            render={() => {
              if (localStorage.getItem("accessToken")) {
                return <MapDeviceDashboard />;
              } else {
                return <Redirect to="/" />;
              }
            }}
          ></Route>
          <Route
            path="/users"
            render={() => {
              if (localStorage.getItem("accessToken")) {
                if (localStorage.getItem("role") !== "viewer")
                  return <UserList />;
                else return <Home />;
              } else {
                return <Redirect to="/" />;
              }
            }}
          ></Route>
          <Route
            path="/user/:userId"
            render={(props) => {
              if (localStorage.getItem("accessToken")) {
                if (
                  localStorage.getItem("role") !== "viewer" ||
                  localStorage.getItem("idCurrentUser") ===
                    props.match.params.userId
                )
                  return <User />;
                else return <Home />;
              } else {
                return <Redirect to="/" />;
              }
            }}
          ></Route>
          <Route
            path="/newUser"
            render={() => {
              if (localStorage.getItem("accessToken")) {
                return <NewUser />;
              } else {
                return <Redirect to="/" />;
              }
            }}
          ></Route>
          <Route
            path="/rectifierTransformerList"
            render={() => {
              if (localStorage.getItem("accessToken")) {
                return <RectifierTransformerList />;
              } else {
                return <Redirect to="/" />;
              }
            }}
          ></Route>
          <Route
            path="/documentsList"
            render={() => {
              return <DocumentsList />;
            }}
          ></Route>
          <Route
            path="/newDocuments"
            render={() => {
              if (localStorage.getItem("accessToken")) {
                return <NewDocument />;
              } else {
                return <Redirect to="/" />;
              }
            }}
          ></Route>
          <Route
            path="/rectifierTransformer/:productId"
            render={() => {
              if (localStorage.getItem("accessToken")) {
                return <RectifierTransformer />;
              } else {
                return <Redirect to="/" />;
              }
            }}
          ></Route>
          <Route
            path="/testPostList"
            render={() => {
              if (localStorage.getItem("accessToken")) {
                return <TestPostList />;
              } else {
                return <Redirect to="/" />;
              }
            }}
          ></Route>
          <Route
            path="/testPost/:productId"
            render={() => {
              if (localStorage.getItem("accessToken")) {
                return <TestPost />;
              } else {
                return <Redirect to="/" />;
              }
            }}
          ></Route>
          <Route
            path="/newproduct"
            render={() => {
              if (localStorage.getItem("accessToken")) {
                return <NewProduct />;
              } else {
                return <Redirect to="/" />;
              }
            }}
          ></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
