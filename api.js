const Db = require('./dboperations');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const studentRouter = require('./routers/studentsRouter');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(studentRouter);



const  port = process.env.PORT || 8090;
app.listen(port, () => {
    console.log('Student API is runnning at ' + port);
});




// app.use('/api', router);

// router.use((req, res, next) => {
//     Db.getStudents().then((data) => {
//         res.json(data)
//         console.log(data, 55555555);
//     });

    // console.log(bbb, 55555555);
    // console.log('middleware');
    // next();
//   });

//   app.get('/students', (req, res) => {
//     Db.getStudents().then((data) => {
//       res.json(data);
//       console.log(data);
//     })
//   });

//   app.get('/students/:id',(req, res) => {
//       const pId = req.params.id;
//     //   console.log(pId);
//     Db.getStudent(pId).then((data) => {
//       res.json(data[0]);
//     })
//   })

//   app.post('/students', (req, res) => {
//     let  student = req.body;
//     Db.addStudent(student).then(data  => {
//       res.status(201).json(data);
//     });
//   });