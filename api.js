var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();
const sgMail = require("@sendgrid/mail");
const { Console } = require('console');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

var mongoose = require('mongoose');

const url = process.env.MONGODB_URI;
mongoose.connect(url);//process.env.MONGODB_URI;
mongoose.set('debug', true);
var User=require('./models/User');
const { Redirect } = require('react-router-dom');

passport.use(new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password'
  }, function(login, password, done) {
    User.findOne({Login: login}).then(function(user){
      console.log(user);
      if(!user || !user.validPassword(password)){
        return done(null, false, {errors: {'email or password': 'is invalid'}});
      }
  
      return done(null, user);
    }).catch(done);
  }));

exports.setApp = function (app ) {

app.post('/api/register/', async (req, res, next) =>
{
  // incoming: firstName, lastName, login, password
  // outgoing: error
  const { FirstName, LastName , Login , Password , Email} = req.body;
  console.log(FirstName,LastName);
  console.log(User.findOne({Login: Login}))
  var user = await User.findOne({Login: Login})
  if (user)
  {
      var ret = {id: -1, firstName: '', lastName: '', error: 'User already exists'}
      return res.status(200).json(ret);
    //return res.json("User already exists");
  }
  
    
  var user = await User.findOne({Email: Email})
  if (user)
  {
    var ret = {id: -1, firstName: '', lastName: '', error: 'Email already exists'}
    return res.status(200).json(ret);
    //return res.json("Email already exists");
  }


  var user = new User();
  user.Firstname=FirstName;
  user.Lastname=LastName;
  user.Login=Login;
  user.Email=Email;
  user.EmailVerified=false;
  console.log("lll",user);
  user.setPassword(Password);
  user.save().then(function(){
   // return res.json({user: user.toAuthJSON()});

   // EMAIL VERIFICATION SEND
   const msg = {
    from: "FoodGramDemoCOP4331@gmail.com",
    to: user.Email,
    subject: "Food gram - Verify your email",
    text: `
        Hello, thanks for registering with foodgram!
        Please click the following link to verify your account.
        http://foodgram-demo.herokuapp.com/api/verify-email?token=${user.Login}
    `,
                html: `
        Hello, thanks for registering with foodgram!
        Please click the following link to verify your account.
        http://foodgram-demo.herokuapp.com/api/verify-email?token=${user.Login}
    `
    };
    try
    {
        sgMail.send(msg);
        //req.flash('Success', 'Thanks for registering!');
        console.log('Email sent')
        //res.redirect('/');
        error = 'Email sent correctly';
        return res.json("Register successful! Please verify your email.");
    }catch(error)
    {
        console.log(error);
        req.flash('error', 'Something went wrong. Please contact us at foodgram@gmail.com')
    }
    //return res.json("Account creation successful");
  }).catch(next);
});


app.post('/api/forgotpassword/', async (req, res, next) =>
{
  var id = -1;
  const { Email } = req.body;
  console.log(Email);
  console.log(User.findOne({Email: Email}))
  var user = await User.findOne({Email: Email})
  if (!user)
  {
      var ret = {id: -1, firstName: '', lastName: '', error: 'Email does not exist!'}
      return res.status(200).json(ret);
  }

  // EMAIL VERIFICATION SEND
  const msg = {
  from: "FoodGramDemoCOP4331@gmail.com",
  to: user.Email,
  subject: "FoodGram - Follow link to reset password!",
  text: `
      Hello!
      Please click the following link to reset your password.
      https://foodgram-demo.herokuapp.com/reset-password?token=${user._id}
  `,
              html: `
              Hello!
      Please click the following link to reset your password.
      https://foodgram-demo.herokuapp.com/reset-password?token=${user._id}
  `
  };
  try
  {
      sgMail.send(msg);
      //req.flash('Success', 'Thanks for registering!');
      console.log('Email sent')
      //res.redirect('/');
      error = 'Email sent correctly';
      var ret = {id: 1, error: 'An email was sent to your inbox!'}
      return res.json(ret);
  }catch(error)
  {
      console.log(error);
      var ret = {id: -1, error: 'Something went wrong. Please contact us at foodgram@gmail.com'}
      return res.json(ret);
  }
});



app.get('/api/verify-email', async (req, res, next) =>
{
   try{
      var user = await User.findOne({Login: req.query.token})
      if (!user)
      {
          return res.json("User not found");
      }
      console.log(req.query.token);
      console.log("Saving user");

      User.findOneAndUpdate({Login: req.query.token}, {EmailVerified: true}, {upsert: true}, function(err, doc){
        return res.send('User verified!');
     });
   }
   catch(error){
       console.log(error);
   }
});

app.post('/api/login/', async (req, res, next) => 
{
  const { login, password } = req.body;
  console.log(login,password);
  if(!login){
    return res.status(422).json({errors: {Login: "can't be blank"}});
  }

  if(!password){
    return res.status(422).json({errors: {password: "can't be blank"}});
  }

  passport.authenticate('local', {session: false}, function(err, user, info){
    if(err){ return next(err); }
    console.log(user);
    if(user){
    //  user.token = user.generateJWT();
   //   return res.json({user: user.toAuthJSON()});
        var ret = {id: user.id, firstName: user.Firstname, lastName: user.Lastname, error: ''}
        if (!user.EmailVerified)
        {
          var ret = {id: -1, firstName: '', lastName: '', error: 'Please verify your email!'}
        }
        return res.status(200).json(ret);
    } else {
        var ret = {id: -1, firstName: '', lastName: '', error: 'User/Password combination incorrect'}
        return res.status(200).json(ret);
    }
  })(req, res, next);

});

app.post('/api/reset-password', async (req, res, next) => 
{
  const { new_password,confirm_password } = req.body;
  if(new_password!=confirm_password) return res.status(422).json({error: "password: the password you entered does not match"});


  try{
    // Check on if id is valid
    if(!mongoose.Types.ObjectId.isValid(req.query.token)) {
      var ret = {id: -1, error: "User not found"}
      return res.json(ret);
    }

    var user = await User.findOne({_id: req.query.token})
    if (!user)
    {
      var ret = {id: -1, error: "User not found"}
      return res.json(ret);
    }
    console.log(user.Login);

    // Creates a temp user to set hash and salt for new password
    var tempUser = new User();
    console.log(confirm_password);
    tempUser.setPassword(confirm_password);

    // Updates hash and salt from tempUser to the User
    User.findOneAndUpdate({_id: req.query.token}, {salt: tempUser.salt}, {upsert: true}, function(err, doc){
      console.log("Updated salt!")});
    User.findOneAndUpdate({_id: req.query.token}, {hash: tempUser.hash}, {upsert: true}, function(err, doc){
      console.log("Updated hash!")
      var ret = {id: 1, error: "pass is updated"};
      return res.status(200).json(ret);
   });
 }
 catch(error){
     console.log(error);
 }
});  

app.post('/api/edit-instructions', async (req, res, next) => 
{
  const { id, name, ingredients, instructions, category } = req.body;

  try{
    // Check on if id is valid
    if(!mongoose.Types.ObjectId.isValid(id)) {
      var ret = {id: -1, error: "Instructions not found"}
      return res.json(ret);
    }
    var curInstructions = await imgModel.findOne({_id: id})
    if (!curInstructions)
    {
        return res.json("Instructions not found");
    }
    
    imgModel.findOneAndUpdate({_id: id}, {name: name}, {upsert: true}, function(err, doc){
      console.log("Updated name!")});
    imgModel.findOneAndUpdate({_id: id}, {ingredients: ingredients}, {upsert: true}, function(err, doc){
      console.log("Updated ingredients!")});
    imgModel.findOneAndUpdate({_id: id}, {instructions: instructions}, {upsert: true}, function(err, doc){
      console.log("Updated instructions!")});
    imgModel.findOneAndUpdate({_id: id}, {category: category}, {upsert: true}, function(err, doc){
      console.log("Updated category!")
      var ret = {id: 1, error: "Instructions successfully update!"};
      return res.status(200).json(ret);
   });
 }
 catch(error){
     console.log(error);
 }
});  


  var multer = require('multer');
  var imgModel = require('./models/image');
  var storage = multer.diskStorage({
    filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname);
    }
  });
  const imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
      return cb(new Error('Only image files are accepted!'), false);
    }
    cb(null, true);
  };
  var upload = multer({ storage: storage, fileFilter: imageFilter });

  const cloudinary = require('cloudinary');
  cloudinary.config({
    cloud_name: 'dcptlkke6',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  app.post('/api/upload/', upload.single('file'), function (req, res, next) {

    //var name = req.file.filename;
    cloudinary.v2.uploader.upload(req.file.path, function (err, result) {
      if (err) {
        res.json(err.message);
      }
      console.log("11111", req.file, result);
      var obj = {
        imagePath: req.file.filename,
        // add image's public_id to image object
        // imageID: result.public_id,
        // imageName: name,
        name: req.body.name,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userId: req.body.userId,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        category: req.body.category,
        saves: 0
      }

      imgModel.create(obj, (err, item) => {
        if (err) {
          console.log(err);
          // res.status(500);
        }
        else {
          res.json({
            status: 'success',
            message: 'Image uploaded successfully'
          })
        }
      });
    });
  });

app.post('/api/save', async function(req, res, next) {

  const { postId, userId } = req.body;

   // Checks if id string is valid
   if(!mongoose.Types.ObjectId.isValid(postId)) {
    var ret = {id: -1, error: "Can't find post"}
    return res.json(ret);
  }

  try{
    var post = await imgModel.findById(postId);
    // Checks if instructions exists
    if (!post)
    {
      var ret = {id: -1, error: "Can't find instructions"}
      return res.json(ret);
    }
    else
    {
      //if it is your own post then nothing is done
      if (post.userId == userId)
      {
        var ret = {id: -1, error: "Own post"}
        return res.json(ret);
      }
      //if it is not your own post, then add to saved by and increase saved count
      //if it is not your own post, then check if post is being saved or unsaved
      else
      {
        imgModel.findOneAndUpdate(
          { _id: postId},
          { $push: { savedBy: userId },
             $inc: { saves: 1 } },
          //{ $inc: { saves: 1 } },
          { new: true },
          function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }
        });
        var ret = { id: 1, error: "Favorite success" }
        return res.json(ret);
      }
    }
  }
  catch(err){
    console.log(err);
  }
});


// Search api that returns matches on name, instructions, or category
// Takes in search string
// If search is blank, every instructions is returned
app.post('/api/search/', async function(req, res, next) {

  const { search } = req.body;

  imgModel.find({
    $or: [
      {
        "name": {'$regex': search, $options:'i'}
      },
      {
        "instructions": {'$regex': search, $options:'i'}
      }, 
      {
        "category": {'$regex': search, $options:'i'}
      }, 
      {
        "ingredients": {'$regex': search, $options:'i'}
      }
    ]
  }
  
  , function(err, result) {

    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });

  console.log(search);

});

// Returns saved instructions given a userID
app.post('/api/showBookmarks', async function(req, res, next) {

  const { userID } = req.body;

  imgModel.find({
    savedBy: userID
  }
  
  , function(err, result) {

    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });

});

// Shows users made recipe
app.post('/api/showMyRecipes', async function(req, res, next) {

  const { userID } = req.body;

  console.log(userID);

  imgModel.find({
    userId: userID
  }
  
  , function(err, result) {

    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });

});

app.post('/api/bookmark', async function(req, res, next) {

  const { userID, instructionsID } = req.body;

  // Check on if id is valid
  if(!mongoose.Types.ObjectId.isValid(userID)) {
    var ret = {id: -1, error: "Invalid user"}
    return res.json(ret);
  }
  if(!mongoose.Types.ObjectId.isValid(instructionsID)) {
    var ret = {id: -1, error: "Invalid instructions"}
    return res.json(ret);
  }

  var curUser = await User.findOne({_id: userID})
  if (!curUser)
  {
    var ret = {id: -1, error: "Invalid user"}
    return res.json(ret);
  }
  var curInstructions = await imgModel.findOne({_id: instructionsID})
  if (!curInstructions)
  {
    var ret = {id: -1, error: "Invalid instructions"}
    return res.json(ret);
  }

  if (curInstructions.savedBy.includes(userID))
  {
    var ret = {id: -1, error: "Instructions already saved!"}
    return res.json(ret);
  }

  
  imgModel.findOneAndUpdate({_id: instructionsID}, {$push: { savedBy: userID }}, {upsert: true}, function(){});

  curInstructions = await imgModel.findOne({_id: instructionsID})
  var saveCount = curInstructions.savedBy.length;
  console.log(saveCount);

  imgModel.findOneAndUpdate({_id: instructionsID}, {saves: saveCount}, {upsert: true}, function()
  {
    var ret = {id: 1, error: "Instructions saved!"}
    return res.json(ret);
  });
});

app.post('/api/unbookmark', async function(req, res, next) {

  const { userID, instructionsID } = req.body;

  // Check on if id is valid
  if(!mongoose.Types.ObjectId.isValid(userID)) {
    var ret = {id: -1, error: "Invalid user"}
    return res.json(ret);
  }
  if(!mongoose.Types.ObjectId.isValid(instructionsID)) {
    var ret = {id: -1, error: "Invalid instructions"}
    return res.json(ret);
  }

  var curUser = await User.findOne({_id: userID})
  if (!curUser)
  {
    var ret = {id: -1, error: "Invalid user"}
    return res.json(ret);
  }
  var curInstructions = await imgModel.findOne({_id: instructionsID})
  if (!curInstructions)
  {
    var ret = {id: -1, error: "Invalid instructions"}
    return res.json(ret);
  }

  if (!curInstructions.savedBy.includes(userID))
  {
    var ret = {id: -1, error: "Instructions not bookmarked!"}
    return res.json(ret);
  }

  imgModel.findOneAndUpdate({_id: instructionsID}, {$pull: { savedBy: userID }}, {upsert: true}, function(){});

  curInstructions = await imgModel.findOne({_id: instructionsID})
  var saveCount = curInstructions.savedBy.length;
  console.log(saveCount);

  imgModel.findOneAndUpdate({_id: instructionsID}, {saves: saveCount}, {upsert: true}, function()
  {
    var ret = {id: 1, error: "Instructions unbookmarked!"}
    return res.json(ret);
  });
});

// Search api that returns matches on name, instructions, or category
// Takes in search string
// If search is blank, every instructions is returned
app.post('/api/deleteInstructions/', async function(req, res, next) {

  const { postID, userID } = req.body;
  
  // Checks if id string is valid
  if(!mongoose.Types.ObjectId.isValid(postID)) {
    var ret = {id: -1, error: "Can't find instructions"}
    return res.json(ret);
  }

  try{

    var instructions = await imgModel.findById(postID);

    // Checks if instructions exists
    if (!instructions)
    {
      var ret = {id: -1, error: "Can't find instructions"}
      return res.json(ret);
    }

    else 
    {
      console.log(instructions.userId);

      // Deletes if instructions's user id matches taken in user id
      if (instructions.userId == userID)
      {
        imgModel.findById(postID).deleteOne().exec();
        var ret = {id: 1, error: 'Post deleted!'}
        return res.json(ret);
      }

      // Returns error if user ids do not match
      else
      {
        var ret = {id: -1, error: "You cannot delete this post!"}
        return res.json(ret);
      }
    }
  }
  catch(error){
      console.log(error);
  }
});
}
