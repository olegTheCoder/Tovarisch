const router = require("express").Router();

const { User, Incident, Comment, Radius } = require("../../db/models");

router
  .route("/")
  .get(async (req, res) => {
    let { id } = req.body;
    const personalZone = await Radius.findOne({
      where: {
        userId: id,
      },
    });
    console.log("getZone");
    res.json(personalZone);
  })
  .post(async (req, res) => {
    console.log(req.body);
  });

module.exports = router;
