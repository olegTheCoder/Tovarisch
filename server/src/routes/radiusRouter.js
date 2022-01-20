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
  .put(authenticateJWT, async (req, res) => {
    //  добавление зоны радиуса

    // console.log('Айдишник пользователя', res.locals.user.id);

    // console.log("req.body POST radius", req.body);
    try {
      let { inputTitle, radiusMetr, currentPoint } = req.body;
      let coordsString = `{${String(currentPoint.coords[0])},${String(
        currentPoint.coords[1]
      )}}`;
      console.log('До создания');
      const newRad = await Radius.update({
        title: inputTitle,
        radius: radiusMetr,
        point: coordsString,
      }, { where: {
        userId: res.locals.user.id
      },
    });
    
      console.log(newRad);
      return res.status(200);
      console.log(newRad);
      // return res.json(newRad)
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });
  router.route("/:id")
  .get(authenticateJWT, async (req, res) => {
    const {id} = req.params
    try {
      const userRadius = await Radius.findOne({
        where: {
          userId: id,
        },
      });
      // console.log("OUR RADUIS", userRadius);
      res.json(userRadius)
    } catch (err) {
      console.log("djkdkdkdkdkd",err);
      res.sendStatus(500);
    }
  })

module.exports = router;
