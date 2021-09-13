const Koa = require('koa');
const app = new Koa();


const PORT = process.env.PORT || 3001;

app.use(async ctx => {
    ctx.body = 'Hello World';
});
  
app.listen(3000);

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server XXXX!" });
  });
  