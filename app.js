require('dotenv').config();
const express = require('express');
const path = require('path');

const authRoutes = require('./routes/authRoutes.js');
const expenseRoutes = require('./routes/expenseRoutes.js');
const premiumRoutes = require('./routes/premiumRoutes.js');
const paymentRoutes = require('./routes/paymentRoutes.js');
const userRoutes = require('./routes/User.js'); // ✅ adjust if needed
const passwordRoutes = require('./routes/passwordRoutes.js');

const { sequelize } = require('./db/index.js');

const app = express();

// Static files (frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Frontend Views
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'signup.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'views', 'login.html')));
app.get('/expenses', (req, res) => res.sendFile(path.join(__dirname, 'views', 'expense.html')));
app.get('/premium', (req, res) => res.sendFile(path.join(__dirname, 'views', 'premium.html')));

// API routes
app.use('/api', authRoutes);
app.use('/api', expenseRoutes);
app.use('/api', premiumRoutes);
app.use('/api', paymentRoutes);
app.use('/api', userRoutes);
app.use('/password', passwordRoutes);

// DB & server start
sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ DB synced successfully');
    app.listen(3000, () => console.log(`✅ Server running at http://localhost:3000`));
  })
  .catch(err => console.error('❌ DB sync failed:', err));
