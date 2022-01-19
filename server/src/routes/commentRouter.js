const router = require('express').Router();
const { Comment } = require('../../db/models')


// router
//   .route('/:id')
//   .get(async (req, res) => {
//     const allComments = await Comment.findAll({ raw: true })
//     console.log('getAll');
//     res.json(allIncidents);
//   })

// Создание новой записи
// router
//   .route('/new')
//   .post( async (req, res) => {    
//     console.log(req.body.inc);               
//     if (!req.files || Object.keys(req.files).length === 0) {
//       try {
//         let { title, description, category, address, coords } = req.body.inc
//         coords = '{' + String(coords[0]) + ', ' + String(coords[1]) + '}'
//         console.log(coords);
//         const newInc = await Incident.create({ title, description, category, address, coords})
//         return res.status(200).json(newInc);
//       } catch (err) {
//         res.sendStatus(500)
//       }
//     })

module.exports = router;
