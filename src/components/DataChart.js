import { useState, useRef } from 'react'
import './DataChart.css'
import { filterHistoryData } from './Networking';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const DataChart = () => {

    const optionsChart = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false,
                text: '',
            },
        },
        scales: {
            y: {
                suggestedMin: 0,
                suggestedMax: 100,
                ticks: {
                    stepSize: 10,
                }
            },
            x: {
                ticks: {
                    // callback: function (val, index) {
                    //     var newDate = new Date(this.getLabelForValue(val));
                    //     var hour = `00${newDate.getHours()}`.slice(-2);
                    //     var min = `00${newDate.getMinutes()}`.slice(-2);
                    //     return `${hour}:${min}`;
                    // },
                }
            }
        }
    };
    const xAxis = useRef(['11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']);

    const [dataChart, setDataChart] = useState({
        labels: xAxis.current,
        datasets: [
            {
                label: 'Độ ẩm không khí',
                data: [10, 12, 13, 14, 14, 14, 14],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                tension: 0.2,
                pointRadius: 0,
            },
            {
                label: 'Nhiệt độ môi trường',
                data: [11, 12, 13, 14, 15, 15, 15],
                borderColor: 'rgb(255, 204, 0)',
                backgroundColor: 'rgba(255, 204, 0, 0.5)',
                tension: 0.2,
                pointRadius: 0,
            },
            {
                label: 'Độ ẩm đất',
                data: [12, 11, 13, 16, 16, 16, 16],
                borderColor: 'rgb(153,50,204)',
                backgroundColor: 'rgba(153, 50, 204, 0.5)',
                tension: 0.2,
                pointRadius: 0,
            },
            {
                label: 'Cường độ ánh sáng',
                data: [12, 44, 77, 87, 16, 16, 16],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                tension: 0.2,
                pointRadius: 0,
            },
        ],
    });

    const [dateFrom, setDateFrom] = useState(null);
    const [timeFrom, setTimeFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);
    const [timeTo, setTimeTo] = useState(null);

    async function readHistoryData(from, to) {
        let res = await filterHistoryData(from, to, 'ASC');
        if (res) {
            let dataTemp = [];
            let dataHumi = [];
            let dataSoilMoisture = [];
            let dataLightSensor = [];
            let dataDateTime = [];
            res.forEach(element => {
                dataTemp.push(element.temp);
                dataHumi.push(element.humi);
                dataSoilMoisture.push(element.soil_moisture);
                dataLightSensor.push(element.light);
                dataDateTime.push(convertDateTime(element.date_time)); 
            });
            xAxis.current = dataDateTime;
            setDataChart({
                labels: xAxis.current,
                datasets: [
                    {
                        label: 'Độ ẩm không khí',
                        data: dataHumi,
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        tension: 0.2,
                        pointRadius: 0,
                    },
                    {
                        label: 'Nhiệt độ môi trường',
                        data: dataTemp,
                        borderColor: 'rgb(255, 204, 0)',
                        backgroundColor: 'rgba(255, 204, 0, 0.5)',
                        tension: 0.2,
                        pointRadius: 0,
                    },
                    {
                        label: 'Độ ẩm đất',
                        data: dataSoilMoisture,
                        borderColor: 'rgb(153,50,204)',
                        backgroundColor: 'rgba(153, 50, 204, 0.5)',
                        tension: 0.2,
                        pointRadius: 0,
                    },
                    {
                        label: 'Cường độ ánh sáng',
                        data: dataLightSensor,
                        borderColor: 'rgb(53, 162, 235)',
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        tension: 0.2,
                        pointRadius: 0,
                    },
                ],
            })
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

    function filterClick() {
        let dateFrom_ = new Date(dateFrom);
        let a = `${dateFrom_.getFullYear()}-${dateFrom_.getMonth() + 1}-${dateFrom_.getDate()}`;

        let dateTo_ = new Date(dateTo);
        let b = `${dateTo_.getFullYear()}-${dateTo_.getMonth() + 1}-${dateTo_.getDate()}`;

        readHistoryData(`${a} ${timeFrom}:00`, `${b} ${timeTo}:59`);
    }

    return (
        <div>
            <div className="form-input">
                <div className="input-group">
                    <span>Từ</span>
                    <input type="date" className="form-control" aria-describedby="button-addon2" onChange={(e) => setDateFrom(e.target.value)} />
                    <input type="time" className="form-control" aria-describedby="button-addon2" onChange={(e) => setTimeFrom(e.target.value)} />
                </div>
                <div className="input-group">
                    <span>Đến</span>
                    <input type="date" className="form-control" aria-describedby="button-addon2" onChange={(e) => setDateTo(e.target.value)} />
                    <input type="time" className="form-control" aria-describedby="button-addon2" onChange={(e) => setTimeTo(e.target.value)} />
                </div>
                <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={filterClick}>Tìm kiếm</button>
            </div>
            <Line
                options={optionsChart}
                data={dataChart}
            />
        </div>
    )
}

export default DataChart