import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./Stage.css";
import NewStage from "./Stage/NewStage";
// import moment from "moment";
// import DetailStage from "./Stage/DetailStage";
import get_stage from "../api/get_stage";
import axios from "axios";
import { API_URL } from "../config";
import DetailStage from "./Stage/DetailStage";
import DeleteIcon from '@mui/icons-material/Delete';
import delete_stage from "../api/delete_stage";
import { Button } from "@mui/material";
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
import {  DatePicker, TimePicker } from 'antd';
import add_stage_item from "../api/add_stage_item";
import moment from "moment";
import _ from "lodash"

// import edit_stage_item from "../../api/edit_stage_item";

const Stage = () => {
  const [listStage, setListStage] = React.useState([]);
  const [change, setChange]= React.useState(false)
  React.useEffect(() => {
    (async () => {
      const result = await get_stage();
      return setListStage(result);
    })();
  }, [change]);
  return (
    <div>
      <div className="form-input">
        <div className={"wrap-stage-parent"}>
          <NewStage setListStage={setListStage} listStage={listStage} setChange={setChange} />
          <br />
          <div className={"wrap-stage"}>
            {listStage?.map((item, key) => (
              <StageItem setChange={setChange} key={key} {...item} />
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

const StageItem = (item) => {
  const [data, setData]= React.useState([])
  const [change, setChange]= React.useState(false)

  React.useEffect(()=> {
    (async ()=> {
      const res= await axios({
        url: API_URL+ "/api/detail-stage",
        method: "get",
        params: {
          stage_id: item?.stage_id || "-"
        }
      })
      const result= await res.data
      return setData(result)
    })()
  }, [item?.stage_id, change])

  return (
    <React.Fragment>
      <Accordion>
        <AccordionSummary
          expandIcon={<div>
            <ExpandMoreIcon />
          </div>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
         <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: 'center'}}>
           <Typography>
            Giai đoạn (Từ ngày {item?.startDate} -{" "}
            {item?.endDate})
          </Typography>
          <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}><DeleteIcon onClick={async (e)=> {
            e.preventDefault()
            e.stopPropagation()
            const result= await delete_stage({stageId: item?.stage_id})
            if(result?.delete=== true) {
              setChange(prev=> !prev)
              item?.setChange(prev=> !prev)
            }

          }} /></div>
         </div>
          
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {
              _.orderBy(data, (e)=> moment(e.date).valueOf(), "asc")?.map((item2, key)=> <DetailStage setChange2={setChange} setChange={item?.setChange} key={key} index={parseInt(key)} {...item2} />)
            }
          </Typography>
        </AccordionDetails>
        <AddStageItem setChange2={setChange} stage_id={item?.stage_id} />
      </Accordion>
      <br />
    </React.Fragment>
  );
};

export default Stage;




const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AddStageItem(props) {
  const [date, setDate]= React.useState()
  const [stageItemId, setStageItemId]= React.useState("")
  const [device, setDevice] = React.useState("");
  const [mode, setMode] = React.useState("");
  const [startPoint, setStartPoint] = React.useState(20);
  const [endPoint, setEndPoint] = React.useState(37);
  const [timeStart, setTimeStart] = React.useState();
  const [timeEnd, setTimeEnd] = React.useState();
  const [state, setState] = React.useState(0);
  const [stageId, setStageId] = React.useState(props?.stage_id);
  const [open, setOpen] = React.useState(false)
  React.useEffect(()=> {
    setStageId(props?.stage_id)
  }, [props?.stage_id])
  const handleClick= () => {
    setOpen(true)
  }
  const handleClose= () => {
      setOpen(false)
    }
  return (
    <>
      <Button onClick={handleClick} color={"primary"} variant={"contained"} style={{width: "100%"}}>Thêm ngày</Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Thêm ngày"}</DialogTitle>
        <DialogContent>
          <DatePicker onChange={(date, dateString)=> {
            setDate(date?.format("DD/MM/YYYY"))
          }} />
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
          <Button onClick={()=> handleClose()}>Đóng</Button>
          <Button onClick={async ()=> { 
            const result= await add_stage_item(device, mode, startPoint, endPoint, state, timeStart, timeEnd, stageId, date)
            if(result?.add=== true) {
              handleClose()
              props?.setChange2(prev=> !prev)
            }
          }}>Tạo</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

// const ComponentEditDetailStage = (props) => {
//   return <div></div>;
// };
