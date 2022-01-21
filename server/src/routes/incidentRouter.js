const router = require("express").Router();
const { User, Incident, Comment, Radius } = require("../../db/models");
const authenticateJWT = require('../middleware/authenticateJWT')

// Все происшествия пользователей на главной странице
router.route("/").get(async (req, res) => {
  const allIncidents = await Incident.findAll({ raw: true });
  console.log("get");
  // console.log(allIncidents)
  res.json(allIncidents);
});

// Создание новой записи
router.route("/new").post(authenticateJWT, async(req, res) => {
  console.log(res.locals.user);
  if (!req.files || Object.keys(req.files).length === 0) {
    try {
      let { title, description, category, address, coords ,userId} = req.body;
      console.log(req.body);
      coords = "{" + String(coords) + "}";
      const newInc = await Incident.create({
        userId: res.locals.user.id,
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
        let { title, description, category, address, coords,userId } = req.body;
        coords = "{" + String(coords) + "}";
        const newInc = await Incident.create({
          userId: res.locals.user.id,
          title,
          description,
          category,
          address,
          coords,
          img: fullname,
        });
        console.log("newInc", newInc);
        return res.status(200).json(newInc);
      }
    });
  }
});

module.exports = router;
