const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8000;
const path = require('path');

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  //serve static content
  app.use(express.static(path.join(__dirname, 'client/build')));
}

//routes
const authRoute = require('./routes/authRoute');
const dashboardRouter = require('./routes/dashboard');
app.use('/auth', authRoute);
app.use('/dashboard', dashboardRouter);

app.get('*', (req, res) =>
  res.sendFile(
    path.resolve(__dirname, 'client', 'build', 'index.html')
  )
);

app.listen(PORT, () => {
  // console.log(`Running on port ${PORT}`);
});
