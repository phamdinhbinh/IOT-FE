import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Humility from './Condition/Humility';
import TimeRange from './TimeRange/TimeRange';
import Tempeture from './Condition/Tempeture';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewConditionMode(props) {
  const [startPoint, setStartPoint]= React.useState(0)
  const [endPoint, setEndPoint]= React.useState(0)
  // bơm: 1
  // quạt: 2
  // đèn: 3
  const [device, setDevice]= React.useState("")

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const clearWhenComplete= ()=> {
    setDevice("")
    setStartPoint(0)
    setEndPoint(0)
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Thêm điều kiện
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Thêm điều kiện"}</DialogTitle>
        <DialogContent>
          {/* Bước 3 */}
          {/* Độ ẩm  */}
          {
            props?.mode=== 1 && "Độ ẩm"
          }
          <br />
          {
            props?.mode=== 1 && <Humility {...props} startPoint={startPoint} setStartPoint={setStartPoint} setEndPoint={setEndPoint} device={device} setDevice={setDevice} />
          }
          {/* Nhiệt độ */}
          {
            props?.mode=== 2 && "Nhiệt độ"
          }
          <br />
          {
            props?.mode=== 2 && <Tempeture {...props} startPoint={startPoint} setStartPoint={setStartPoint} setEndPoint={setEndPoint} device={device} setDevice={setDevice} />
          }
          {/* Ánh sáng */}
          {
            props?.mode=== 3 && "Ánh sáng"
          }
          <br />
          {
            props?.mode=== 3 && <Tempeture {...props} startPoint={startPoint} setStartPoint={setStartPoint} setEndPoint={setEndPoint} device={device} setDevice={setDevice} />
          }
        </DialogContent>
        <DialogActions>
          {/* Chọn thời gian kích hoạt thiết bị */}
          {/* Bước 4 */}
          <TimeRange clearWhenComplete={clearWhenComplete} handleClose1={props?.handleClose} handleClose={handleClose} {...props} startPoint={startPoint} endPoint={endPoint} device={device} {...props} />
          <Button onClick={handleClose}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}