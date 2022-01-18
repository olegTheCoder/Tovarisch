const router = require('express').Router();
const { User, Incident, Comment, Radius } = require('../../db/models')
// const allowPost = require('../middleware/allowPost')
// const allowEditDelete = require('../middleware/allowEditDelete')

// Все происшествия пользователей на главной странице
router
  .route('/')
  .get(async (req, res) => {
    const allIncidents = await Incident.findAll({ raw: true })
    console.log('getAll');
    res.json(allIncidents);
  })

// Создание новой записи
router
  .route('/new')
  .post( async (req, res) => {    
    console.log(req.body.inc);                // allowPost       -middleware
    if (!req.files || Object.keys(req.files).length === 0) {
      try {
        let { title, description, category, address, coords } = req.body.inc
        coords = '{' + String(coords[0]) + ', ' + String(coords[1]) + '}'
        console.log(coords);
        const newInc = await Incident.create({ title, description, category, address, coords})
        return res.status(200).json(newInc);
      } catch (err) {
        res.sendStatus(500)
      }
    } else {
      const sampleFile = req.files.img
      const fileName = sampleFile.name.split(' ').join('')
      const fullname = `${new Date().getTime()}_${fileName}`
      const uploadPath = `${process.env.PWD}/public/uploads/`
      sampleFile.mv(`${uploadPath}/${fullname}`, async (err) => {
        if (err) { return res.status(500).send(err) }
        else {
          const { title, text, img } = req.body
          await Incident.create({ title, description, category, address, coords, userId: Date.now() , img: fullname })
          res.sendStatus(200)
        }
      })
    }

  })


//  удаление карточки

// router
//   .route('/:id/delete')
//   .delete(async (req, res) => {           // allowEditDelete       -middleware
//     try {
//       await Incident.destroy({ where: { id: req.params.id } });
//       res.sendStatus(200);
//     } catch (error) {
//       console.log(error);
//       res.sendStatus(500);
//     }
//   })



module.exports = router;
