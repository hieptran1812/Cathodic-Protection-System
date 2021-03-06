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
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";

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

export default function ForgotPassword() {
  const classes = useStyles();

  let [username, setUsername] = useState("");
  let [name, setName] = useState("");
  let [organization, setOrganization] = useState("");
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  let [address, setAddress] = useState("");
  let [note, setNote] = useState("");
  let [open, setOpen] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username,
      name,
      organization,
      email,
      phone,
      address,
      note,
    };
    axios
      .post(`${API}/api/forgotpassword`, data)
      .then((res) => {
        const info = res.data;
        console.log(info);
        if (res.status === 200) {
          console.log("Gui quen mat khau");
          setOpen(true);
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
            ?????t l???i m???t kh???u
          </Typography>
          <Collapse in={open}>
            <Alert
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
              B??o c??o qu??n m???t kh???u th??nh c??ng! Ng?????i qu???n tr??? s??? th???c hi???n y??u
              c???u c???a b???n!
            </Alert>
          </Collapse>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="organization"
              label="T??n t??? ch???c"
              onChange={(e) => setOrganization(e.target.value)}
              name="organization"
              type="text"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="name"
              label="H??? v?? t??n"
              type="text"
              onChange={(e) => setName(e.target.value)}
              id="name"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="username"
              label="T??n ????ng nh???p"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="phone"
              label="S??? ??i???n tho???i"
              type="text"
              pattern="(84|0[3|5|7|8|9])+([0-9]{8})\b"
              onChange={(e) => setPhone(e.target.value)}
              id="phone"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="address"
              label="?????a ch???"
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              id="address"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="note"
              label="Ghi ch??"
              type="text"
              onChange={(e) => setNote(e.target.value)}
              id="note"
              autoFocus
            />
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              type="submit"
            >
              G???i y??u c???u
            </Button>
            <div className="question">
              <p style={{ display: "inline" }}>???? c?? t??i kho???n? </p>
            </div>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              component={Link}
              to="/login"
            >
              ????ng nh???p
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
