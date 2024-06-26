const Product = require('../../models/Product');

exports.routes = {
  name: "getAllProducts",
  category: "Products",
  path: "/api/getAllProducts",
  parameter: [],
  example: {},
  method: "get",
  execution: async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
