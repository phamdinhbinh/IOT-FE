import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
// import AddIcon from '@mui/icons-material/Add';
import NewMode from './NewMode';
import { Divider } from '@mui/material';
import moment from 'moment';
import add_stage from '../../api/add_stage';
import axios from 'axios';
import { API_URL } from '../../config';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewStage(props) {
  const [open, setOpen] = React.useState(false);
  // ngày giai đoạn
  const [value, setValue] = React.useState([
    dayjs(new Date()),
    dayjs(new Date()),
  ]);
  const [stage, setStage]= React.useState([])
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // const [listStage, setListStage]= React.useState([])

  // hàm render thay cho số

  function renderNameDevice(device) {
    if(device=== 1) {
      return "Bơm"
    }
    if(device=== 2) {
      return "Quạt"
    }
    if(device=== 3) {
      return "Đèn"
    }
  }

  function renderMode(mode) {
    if(mode=== 1) {
      return "Độ ẩm"
    }
    if(mode=== 2) {
      return "Nhiệt độ"
    }
    if(mode=== 3) {
      return "Ánh sáng"
    }
  }

  function renderUnit(mode) {
    if(mode=== 1) {
      return "%"
    }
    if(mode=== 2) {
      return "'C'"
    }
    if(mode=== 3) {
      return "Lux"
    }
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Thêm giai đoạn
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Thêm giai đoạn"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateRangePicker"]}>
                <DateRangePicker
                  disablePast={true}
                  className={"rangeo"}
                  value={value}
                  format={"DD/MM/YYYY"}
                  onChange={(value) => setValue(value)}
                  localeText={{ start: "Từ ngày", end: "Đến ngày" }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <br />
          {
            stage?.map((item, key)=> <div key={key}>
              <div>Chế độ: {renderMode(item?.mode)}</div>
              <div>Điều kiện: {item?.startPoint} - {item?.endPoint} {renderUnit(item?.mode)}</div>
              {renderNameDevice(item?.device) }
              <div>
                Thời gian từ: {item?.time?.timeStart} - {item?.time?.timeEnd}
              </div>
              <div>Trạng thái: {item?.state=== true ? "Bật" : "Tắt"}</div>
              <br />
              <Divider style={{color: "#000"}} />
              <br />
            </div>)
          }
          <div></div>
          {/* Thêm chế độ cho ngày của giai đoạn */} 
          {/* Bước 1 */}
          <NewMode stage={stage} setStage={setStage} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Đóng</Button>
          <Button onClick={async ()=> {
            // const diffInDays= moment(value?.[1]?.format("DD/MM/YYYY"), "DD/MM/YYYY").diff(moment(value?.[0]?.format("DD/MM/YYYY"), "DD/MM/YYYY"), "days")
            props?.setListStage((prev)=> ([...prev, {startDate: value?.[0]?.format("DD/MM/YYYY"), endDate: value?.[1]?.format("DD/MM/YYYY"), stage: stage}]))
            const result1= await add_stage(value?.[0]?.format("DD/MM/YYYY"), value?.[1]?.format("DD/MM/YYYY"))
            
            
            // thêm chế độ cho giai đoạn đó
            if(result1?.add=== true) {
              Array.from(Array(moment(value?.[1]?.format("DD/MM/YYYY"), "DD/MM/YYYY").diff(moment(value?.[0]?.format("DD/MM/YYYY"), "DD/MM/YYYY"), "days") + 1).keys())?.map((item1, key1)=> 
                {
                  console.log('key', key1)
                  console.log('ngày', moment(value?.[1]?.format("DD/MM/YYYY"), "DD/MM/YYYY").subtract(parseInt(key1), "days").format("DD/MM/YYYY"))
                  const promises= stage?.map((item, key)=> axios.post(API_URL+ "/api/add-stage/item", {device: item?.device, mode: item?.mode, state: item?.state=== true ? 1 : 0, startPoint: item?.startPoint, endPoint: item?.endPoint, timeStart: item?.time?.timeStart, timeEnd: item?.time?.timeEnd, stage_id: result1?.stage_id, 
                    date: moment(value?.[1]?.format("DD/MM/YYYY"), "DD/MM/YYYY").subtract(parseInt(key1), "days").format("DD/MM/YYYY")}))
                Promise.all(promises)
                .then(responses => {
                  console.log(responses);
                })
                .catch(error => {
                  console.error(error);
                });
                return promises
                }
              )

            }
            setStage([])
            props?.setChange(prev=> !prev)
            handleClose()
            
          }}>Thêm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}