require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const dataRoutes = require("./routes/dataRoutes");
const emoloyeeRoutes = require("./routes/employeeRoutes");
const zoneRoutes = require("./routes/zoneRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const incomeRoutes = require("./routes/incomeRoutes");

// express app
const app = express();

app.use(cors());

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/employees", emoloyeeRoutes);
app.use("/api/zones", zoneRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/incomes", incomeRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log("listening for requests on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
