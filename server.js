const app = required("./app");
const config = required("./app/config");

//start server
const PORT = config.app.port'
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
