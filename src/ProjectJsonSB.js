var ProjectJsonSB = {
  blocks: [
    //制御ブロック
    {
      name: 'whenGreenFlag',
      get: function(e) {
        return 'when green flag clicked';
      }
    },
    {
      name: 'whenKeyPressed',
      get: function(e) {
        return 'when [' + e[1] + ' v] key pressed';
      }
    },
    {
      name: 'whenClicked',
      get: function(e) {
        return 'when this sprite clicked';
      }
    },
    {
      name: 'whenSceneStarts',
      get: function(e) {
        return 'when backdrop switches to [' + e[1] + ' v]';
      }
    },
    {
      name: 'whenSensorGreaterThan',
      get: function(e) {
        return 'when [' + e[1] + ' v] > (' + e[2] + ')';
      }
    },
    {
      name: 'whenIReceive',
      get: function(e) {
        return 'when I receive [' + e[1] + ' v]';
      }
    },
    {
      name: 'broadcast:',
      get: function(e) {
        return 'broadcast [' + e[1] + ' v]';
      }
    },
    {
      name: 'doBroadcastAndWait',
      get: function(e) {
        return 'broadcast [' + e[1] + ' v] and wait';
      }
    },
    //動きブロック
    {
      name: 'forward:',
      get: function(e) {
        return 'move (' + e[1] + ') steps';
      }
    },
    {
      name: 'turnRight:',
      get: function(e) {
        return 'turn cw (' + e[1] + ') degrees';
      }
    },
    {
      name: 'turnLeft:',
      get: function(e) {
        return 'turn ccw (' + e[1] + ') degrees';
      }
    },
    {
      name: 'heading:',
      get: function(e) {
        return 'point in direction (' + e[1] + ' v)';
      }
    },
    {
      name: 'gotoSpriteOrMouse:',
      get: function(e) {
        return 'point towards [' + e[1] + ' v]';
      }
    },
    {
      name: 'changeXposBy:',
      get: function(e) {
        console.log(e);
        return 'change x by (' + ProjectJsonSB.toSB(e[1]) + ')';
      }
    },
    {
      name: 'xpos:',
      get: function(e) {
        return 'set x to (' + e[1] + ')';
      }
    },
    {
      name: 'changeYposBy:',
      get: function(e) {
        console.log(e);
        return 'change y by ' + ProjectJsonSB.toSB(e[1]) + '';
      }
    },
    {
      name: 'ypos:',
      get: function(e) {
        return 'set Y to (' + e[1] + ')';
      }
    },
    {
      name: 'bounceOffEdge',
      get: function(e) {
        return 'if on edge, bounce';
      }
    },
    {
      name: 'setRotationStyle',
      get: function(e) {
        return 'set rotation style [' + e[1] + ' v]';
      }
    },
    {
      name: 'xpos',
      get: function(e) {
        return '(x position)';
      }
    },
    {
      name: 'ypos',
      get: function(e) {
        return '(y position)';
      }
    },

  ],
  gress: function(e){},
  onload: function(e){},
  toSB: function(json){
    var result = '';

    this.blocks.some(function(block,i){
      if(block.name == json[0]){
        result = block.get(json);
        return true;
      }
      result = json[0];
    });

    return result;
  },
  get: function(json,target){
    var result = '';
    json.forEach(function(block,i,t){
      console.log(block);
      var sb = ProjectJsonSB.toSB(block);
      result += sb + '<br />';

      ProjectJsonSB.onprogress({
        parcent: (i + 1) / t.length * 100,
        loaded: (i + 1),
        total: t.length,
      });
    });
    document.querySelector(target).innerHTML = result;
    ProjectJsonSB.onload({
      result: result
    });
    scratchblocks.renderMatching(target);
  },
  getAll: function(json,target){
    var result = '';
    json.forEach(function(scripts,ssindex,sst){
      scripts[2].forEach(function(script,scindex,sct){
        var sb = ProjectJsonSB.toSB(script);
        console.log(sb);
        result += sb;
        result += '<br />';
        setTimeout(function(){
          ProjectJsonSB.onprogress({
            parcent:{
              total: ((ssindex + 1) * ((scindex + 1) / sct.length) / sst.length) * 100,
              script: (scindex + 1) / sct.length * 100
            }
          });
        },0);
      });
      result += '<br />';
    });
    document.querySelector(target).innerHTML = result;
    ProjectJsonSB.onload({
      result: result
    });
    scratchblocks.renderMatching(target, {
      languages: ['ja', 'en'],
    });
  }
}
