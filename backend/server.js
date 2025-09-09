// start server
import app from "./src/app.js";
import connectDb from "./src/db/db.js";
import dotenv from "dotenv";

dotenv.config();

connectDb();

app.listen(3000, () => console.log(`Server started`));
