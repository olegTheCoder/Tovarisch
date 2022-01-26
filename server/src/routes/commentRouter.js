const router = require("express").Router();
const { Comment, User } = require("../../db/models");
const authenticateJWT = require("../middleware/authenticateJWT");

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const allCommentsForIncident = await Comment.findAll({
        raw: true,
        where: { incidentId: req.params.id },
        include: { model: User, attributes: ["nickname"] },
      });
      let comments = allCommentsForIncident.map(
        ({ "User.nickname": nickname, id, text, userId, incidentId }) => ({
          nickname,
          id,
          text,
          userId,
          incidentId,
        })
      );
      res.status(200).json(comments);
    } catch (err) {
      res.sendStatus(500);
    }
  })
  .post(authenticateJWT, async (req, res) => {
    try {
      const { comment } = req.body;
      const newComment = await Comment.create({
        userId: res.locals.user.id,
        incidentId: req.params.id,
        text: comment,
      });
      return res.status(200).json(newComment);
    } catch (err) {
      res.sendStatus(500);
    }
  });

module.exports = router;
