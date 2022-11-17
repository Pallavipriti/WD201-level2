const http = require("http");
const fs = require("fs");
let args = require("minimist")(process.argv.slice(2), {
    alias: {
    p: "port"
    },
    default: {
    port: 5000,
    },
    });

let homeContent = "";
let projectContent = "";
let registrationContent = "";
let newjsContent = "";

fs.readFile("home.html", (err, home) => {
  if (err) {
    throw err;
  }
  homeContent = home;
});

fs.readFile("project.html", (err, project) => {
  if (err) {
    throw err;
  }
  projectContent = project;
});

fs.readFile("new.js", (err, newjs) => {
    if (err) {
      throw err;
    }
    newjsContent = newjs;
  });

  fs.readFile("registration.html", (err, registration) => {
    if (err) {
      throw err;
    }
    registrationContent = registration;
  });

http
  .createServer((request, response) => {
    let url = request.url;
    response.writeHeader(200, { "Content-Type": "text/html" });
    switch (url) {
      case "/project":
        response.write(projectContent);
        response.end();
        break;

      case "/new.js":
        response.write(newjsContent);
        response.end();
        break;

      case "/registration":
        response.write(registrationContent);
        response.end();
        break;

      default:
        response.write(homeContent);
        response.end();
        break;
    }
  })
  .listen(parseInt(args.port));