var express = require('express');
var bodyparser=require('body-parser');
var ejs=require('ejs');
var _ = require('lodash');

var app = express();
var home_content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus ex vel reprehenderit, atque sapiente qui facilis tenetur libero, explicabo saepe, ipsum eveniet blanditiis ipsa quod iusto at iste voluptatem quaerat?";

var posts=[];

app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

app.get("/",function(req,res){
    res.render('home',{hom:home_content,newListItems : posts});
});
app.get("/about",function(req,res){
    res.render('about',{hom:home_content});
});
app.get("/contact",function(req,res){
    res.render('contact',{hom:home_content});
});

app.get("/add",function(req,res){
    res.render('add');
});

//route parameter
app.get('/posts/:postId', function (req, res) {

    var requestpost=_.lowerCase(req.params.postId);

    posts.forEach(function(eachPost){

        var curPost = _.lowerCase(eachPost.post);
        if(curPost=== requestpost){
            var l=eachPost.post;
            var m=eachPost.post_des;
            res.render('blog',{abc:l,xyz:m});
        }
    });
});

app.post("/add",function(req,res){

    //storing the new entered post in the object and storing each post in a array 
    var item = req.body.postTitle;
    var item_des=req.body.postDescription;
    var new_post={
        post:item,
        post_des:item_des
    }
    posts.push(new_post);
    //after getting the post we have to redirect our page to the home
    res.redirect('/');
});

app.listen(400,function(){
console.log("Server is listening to 6000")
});
