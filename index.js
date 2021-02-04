//Importing all the modules we need
const express = require('express'); //Importing express
const app = express(); //running express
const path = require('path');//importing node path module
const { v4: uuid } = require('uuid');// uuid module for unique IDs
var methodOverride = require('method-override')// method-override to make patch/delete requests from HTML
app.use(methodOverride('_method'))

app.use(express.urlencoded({extended:true}));  //Telling our server to parse data sent by post request
// app.use(express.json()); //post data in json format

app.use(express.static(path.join(__dirname,'public')))

app.set('views', path.join(__dirname, 'views'))// setting our views directory for HTML templates
app.set('view engine', 'ejs'); //setting view engine to EJS(Embedded Java Script)



let Tweet = [{
    name: "Damin",
    tweetContent: "Thank you for beliving in me when nobody did,I wont ever forget what you did for me",
    id:uuid()
  },
  {
    name: 'Momin',
    tweetContent: 'I am trying o crack govt job exams that are comming up in the near future.I hope I am gonna get a good placement and make me some good money',
    id:uuid()
  },
  {
    name: 'Haseeb',
    tweetContent: "Here in banglore we dont need to worry about freezing temperature of Kashmir.It is all good and chill here.Just being cozy n shit at 20 Degrees",
    id:uuid()
  }
]

//Homepage
app.get('/', (req, res) => {
  res.render('home')
})

//Getting all tweets
app.get("/tweets",(req,res)=>{
  // console.log(Tweet)
  res.render('Tweets/index.ejs',{Tweet})
})

//Form to submit new tweet
app.get('/tweets/new',(req,res)=>{
  res.render('Tweets/new')
})

//to post new tweet
app.post('/tweets',(req,res)=>{
  const {username:name,tweetContent}=req.body;
  Tweet.push({name,tweetContent,id:uuid()})
  res.redirect('/tweets')
})

//to show particulat comment with details
app.get('/tweets/:id',(req,res)=>{
  let {id}=req.params;
  let particularTweet= Tweet.find(elm=> elm.id==id);
  res.render('Tweets/show',{...particularTweet})
})

//to delete comment
app.delete('/tweets/:id',(req,res)=>{
  const {id}=req.params;
  console.log('Delete request through')
  Tweet=Tweet.filter(x=>x.id!==id);
  res.redirect('/tweets')
})

// to get form to edit comment
app.get('/tweets/:id/edit',(req,res)=>{
  const {id}=req.params;
  console.log(id);
  let particularTweet= Tweet.find(elm=> elm.id==id);
  console.log(particularTweet)
  res.render('Tweets/edit',{...particularTweet})
})

//to actually edit comment
app.patch('/tweets/:id',(req,res)=>{
  const {id}=req.params;
  let newComment=req.body.comment;
  const data=Tweet.find(elm=> elm.id==id);
  data.tweetContent=newComment;
  res.redirect('/tweets')
})

//starting express server on port 8080
app.listen('8080', () => {
  console.log('Server Started On Port 8080 ')
})