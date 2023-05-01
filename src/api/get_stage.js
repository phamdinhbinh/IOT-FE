import axios from "axios"
import { API_URL } from "../config"

const get_stage= async ()=> {
    const res= await axios({
        url: API_URL+ "/api/stage",
        method: "get",
    })
    const result= await res.data
    return result
}

export default get_stage