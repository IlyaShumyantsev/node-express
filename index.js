const express = require('express');
const exphbs = require('express-handlebars');
const homeRoutes = require('./routes/home');
const cardRoutes = require('./routes/card');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const ordersRoutes = require('./routes/orders');
const path = require('path');
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(async (req, res, next) => {
  try {
    const user = await User.findById('6144abecb9471643d6e67294');
    req.user = user;
    next();
  } catch (e) {
    console.error(e);
  }
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);
app.use('/card', cardRoutes);
app.use('/orders', ordersRoutes);

async function start() {
  const PORT = process.env.PORT || 3000;
  const password = 'rOXS5EiLVnXxEGUC';
  const url = `mongodb+srv://ilya:${password}@cloud.gjaim.mongodb.net/shop`;

  try {
    await mongoose.connect(url, { useNewUrlParser: true });
    const candidate = await User.findOne();
    if (!candidate) {
      const user = new User({
        email: 'ilya@mail.ru',
        name: 'Ilya',
        cart: { items: [] },
      });
      await user.save();
    }
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
}

start();
