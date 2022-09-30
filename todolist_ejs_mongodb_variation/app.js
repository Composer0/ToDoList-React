//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});
// useNewUrlParser is to avoid deprecation warning.

const itemsSchema = {
  name: String
};
const listSchema = {
  name: String,
  items: [itemsSchema]
};

const Item = mongoose.model("Item", itemsSchema);

const List = mongoose.model("List", listSchema);

const item1 = new Item ({
  name: "Survive"
})
const item2 = new Item ({
  name: "Reinvent"
})
const item3 = new Item ({
  name: "Thrive"
})

const defaultItems = [item1, item2, item3];

//Read Database
app.get("/", function(req, res) {

  Item.find({}, function(err, foundItems){
    // empty set of curly braces means we are finding all.
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function(err){ if (err) { 
        console.log(err)
      } else { 
        console.log("you're doing it dawg.");
      }
    });
    res.redirect("/");
    // this doesn't intial render the items when launched. Therefore we have to include res.redirect for this function to be run once more in order to get to the initial else statement that renders the list.
    } else {
    res.render("list", {listTitle: "Today", newListItems: foundItems});
    }
  })
});
//Read Database

//Create
app.post("/", function(req, res){

  const itemName = req.body.newItem;
  // refers to text entered on webpage.
  const listName = req.body.list;
  const item = new Item ({
    name: itemName
  });

  if (listName === "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({name: listName}, function(err, foundList) {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    })
  }

  });
//Create


//Delete & Update
app.post("/delete", function(req, res) {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today") {
    Item.findByIdAndRemove(checkedItemId, function(err) { 
      if (!err) {
        console.log("Good Job");
        res.redirect("/");
      } 
    })  
  } else {
    List.findOneAndUpdate(
      {name: listName}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundList){
        if (!err) {
          res.redirect("/" + listName);
        } else {
          console.log("Almost...")
        }
      }
    )
  }

});


app.get("/:customListName", function(req, res) {
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({name: customListName}, function(err, foundList) {
    if (!err) {
      if (!foundList) {
        //Create a new list path
        const list = new List({
          name: customListName,
          items: defaultItems
        });

        list.save();
        res.redirect("/" + customListName);
        console.log("not working yet");
      } else {
        //Show an existing list
        res.render("list", {listTitle: foundList.name, newListItems: foundList.items})
        console.log("Found it!")
      }
    }
  })
});


app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
