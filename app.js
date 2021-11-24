let exp = require("express");
let app = exp();
app.use(exp.static("public"));
app.listen(3000, () => console.log("Server is running..."));
