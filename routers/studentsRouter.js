const express = require('express');
const Db = require('../dboperations');
const router = express.Router();
const { validate, createSchema } = require('../validators/createValidator');
const updateSchema = require('../validators/updateValidator');
const delSchema = require('../validators/delValidate');
const readSchema = require('../validators/readValidator')

router.get('/students', (req, res) => {
  Db.getStudents().then((data) => {
    res.json(data);
    console.log(data);
  })
});

router.get('/students/:id', (req, res) => {
  const sId = req.params.id;
  validate({ id: sId }, readSchema)
    .then(() => {
      Db.getStudent(sId).then((data) => {
        res.json(data[0]);
      })
    })
    .catch(err => {
      console.log('err', err)
      res.status(422).json(err)
    })
});

router.post('/students', (req, res) => {
  let student = req.body;
  validate(student, createSchema)
    .then(() => {
      Db.addStudent(student).then(data => {
        res.status(201).json(data);
      });
    })
    .catch(err => {
      console.log('err', err)
      res.status(422).json(err)
    })
});

router.patch('/students/:id', (req, res) => {
  const sId = req.params.id;
  let student = req.body;
  validate({ ...student, id: sId }, updateSchema)
    .then(() => {
      Db.updateStudent(sId, student).then(data => {
        res.status(201).json(data);
      })
    })
    .catch(err => {
      console.log('err', err)
      res.status(422).json(err)
    })
});

router.delete('/students/:id', (req, res) => {
  const sId = req.params.id;
  validate({ id: sId }, delSchema)
    .then(() => {
      Db.deleteStudent(sId).then(() => {
        res.status(202).send("Deleted")
      })
    })
    .catch(err => {
      console.log('err', err)
      res.status(422).json(err)
    })
})



module.exports = router





// class Students {


//   constructor(FirstLastName, Sex, Birth_date, Adress, Phone, Passport, Scratch_number, Receipt_date, Groups, Course, Cpecialty_code, Full_time) {
//     this.FirstLastName = FirstLastName;
//     this.Sex = Sex;
//     this.Birth_date = Birth_date;
//     this.Adress = Adress;
//     this.Phone = Phone;
//     this.Passport = Passport;
//     this.Scratch_number = Scratch_number;
//     this.Receipt_date = Receipt_date;
//     this.Groups = Groups;
//     this.Course = Course;
//     this.Cpecialty_code = Cpecialty_code;
//     this.Full_time = Full_time
//   }
// }

// module.exports = Students;