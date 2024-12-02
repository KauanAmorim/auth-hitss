import express from "express";
import UserRoutes from "./interfaces/routes/UserRoutes";
// import { errorMiddleware } from "./interfaces/middlewares/ErrorMiddleware";


const app = express();
app.use(express.json());
app.use(UserRoutes)
// app.use(errorMiddleware)
const PORT = 3000

app.listen(PORT, () => {
    console.log('listening on port ' + PORT)
});