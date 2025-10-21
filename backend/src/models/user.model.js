const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    profileImageURL: {
      type: String,
      default: "https://anandshete-blogify.s3.ap-south-1.amazonaws.com/default/profile-pic.png",
    },
    authProvider: {
      type: String,
      required: true,
      enum: ["local", "google"],
      default: "local",
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = bcrypt.hashSync(this.password, salt);
  this.salt = salt;
  this.password = hashedPassword;
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("user", userSchema);
module.exports = User;
