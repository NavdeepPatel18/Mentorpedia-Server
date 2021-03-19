const userRoutes = (app, fs) => {

  // variables
  const dataPath = './Data/data.json';

  // READ
  app.get('/users', (req, res) => {
      fs.readFile(dataPath, 'utf8', (err, data) => {
          if (err) {
              throw err;
          }

          var obj = JSON.parse(data);
          var x = [];
          for (i = 0; i < obj.length; i++) {
            x.push(obj[i]['name']);
          }
          res.send(x);
          // console.log(obj.length);
      });
  });
};

module.exports = userRoutes;