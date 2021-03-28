// load up our shiny new route for users
const userRoutes = require('./users');

const appRouter = (app, fs) => {
  // we've added in a default route here that handles empty routes
  // at the base API url
  app.get('/', (req, res) => {
    res.send('welcome to the development api-server');
  });

  app.get('/search/:index/:type', async (req, res) => {
    const { phraseSearch } = require('./search');
    const data = await phraseSearch(req.params.index, req.params.type, req.query.q);
    res.json(data.hits[0]._source.name);
  });

  // run our user route module here to complete the wire up
  userRoutes(app, fs);
};

// this line is unchanged
module.exports = appRouter;