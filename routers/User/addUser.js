const User = require('../../models/User');

exports.routes = {
  name: "addUser",
  category: "User",
  path: "/api/adduser",
  parameter: ["name", "email"],
  example: {
    name: "John Doe",
    email: "john@example.com"
  },
  method: "post",
  execution: async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email
    });

    try {
      const newUser = await user.save();
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};
