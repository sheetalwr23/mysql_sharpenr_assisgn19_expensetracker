const express = require('express');
const bodyParser = require('body-parser');
const expenseRoutes = require('./routes/expenseRoutes');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Register expense routes
app.use('/expenses', expenseRoutes);

// Serve the expense form HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'expenseForm.html'));
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
