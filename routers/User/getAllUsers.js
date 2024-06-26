const User = require('../../models/User');

exports.routes = {
  name: "getAllUser",
  category: "User",
  path: "/api/getAllUser",
  parameter: [],
  example: {},
  method: "get",
  execution: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
