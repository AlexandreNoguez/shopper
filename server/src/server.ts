import dotenv from "dotenv";
dotenv.config();

import app from "./app";

const PORT = process.env.PORT || 8080;
// console.log(process.env);

app.listen(PORT, () => {
  console.info(`Server running on ${PORT}`);
});
