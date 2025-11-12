import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import router from "./routes/AdminRoutes.js";

dotenv.config();
const app = express();

const port_server = process.env.PORT_SERVER;
const port_app = process.env.PORT_APP;

app.use(express.json());

app.use(cors({ credentials: true, origin: `http://localhost:${port_app}` }));

//Routes
app.use("/users", router);
// app.use('/training', TrainingRoutes)
// app.use('/diet', DietRoutes)

app.listen(port_server);
