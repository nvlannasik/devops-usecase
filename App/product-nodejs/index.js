const AppServer = require("./bin/app/app_server");
const app = new AppServer();

app.start();
module.exports = app;
