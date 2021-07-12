import "./widgetLg.css";

export default function WidgetLg() {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Thống kê lỗi tại các địa điểm</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Địa điểm</th>
          <th className="widgetLgTh">Số thiêt bị lỗi</th>
          <th className="widgetLgTh">Được giải quyết</th>
          <th className="widgetLgTh">Trạng thái</th>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <span className="widgetLgName">Hà Đông</span>
          </td>
          <td className="widgetLgDate">5</td>
          <td className="widgetLgAmount">5</td>
          <td className="widgetLgStatus">
            <Button type="Approved" />
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <span className="widgetLgName">Cầu Giấy</span>
          </td>
          <td className="widgetLgDate">6</td>
          <td className="widgetLgAmount">6</td>
          <td className="widgetLgStatus">
            <Button type="Declined" />
          </td>
        </tr>
      </table>
    </div>
  );
}
