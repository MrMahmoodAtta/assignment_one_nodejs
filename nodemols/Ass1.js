// import http module
import http from "http";

// create array of objects
let employee = [
  { id: 1, name: "mahmood", salary: 2000.0 },
  { id: 2, name: "Ahmed", salary: 3000.0 },
  { id: 3, name: "Ali", salary: 4000.0 },
  { id: 4, name: "Samater", salary: 1000.0 },
  { id: 5, name: "Geelle", salary: 9000.0 },
];


// create server
const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  // get all employees
  if (req.url === "/employee" && req.method === "GET") {
    res.end(JSON.stringify(employee));
  }

  // add new employee (POST)
  else if (req.url === "/employee" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      let newEmployee = JSON.parse(body);
      employee.push(newEmployee);
      res.end(JSON.stringify({ message: "employee added", employee }));
    });
  }

  // update employee (PUT)
  else if (req.url.startsWith("/employee/") && req.method === "PUT") {
    const id = parseInt(req.url.split("/")[2]);
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const updateData = JSON.parse(body);
      employee = employee.map((s) =>
        s.id === id ? { ...s, ...updateData } : s
      );
      res.end(JSON.stringify({ message: "employee updated", employee }));
    });
  }

  // delete employee
  else if (req.url.startsWith("/employee/") && req.method === "DELETE") {
    const id = parseInt(req.url.split("/")[2]);
    employee = employee.filter((s) => s.id !== id);
    res.end(JSON.stringify({ message: "employee removed", employee }));
  }

  // home page
  else if (req.url === "/" && req.method === "GET") {
    res.setHeader("Content-Type", "text/plain");
    res.end("This is a home page");
  }

  // not found
  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Not found" }));
  }
});

// start server
server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
