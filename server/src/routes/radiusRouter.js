const router = require("express").Router();
const { User, Incident, Comment, Radius } = require("../../db/models");
const authenticateJWT = require('../middleware/authenticateJWT')

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
  .post(authenticateJWT, async (req, res) => {                     //  добавление зоны радиуса
    console.log('req.body.rad', req.body)
    try {
      let { inputTitle, radiusMetr, currentPoint} = req.body
      // console.log('check',req.body);
      let coords = `{${String(currentPoint.cordsWhereWeAre[0])}, ${String(currentPoint.cordsWhereWeAre[1])}}`
      // console.log('coords', coords);
      // console.log('radiusMetr', radiusMetr);
      console.log('ID', res.locals.user);
      const newRad = await Radius.create({ radius: radiusMetr, point: coords, userId: res.locals.user.id})
      console.log(newRad);
      return res.status(200)
    } catch (err) {
      res.sendStatus(500)
    }
  });

module.exports = router;
