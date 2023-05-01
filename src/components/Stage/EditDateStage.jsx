import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
// import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import Switch from '@mui/material/Switch';
import { Typography } from "@mui/material";
import {  TimePicker } from 'antd';
import edit_stage_item from "../../api/edit_stage_item";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditDateStage(props) {
  const [stageItemId, setStageItemId]= React.useState(props?.stage_item_id)
  const [device, setDevice] = React.useState(props?.device);
  const [mode, setMode] = React.useState(props?.mode);
  const [startPoint, setStartPoint] = React.useState(props?.startPoint);
  const [endPoint, setEndPoint] = React.useState(props?.endPoint);
  const [timeStart, setTimeStart] = React.useState(props?.timeStart);
  const [timeEnd, setTimeEnd] = React.useState(props?.timeEnd);
  const [state, setState] = React.useState(props?.state);

  return (
    <div>
      <Dialog
        open={props?.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props?.handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Sửa ngày " + props?.date}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth style={{marginTop: 12}}>
            <InputLabel id="demo-simple-select-label">Thiết bị</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={device}
              label="Thiết bị"
              onChange={(e)=> setDevice(e.target.value)}
            >
              <MenuItem value={1}>Máy bơm</MenuItem>
              <MenuItem value={2}>Quạt</MenuItem>
              <MenuItem value={3}>Đèn</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth style={{marginTop: 12}}>
            <InputLabel id="demo-simple-select-label">Chế độ</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={mode}
              label="Chế độ"
              onChange={(e)=> setMode(e.target.value)}
            >
              <MenuItem value={1}>Độ ẩm</MenuItem>
              <MenuItem value={2}>Nhiệt độ</MenuItem>
              <MenuItem value={3}>Ánh sáng</MenuItem>
            </Select>
          </FormControl>
          <Slider
            getAriaLabel={() => "Humility range"}
            value={[startPoint, endPoint]}
            onChange={(e, value)=> {
              setStartPoint(value[0])
              setEndPoint(value[1])
            }}
            valueLabelDisplay="auto"
          />
          <div className={"c-flex-center"} style={{justifyContent: "flex-start", gap: 10}}>
          <Typography>Tắt</Typography>
          <Switch
              checked={state=== 1 ? true : false}
              onChange={(e)=> {
                if(e.target.checked) {
                  setState(1)
                }
                else {
                  setState(0)
                }
              }}
              inputProps={{ 'aria-label': 'controlled' }}

          />
          <Typography>Bật</Typography>
          </div>
          <TimePicker.RangePicker onChange={(time)=> {
            setTimeStart(time[0].format("HH:mm:ss"))
            setTimeEnd(time[1].format("HH:mm:ss"))
          }} />
        </DialogContent>



        <DialogActions>
          <Button onClick={()=> props?.handleClose()}>Đóng</Button>
          <Button onClick={async ()=> {
            const result= await edit_stage_item({device, mode, timeStart, timeEnd, state, stageItemId, startPoint, endPoint})
            if(result?.update=== true) {
              props?.setChange(prev=> !prev)
              props?.setChange2(prev=> !prev)
            }
            props?.handleClose()
          }}>Cập nhật</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// const ComponentEditDetailStage = (props) => {
//   return <div></div>;
// };
