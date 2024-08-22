const express = require('express')

//config env
require("dotenv").config()

const app = express()
const port = process.env.PORT

//cofig cors
const corsOptions = {
  origin: 'http://localhost:3001', // Đặt origin cụ thể của frontend
  credentials: true, // Cho phép gửi cookie và thông tin xác thực
};
const cors = require('cors')
app.use(cors(corsOptions))


//use body-parser
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended:true})) // for form
app.use(bodyParser.json()) // for json

// config db
const database = require("./config/database")
database.connect();




//cookie
const cookieParser = require("cookie-parser")
app.use(cookieParser());


//connect routes
const routerApiVer1 = require("./api/v1/routes/index.route");
routerApiVer1(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})