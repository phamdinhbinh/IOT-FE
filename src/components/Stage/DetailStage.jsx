import { Divider } from '@mui/material'
// import moment from 'moment'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import EditDateStage from './EditDateStage';
import DeleteIcon from '@mui/icons-material/Delete';
import delete_stage_item from '../../api/delete_stage_item';

const DetailStage = (props) => {
  // console.log(props)
  const [stage, setStage]= useState([])

  useEffect(()=> {
    setStage(props?.stage)
  }, [props?.stage])
  const renderDevice= (device)=> {
    if(device=== 1) {
        return "Bơm"
    }
    else if(device=== 2) {
        return "Quạt"
    }
    else if(device=== 3) {
        return "Đèn"
    }
  }
  const renderMode= (mode)=> {
    if(mode=== 1) {
        return "Độ ẩm"
    }
    else if(mode=== 2) {
        return "Nhiệt độ"
    }
    else if(mode=== 3) {
        return "Ánh sáng"
    }
  }
  const renderUnitMode= (mode)=> {
    if(mode=== 1) {
        return "%"
    }
    else if(mode=== 2) {
        return "C"
    }
    else if(mode=== 3) {
        return "Lux"
    }
  }
  const renderDate= (date, index)=> {
    return date
  }
  const renderStatus= (status)=> {
    if(status=== 1) {
        return "Bật"
    }
    else if(status=== 0) {
        return "Tắt"
    }
  }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
        <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <div>Ngày {renderDate(props?.date, props?.index)}</div>
            <div style={{display: "flex", justifyContent: "center" , alignItems: "center"}}>
            <div title={"Xóa"} style={{display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer"}}>
                  <DeleteIcon onClick={async ()=> {
                    const result= await delete_stage_item({stageItemId: props?.stage_item_id})
                    if(result?.delete=== true) {
                      props?.setChange(prev=> !prev)
                      props?.setChange2(prev=> !prev)
                    }
                    props?.setChange(prev=> !prev)
                    props?.setChange2(prev=> !prev)
                  }} />
              </div>
              <div title={"Sửa"} style={{display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer"}}>
                  <EditIcon onClick={handleClickOpen} />
              </div>
            </div>
        </div>
        <br />
        <div>
                <div style={{width: "100%", borderBottom: "1px dashed #000"}}>
                </div>
                <div>
                    Thiết bị: <strong>{renderDevice(props?.device)}</strong>
                </div>
                <div>
                    Điều kiện: <strong>{renderMode(props?.mode)}</strong>
                </div>
                <div>Giới hạn: {props?.startPoint} - {props?.endPoint} {renderUnitMode(props?.mode)}</div>
                <div>Thời gian áp dụng: {props?.timeStart} - {props?.timeEnd}</div>
                <div>Trạng thái: {renderStatus(props?.state)}</div>
            </div>
        <br />
        <Divider  sx={{ bgcolor: "#e7e7e7" }} />
        <br />
        <EditDateStage setChange2={props?.setChange2} setChange={props?.setChange} open={open} handleClose={handleClose} stage={stage} date={renderDate(props?.startDate, props?.index) } {...props} />
    </div>
  )
}

export default DetailStage