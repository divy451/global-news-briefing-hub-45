const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'Uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Serve static files from uploads
app.use('/uploads', express.static(uploadsDir));

// Serve ads.txt
app.get('/ads.txt', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send('google.com, pub-8618999712463527, DIRECT, f08c47fec0942fa0');
});

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only images (jpeg, jpg, png) are allowed'), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Custom middleware to handle multer errors
const handleUpload = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.error('Multer error:', err.message);
      return res.status(400).json({ error: `Upload error: ${err.message}` });
    } else if (err) {
      console.error('Upload error:', err.message);
      return res.status(400).json({ error: err.message });
    }
    next();
  });
};

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/news', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Check MongoDB connection status
const checkDbConnection = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    console.error('Database not connected, state:', mongoose.connection.readyState);
    return res.status(500).json({ error: 'Database connection error' });
  }
  next();
};

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
  author: String,
  image: String,
  excerpt: String,
  isBreaking: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);
const Article = mongoose.model('Article', articleSchema);

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

app.post('/api/auth/login', async (req, res) => {
  console.log('Login request:', req.body);
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    console.log('User found:', user ? user.username : 'No user found');
    if (!user) {
      console.log('No user found for username:', username);
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);
    if (!isMatch) {
      console.log('Password mismatch for username:', username);
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });
    console.log('Login successful:', username, 'Token:', token);
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/news', authenticateToken, handleUpload, async (req, res) => {
  console.log('POST /api/news - Body:', req.body, 'File:', req.file);
  try {
    const { title, content, category } = req.body;
    if (!title || !content || !category) {
      console.error('Missing required fields:', { title, content, category });
      return res.status(400).json({ error: 'Title, content, and category are required' });
    }
    const articleData = {
      title,
      content,
      category,
      author: req.body.author || undefined,
      excerpt: req.body.excerpt || undefined,
      isBreaking: req.body.isBreaking === 'true' || false,
      image: req.file ? `/uploads/${req.file.filename}` : undefined,
      date: new Date(),
    };
    console.log('Creating article with data:', articleData);
    const article = new Article(articleData);
    await article.save();
    console.log('Article created:', article._id);
    res.status(201).json(article);
  } catch (error) {
    console.error('Create article error:', error);
    res.status(500).json({ error: 'Failed to create article', details: error.message });
  }
});

app.get('/api/news', checkDbConnection, async (req, res) => {
  console.log('GET /api/news - Query:', req.query);
  try {
    const { category, isBreaking, limit } = req.query;
    const query = {};
    if (category) query.category = category;
    if (isBreaking !== undefined) query.isBreaking = isBreaking === 'true';
    console.log('Query:', query);
    let articlesQuery = Article.find(query);
    if (limit) articlesQuery = articlesQuery.limit(Number(limit));
    const articles = await articlesQuery;
    console.log('Articles fetched:', articles);
    res.json(articles);
  } catch (error) {
    console.error('Fetch articles error:', error);
    res.status(500).json({ error: 'Failed to fetch articles', details: error.message });
  }
});

app.get('/api/news/:id', checkDbConnection, async (req, res) => {
  console.log('Fetching article:', req.params.id);
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      console.log('Article not found:', req.params.id);
      return res.status(404).json({ error: 'Article not found' });
    }
    console.log('Article fetched:', article._id);
    res.json(article);
  } catch (error) {
    console.error('Fetch article error:', error);
    res.status(500).json({ error: 'Failed to fetch article', details: error.message });
  }
});

app.put('/api/news/:id', authenticateToken, handleUpload, async (req, res) => {
  console.log('PUT /api/news/:id - ID:', req.params.id, 'Body:', req.body, 'File:', req.file);
  try {
    const { title, content, category, author, excerpt, isBreaking } = req.body;
    const updateData = {
      title: title || undefined,
      content: content || undefined,
      category: category || undefined,
      author: author || undefined,
      excerpt: excerpt || undefined,
      isBreaking: isBreaking === 'true' || isBreaking === true || false,
      image: req.file ? `/uploads/${req.file.filename}` : req.body.image || undefined,
    };
    console.log('Updating article with data:', updateData);
    const article = await Article.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!article) {
      console.log('Article not found:', req.params.id);
      return res.status(404).json({ error: 'Article not found' });
    }
    console.log('Article updated:', article._id);
    res.json(article);
  } catch (error) {
    console.error('Update article error:', error);
    res.status(500).json({ error: 'Failed to update article', details: error.message });
  }
});

app.delete('/api/news/:id', authenticateToken, async (req, res) => {
  console.log('Deleting article:', req.params.id);
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      console.log('Article not found:', req.params.id);
      return res.status(404).json({ error: 'Article not found' });
    }
    console.log('Article deleted:', article._id);
    res.json({ message: 'Article deleted' });
  } catch (error) {
    console.error('Delete article error:', error);
    res.status(500).json({ error: 'Failed to delete article' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});