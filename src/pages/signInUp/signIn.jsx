import { React, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import "./style.css";

const API = process.env.REACT_APP_API;

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://imgur.com/wF2KLir.png)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUnSide() {
  const classes = useStyles();

  let history = useHistory();
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [open, setOpen] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username,
      password,
    };
    axios
      .post(`${API}/api/login`, data)
      .then((res) => {
        const info = res.data;
        // console.log(info);
        if (res.status === 200) {
          // console.log("Dang nhap thanh cong");
          localStorage.setItem("accessToken", true);
          localStorage.setItem("idCurrentUser", info["id"]);
          localStorage.setItem("role", info["role"]);
          history.replace("/home");
        } else if (res.status === 203) {
          setOpen(true);
          // console.log("Dang nhap khong thanh cong");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cathodic Protection System
          </Typography>
          <Collapse in={open}>
            <Alert
              severity="error"
              variant="filled"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              Tên đăng nhập hoặc mật khẩu sai!
            </Alert>
          </Collapse>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Tên đăng nhập"
              onChange={(e) => setUsername(e.target.value)}
              name="username"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mật khẩu"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Đăng nhập
            </Button>
            <div className="question">
              <a style={{ display: "inline"}} href="/forgot-password">
                Quên mật khẩu?
              </a>
              <p style={{ display: "inline" }}>Chưa có tài khoản? </p>
            </div>

            <Button
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              component={Link}
              to="/signUp"
            >
              Đăng ký
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
