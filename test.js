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
    }
  },
  { timestamps: true }
);

// convert to a mongoose model that will turn it into a collection
// keep it lower case and singular, it will pluralize for you

const Student = mongoose.model("student", student);

// connect to a database

connect()
  .then(async connection => {
    const student = await Student.create({ firstName: "Tim" });
    const found = await Student.find({ firstName: "tim" });
    const foundById = await Student.findById("wreiwprie");
    const updated = await Student.findByIdAndUpdate("sueorwe", {});
    console.log(student);
  })
  .catch(e => console.error(e));

// do inserts and queries
