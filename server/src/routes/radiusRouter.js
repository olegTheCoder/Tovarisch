const router = require("express").Router();
const { User, Incident, Comment, Radius } = require("../../db/models");
const authenticateJWT = require("../middleware/authenticateJWT");

router
  .route("/")
  .get(authenticateJWT, async (req, res) => {
    // поиск зоны радуиса по айди
    let id = res.locals.user.id;
    try {
      const personalZone = await Radius.findOne({
        where: {
          userId: id,
        },
      });
      console.log("personalZoneAfterBase", personalZone);
      return res.status(200).json(personalZone);
    } catch (err) {
      res.sendStatus(500);
    }
  })
  .post(authenticateJWT, async (req, res) => {
    //  добавление зоны радиуса
    console.log("req.body POST radius", req.body);
    try {
      let { inputTitle, radiusMetr, currentPoint } = req.body;
      let coords = `{${String(currentPoint.cordsWhereWeAre[0])}, ${String(
        currentPoint.cordsWhereWeAre[1]
      )}}`;
      const newRad = await Radius.create({
        radius: radiusMetr,
        point: coords,
        userId: res.locals.user.id,
      });
      return res.status(200);
    } catch (err) {
      res.sendStatus(500);
    }
  });

module.exports = router;
