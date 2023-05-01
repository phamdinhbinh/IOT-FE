import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {  TimePicker } from 'antd';
import Switch from '@mui/material/Switch';
import { Typography } from '@mui/material';
// import dayjs from "dayjs";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import moment from 'moment';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TimeRange(props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  // thời gian bắt đầu và thời gian kết thúc
  const [startTime, setStartTime]= React.useState()
  const [endTime, setEndTime]= React.useState()
  // bật - tắt
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const onChange = (time) => {
    setValue(time)
    setStartTime(time[0].format("HH:mm:ss"))
    setEndTime(time[1].format("HH:mm:ss"))
    // console.log(time[0].format("HH:mm:ss"))
    // setValue(time);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const complete= ()=> {
    props?.setStage(prev=> ([...prev, {device: props?.device, endPoint: props?.endPoint, mode: props?.mode, startPoint: props?.startPoint, time: {timeStart: startTime, timeEnd: endTime}, state: checked}]))
  }
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Thêm thời gian
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Chọn thời gian"}</DialogTitle>
          <DialogContent>
              <TimePicker.RangePicker value={value} onChange={onChange} />
              <br />
              <br />
              <div className={"c-flex-center"} style={{justifyContent: "flex-start", gap: 10}}>
                  <Typography>Tắt</Typography>
                  <Switch
                      checked={checked}
                      onChange={handleChange}
                      inputProps={{ 'aria-label': 'controlled' }}

                  />
                  <Typography>Bật</Typography>
              </div>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Đóng</Button>
            <Button onClick={()=> {

              complete()
              props?.handleClose1()
              props?.handleClose()
              handleClose()
              setValue(null)
              props?.clearWhenComplete()
            }}>Tạo</Button>
          </DialogActions>
        </Dialog>
      </div>
    </LocalizationProvider>
  );
}