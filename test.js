const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect("mongodb://localhost:27017/whatevoo");
};

// create collections (shapes)

const student = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    faveFoods: [{ type: String }],
    info: {
      school: {
        type: String
      },
      shoeSize: {
        type: Number
      }
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "school"
    }
  },
  { timestamps: true }
);

const school = new mongoose.Schema({
  name: String,
  openSince: Number,
  students: Number,
  isGreat: Boolean
});
// convert to a mongoose model that will turn it into a collection
// keep it lower case and singular, it will pluralize for you

const School = mongoose.model("school", school);
const Student = mongoose.model("student", student);

// connect to a database

// connect()
//   .then(async connection => {
//     const student = await Student.create({ firstName: "Tim" });
//     const found = await Student.find({ firstName: "tim" });
//     const foundById = await Student.findById("wreiwprie");
//     const updated = await Student.findByIdAndUpdate("sueorwe", {});
//     console.log(student);
//   })
//   .catch(e => console.error(e));

connect()
  .then(async connection => {
    const schoolConfig = {
      name: "mlk elementary",
      openSince: 2009,
      students: 1000,
      isGreat: true
    };

    const school2 = {
      name: "Larry Middle School",
      openSince: 1989,
      students: 600,
      isGreat: false
    };

    const schools = await School.create([schoolConfig, school2]);

    const match = await School.findOne({ students: { $gt: 600 } })
      .populate("school")
      .exec();

    // const school = await School.findOneAndUpdate(
    //   { name: "mlk elementary" },
    //   { name: "mlk elementary" },
    //   { upsert: true, new: true }
    // );
    const student = await Student.create({
      firstName: "Trisha",
      school: school._id
    });
    const student2 = await Student.create({
      firstName: "Fisha",
      school: school._id
    });

    // const match = await Student.findById(student.id)
    //   .populate("school")
    //   .exec();
    // console.log(match);
    // const match = await Student.findOne({ firstName: "Trisha" })
    // .populate("school")
    // .exec();
    console.log(match);
  })
  .catch(e => console.error(e));
// do inserts and queries
