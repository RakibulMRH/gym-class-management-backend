import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { json } from 'body-parser';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './config/swagger.config';
import authRoutes from './routes/auth.route';
import classScheduleRoutes from './routes/class-schedule.route';
import traineeRoutes from './routes/trainee.route';
import trainerRoutes from './routes/trainer.route';

dotenv.config();

const app: Application = express();

// Enable CORS
app.use(cors({
    origin:  process.env.ORIGIN ,  // Allow requests from Angular frontend
    credentials: true,                // Allow credentials like cookies, headers
    methods: 'GET,POST,PUT,DELETE',   // Allowed HTTP methods
    allowedHeaders: 'Content-Type,Authorization'  // Allowed headers
  }));
  
  
app.use(json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/class-schedule', classScheduleRoutes);
app.use('/api/trainee', traineeRoutes);
app.use('/api/trainer', trainerRoutes);

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default app;