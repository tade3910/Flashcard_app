import express from "express";
import cors from "cors";
import card from "./routes/card.js";
import deck from "./routes/deck.js";

const app = express();
app.use(express.json());
app.use(cors());
const port = 3100;

app.use("/",card);
app.use("/",deck);

app.listen(port, ()=> {
    console.log(`Server Running on port ${port}`)
})