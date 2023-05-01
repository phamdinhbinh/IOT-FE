import { useState, useEffect, useRef } from 'react';
import './Control.css';
// import mqtt from 'mqtt';

var options = {
    protocol: "ws",
    username: "",
    password: "",
    keepalive: 2000,
    clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
};

var host = "mqtt://broker.hivemq.com:8000/mqtt";

const Control = () => {

    const oldLightSettingValue = useRef(0);
    const oldSoilMoistureSettingValue = useRef(0);

    const isClient = useRef(false);
    const [client, setClient] = useState(null);
    const [stateMotor, setStateMotor] = useState('--');
    const [stateLight, setStateLight] = useState('--');
    const [stateMode, setStateMode] = useState('--');
    const [humi, setHumi] = useState('--');
    const [temp, setTemp] = useState('--');
    const [soilMoisture, setSoilMoisture] = useState('--');
    const [lightSensor, setLightSensor] = useState('--');
    const [lightSettingValue, setLightSettingValue] = useState(0);
    const [soilMoistureSettingValue, setSoilMoistureSettingValue] = useState(0);


    // const mqttConnect = (host, mqttOption) => {
    //     console.log('Connecting');
    //     setClient(mqtt.connect(host, mqttOption));
    // };

    // useEffect(() => {
    //     if (!client) {
    //         if (!isClient.current) {
    //             console.log('Connect...');
    //             mqttConnect(host, options);
    //         }
    //         isClient.current = true;
    //     }
    // }, []);

    // useEffect(() => {
    //     if (client) {
    //         client.on('connect', () => {
    //             client.subscribe('esp8266-master/pub');
    //             console.log('Connected');
    //         });
    //         client.on('error', (err) => {
    //             console.error('Connection error: ', err);
    //             client.end();
    //         });
    //         client.on('reconnect', () => {
    //             console.log('Reconnecting');
    //         });
    //         client.on('message', (topic, message) => {
    //             const payload = { topic, message: message.toString() };
    //             onMessage(payload);
    //         });
    //     }
    // }, [client]);

    function publishMessage(topic, message) {
        if (client) {
            client.publish(topic, message, 1, error => {
                if (error) {
                    console.log('Publish error: ', error);
                }
            });
        }
    }

    function buttonClick(value) {
        publishMessage('esp8266-master/sub', value);
    }

    function onMessage(payload) {
        if (payload.topic === 'esp8266-master/pub') {
            let messageJson = JSON.parse(payload.message);
            console.log(messageJson)
            if (messageJson) {
                if (messageJson.relay_1 === 1) {
                    setStateMotor('Đang ON');
                }
                else {
                    setStateMotor('Đang OFF');
                }

                if (messageJson.relay_2 === 1) {
                    setStateLight('Đang ON');
                }
                else {
                    setStateLight('Đang OFF');
                }

                if (messageJson.mode_control === 1) {
                    setStateMode('Auto');
                }
                else {
                    setStateMode('Manual');
                }
                if (messageJson.light_setting_value !== oldLightSettingValue.current) {
                    setLightSettingValue(messageJson.light_setting_value);
                    oldLightSettingValue.current = messageJson.light_setting_value;
                }
                if (messageJson.soil_moisture_setting_value !== oldSoilMoistureSettingValue.current) {
                    setSoilMoistureSettingValue(messageJson.soil_moisture_setting_value);
                    oldSoilMoistureSettingValue.current = messageJson.soil_moisture_setting_value;
                }
                setHumi(messageJson.humi);
                setTemp();
                setSoilMoisture(messageJson.soil_moisture);
                setLightSensor(messageJson.light);
            }
        }
    }

    return (
        <div className='control-tab'>
            <div className='control-tab-row'>
                <div className='cart'>
                    <span className='cart-title'>Độ ẩm không khí</span>
                    <span className='cart-value'>{humi}%</span>
                </div>

                <div className='cart'>
                    <span className='cart-title'>Nhiệt độ không khí</span>
                    <span className='cart-value'>{Math.round(temp, 2)}°C</span>
                </div>

                <div className='cart'>
                    <span className='cart-title'>Độ ẩm đất</span>
                    <span className='cart-value'>{soilMoisture}%</span>
                </div>

                <div className='cart'>
                    <span className='cart-title'>Cường độ ánh sáng</span>
                    <span className='cart-value'>{lightSensor}Lux</span>
                </div>
            </div>
            <div className='control-tab-row'>
                <div className='cart'>
                    <span className='cart-title'>Motor: {stateMotor}</span>
                    <div className='button-group'>
                        <button type="button" className="btn btn-secondary" onClick={() => { buttonClick('{"relay_1":1}') }}>ON</button>
                        <button type="button" className="btn btn-secondary" onClick={() => { buttonClick('{"relay_1":0}') }}>OFF</button>
                    </div>
                </div>

                <div className='cart'>
                    <span className='cart-title'>Đèn: {stateLight}</span>
                    <div className='button-group'>
                        <button type="button" className="btn btn-secondary" onClick={() => { buttonClick('{"relay_2":1}') }}>ON</button>
                        <button type="button" className="btn btn-secondary" onClick={() => { buttonClick('{"relay_2":0}') }}>OFF</button>
                    </div>
                </div>

                <div className='cart'>
                    <span className='cart-title'>Cài đặt CB độ ẩm đất</span>
                    <div className="button-group">
                        <input type="text" className="form-control" value={soilMoistureSettingValue} onChange={(e) => setSoilMoistureSettingValue(e.target.value)}></input>
                        <button className="btn btn-secondary" type="button" onClick={() => { buttonClick(`{"soil_moisture_setting_value":${soilMoistureSettingValue}}`) }} >SET</button>
                    </div>
                </div>

                <div className='cart'>
                    <span className='cart-title'>Cài đặt CB ánh sáng</span>
                    <div className="button-group">
                        <input type="text" className="form-control" value={lightSettingValue} onChange={(e) => setLightSettingValue(e.target.value)}></input>
                        <button className="btn btn-secondary" type="button" onClick={() => { buttonClick(`{"light_setting_value":${lightSettingValue}}`) }}>SET</button>
                    </div>
                </div>
            </div>
            <div className='control-tab-row'>
                <div className='cart'>
                    <span className='cart-title'>Mode: {stateMode}</span>
                    <div className='button-group'>
                        <button type="button" className="btn btn-secondary" onClick={() => { buttonClick('{"mode-control":0}') }}>Manual</button>
                        <button type="button" className="btn btn-secondary" onClick={() => { buttonClick('{"mode-control":1}') }}>Auto</button>
                    </div>
                </div>

                <div className='cart hide'>
                    {/* <span className='cart-title'>Đèn: {stateLight}</span>
                    <div className='button-group'>
                        <button type="button" className="btn btn-secondary" onClick={() => { buttonClick('{"relay_2":1}') }}>ON</button>
                        <button type="button" className="btn btn-secondary" onClick={() => { buttonClick('{"relay_2":0}') }}>OFF</button>
                    </div> */}
                </div>

                <div className='cart hide'>
                    {/* <span className='cart-title'>Cài đặt CB độ ẩm đất</span>
                    <div class="button-group">
                        <input type="text" className="form-control"></input>
                        <button className="btn btn-secondary" type="button" id="button-addon2">SET</button>
                    </div> */}
                </div>

                <div className='cart hide'>
                    {/* <span className='cart-title'>Cài đặt CB ánh sáng</span>
                    <div class="button-group">
                        <input type="text" className="form-control"></input>
                        <button className="btn btn-secondary" type="button" id="button-addon2">SET</button>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Control