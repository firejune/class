# Class

Class.create returns a function that, when called, will fire its own initialize method.

Class.create accepts two kinds of arguments. If the first argument is a Class, it's treated as the new class's superclass, and all its methods are inherited. Otherwise, any arguments passed are treated as objects, and their methods are copied over as instance methods of the new class.

If a subclass overrides an instance method declared in a superclass, the subclass's method can still access the original method. To do so, declare the subclass's method as normal, but insert $super as the first argument. This makes $super available as a method for use within the function.

### Special properties

Classes themselves contain several special properties:

  * The superclass property refers to an class's superclass (or null if there is no superclass).
  * The subclasses property stores an array of all a class's subclasses (or an empty array if it has none).

In addition, an instance of a class contains the native JavaScript constructor property, which refers to the class that created it.


### Installing

GIT

    $ git clone git://github.com/firejune/class.git

NPM

    $ npm install Class


### Code

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
    //-> "Ringneck says: hissssssssss!"
    
    var rattlesnake = new Snake("Rattler");
    rattlesnake.speak();
    //-> "Rattler says: hissssssssss!"


Have fun!


### License

MIT <3
