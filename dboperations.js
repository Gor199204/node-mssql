const config = require('./dbConfig');
const sql = require('mssql/msnodesqlv8');

async function getStudents() {
  try {
    let pool = await sql.connect(config);
    let students = await pool.request().query("SELECT * from Students");
    return students.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}

async function getStudent(studentId) {
  try {
    let pool = await sql.connect(config);
    let students = await pool.request()
      .input('input_parameter', sql.BigInt, studentId)
      .query("SELECT * FROM Students WHERE Id = @input_parameter");
    return students.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}

async function addStudent(student) {
  try {
    let pool = await sql.connect(config);
    let insertStudent = await pool.request()
      .input('firstLastName', sql.NVarChar, student.firstLastName)
      .input('sex', sql.NVarChar, student.sex)
      .input('birth_date', sql.Date, student.birth_date)
      .input('parents', sql.NVarChar, student.parents)
      .input('address', sql.NVarChar, student.address)
      .input('phone', sql.NVarChar, student.phone)
      .input('passport', sql.NVarChar, student.passport)
      .input('scratch_number', sql.BigInt, student.scratch_number)
      .input('receipt_date', sql.Date, student.receipt_date)
      .input('groups', sql.NVarChar, student.groups)
      .input('course', sql.TinyInt, student.course)
      .input('specialty_code', sql.BigInt, student.specialty_code)
      .input('full_time', sql.Bit, student.full_time)
      .query('insert into students (FirstLastName,Sex,Birth_date,Parents,Address,Phone,Passport,Scratch_number,Receipt_date,Groups,Course,Specialty_code,Full_time) values (@firstLastName,@sex,@birth_date,@parents,@address,@phone,@passport,@scratch_number,@receipt_date,@groups,@course,@specialty_code,@full_time);');
    return insertStudent.recordsets;
  }
  catch (err) {
    console.log(err);
  }
}

async function updateStudent(sId, student) {
  let pool = await sql.connect(config);

  let updStudent = await pool.request().input('id', sql.NVarChar, sId);

  let queryString = 'UPDATE Students SET ';

  if (Object.keys(student).length === 0) return 'Update body is desert';

  for (let key in student) {
    queryString += `${key} = '${student[key]}', `;
  }

  queryString = queryString.slice(0, queryString.length - 2);

  queryString += ' WHERE Id= @id';

  updStudent.query(queryString);

  // .input('id', sql.NVarChar, sId)
  // .input('firstLastName', sql.NVarChar, student.firstLastName)
  // .input('sex', sql.NVarChar, student.sex)
  // .input('birth_date', sql.Date, student.birth_date)
  // .input('parents', sql.NVarChar, student.parents)
  // .input('address', sql.NVarChar, student.address)
  // .input('phone', sql.NVarChar, student.phone)
  // .input('passport', sql.NVarChar, student.passport)
  // .input('scratch_number', sql.BigInt, student.scratch_number)
  // .input('receipt_date', sql.Date, student.receipt_date)
  // .input('groups', sql.NVarChar, student.groups)
  // .input('course', sql.TinyInt, student.course)
  // .input('specialty_code', sql.BigInt, student.specialty_code)
  // .input('full_time', sql.Bit, student.full_time)
  // .query('UPDATE Students SET FirstLastName = @firstLastName, Sex = @sex, Birth_date = @birth_date, Parents = @parents, Address = @address, Phone = @phone, Passport = @passport, Scratch_number = @scratch_number, Receipt_date = @receipt_date, Groups = @groups, Course = @course, Specialty_code = @specialty_code, Full_time = @full_time WHERE Id= @id')
  return updStudent.recordsets
}

async function deleteStudent(sId) {
  let pool = await sql.connect(config);
  let delStudent = await pool.request()
    .input('id', sql.NVarChar, sId)
    .query('DELETE FROM Students WHERE Id = @id')
  return delStudent.recordsets
}



module.exports = {
  getStudents: getStudents,
  getStudent: getStudent,
  addStudent: addStudent,
  updateStudent: updateStudent,
  deleteStudent: deleteStudent
}

