var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104491f9c87aa7e9b5b1_340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse imperdiet finibus diam et vehicula. Duis fermentum lectus fringilla pellentesque luctus. Nunc cursus gravida condimentum. Nunc in luctus orci, vel tincidunt dui. Sed in sem dui. Fusce eleifend sit amet lacus eget aliquet. Sed ultricies bibendum nibh, id venenatis augue tristique vel. Etiam pretium sodales tortor, vel accumsan neque fermentum lobortis. Proin vehicula vel nunc interdum sodales."
                    
    },
    {
        name: "Scintillating Skies",
        image: "https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104491f9c87aa7e9b5b1_340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse imperdiet finibus diam et vehicula. Duis fermentum lectus fringilla pellentesque luctus. Nunc cursus gravida condimentum. Nunc in luctus orci, vel tincidunt dui. Sed in sem dui. Fusce eleifend sit amet lacus eget aliquet. Sed ultricies bibendum nibh, id venenatis augue tristique vel. Etiam pretium sodales tortor, vel accumsan neque fermentum lobortis. Proin vehicula vel nunc interdum sodales."
    },   
    
    {
        name: "Fiery Fury",
        image: "https://pixabay.com/get/e83db7072ef6053ed1584d05fb1d4e97e07ee3d21cac104491f9c87aa7e9b5b1_340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse imperdiet finibus diam et vehicula. Duis fermentum lectus fringilla pellentesque luctus. Nunc cursus gravida condimentum. Nunc in luctus orci, vel tincidunt dui. Sed in sem dui. Fusce eleifend sit amet lacus eget aliquet. Sed ultricies bibendum nibh, id venenatis augue tristique vel. Etiam pretium sodales tortor, vel accumsan neque fermentum lobortis. Proin vehicula vel nunc interdum sodales."
    }    
];

function seedDB() {
    // REMOVE ALL CAMPGROUNDS
    Campground.remove({}, function(err) {
        if (err) {
            console.log(err);
        }
        console.log("removed campgrounds!");
        // ADD A FEW CAMPGROUNDS
        data.forEach(function(seed) {
            Campground.create(seed, function(err, campground) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("added a campground");
                    // CREATE A COMMENT
                    Comment.create(
                    {
                        text: "This place is great. But, I wish they had internet.",
                        author: "Homer"
                    }, function(err, comment) {
                        if(err) {
                            console.log(err);
                        }
                        else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created new comment");
                        }
                    }
                    )
                }
            });
        });
    });
}

module.exports = seedDB;