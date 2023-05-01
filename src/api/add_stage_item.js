import axios from "axios"
import { API_URL } from "../config"

const add_stage_item= async (device, mode, startPoint, endPoint, state, timeStart, timeEnd, stage_id)=> {
    const res= await axios({
        url: API_URL+ "/api/add-stage/item",
        method: "post",
        data: {
            device, mode, startPoint, endPoint, state, timeStart, timeEnd, stage_id
        }
    })
    const result= await res.data
    return result
}

export default add_stage_item