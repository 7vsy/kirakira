if (!window.lib) { window.lib = {}; }
if (!window.lib.effects) { window.lib.effects = {}; }

lib.effects.kirakira = function( arg ){
  var maxHeight = arg.maxHeight || 320;
  var maxWidth = arg.maxWidth || 240;
  var iosFlag = false;
  if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 ) {
    iosFlag = true; 
  }

  vendorPrefix = (/webkit/i).test(navigator.appVersion) ? 'webkit' :
                 (/firefox/i).test(navigator.userAgent) ? 'Moz' :
                 (/trident/i).test(navigator.userAgent) ? 'ms' :
                 'opera' in window ? 'O' : '';


  var motionNode = arg.selector;
  for( var i=1; i<=arg.num; i++ ){
    motionNode.appendChild( createKiraElem() );
  }

  function createKiraElem(){
    var kiraElem = document.createElement('span');
    kiraElem.style.position = 'absolute';
    kiraElem.style.height = arg.imgHeight + 'px';
    kiraElem.style.width  = arg.imgWidth + 'px';
    kiraElem.style.backgroundImage = 'url('+ arg.imgName +')';
    kiraElem.style.opacity = 0;
    kiraElem.style.zIndex = arg.zIndex || 1;

    var pika = 0;
    kiraElem.hikaru = function(){
      setTimeout( function(){
        if ( 0 >= pika ){
          var crct = 0.4;
          kiraElem.style.top  = parseInt( ( crct + Math.random() * 1 ) * maxHeight ) + 'px';
          kiraElem.style.left = parseInt( ( crct + Math.random() * 1 ) * maxWidth ) + 'px'; 
        }

        pika ++;
        var scaleParam = ( 1 - 0.1 * pika);
        if ( iosFlag === true ){
          kiraElem.style[ vendorPrefix + 'Transform' ] = 'scale3d(' + scaleParam +',' + scaleParam +',0) '; 
        }else{
          kiraElem.style[ vendorPrefix + 'Transform' ] = 'scale(' + scaleParam +',' + scaleParam +') ';
        }
        kiraElem.style.opacity = arg.opacity || 1;

        if ( pika >= 10 ) {
          pika = 0;
        }
        kiraElem.hikaru();
      }, 30 + parseInt(Math.random() * 5) );
    }
    kiraElem.hikaru();

    return kiraElem;
  }

}
