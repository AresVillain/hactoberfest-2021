const router = require("express").Router();
const { response } = require("express");
let Student = require("../models/Student");

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const age = Number(req.body.age);
  const gender = req.body.gender;
  const address = req.body.address;

  const newStudent = new Student({
    name,
    age,
    gender,
    address,
  });

  newStudent
    .save()
    .then(() => {
      res.json("Student Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/").get((req, res) => {
  Student.find()
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/update/:id").put(async (req, res) => {
  let userId = req.params.id;
  const { name, age, gender, address } = req.body;

  const updateStudent = {
    name,
    age,
    gender,
    address,
  };

  const update = await Student.findByIdAndUpdate(userId, updateStudent)
    .then(() => {
      res.status(200).send({ status: "user update" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});

router.route("/delete/:id").delete(async (req, res) => {
  let userId = req.params.id;

  await Student.findByIdAndDelete(userId)
    .then(() => {
      res.status(200).send({ status: "user deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with deleting data", error: err.message });
    });
});

router.route("/get/:id").get(async (req, res) => {
  let userId = req.params.id;

  const user = await Student.findById(userId)
    .then((student) => {
      res.status(200).send({ status: "user fetched", student });
    })
    .catch(() => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get user", error: err.message });
    });
});

module.exports = router;
