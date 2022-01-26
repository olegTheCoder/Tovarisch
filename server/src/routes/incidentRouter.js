const router = require("express").Router();
const { Incident } = require("../../db/models");
const authenticateJWT = require("../middleware/authenticateJWT");

router.route("/").get(async (req, res) => {
  try {
    const allIncidents = await Incident.findAll({ raw: true });
    res.json(allIncidents);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.route("/new").post(authenticateJWT, async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    try {
      let { title, description, category, address, coords } = req.body;
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
      console.log(err);
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
        return res.status(200).json(newInc);
      }
    });
  }
});

module.exports = router;
