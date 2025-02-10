import express from "express"
import dotenv from "dotenv";
import { configureCors } from "./config/corsConfig";
import { createBasiRateLimiter } from "./middlewares/rate-limiting";
import { addTimeStamp, requestLogger } from "./middlewares/customMiddleware";
import { globalErrorHandler } from "./middlewares/errorHandler";
import { urlVersioning } from "./middlewares/api-versioning";

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

// express json middleware
app.use(requestLogger)
app.use(addTimeStamp)

app.use(configureCors())
app.use(createBasiRateLimiter(50, 15*60*1000)) // 50 requests per 15 minutes
app.use(express.json())

app.use("api/v1", urlVersioning("v1"))

app.use(globalErrorHandler);


app.get("/", (req, res) => {
    res.send("Hello World")
})

app.get("*", (req, res) => {
    res.send("Route not found")
})

app.listen(port, () => {
    console.log(`Api gateway service is running on port ${port}`)
})