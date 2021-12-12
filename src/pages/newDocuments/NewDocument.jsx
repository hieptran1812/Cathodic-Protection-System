import "./newDocument.css";
import axios from 'axios';
import {React, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const API = process.env.REACT_APP_API;

export default function NewDocument() {

  const [title, setTitle] = useState('');
  const [dateCreated, setDateCreated] = useState("");
  const [content, setContent] = useState('0');
  const [link, setLink] = useState("");
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title,
      dateCreated,
      content,
      link
    };
    axios.post(`${API}/api/newDocument`, data)
      .then(res => {
        if(res.status === 200){
          setOpen(true)
        }
      })
      .catch(error => console.log(error));
  }

  return (
    <div className="newProduct">
      <Topbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ width: "100%" }}>
          <div className={classes.root}>
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
                Thêm tài liệu thành công!
              </Alert>
            </Collapse>
          </div>
          <h1 className="addProductTitle">Thêm tài liệu mới</h1>
          <form className="addProductForm" onSubmit={handleSubmit}>
            <div className="addProductItem">
              <label>Tên tài liệu *</label>
              <input
                type="text"
                required="required"
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
              />
            </div>
            <div className="addProductItem">
              <label>Ngày thêm tài liệu *</label>
              <input
                type="date"
                required="required"
                onChange={(e) => setDateCreated(e.target.value)}
                autoFocus
              />
            </div>
            <div className="addProductItem">
              <label>Nội dung *</label>
              <input
                type="text"
                required="required"
                onChange={(e) => setContent(e.target.value)}
                autoFocus
              />
            </div>
            <div className="addProductItem">
              <label>Link tài liệu *</label>
              <input
                type="url"
                placeholder="Link dẫn tới tài liệu"
                required="required"
                onChange={(e) => setLink(e.target.value)}
                pattern="[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?"
                autoFocus
              />
            </div>
            <button className="addProductButton">Thêm mới tài liệu</button>
          </form>
        </div>
      </div>
    </div>
  );
}
