import "./newUser.css";

export default function NewUser() {
  return (
    <div className="newUser">
      <h1 className="newUserTitle">Tạo người dùng mới</h1>
      <form className="newUserForm" method="POST">
        <div className="newUserItem">
          <label>Tên tài khoản</label>
          <input name="username" type="text" required="required" autofocus/>
        </div>
        <div className="newUserItem">
          <label>Mật khẩu</label>
          <input type="password" required="required" />
        </div>
        <div className="newUserItem">
          <label>Họ và tên</label>
          <input name="name" type="text" required="required" autofocus/>
        </div>
        <div className="newUserItem">
          <label>Địa chỉ Email</label>
          <input name="email" type="email" placeholder="abc@gmail.com" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
        </div>
        <div className="newUserItem">
          <label>Số điện thoại</label>
          <input name="phone" type="text"/>
        </div>
        <div className="newUserItem">
          <label>Địa chỉ</label>
          <input name="address" type="text" />
        </div>
        <div className="newUserItem">
          <label>Giới tính</label>
          <div className="newUserGender">
            <input name="gender" type="radio" name="gender" id="nam" value="nam" />
            <label for="nam">Nam</label>
            <input name="gender" type="radio" name="gender" id="nữ" value="nữ" />
            <label for="nữ">Nữ</label>
            <input name="gender" type="radio" name="gender" id="khác" value="khác" />
            <label for="khác">Khác</label>
          </div>
        </div>
        <div className="newUserItem">
          <label>Vai trò</label>
          <select className="newUserSelect" id="role">
            <option name="role" value="user">Người dùng</option>
            <option name="role" value="admin">Admin</option>
          </select>
        </div>
        <div className="newUserItem">
          <button className="newUserButton">Thêm người dùng</button>
        </div>
      </form>
    </div>
  );
}
