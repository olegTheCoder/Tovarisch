const router = require("express").Router();
const { Radius } = require("../../db/models");
const authenticateJWT = require("../middleware/authenticateJWT");

router
  .route("/")
  .get(authenticateJWT, async (req, res) => {
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
      console.log(err);
      res.sendStatus(500);
    }
  })
  .put(authenticateJWT, async (req, res) => {
    try {
      let { inputTitle, radiusMetr, currentPoint } = req.body;
      let coordsString = `{${String(currentPoint.coords[0])},${String(
        currentPoint.coords[1]
      )}}`;
      const newRad = await Radius.update(
        {
          title: inputTitle,
          radius: radiusMetr,
          point: coordsString,
        },
        {
          where: {
            userId: res.locals.user.id,
          },
        }
      );
      return res.status(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });
router.route("/:id").get(authenticateJWT, async (req, res) => {
  const { id } = req.params;
  try {
    const userRadius = await Radius.findOne({
      where: {
        userId: id,
      },
    });
    res.json(userRadius);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
