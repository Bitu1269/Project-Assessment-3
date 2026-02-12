require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");
connectDB();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
});


/* arctifect.model.js this.Schema
artifect.controller.js 
*/