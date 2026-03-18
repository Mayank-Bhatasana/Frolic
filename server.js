const express=require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const cors=require("cors");
const cookieParser=require("cookie-parser");

dotenv.config();
const app=express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URL || process.env.MONGO_URI;

// Github - github.com/V-vidit/Frolic

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const authRoutes=require("./routes/auth");
const userRoutes=require("./routes/user");
const instituteRoutes=require("./routes/institute");
const departmentRoutes=require("./routes/department");
const eventRoutes=require("./routes/event");
const groupRoutes=require("./routes/group");
const particpantRoutes=require("./routes/participant")
const eventWiseWinnerRoutes=require("./routes/eventWiseWinners");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/institute", instituteRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/participants", particpantRoutes);
app.use("/api/winners", eventWiseWinnerRoutes);

const startServer = async () => {
    if (!mongoUri) {
        console.error("Missing MongoDB connection string. Set MONGO_URL (or MONGO_URI) in .env");
        process.exit(1);
    }

    try {
        await mongoose.connect(mongoUri);
        console.log("DB Connected");
        app.listen(port, ()=>{
            console.log(`Server at port number ${port}`);
        });
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err.message);
        process.exit(1);
    }
};

startServer();
