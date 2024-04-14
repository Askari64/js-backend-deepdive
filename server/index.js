const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
  const log = `${Date.now()} : ${req.url} new Request Recieved \n`;
  fs.appendFile("./log.txt", log, (err, data) => {
    switch (req.url) {
      case "/":
        res.end("Home page");
        break;

      case "/contact":
        res.end("Contact Page");
        break;

      case "/about":
        res.end("About Page");
        break;

      default:
        res.end("404 not Found");
        break;
    }
  });

  console.log(req.headers);
});

myServer.listen(8000, () => {
  console.log("Server Started");
});
