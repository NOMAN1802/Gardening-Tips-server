import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";


main().catch(err => console.log(err));

async function main() {
 

  try {
    await mongoose.connect(config.db_url as string);
  } catch (error) {
    console.log(error)
  }
};


app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`)
  })


main()