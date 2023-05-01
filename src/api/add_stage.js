import axios from "axios"
import { API_URL } from "../config"

const add_stage= async (startDate, endDate)=> {
    const res= await axios({
        url: API_URL+ "/api/add-stage",
        method: "post",
        data: {
            startDate, endDate
        }
    })
    const result= await res.data
    return result
}

export default add_stage