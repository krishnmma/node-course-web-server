const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/Views/Partials');
app.set('view engine','hbs');
app.use(express.static(__dirname+'/Public'));


app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = now+':'+req.method+','+req.url;
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err){
            console.log('unable to append the server.log');
        }
    });
    next();
});

app.use((req,res,next)=>{
res.render('maintenance.hbs');
});

hbs.registerHelper('getCurrentYear',()=>{
return new Date().getFullYear()
});

hbs.registerHelper('getUpperCase',(text)=>{
return text.toUpperCase();
});



    app.get('/home',(req,res)=>{
        res.render('home.hbs',{
            pageTitle:'Home Page',
            welcomeMessage:'Welcome to my new node website'
            //currentYear:new Date().getFullYear()
        });
    });
    
    


app.get('/about',(req,res)=>{
    //res.send('About Page');
    res.render('about.hbs',{
        pageTitle:'About Page'
        //currentYear:new Date().getFullYear()
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        
            errorMessage:'Bad Request'
        
    });
});

app.listen(3000,()=>{
    console.log('Server is up with 3000 port');
});