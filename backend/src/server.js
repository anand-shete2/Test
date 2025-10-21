require("dotenv").config();
const express = require("express");
const cors = require("cors");
const baseRoute = require("./routes/base.routes");
const userRoute = require("./routes/user.routes");
const blogRoute = require("./routes/blog.routes");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { RedisStore } = require("connect-redis");
const { createClient } = require("redis");
const { cookieOptions, devCookieOpts, prodCookieOpts } = require("./utils/index.utils");

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const startServer = async () => {
  try {
    await connectDB();

    app.use(
      cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
      })
    );

    app.use(express.urlencoded({ limit: "10mb", extended: true }));
    app.use(express.json({ limit: "10mb" }));
    app.use(cookieParser());

    let redisClient = createClient();
    redisClient.connect().catch(console.error);
    let redisStore = new RedisStore({ client: redisClient, prefix: "blogify:", ttl: 86400 });

    // pass cookie options
    app.use(
      session({
        store: redisStore,
        secret: process.env.SESSION_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: process.env.NODE_ENV === "production" ? prodCookieOpts : devCookieOpts,
      })
    );

    app.get("/", async (req, res) => {
      return res.status(200).json({ message: "Blogify API Health check passed 🚀" });
    });

    app.use("/api/v1", baseRoute);
    app.use("/api/v1/user", userRoute);
    app.use("/api/v1/blog", blogRoute);
    app.listen(PORT, () => console.log(`🚀 Server started on http://localhost:${PORT}`));
  } catch (error) {
    console.log("Error starting server", error);
    process.exit(1);
  }
};

startServer();
