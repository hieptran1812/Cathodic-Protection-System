import FirstChart from '../../components/chart/firstChart';
import SecondChart from '../../components/chart/secondChart';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import './home.css';
import { userData, pieChartData } from '../../dummyData';
import WidgetLg from '../../components/widgetLg/WidgetLg';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';

export default function Home() {
  return (
    <div className="home">
      <Topbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ width: '100%' }}>
          <FeaturedInfo />
          <FirstChart
            data={userData}
            title="Số thiết bị lỗi theo thời gian"
            grid
            dataKey="Thiết bị"
          />
          <div className="homeWidgets">
            <SecondChart
              data={pieChartData}
              title="Các loại lỗi thiết bị"
              dataKey="value"
            />
            <WidgetLg />
          </div>
        </div>
      </div>
    </div>
  );
}
