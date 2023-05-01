import { useState } from 'react'
import './Data.css'
import { filterHistoryData } from './Networking';

const Data = () => {
    const [listHistory, setListHistory] = useState(null);
    const [dateFrom, setDateFrom] = useState(null);
    const [timeFrom, setTimeFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);
    const [timeTo, setTimeTo] = useState(null);
    // let dateFrom = null;
    // let timeFrom = null;
    // let dateTo = null;
    // let timeTo = null;

    async function readHistoryData(from, to) {
        let res = await filterHistoryData(from, to, 'DESC');
        if (res) {
            setListHistory(res);
        }
    }

    function convertDateTime(value) {
        let date = new Date(value);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let hour = date.getHours();
        let min = date.getMinutes();
        let sec = date.getSeconds();
        day = `0${day}`.slice(-2);
        month = `0${month}`.slice(-2);
        hour = `0${hour}`.slice(-2);
        min = `0${min}`.slice(-2);
        sec = `0${sec}`.slice(-2);
        return `${day}/${month}/${year} ${hour}:${min}:${sec}`;
    }

    function filterClick(){
        let dateFrom_ = new Date(dateFrom);
        let a = `${dateFrom_.getFullYear()}-${dateFrom_.getMonth() +1}-${dateFrom_.getDate()}`;

        let dateTo_ = new Date(dateTo);
        let b = `${dateTo_.getFullYear()}-${dateTo_.getMonth() +1}-${dateTo_.getDate()}`;

        readHistoryData(`${a} ${timeFrom}:00`, `${b} ${timeTo}:59`);
    }


    return (
        <div>
            <div className="form-input">
                <div className="input-group">
                    <span>Từ</span>
                    <input type="date" className="form-control" aria-describedby="button-addon2" onChange={(e) => setDateFrom(e.target.value)}/>
                    <input type="time" className="form-control" aria-describedby="button-addon2" onChange={(e) => setTimeFrom(e.target.value)}/>
                </div>
                <div className="input-group">
                    <span>Đến</span>
                    <input type="date" className="form-control" aria-describedby="button-addon2" onChange={(e) => setDateTo(e.target.value)}/>
                    <input type="time" className="form-control" aria-describedby="button-addon2" onChange={(e) => setTimeTo(e.target.value)}/>
                </div>
                <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={filterClick}>Tìm kiếm</button>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Độ ẩm không khí</th>
                        <th scope="col">Nhiệt độ không khí</th>
                        <th scope="col">Độ ẩm đất</th>
                        <th scope="col">Cường độ sáng</th>
                        <th scope="col">Thời gian</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listHistory !== null ?
                            listHistory.map((item, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.temp}</td>
                                    <td>{item.humi}</td>
                                    <td>{item.soil_moisture}</td>
                                    <td>{item.light}</td>
                                    <td>{convertDateTime(item.date_time)}</td>
                                </tr>
                            ))
                            :
                            null
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Data