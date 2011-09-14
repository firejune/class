var Class = require('./lib/class');

var Animal = Class.create({
  initialize: function(name, sound) {
    this.name  = name;
    this.sound = sound;
  },

  speak: function() {
    console.log(this.name + " says: " + this.sound + "!");
  }
});

// subclassing Animal
var Snake = Class.create(Animal, {
  initialize: function($super, name) {
    $super(name, 'hissssssssss');
  }
});

var ringneck = new Snake("Ringneck");
ringneck.speak();
//-> "Ringneck says: hissssssssss! "

var rattlesnake = new Snake("Rattler");
rattlesnake.speak();
//-> "Rattler says: hissssssssss!"
