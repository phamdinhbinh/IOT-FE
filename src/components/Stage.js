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
              data?.map((item2, key)=> <DetailStage setChange2={setChange} setChange={item?.setChange} key={key} index={parseInt(key)} {...item2} />)
            }
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br />
    </React.Fragment>
  );
};

export default Stage;
