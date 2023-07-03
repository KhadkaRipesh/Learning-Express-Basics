import express from "express";
import data from "./data/mock.json";

const app = express();
const PORT = 3000;

// using the public folder at the root of the project
app.use(express.static("public"));

// using images folder at the route images.
app.use("/images", express.static("images"));

// express.json and urlencoded
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (request, response) => {
  response.json(data);
});

// post urlencoded and json
app.post("/item", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.post("/create", (request, response) => {
  response.send("This is a post request at /create");
});

app.put("/edit", (request, response) => {
  response.send("This is a edit request at /edit");
});

app.delete("/delete", (request, response) => {
  response.send("This is a delere request at /delete");
});

// GET with routing parameter
app.get("/class/:id", (request, response) => {
  const studentID = Number(request.params.id);
  const student = data.filter((student) => student.id === studentID);
  response.send(student);
});

app.get(
  "/next",
  (req, res, next) => {
    console.log("The response will be sent by next function");
    next();
  },
  (req, res) => {
    res.send("Second call back");
  }
);

app.get("/redirect", (req, res) => {
  res.redirect("https://www.linkedin.com");
});

// Route chaining
app
  .route("/class")
  .get((req, res) => {
    // res.send("Retrive classs info.");
    throw new Error();
  })
  .post((req, res) => {
    res.send("Retrive classs info.");
  })
  .put((req, res) => {
    res.send("Retrive classs info.");
  })
  .delete((req, res) => {
    res.send("Retrive classs info.");
  });

// custom error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something is broken");
});

app.listen(PORT, () => {
  console.log(`Our server is running on Port ${PORT}`);
});
