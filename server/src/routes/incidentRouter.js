const router = require("express").Router();
const { User, Incident, Comment, Radius } = require("../../db/models");

// Все происшествия пользователей на главной странице
router.route("/").get(async (req, res) => {
  const allIncidents = await Incident.findAll({ raw: true });
  console.log('get');
  res.json(allIncidents);
});

// Создание новой записи
router.route("/new").post(async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    try {
      let { title, description, category, address, coords } = req.body;
      coords = "{" +  String(coords) + "}";
      console.log(coords);
      const newInc = await Incident.create({
        title,
        description,
        category,
        address,
        coords,
      });
      return res.status(200).json(newInc);
    } catch (err) {
      res.sendStatus(500);
    }
  } else {
    const sampleFile = req.files.file;
    const fileName = sampleFile.name.split(" ").join("");
    const fullname = `${new Date().getTime()}_${fileName}`;
    const uploadPath = `${process.env.PWD}/public/uploads/`;
    sampleFile.mv(`${uploadPath}/${fullname}`, async (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      } else {
        let { title, description, category, address, coords } = req.body;
        console.log('coords',coords);
        coords = "{" +  String(coords) + "}";
        console.log('coords',coords);
        const newInc = await Incident.create({
          title,
          description,
          category,
          address,
          coords,
          img: fullname,
        });
        console.log('newInc',newInc);
        return res.status(200).json(newInc);
      }
    });
  }
});

module.exports = router;
