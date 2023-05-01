// import logo from './logo.svg';
import './App.css';
import Control from './components/Control';
import Data from './components/Data';
import DataChart from './components/DataChart';
import Stage from './components/Stage';

function App() {
  return (
    <div className="container">
      <header>
        <span>Vườn thông minh</span>
      </header>
      <main>
        <div>
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link active" id="control-tab" data-bs-toggle="tab" data-bs-target="#control-tab-pane" type="button" role="tab" aria-controls="control-tab-pane" aria-selected="true">Điều khiển</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="data-tab" data-bs-toggle="tab" data-bs-target="#data-tab-pane" type="button" role="tab" aria-controls="data-tab-pane" aria-selected="false">Dữ liệu</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="chart-tab" data-bs-toggle="tab" data-bs-target="#chart-tab-pane" type="button" role="tab" aria-controls="chart-tab-pane" aria-selected="false">Đồ thị</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="stage-tab" data-bs-toggle="tab" data-bs-target="#stage-tab-pane" type="button" role="tab" aria-controls="stage-tab-pane" aria-selected="false">Giai đoạn</button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="control-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex={0}>
              <Control/>
            </div>
            <div className="tab-pane fade" id="data-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex={0}>
              <Data/>
            </div>
            <div className="tab-pane fade" id="chart-tab-pane" role="tabpanel" aria-labelledby="chart-tab" tabIndex={0}>
              <DataChart/>
            </div>
            <div className="tab-pane fade" id="stage-tab-pane" role="tabpanel" aria-labelledby="chart-tab" tabIndex={0}>
              <Stage />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
