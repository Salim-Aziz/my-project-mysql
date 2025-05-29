import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(express.json()); // To parse JSON request bodies
app.use(bodyParser.json()); // Parse JSON bodies

// CORS configuration
const corsOptions = {
  origin: "http://localhost:3000", // Allow requests from this origin (e.g., your frontend)
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

// Database connection
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "myproject",
});

const product = {
  name: "Tape",
  image: "../app-frontend/src/Images/p12.jpeg",
  price: 50,
  description:
    "Unleash your creativity with this set of vibrant washi tapes! Featuring a variety of colors and patterns, these tapes are perfect for adding a touch of personality to your planners, journals, and other craft projects. The tapes are easy to tear and reposition, making them perfect for any DIY project.",
};

con.query(
  "SELECT * FROM Product WHERE name = ?",
  [product.name],
  (err, results) => {
    if (err) {
      console.error("Error checking product:", err);
      con.end();
      return;
    }

    if (results.length > 0) {
      console.log("Product with this name already exists. Skipping insertion.");
      // con.end();
    } else {
      const sql =
        "INSERT INTO Product (name, image, price, description) VALUES (?, ?, ?, ?)";
      con.query(
        sql,
        [product.name, product.image, product.price, product.description],
        (err, result) => {
          if (err) {
            console.error("Error inserting data:", err);
          } else {
            console.log("Data inserted, ID:", result.insertId);
          }
          // con.end(); // Close connection
        }
      );
    }
  }
);

console.log("Database is Connected!");

// Apply CORS middleware
app.use(cors(corsOptions));

// Serve static files
app.use("/public", express.static("public"));

app.use("/uploads", express.static("uploads"));

// API to get the names
const api = "/api/v1/products";

// GET All Products
app.get(`${api}/all`, cors(corsOptions), async (req, res, next) => {
  try {
    const query = "SELECT * FROM product";
    let products;
    con.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching products:", err);
        // return res.status(500).json({ error: "Failed to fetch products" });
      }
      // console.log("these are all results", results);
      res.status(200).json(results);
      products = results;
      // res.status(200).json(results); // send fetched products
    });
    // const products = await Product.find({}); // Fetch all products -- replace it with mysql query -- get all products from prodcut table
    // console.log("These are all products", results);
    // Return the products as JSON
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// app.get(`${api}/all`, cors(corsOptions), (req, res) => {
//   const query = "SELECT * FROM Product";

//   con.query(query, (err, results) => {
//     if (err) {
//       console.error("Error fetching products:", err);
//       return res.status(500).json({ error: "Failed to fetch products" });
//     }
//     console.log("these are all products", results);
//     res.status(200).json(results); // send fetched products
//   });
// });

// GET Product by ID
// // app.get(`${api}/:id`, cors(corsOptions), async (req, res, next) => {
// //   try {
// //     const productId = req.params.id;

// //     // Validate productId before querying
// //     if (!productId || productId === "undefined") {
// //       return res.status(400).json({ error: "Invalid product ID" });
// //     }

// //     // Validate if productId is a valid ObjectId
// //     if (!mongoose.Types.ObjectId.isValid(productId)) {
// //       return res.status(400).json({ error: "Invalid product ID format" });
// //     }

//     // const product = await Product.findById(productId); Replace it with mysql query to select Product based on ID from product table;

//     if (!product) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     res.status(200).json(product);
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     res.status(500).json({ error: "Failed to fetch product" });
//   }
// });

app.get(`${api}/:id`, cors(corsOptions), (req, res) => {
  const productId = req.params.id;
  console.log("product based on id:", productId);

  const query = "SELECT * FROM product WHERE id = ?";

  con.query(query, [productId], (err, results) => {
    if (err) {
      console.error("Error fetching product:", err);
      return res.status(500).json({ error: "Failed to fetch product" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    console.log("This is product by id:", results);
    res.status(200).json(results); // Return single product
  });
});

app.get(api, (req, res, next) => {
  res.json(["Watch", "shoes", "shirt"]);
});

app.post(`${api}/api/v1/orders`, async (req, res) => {
  try {
    const { name, email, phone, address, items } = req.body;

    // Validate the incoming data
    if (!name || !email || !phone || !address || !items || items.length === 0) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const orderSql = `
    INSERT INTO Orders (name, email, phone, address)
    VALUES (?, ?, ?, ?)
  `;

    con.query(orderSql, [name, email, phone, address], (err, result) => {
      if (err) {
        console.error("Error inserting order:", err);
        return res.status(500).json({ message: "Order creation failed" });
      }

      const orderId = result.insertId;

      // Insert order items
      const itemSql = `
      INSERT INTO OrderItems (order_id, product_id, quantity, price)
      VALUES ?
    `;

      const itemValues = items.map((item) => [
        orderId,
        item._id,
        item.quantity || 1,
        item.price,
      ]);

      con.query(itemSql, [itemValues], (err2) => {
        if (err2) {
          console.error("Error inserting order items:", err2);
          return res
            .status(500)
            .json({ message: "Order items creation failed" });
        }

        // ✅ Send complete order response
        const newOrder = {
          id: orderId,
          name,
          email,
          phone,
          address,
          createdAt: new Date(),
          items: items.map((item) => ({
            productId: item._id,
            quantity: item.quantity || 1,
            price: item.price,
          })),
        };

        console.log("Order Created Successfully", newOrder);
        res
          .status(200)
          .json({ message: "Order placed successfully", newOrder });
      });
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({ message: "Error creating order", error: error.message });
  }
});

// Order POST API
// app.post(`${api}/api/v1/orders`, async (req, res) => {
//   try {
//     const { name, email, phone, address, items } = req.body;

//     // Validate the incoming data
//     if (!name || !email || !phone || !address || !items || items.length === 0) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const newOrder = new Order({
//       name,
//       email,
//       phone,
//       address,
//       items: items.map((item) => ({
//         productId: item._id, // Ensure this matches your frontend data structure
//         quantity: item.quantity || 1,
//         price: item.price,
//       })),
//     });

//     await newOrder.save();
//     res.status(201).json(newOrder);
//   } catch (error) {
//     console.error("Error creating order:", error);
//     res
//       .status(500)
//       .json({ message: "Error creating order", error: error.message });
//   }
// });

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`server is runnig at port : ${PORT}`);
  console.log("new changes addded");
});
