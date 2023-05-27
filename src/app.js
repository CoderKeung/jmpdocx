const Express = require('express');
const Core = require("./core")
const Path = require("path")

var app = Express();
 
app.use(Express.static(Path.join(__dirname, "static")))
app.use(Express.static(Path.join(__dirname, "../docx")))
app.set('views', Path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
   res.render('index', {title: "转换工具", buttonText: "获取文章" })
})

app.get('/deal', (req, res)=>{
  const Conversion = new Core.Conversion(req.query.url)
  Conversion.start().then(()=>{
    var data = {
      title: Conversion.ARTICLE.title,
      author: Conversion.ARTICLE.author,
      path: `/${Conversion.ARTICLE.title}.docx`
    }
    res.send(JSON.stringify(data))
  })
})

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})