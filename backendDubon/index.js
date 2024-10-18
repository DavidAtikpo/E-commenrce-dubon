import bodyParser from "body-parser";
import express from "express";
import dbConnect from "./config/dbConfig.js";
import orderRoutes from './routes/orderRoutes.js';
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import errorHandler from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";
import productRouter from "./routes/productRouter.js";
import morgan from "morgan";
import blogRoute from "./routes/blogRoute.js";
import prodcategoryRoute from "./routes/prodcategoryRoute.js";
import blogCatRoute from "./routes/blogCatRoute.js";
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import passport from './config/passport.js';
import session from 'express-session';
import promoCode from './routes/promoCode.js';
import bannerRoute from './routes/bannerRoute.js';
import http from 'http';
import EventRoute from './routes/EventRoute.js'
import ratingRoute from './routes/ratingRoute.js'
import AdminOrderRoute from './routes/AdminOrderRoute.js'
import PaymentRouter from './routes/PaymentRouter.js'
import MomoRoutes from './routes/MomoRoutes.js'
import websocketServer from './controllers/websocket.js'; // Import WebSocket server

// Initialize dotenv
dotenv.config();

// Initialize Express
const app = express();

// Determine the current file and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create HTTP server
const server = http.createServer(app);

// Connect to the database
dbConnect();

// Initialize WebSocket server
const wsServer = websocketServer(server); // Ensure you're passing the server instance correctly

// Middleware setup
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: ["http://localhost:3000","http://192.168.1.69:3000"],
  methods: ["POST", "GET", "DELETE", "PUT"],
  credentials: true
}));
app.use(cookieParser());

// Routes
app.use("/api/blog", blogRoute);
app.use("/api", prodcategoryRoute);
app.use("/api/blogcategory", blogCatRoute);
app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/promo", promoCode);
app.use("/api/banner", bannerRoute);
app.use('/api/orders', orderRoutes);
app.use("/api",EventRoute)
app.use("/api",ratingRoute)
app.use('/api',AdminOrderRoute)
app.use('/api',PaymentRouter)
app.use('/api',MomoRoutes)

// Serve static images
app.use('/uploads', express.static(join(__dirname, 'uploads')));

// Error handling middleware
app.use(errorHandler.notFound);
app.use(errorHandler.errorHandler);

// Home route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Start the server on the same port as WebSocket
const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0',() => {
  console.log(`Server is running at PORT ${PORT}`);
});

// WebSocket connection handling
// WebSocket connection handling
wsServer.on('connection', (ws) => {
  console.log('WebSocket client connected');

  ws.on('message', (message) => {
    console.log('Received message:', message);

    // Broadcast message to all connected clients
    wsServer.clients.forEach(client => {
      if (client !== ws && client.readyState === client.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });
});


console.log('WebSocket server is running');
