var w = window.innerWidth;
var h = window.innerHeight;
const socket = io("https://civitas-kechw.ondigitalocean.app");
var users =[];

const domain = 'meet.jit.si';
var myid ="";
 

socket.on("connect", () => {
  console.log("succefull connect https://civitas-kechw.ondigitalocean.app");
  // either with send()
  //socket.send("Hello!");
  
 
  // or with emit() and custom event names
 /*  socket.emit("salutations", "Hello!", { "mr": "john" }, Uint8Array.from([1, 2, 3, 4])); */
});

  socket.on("mesocketid", (data) => {
    myid = data.id;
    console.log("id: "+myid);
  }); 
  socket.on("newuser", (data) => {
    console.log("new user");
   
    users.push(
      Crafty.e("2D, DOM, player, Fourway, Collision, Solid, Controllable").setName(data.user).attr({
        x: data.position.x,
        y: data.position.y,

    }).addComponent("2D, DOM, Text, Motion")
    .attr({ x: 100, y: 100, vx: 10 })
    .text(function () { return this.getName() })
    .textColor('white')
    .defineField("socketId", function(){
      this._customData = data.id;
      return this._customData;
      }, function(newValue) {
     this._customData = newValue;
     })
    .dynamicTextGeneration(true)
    .checkHits('Solid') // check for collisions with entities that have the Solid component in each frame
    .bind("HitOn", function(hitData) {

      var room_name= 'Civitas_meet_'+me.getName();
      $("#meet").empty();
        Crafty.log("Collision with Solid entity occurred for the first time.");
        //Crafty.log(hitData);
        Crafty.log("name.");
        Crafty.log(hitData[0].obj.getName()  );
        const options = {
          roomName: room_name,
          width: w/4,
          height: h/3,
          parentNode: document.querySelector('#meet'),
          userInfo: {
            email: 'email@jitsiexamplemail.com',
            displayName: user
          },
          configOverwrite: { 
            enableWelcomePage: false,
            disableProfile: true,
            // Hides lobby button
            hideLobbyButton: false,
            prejoinPageEnabled: false,
        
            // Require users to always specify a display name.
            requireDisplayName: false
            },
            interfaceConfigOverwrite: {
               DEFAULT_BACKGROUND: '#383838',
               DISABLE_DOMINANT_SPEAKER_INDICATOR: true,
               DISPLAY_WELCOME_FOOTER: false,
               DISPLAY_WELCOME_PAGE_ADDITIONAL_CARD: false,
               DISPLAY_WELCOME_PAGE_CONTENT: false,
               DISPLAY_WELCOME_PAGE_TOOLBAR_ADDITIONAL_CONTENT: false,
               SHOW_CHROME_EXTENSION_BANNER: false,
               TOOLBAR_ALWAYS_VISIBLE: false,
               HIDE_INVITE_MORE_HEADER: true,
               TOOLBAR_BUTTONS: [
                'microphone', 'camera', 'closedcaptions', 
                  'profile', 'chat', 
                 'raisehand',
                'videoquality', 'filmstrip', 
                'tileview', 'videobackgroundblur',  'mute-everyone'
                
               ],
              },
         };
         socket.emit("communicate", {"user":user,"roomname":room_name ,"id": myid, "sendto": data.id });
        const api = new JitsiMeetExternalAPI(domain, options); 
    //     const iframe = api.getIFrame();
           
    
    })
    .bind("HitOff", function(comp) {
        Crafty.log("Collision with Solid entity ended.");
        $("#meet").empty();
    })

    );
    console.log("users")
    console.log(users)
   if(!data.imhere || data.imhere == null){
     console.log("no imhere")
    socket.emit("imhere", {"user":user,"position":{"x":me.x, "y":me.y}, "id": myid, "sendto": data.id });
  }
  /*   people_entity.x = data.position.x;
    people_entity.y = data.position.y; */
  });
socket.on("newcomm", data => {
  console.log("new comm");
  console.log(data);
  var room_name= data.roomname;
  $("#meet").empty();

    const options = {
      roomName: room_name,
      width: w/4,
      height: h/3,
      parentNode: document.querySelector('#meet'),
      userInfo: {
        email: 'email@jitsiexamplemail.com',
        displayName: user
      },
      configOverwrite: { 
        enableWelcomePage: false,
        disableProfile: true,
        // Hides lobby button
        hideLobbyButton: false,
        prejoinPageEnabled: false,
    
        // Require users to always specify a display name.
        requireDisplayName: false
        },
        interfaceConfigOverwrite: {
           DEFAULT_BACKGROUND: '#383838',
           DISABLE_DOMINANT_SPEAKER_INDICATOR: true,
           DISPLAY_WELCOME_FOOTER: false,
           DISPLAY_WELCOME_PAGE_ADDITIONAL_CARD: false,
           DISPLAY_WELCOME_PAGE_CONTENT: false,
           DISPLAY_WELCOME_PAGE_TOOLBAR_ADDITIONAL_CONTENT: false,
           SHOW_CHROME_EXTENSION_BANNER: false,
           TOOLBAR_ALWAYS_VISIBLE: false,
           HIDE_INVITE_MORE_HEADER: true,
           TOOLBAR_BUTTONS: [
            'microphone', 'camera', 'closedcaptions', 
              'profile', 'chat', 
             'raisehand',
            'videoquality', 'filmstrip', 
            'tileview', 'videobackgroundblur',  'mute-everyone'
            
           ],
          },
     };
     const api = new JitsiMeetExternalAPI(domain, options); 
});
// handle the event sent with socket.send()
socket.on("message", data => {
  console.log(data);
  $('#chat').append("<b>"+data.user+":</b> "+data.message +"<br>");
});
socket.on("imnothere", data => {
  /* console.log("users1")
  console.log(users)
  console.log("im not here anymore : "+data.id); */
  //erase = users.find(socketId => socketId == data.id);
  erase = users.find( user => user.socketId === data.id);
/*   console.log(erase)
  console.log(erase.socketId) */
  erase.destroy()
  users.splice(users.indexOf(erase), 1)
/*   console.log(data);
  console.log("users2")
  console.log(users) */

});

socket.on("position", (data) => {
         
        resultado = users.find( user => user._entityName === data.user );

        console.log("position");
       console.log(resultado);
        resultado.x = data.position.x;
        resultado.y = data.position.y;
    //   console.log("el usurio no esta agregado");
      resultado = null;

  });

  socket.on("connectedlist", data => {
    console.log("connectedlist: "); 
    console.log(data.map);
    console.log(data);
   
    //$('#chat').append("<b>"+data.user+":</b> "+data.message +"<br>");
  });
var message = "";
var user = "Unknow";
 /*  socket.emit("position", {"position":data}); */
$('#chatinput').change(function(){
  socket.emit("message", {"message":$(this).val(), "user":user});
  $(this).val("")
});
$('#userinput').change(function(){
  user = $(this).val();
  me.setName(user)
  $("#user").text(user)
  socket.emit("imanewuser", {"user":user,"position":{"x":me.x, "y":me.y}, "id":myid});
});
$('#saveuser').click(function(){
  user = $("#userinput").val();
  $("#user").text(user)
  me.setName(user)

   /* const options = {
    roomName: 'Civitas meet',
    width: w/4,
    height: h/3,
    parentNode: document.querySelector('#meet'),
    userInfo: {
      email: 'email@jitsiexamplemail.com',
      displayName: user
    },
    configOverwrite: { 
    enableWelcomePage: false,
    disableProfile: true,
    // Hides lobby button
    hideLobbyButton: false,
    prejoinPageEnabled: false,

    // Require users to always specify a display name.
    requireDisplayName: false
    },
    interfaceConfigOverwrite: {
       DEFAULT_BACKGROUND: '#383838',
       DISABLE_DOMINANT_SPEAKER_INDICATOR: true,
       DISPLAY_WELCOME_FOOTER: false,
       DISPLAY_WELCOME_PAGE_ADDITIONAL_CARD: false,
       DISPLAY_WELCOME_PAGE_CONTENT: false,
       DISPLAY_WELCOME_PAGE_TOOLBAR_ADDITIONAL_CONTENT: false,
       SHOW_CHROME_EXTENSION_BANNER: false,
       TOOLBAR_ALWAYS_VISIBLE: false,
       HIDE_INVITE_MORE_HEADER: true,
       TOOLBAR_BUTTONS: [
        'microphone', 'camera', 'closedcaptions', 
          'profile', 'chat', 
         'raisehand',
        'videoquality', 'filmstrip', 
        'tileview', 'videobackgroundblur',  'mute-everyone'
        
       ],
      },
   }; */
/* Settings originales 
   TOOLBAR_BUTTONS: [
    'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
    'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
    'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
    'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
    'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone',
    'e2ee', 'security'
   ], */
   /* const api = new JitsiMeetExternalAPI(domain, options); 
  
    const iframe = api.getIFrame();
    iframe.scroll(); */
});


// handle the event sent with socket.emit()

$('#myModal').modal('show')
     
  if(w > h){
    Crafty.init( w/2,h, document.getElementById('game'));
  }else{
    Crafty.init( w,h/2, document.getElementById('game'));
  }
  //Crafty.canvas();
  Crafty.sprite(16, "img/sprite.png", {
    grass1: [0,0],
    grass2: [1,0],
    grass3: [2,0],
    grass4: [3,0],
    flower: [0,1],
    bush1:  [0,2],
    bush2:  [1,2],
    player: [0,3]
  });
    // Method to randomy generate the map
    function generateWorld() {
      // Generate the grass along the x-axis
      for (var i = 0; i < w/9; i++) {
        // Generate the grass along the y-axis
        for (var j = 0; j < h/10; j++) {
          grassType = Crafty.math.randomInt(1, 4);
          Crafty.e("2D, Canvas, grass" + grassType)
            .attr({x: i * 16, y: j * 16});
  
          // 1/50 chance of drawing a flower and only within the bushes
          if (i > 0 && i < w/9 && j > 0 && j < h/10 && Crafty.math.randomInt(0, 50) > 49) {
            Crafty.e("2D, Canvas, bush"+Crafty.math.randomInt(1,2))
            .attr({x: i * 16, y: j * 16})
          };
          if (i > 0 && i < w/10 && j > 0 && j < h/10 && Crafty.math.randomInt(0, 50) > 49) {
            Crafty.e("2D, DOM, flower, SpriteAnimation")
              .attr({x: i * 16, y: j * 16})
              .reel("wind",1000, 0, 1, 4)
              .animate("wind", -1)
              .bind("enterframe", function() {
                if (!this.isPlaying())
                 this.animate("wind", 80);
              });
          }
        }
      }
  /* 
      // Create the bushes along the x-axis which will form the boundaries
      for (var i = 0; i < w/10; i++) {
        Crafty.e("2D, Canvas, wall_top, bush"+Crafty.math.randomInt(1,2))
          .attr({x: i * 16, y: 0, z: 2});
        Crafty.e("2D, Canvas, wall_bottom, bush"+Crafty.math.randomInt(1,2))
          .attr({x: i * 16, y: w, z: 2});
      }
  
      // Create the bushes along the y-axis
      // We need to start one more and one less to not overlap the previous bushes
      for (var i = 1; i < h/10; i++) {
        Crafty.e("2D, Canvas, wall_left, bush" + Crafty.math.randomInt(1,2))
          .attr({x: 0, y: i * 16, z: 2});
        Crafty.e("2D, Canvas, wall_right, bush" + Crafty.math.randomInt(1,2))
          .attr({x: h, y: i * 16, z: 2});
      }*/
    } 


    Crafty.scene("main", function() {
      generateWorld();
      // Create our player entity with some premade components
/*       var player = Crafty.e("2D, DOM, player,Fourway, controls, SpriteAnimation, animate, collision")
        .attr({x: 160, y: 144, z: 1})
        .fourway(200)
        .reel("walk_right", 9, 3, 11)
        .reel("walk_left", 6, 3, 8)
        .reel("walk_up", 3, 3, 5)
        .reel("walk_down", 0, 3, 2); */
   
    });
    
    Crafty.enterScene("main");
  
   //Crafty.sprite("img/people.png", {people:[0,0,200,500]});

   var me = Crafty.e("2D, DOM, nombre, player, Draggable, Fourway, Collision, Solid, Controllable, SpriteAnimation");
   me /*.attr({
    x: 100,
    y: 100,
    w:50,
    h:100
  }) */.checkHits('Solid').setName("");
  me.setName(user).attr({
    x: 200,
    y: 200,
    z: 1
 
  }).fourway(100);

   nombre = Crafty.e("2D, DOM, Text,  Motion")
  .attr({ x: me.x, y: me.y, w:100 }) 
  .text(function () {    
    this.x = me.x;
    this.y = me.y-10;
    return me.getName()  })
  .textColor('white')
  .textAlign("left")
  .textFont({ size: '9px' })
  .unselectable()
  .dynamicTextGeneration(true);
  Crafty.viewport.follow(me, 0, 0);
  Crafty.viewport.scale(2);
  
   me.dragDirection()
   .reel("moving", 500, [[0,3],[1,3],[2,3]])
   .reel("left", 1000, [[6,3],[7,3],[8,3]] )
   .reel("down", 1000, [[0,3],[1,3],[2,3]])
   .reel("right", 1000,[[9,3],[10,3],[11,3]])
   .reel("up", 1000, [[3,3],[4,3],[5,3]] )
  .bind('Dragging', function(evt) {
    
    //this.sprite(7,3 );
    
    this.animate("moving",-1);
    
    //his.attr({w:50,h:100});
  })
  .bind('StopDrag', function(evt) {
  
    socket.emit("position", {"user":user,"position":{"x":this.x, "y":this.y}});
    //console.log({"x":this.x, "y":this.y});
     //this.sprite(0,3 );
     this.animate("moving", 0);
    //this.attr({w:50,h:100});
  }).bind('KeyDown', function(e) {
    socket.emit("position", {"user":user,"position":{"x":this.x, "y":this.y}});

    if(e.key == Crafty.keys.LEFT_ARROW) {
      //this.x = this.x - 1;
      
     this.animate("left", -1);
    } else if (e.key == Crafty.keys.RIGHT_ARROW) {
      //this.x = this.x + 1;
     this.animate("right", -1);
    } else if (e.key == Crafty.keys.UP_ARROW) {
      //this.y = this.y - 1;
     this.animate("up", -1);
    } else if (e.key == Crafty.keys.DOWN_ARROW) {
     this.animate("down", -1);
     // this.y = this.y + 1;
    }
  }).bind('KeyUp', function(e) {
    this.pauseAnimation();
  }) ; 
 
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
  //Crafty.background('#f5f4b0 no-repeat center');
 /*  var myEntity = Crafty.e('2D, Canvas, Color, Mouse')
    .attr({x: 10, y: 10, w: 60, h: 40})
    .color('Blue')
    .bind('Click', function(MouseEvent){
      alert('Open', MouseEvent);
    }); */
/*  var myEntity  = Crafty.e("2D, Canvas, Color, Draggable, Fourway, Collision")
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

}); */
/* var tree_entity = Crafty.e("2D, DOM, , Collision, tree1");
var tree_entity2 = Crafty.e("2D, DOM, , Collision, tree2");
tree_entity.attr({
    x: 200,
    y: 200,
    z: 1,
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
}); */
