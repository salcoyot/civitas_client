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
      Crafty.e("2D, DOM, people, Fourway, Collision, Solid, Controllable").setName(data.user).attr({
        x: data.position.x,
        y: data.position.y,

          w:50,
          h:100
    }).addComponent("2D, DOM, Text, Motion")
    .attr({ x: 100, y: 100, vx: 10 })
    .text(function () { return this.getName() })
    .textColor('black')
    .defineField("socketId", function(){
      return this._customData;
      }, function(newValue) {
     this._customData = newValue;
     })
    .socketId(data.id)
    .dynamicTextGeneration(true)
    .checkHits('Solid') // check for collisions with entities that have the Solid component in each frame
    .bind("HitOn", function(hitData) {
      $("#meet").empty();
        Crafty.log("Collision with Solid entity occurred for the first time.");
        //Crafty.log(hitData);
        Crafty.log("name.");
        Crafty.log(hitData[0].obj.getName()  );
        const options = {
          roomName: 'Civitas_meet_'+me.getName(),
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
                 'hangup', 'profile', 'chat', 
                 'raisehand',
                'videoquality', 'filmstrip', 
                'tileview', 'videobackgroundblur',  'mute-everyone'
                
               ],
              },
         };
         
         const api = new JitsiMeetExternalAPI(domain, options); 
         const iframe = api.getIFrame();
         iframe.attr("scrolling ='yes'");
      
    
    })
    .bind("HitOff", function(comp) {
        Crafty.log("Collision with Solid entity ended.");
    })

    );
    console.log("users")
    console.log(users)
   if(!data.imhere || data.imhere == null){
    socket.emit("imhere", {"user":user,"position":{"x":me.x, "y":me.y}, "id": myid, "sendto": data.id });
  }
  /*   people_entity.x = data.position.x;
    people_entity.y = data.position.y; */
  });

// handle the event sent with socket.send()
socket.on("message", data => {
  console.log(data);
  $('#chat').append("<b>"+data.user+":</b> "+data.message +"<br>");
});
socket.on("imnothere", data => {
  console.log(data);
  delete users.find(socketId => socketId == data.id);
});

socket.on("position", (data) => {
    if(resultado = users.find( user => user._entityName === data.user )){
        resultado = users.find( user => user._entityName === data.user );
        //console.log(data);
        console.log(resultado);
        resultado.x = data.position.x;
        resultado.y = data.position.y;
    }else{
        console.log("el usurio no esta agregado");
    }


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

   const options = {
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
   };
/* Settings originales 
   TOOLBAR_BUTTONS: [
    'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
    'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
    'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
    'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
    'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone',
    'e2ee', 'security'
   ], */
   const api = new JitsiMeetExternalAPI(domain, options); 
  
    const iframe = api.getIFrame();
    iframe.scroll();
});


// handle the event sent with socket.emit()

$('#myModal').modal('show')
     
        if(w > h){
          Crafty.init(w/2,h, document.getElementById('game'));
        }else{
          Crafty.init(w,h/2, document.getElementById('game'));
        }
    
  
    

  
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
    console.log({"x":this.x, "y":this.y});
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
