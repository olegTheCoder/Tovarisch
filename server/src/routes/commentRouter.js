const router = require("express").Router();
const { Comment } = require("../../db/models");
const authenticateJWT = require("../middleware/authenticateJWT");

router
  .route("/:id")
  .get(authenticateJWT, async (req, res) => {
    try {
      const allCommentsForIncident = await Comment.findAll({
        raw: true,
        where: { incidentId: req.params.id },
      });
      console.log("allCommentsForIncident", allCommentsForIncident);
      return res.status(200).json(allCommentsForIncident);
    } catch (err) {
      res.sendStatus(500);
    }
  })
  .post(authenticateJWT, async (req, res) => {
    console.log("jwt user", res.locals.user);
    try {
      const {} = req.body;

      const newComment = await Comment.create({
        userId: res.locals.user.id,
        incidentId: req.params.id,
        text,
      });
      return res.status(200).json(newComment);
    } catch (err) {
      res.sendStatus(500);
    }
  });

module.exports = router;
