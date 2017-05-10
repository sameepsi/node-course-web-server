const express = require('express');
const fs= require('fs');

const port= process.env.PORT || 3000;
var app = express();
var hbs = require('hbs');

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');


app.use((req, res, next)=>{
  var date=new Date().toString();
  var log = `${date}: ${req.method}: ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+"\n", (err)=>{
    if(err){
      console.log("Unable to write log to the file server.log!!")
    }
  })
  next();
});

// app.use((req, res, next)=>{
//   res.render('maintenance.hbs', {
//       pageTitle:'Maintenance',
//       header:'Maintenance is underway',
//       welcomeMessage:'Sorry currently our website is under maintenance. We will be up soon !!'
//   });
// });

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
})

 app.get('/',(req, res)=>{
  //  res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs',{
    pageTitle:'Home Page',
    welcomeMessage : 'I welcome you to this page'
  })
 });
app.get('/about',(req,res)=>{
res.render('about.hbs',{
  pageTitle:'About Page'
});
  // res.send('Inside about');
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage:'Bad request!!'
  });
});
 app.listen(port, ()=>{
   console.log(`Server is up on port ${port}`);
 });
