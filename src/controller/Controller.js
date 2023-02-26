const userModel = require("../model/registerModel");

exports.Register = async (req, res) => {
  try {
    const user = new userModel(req.body);

    const token = await user.generateAuthToken();
    // console.log(">>>>>",token)

    await user.save();
    res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({ status: "failure", message: "Invalid REGISTER data" });
  }
};

exports.Login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const verifyUser = await userModel.findOne({ email });
    if (!verifyUser) {
      res.status(400).json({
        status: "failure",
        message: "Invalid Email Or Password",
      });
    }

    // const token = await verifyUser.generateAuthToken();
    // // console.log(">>>>>",token)

    res.status(200).json({
      status: "success",
      data: verifyUser,
    });

  } catch (error) {
    res.status(400).json({ status: "failure", message: "Invalid Login data" });
  }
};
