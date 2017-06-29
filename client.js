/*
 * Client JS for Bus Announcer
*/

// ------- Data ------- \\


var sounds = {
  general: {
    nextstop: new Howl({
      src: ['assets/nextstop.mp3']
    }),
    bus: new Howl({
      src: ['assets/bus.mp3']
    }),
    arriving: new Howl({
      src: ['assets/arriving.mp3']
    }),
    welcome: new Howl({
      src: ['assets/welcome.mp3']
    })
  },
  dp: {
    dp: new Howl({
      src: ['assets/dp.mp3']
    }),
    gab: new Howl({
      src: ['assets/dp-gab.mp3']
    }),
    aveg: new Howl({
      src: ['assets/dp-aveg.mp3']
    })
  }
};

// ------- Classes and prototypes ------- \\



// ------- Functions ------ \\

function play( category, name ) {
  sounds[category][name].play();
}

// ------- jQuery ------- \\

$("#announcements").on('click', '.welcome', function( event ) {
  // var idinfo = $(this).attr('id').split('-');
  // var from = idinfo[1];
  var sound = sounds['general']['welcome'];
  sound.once('load', function(){
    sound.play();
  });
  sound.on('end', function(){
    var sound2 = sounds['dp']['dp'];
    sound2.play();
    sound2.on('end', function(){
      sounds['general']['bus'].play();
    })
  });
});

$("#announcements").on('click', '.nextstop', function( event ) {
  var idinfo = $(this).attr('id').split('-');
  var sound = sounds['general']['nextstop'];
  sound.play();

  // Fires when the sound finishes playing.
  sound.on('end', function(){
    sounds[idinfo[0]][idinfo[1]].play();
  });
});
