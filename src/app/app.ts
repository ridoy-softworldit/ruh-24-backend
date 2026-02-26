import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";
import router from "./routes";
const app: Application = express();

//parsers
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5000",
      "http://localhost:3000",
      "http://localhost:3001",
      "https://www.ruh24.com",
      "https://ruh24.com",
      "https://admin.ruh24.com",
      "https://www.admin.ruh24.com",
      "https://ruh24-customer-neon.vercel.app",
      "https://www.ruh24-customer-neon.vercel.app",
      "https://ruh24-admin.vercel.app",
      "https://ruh24-admin.vercel.app",
    ],
    credentials: true,
  })
);
// Prevent Vercel edge cache from caching CORS responses
app.use((req: Request, res: Response, next) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

//app routes
app.use("/api/v1", router);

//root route
app.get("/", (req: Request, res: Response) => {
  res.send("Ruh24 backend api server boosted on....🔥🔥🚀");
});

// //global error handler
app.use(globalErrorHandler);

// //not found route
app.use(notFound);

export default app;
