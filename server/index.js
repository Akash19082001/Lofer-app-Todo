const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/users.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const TodoModel = require('./models/Todo');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

app.use(cors({
	origin: ["https://lofer-app-todo.vercel.app"],
	methods: ["GET", "POST", "PUT","DELETE"],
	credentials: true
}));
app.use(express.json());
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

  app.post('/api/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const newPassword = await bcrypt.hash(password, 10);
      await User.create({ name, email, password: newPassword });
      res.json({ status: 'ok' });
    } catch (err) {
      console.error('Registration error:', err);
      res.status(400).json({ status: 'error', error: 'Duplicate email or invalid data' });
    }
  });

app.post('/api/login', async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return res.json({ status: 'error', error: 'Invalid login' });
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET
    );

    return res.json({ status: 'ok', user: token });
  } else {
    return res.json({ status: 'error', user: false });
  }
});

app.post('/add', async (req, res) => {
  try {
    const task = req.body.task;
    const result = await TodoModel.create({ task });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/get', async (req, res) => {
  try {
    const tasks = await TodoModel.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      id,
      { task },
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(updatedTodo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update todo' });
  }
});

app.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await TodoModel.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete todo' });
  }
});

const PORT = process.env.PORT || 1337;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Shutting down gracefully');
  server.close(() => {
    process.exit(0);
  });
});
