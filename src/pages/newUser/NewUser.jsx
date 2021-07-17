import "./newUser.css";

export default function NewUser() {
  return (
    <div className="newUser">
      <h1 className="newUserTitle">Tạo người dùng mới</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Tên tài khoản</label>
          <input type="text" />
        </div>
        <div className="newUserItem">
          <label>Họ và tên</label>
          <input type="text"/>
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" placeholder="abc@gmail.com" />
        </div>
        <div className="newUserItem">
          <label>Mật khẩu</label>
          <input type="password" />
        </div>
        <div className="newUserItem">
          <label>Số điện thoại</label>
          <input type="text"/>
        </div>
        <div className="newUserItem">
          <label>Địa chỉ</label>
          <input type="text" />
        </div>
        <div className="newUserItem">
          <label>Giới tính</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="nam" value="nam" />
            <label for="nam">Nam</label>
            <input type="radio" name="gender" id="nữ" value="nữ" />
            <label for="nữ">Nữ</label>
            <input type="radio" name="gender" id="khác" value="khác" />
            <label for="khác">Khác</label>
          </div>
        </div>
        <div className="newUserItem">
          <label>Vai trò</label>
          <select className="newUserSelect" name="role" id="role">
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </div>
        <div className="newUserItem">
          <button className="newUserButton">Thêm người dùng</button>
        </div>
      </form>
    </div>
  );
}
