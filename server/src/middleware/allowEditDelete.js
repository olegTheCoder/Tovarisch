const allowEditDelete = (req, res, next) => {
  if (req.session.userId !== Number(req.body.userId)) {
    res.redirect('/');
  } else {
    next();
  }
};

module.exports = allowEditDelete
