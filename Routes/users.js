const userRoutes = (app, fs) => {
  // variables
  const dataPath = "./Data/data_iit_all - Copy.json";

  // READ Faculty name
  app.get("/faculty-name", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        throw err;
      }

      var obj = JSON.parse(data);
      var x = { facultyname: []};
      for (i = 0; i < obj.length; i++) {
        x.facultyname.push({name: obj[i]["name"]});
      }
      res.send(x);
      // console.log(obj.length);
    });
  });

  
  // READ collage name
  app.get("/collage", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        throw err;
      }

      var obj = JSON.parse(data);
      var x = { college: []};
      for (i = 0; i < obj.length; i++) {
        if (x.college.includes(obj[i]["college"]) === false)
          x.college.push(obj[i]["college"]);
      }
      res.send(x);
      // console.log(obj.length);
    });
  });


  // READ department name
  app.get("/dept", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        throw err;
      }

      var obj = JSON.parse(data);
      var x = { dept: [] };
      for (i = 0; i < obj.length; i++) {
        if (x.dept.includes(obj[i]["dept"]) === false)
          x.dept.push(obj[i]["dept"]);
      }
      res.send(x);
      // console.log(obj.length);
    });
  });


  // READ  research areas
  app.get("/research-areas", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        throw err;
      }

      var obj = JSON.parse(data);
      var x = { research_areas: [] };
      for (i = 0; i < obj.length; i++) {

        if(obj[i]["research_areas"].constructor === Array){
          for(j=0;j<obj[i]["research_areas"].length;j++){
            x.research_areas.push(obj[i]["research_areas"][j]);
          }
        }
        else
          x.research_areas.push(obj[i]["research_areas"]);
      }
      res.send(x);
      // console.log(obj.length);
    });
  });

  // READ  all data of all collage
  app.get("/iits", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        throw err;
      }

      var obj = JSON.parse(data);
      var x = { faculty_name: [], college: [], dept: [], research_areas: [] };
      for (i = 0; i < obj.length; i++) {
        x.faculty_name.push(obj[i]["name"]);
        if (x.college.includes(obj[i]["college"]) === false)
          x.college.push(obj[i]["college"]);

        if (x.dept.includes(obj[i]["dept"]) === false)
          x.dept.push(obj[i]["dept"]);

        x.research_areas.push(obj[i]["research_areas"]);
      }
      res.send(x);
      // console.log(obj.length);
    });
  });

  // READ  all data with all attributes
  app.get("/iits-data", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        throw err;
      }

      var obj = JSON.parse(data);
      
      res.send(obj);
      // console.log(obj.length);
    });
  });
};

module.exports = userRoutes;
