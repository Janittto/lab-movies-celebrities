//  Add your code here
const { model, Schema } = require("mongoose");

const celebritySchema = new Schema(
  {
    name: String,
    occupation: String,
    catchPhrase: String,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Celebrity = model("Celebrity", celebritySchema);

module.exports = Celebrity;
