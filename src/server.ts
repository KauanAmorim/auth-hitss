import express from "express";
import UserRoutes from "./interfaces/routes/UserRoutes";
// import { errorMiddleware } from "./interfaces/middlewares/ErrorMiddleware";


const app = express();
app.use(express.json());
app.use(UserRoutes)
// app.use(errorMiddleware)

app.listen(process.env.PORT, () => {
    console.log('listening on port ' + process.env.PORT)
});