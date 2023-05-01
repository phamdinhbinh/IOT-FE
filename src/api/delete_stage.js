import axios from "axios"
import { API_URL } from "../config"

const delete_stage= async (data)=>{ 
    const res= await axios({
        url: API_URL+ "/api/delete/stage",
        method: "delete",
        data:    {
            ...data
        }
    })
    const result= await res.data
    return result
}

export default delete_stage