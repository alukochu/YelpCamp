var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var flash = require("connect-flash");
var localStrategy = require("passport-local");
var methodOverride = require("method-override");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");
var seedDB = require("./seeds");

var campgroundRoutes = require("./routes/campgrounds");
var commentRoutes = require("./routes/comments")
var indexRoutes = require("./routes/index");

//mongoose.connect("mongodb://localhost:27017/yelp_camp_v12", {useNewUrlParser: true});
mongoose.connect("mongodb+srv://alukochu:Password123@cluster0-szvlm.mongodb.net/test?retryWrites=true", {useNewUrlParser: true});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB() SEED THE DATABASE;

// PASSPORT CONFIGURATION

app.use(require("express-session")({
    secret: "Whatever",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

// REQUIRING ROUTES
app.use("/campgrounds/:id/comments", commentRoutes);
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp server has started.");
});