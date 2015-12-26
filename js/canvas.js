(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
  var BirdGraphicsComponent = function(entity) {
    this.entity = entity;
  };

  BirdGraphicsComponent.prototype.draw = function(context) {
    var position = this.entity.components.physics.position;

    context.save();
    //  context.fillStyle = 'rgb(' + Math.floor(Math.random() * 255) + ', ' + Math.floor(Math.random() * 255)+ ', ' + Math.floor(Math.random() * 255)+ ')';
    context.fillStyle = '#ff00bf';
    context.translate(position.x, position.y-.1);
    context.beginPath();
    context.arc(0, 0, .002, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
    context.restore();

    context.save();
    //  context.fillStyle = 'rgb(' + Math.floor(Math.random() * 255) + ', ' + Math.floor(Math.random() * 255)+ ', ' + Math.floor(Math.random() * 255)+ ')';
    context.fillStyle = '#00ffff';
    context.translate(position.x -.2, position.y -1.5);
    context.beginPath();
    context.arc(0, 0, .004, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
    context.restore();

    context.save();
    //  context.fillStyle = 'rgb(' + Math.floor(Math.random() * 255) + ', ' + Math.floor(Math.random() * 255)+ ', ' + Math.floor(Math.random() * 255)+ ')';
    context.fillStyle = '#fff';
    context.translate(position.x -.2, position.y -2.5);
    context.beginPath();
    context.arc(0, 0, .006, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
    context.restore();


  };

  exports.BirdGraphicsComponent = BirdGraphicsComponent;
},{}],2:[function(require,module,exports){
  var PhysicsComponent = function(entity) {
    this.entity = entity;

    this.position = {
      x: 0,
      y: 0
    };
    this.velocity = {
      x: 0,
      y: 0
    };
    this.acceleration = {
      x: 0,
      y: 0
    };
  };

  PhysicsComponent.prototype.update = function(delta) {
    this.velocity.x += this.acceleration.x * delta;
    this.velocity.y += this.acceleration.y * delta;

    this.position.x += this.velocity.x * delta;
    this.position.y += this.velocity.y * delta;
  };

  exports.PhysicsComponent = PhysicsComponent;
},{}],3:[function(require,module,exports){
  var graphicsComponent = require("../components/graphics/bird.js");
  var physicsComponent = require("../components/physics/physics");
  //var collisionComponent = require("../components/collision/circle");

  var Bird = function(accY, accX, posY, posX) {
    var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.y = posY;
    physics.acceleration.y = accY;
    physics.acceleration.x = accX;
    physics.position.x = posX || (-1.3 * Math.random()) + (Math.random()*1.3);

    var graphics = new graphicsComponent.BirdGraphicsComponent(this);
    //  var collision = new collisionComponent.CircleCollisionComponent(this, 0.02);

    this.components = {
      physics: physics,
      graphics: graphics,
      //    collision: collision
    };
  };
  //
  //Bird.prototype.onCollision = function(entity) {
  //    console.log("Bird collided with entity:" + entity);
  //};

  exports.Bird = Bird;
},{"../components/graphics/bird.js":1,"../components/physics/physics":2}],4:[function(require,module,exports){
  var graphicsSystem = require('./systems/graphics');
  var physicsSystem = require('./systems/physics');
  var inputSystem = require('./systems/input');
  //var pipeSystem = require('./systems/pipes');
  var birdSystem = require('./systems/birds')
  var bird = require('./entities/bird');
  //var pipe = require('./entities/pipe');
  //var text = require('./entities/text');

  var FlappyBird = function() {
    this.entities = [];
    this.birds = new birdSystem.BirdSystem(this.entities);
    this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
    this.physics = new physicsSystem.PhysicsSystem(this.entities);
    this.input = new inputSystem.InputSystem(this.entities);

    //  this.pipes = new pipeSystem.PipeSystem(this.entities);


  };

  FlappyBird.prototype.run = function() {
    this.graphics.run();
    this.physics.run();
    this.input.run();
    this.birds.run();
    //  this.pipes.run();
  };


  exports.FlappyBird = FlappyBird;
},{"./entities/bird":3,"./systems/birds":6,"./systems/graphics":7,"./systems/input":8,"./systems/physics":9}],5:[function(require,module,exports){
  var flappyBird = require('./flappy_bird');

  document.addEventListener('DOMContentLoaded', function() {
    var app = new flappyBird.FlappyBird();
    app.run();
  })
},{"./flappy_bird":4}],6:[function(require,module,exports){
  var bird = require('../entities/bird');

  var BirdSystem = function(entities) {
    this.entities = entities;
  };


  BirdSystem.prototype.run = function() {
    // Run the update loop
    window.setInterval(this.tick.bind(this), 40000 /60);

  };

  BirdSystem.prototype.tick = function() {
    this.entities.push(new bird.Bird(.05, 0, 0));
    //  this.entities.push(new bird.Bird(.5, .6, (Math.random()*-.5), -1.5));
    this.entities.push(new bird.Bird(.08, 0, 0));

  };

  exports.BirdSystem = BirdSystem;
},{"../entities/bird":3}],7:[function(require,module,exports){
  var GraphicsSystem = function(entities) {
    this.entities = entities;
    // Canvas is where we draw
    this.canvas = document.getElementById('main-canvas');
    // Context is what we draw to
    this.context = this.canvas.getContext('2d');
  };

  GraphicsSystem.prototype.run = function() {
    // Tick the graphics system a few times to see it in action
    window.requestAnimationFrame(this.tick.bind(this));
  };

  GraphicsSystem.prototype.tick = function() {
    // Set the canvas to the correct size if the window is resized
    if (this.canvas.width != this.canvas.offsetWidth ||
        this.canvas.height != this.canvas.offsetHeight) {
      this.canvas.width = this.canvas.offsetWidth;
      this.canvas.height = this.canvas.offsetHeight;
    }

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.save();
    this.context.translate(this.canvas.width / 2, this.canvas.height);
    this.context.scale(this.canvas.height, -this.canvas.height);

    for (var i=0; i<this.entities.length; i++) {
      var entity = this.entities[i];
      if (!'graphics' in entity.components) {
        continue;
      }

      entity.components.graphics.draw(this.context);
    }

    this.context.restore();

    window.requestAnimationFrame(this.tick.bind(this));
  };

  exports.GraphicsSystem = GraphicsSystem;
},{}],8:[function(require,module,exports){
  var InputSystem = function(entities) {
    this.entities = entities;

    // Canvas is where we get input from
    this.canvas = document.getElementById('main-canvas');
  };

  InputSystem.prototype.run = function() {
    var bird = this.entities[0];
    this.canvas.addEventListener('click', this.onClick.bind(this));
    this.canvas.addEventListener('mouseover', this.onClick.bind(this));
    console.log(this);
  };

  InputSystem.prototype.onClick = function() {
    var bird = this.entities[0];
    bird.components.physics.velocity.y = 0.7;
  };

  exports.InputSystem = InputSystem;
},{}],9:[function(require,module,exports){
  //var collisionSystem = require("./collision");

  var PhysicsSystem = function(entities) {
    this.entities = entities;
    //    this.collisionSystem = new collisionSystem.CollisionSystem(entities);
  };

  PhysicsSystem.prototype.run = function() {
    // Run the update loop
    window.setInterval(this.tick.bind(this), 2000 /60);
  };

  PhysicsSystem.prototype.tick = function() {
    for (var i=0; i<this.entities.length; i++) {
      var entity = this.entities[i];
      if (!'physics' in entity.components) {
        continue;
      }

      entity.components.physics.update(1/60);
    }
    //    this.collisionSystem.tick();
  };

  exports.PhysicsSystem = PhysicsSystem;
},{}]},{},[5]);
