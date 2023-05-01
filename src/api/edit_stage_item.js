import axios from "axios"
import { API_URL } from "../config"

const edit_stage_item= async (data)=> {
    const res= await axios({
        url: API_URL+ "/api/edit/stage-item",
        method: "patch",
        data: {
            ...data
        }
    })
    const result= await res.data
    return result
}

export default edit_stage_item