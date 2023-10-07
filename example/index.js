import {configDotenv} from "dotenv";
configDotenv(".env")
import {mongoDB} from "../database";

mongoDB().update('address_index',{"address_id" : 38820},{"address" : "38820"}).then(r=>{
    console.log(r)
}).catch(console.log)
