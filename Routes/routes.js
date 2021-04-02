// load up our shiny new route for users
const userRoutes = require('./users');

const appRouter = (app, fs) => {
  // we've added in a default route here that handles empty routes
  // at the base API url
  app.get('/', (req, res) => {
    res.send('welcome to the development api-server');
  });

  app.get('/search', async (req, res) => {
    const { phraseSearch } = require('./search');
    const data = await phraseSearch(req.query.q);
    res.json(data);
  });

  app.get('/explicit_search/:field', async (req, res) => {
    const { phraseexplicitSearch } = require('./explicit_search');
    const data = await phraseexplicitSearch(req.params.field , req.query.q);
    res.json(data);
  });

  // run our user route module here to complete the wire up
  userRoutes(app, fs);
};

// this line is unchanged
module.exports = appRouter;