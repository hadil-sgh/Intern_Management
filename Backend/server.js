import express from 'express';
import sequelize from './connection/database.js'; 
import contractRoutes from './routes/contractRoutes.js';
import creditRoutes from './routes/creditRoutes.js';
import paymentDetailsRoutes from './routes/paymentDetailsRoutes.js'; 
import repaymentPlanRoutes from './routes/repaymentPlanRoutes.js'; 
import userRouter from './routes/userRoutes.js';
import performanceRoutes from './routes/performanceRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import ProjectRoutes from './routes/projectRoutes.js';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: 'http://localhost:4200', 
}));

app.use(express.json());

sequelize.sync({ alter: true }).then(() => {
  console.log('Database & tables synced!');
});

app.use('/contracts', contractRoutes);
app.use('/credits', creditRoutes);
app.use('/payment-details', paymentDetailsRoutes); 
app.use('/repaymentplans', repaymentPlanRoutes); 
app.use('/user', userRouter);
app.use('/performance', performanceRoutes); 
app.use('/task', taskRoutes);
app.use('/team', teamRoutes);
app.use('/event', eventRoutes);
app.use('/project', ProjectRoutes);


app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
