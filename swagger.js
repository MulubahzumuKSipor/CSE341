const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "User API",
    description: "User API documentation",
  },
  host: "localhost:3001",
  schemes: ["http"],
};

outputFile = "./swagger.json";
endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
