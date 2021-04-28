//var w = window.innerWidth;
//var h = window.innerHeight;
//const socket = io("https://civitas-kechw.ondigitalocean.app");
//var users =[];

//const domain = 'meet.jit.si';
//var myid ="";
/*if(w > h){
  Crafty.init(w/2,h, document.getElementById('game'));
}else{
  Crafty.init(w,h/2, document.getElementById('game'));
}*/





Crafty.sprite("img/people.png", {people:[0,0,200,500]});

var me = Crafty.e("2D, DOM, people, Draggable, Fourway, Collision, Solid, Controllable");
me.attr({
x: 100,
y: 100,
w:50,
h:100
}).checkHits('Solid').setName("");




me.setName(user).attr({
x: 200,
y: 200,
w:50,
h:100
}).addComponent("2D, DOM, Text, Motion")
.attr({ x: -100, y: 100, vx: 10 })
.text(function () { return this.getName()  })
.textColor('black')
.dynamicTextGeneration(true);
Crafty.viewport.follow(me, 0, 0);


me.dragDirection()
.bind('Dragging', function(evt) {

this.sprite(150, 0, 200, 500);
this.attr({w:50,h:100});
})
.bind('StopDrag', function(evt) {

socket.emit("position", {"user":user,"position":{"x":this.x, "y":this.y}});
//console.log({"x":this.x, "y":this.y});
this.sprite(0,0,200,500);
this.attr({w:50,h:100});
});

/* var hBox = Crafty.e("2D, Canvas, Color, Draggable, Fourway, Collision")
.attr({
x: 100,
y: 100,
w: 50,
h: 50
})
.color("red")
.checkHits('Solid') 
.dragDirection()
.bind('Dragging', function(evt) {
this.color("black");


})
.bind('StopDrag', function(evt) {
this.color("red");
}); */
Crafty.background('#f5f4b0 no-repeat center');
/*  var myEntity = Crafty.e('2D, Canvas, Color, Mouse')
.attr({x: 10, y: 10, w: 60, h: 40})
.color('Blue')
.bind('Click', function(MouseEvent){
alert('Open', MouseEvent);
}); */
var myEntity  = Crafty.e("2D, Canvas, Color, Draggable, Fourway, Collision")
.attr({
x: 50,
y: 50,
w: 20,
h: 20
})
.color("green");
Crafty.sprite("img/1.png", {
tree1:[0,0,200,250],
tree2:[0,0,400,250]

});
var tree_entity = Crafty.e("2D, DOM, , Collision, tree1");
var tree_entity2 = Crafty.e("2D, DOM, , Collision, tree2");
tree_entity.attr({
x: 200,
y: 200,
w:100,
h:100
}).checkHits('Solid') // check for collisions with entities that have the Solid component in each frame
.bind("HitOn", function(hitData) {
Crafty.log("Collision with Solid entity occurred for the first time.");
//Crafty.log(hitData);
Crafty.log("name.");
Crafty.log(hitData[0].obj.getName()  );

})
.bind("HitOff", function(comp) {
Crafty.log("Collision with Solid entity ended.");
});

myEntity.bind('MouseUp', function(e) {
if( e.mouseButton == Crafty.mouseButtons.RIGHT ){
Crafty.log("Clicked right button");
}
Crafty.log("Clicked right button");
});
