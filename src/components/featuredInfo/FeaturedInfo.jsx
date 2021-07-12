import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

export default function FeaturedInfo() {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Số thiết bị lỗi</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">10</span>
          <span className="featuredMoneyRate">
            -11.4 <ArrowDownward  className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">So với tháng trước</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Đã sửa chữa</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">10</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">So với tháng trước</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Số địa điểm sửa chữa</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">9</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">So với tháng trước</span>
      </div>
    </div>
  );
}
