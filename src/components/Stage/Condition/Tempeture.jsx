import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function valuetext(value) {
  return `${value}%`;
}

export default function Tempeture(props) {
  const [value, setValue] = React.useState([20, 37]);
  const [device, setDevice] = React.useState("");
  const handleChange = (event, newValue) => {
    setValue(newValue);
    props?.setStartPoint(value[0])
    props?.setEndPoint(value[1])
  };
  const handleChangeDevice = (e) => {
    setDevice(e.target.value);
    props?.setDevice(e.target.value)
  };

  return (
    <Box sx={{ width: 300 }}>
      <br />
      <Slider
        getAriaLabel={() => "Tempeture range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
      <br />
      <div>Thêm thiết bị</div>
      <br />
      <Box sx={{ minWidth: 120 }}>
        <br />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Thiết bị</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={device}
            label="Device"
            onChange={handleChangeDevice}
          >
            <MenuItem value={1}>Bơm</MenuItem>
            <MenuItem value={2}>Quạt</MenuItem>
            <MenuItem value={3}>Đèn</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}
