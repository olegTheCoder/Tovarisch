const router = require("express").Router();
const { User, Incident, Comment, Radius } = require("../../db/models");

router
  .route("/")
  .get(async (req, res) => {                 // поиск зоны радуиса по айди
    let { id } = req.body;
    const personalZone = await Radius.findOne({
      where: {
        userId: id,
      },
    });
    console.log("getZone");
    res.json(personalZone);
  })
  .post(async (req, res) => {                     //  добавление зоны радиуса
    console.log(req.body.rad.currentPoint.coords);
    try {
      let { inputTitle, radiusMetr, currentPoint} = req.body.rad
      let coords = '{' + String(currentPoint.coords[0]) + ', ' + String(currentPoint.coords[1]) + '}'
      const newRad = await Radius.create({ radius: radiusMetr, point: coords})
      // console.log(newRad);
      return res.status(200)
    } catch (err) {
      res.sendStatus(500)
    }
  });

module.exports = router;
