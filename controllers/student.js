const Student = require("../models/student");

exports.getStudentById = (req, res, next, id) => {
  Student.findById(id).exec((err, student) => {
    if (err) {
      return res.status(400).json({
        error: "Student not Found in DB",
      });
    }
    req.student = student;
    next();
  });
};

// exports.getStudentByName = (req, res, next, name) => {
//   Student.findOne({ name: name }).exec((err, student) => {
//     if (err) {
//       return res.status(400).json({
//         error: "Student not Found in DB",
//       });
//     }
//     req.studentName = student;
//     next();
//   });
// };

exports.getStudent = (req, res) => {
  return res.json(req.student);
};

exports.getStudentDataByName = (req, res) => {
  const { name } = req.userData;
  Student.findOne({ name: name }).exec((err, student) => {
    if (err) {
      return res.status(400).json({
        error: "Student not Found in DB",
      });
    }
    return res.json(student);
  });
};

exports.createStudent = (req, res) => {
  const {
    name,
    gender,
    branch,
    day,
    month,
    year,
    street,
    city,
    state,
    country,
    postalCode,
    email,
    contactNumber,
    adhaarCard,
  } = req.body;
  if (
    !name ||
    !email ||
    !street ||
    !city ||
    !state ||
    !country ||
    !postalCode ||
    !gender ||
    !contactNumber ||
    !adhaarCard ||
    !branch ||
    !day ||
    !month ||
    !year
  ) {
    res.status(400).json({
      error: "All fields required",
    });
  }

  const student = new Student({
    name,
    email,
    address: { street, city, state, country, postalCode },
    gender,
    contactNumber,
    adhaarCard,
    branch,
    birthday: { day, month, year },
  });

  student
    .save()
    .then((result) => {
      res.json({ student: result });
    })
    .catch((err) => console.log(err));

  res.send(student);
};

exports.getAllStudents = (req, res) => {
  Student.find()
    .sort([["name", "asc"]])
    .exec((err, students) => {
      if (err) {
        return res.status(400).json({
          error: "No Student found from DB",
        });
      }
      res.json(students);
    });
};

exports.deleteStudent = (req, res) => {
  let student = req.student;
  student.remove((err, deletedStudent) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete Student",
      });
    }
    res.json({
      message: "Student Succesfull deleted",
      deletedStudent,
    });
  });
};

exports.updateStudent = (req, res) => {
  const student = req.student;

  student.name = req.body.name;
  student.gender = req.body.gender;
  student.birthday.day = req.body.day;
  student.birthday.month = req.body.month;
  student.birthday.year = req.body.year;
  student.address.street = req.body.street;
  student.address.city = req.body.city;
  student.address.state = req.body.state;
  student.address.country = req.body.country;
  student.address.postalCode = req.body.postalCode;
  student.email = req.body.email;
  student.contactNumber = req.body.contactNumber;
  student.adhaarCard = req.body.adhaarCard;

  student.save((err, updatedStudent) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to update Student",
      });
    }
    res.json(updatedStudent);
  });
};
