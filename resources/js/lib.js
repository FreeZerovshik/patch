
  var winWidth=800; // ширина окна
  var winHeight=600; // высота окна
        // изменяем размер
   window.resizeTo(winWidth, winHeight);

        // окно в центр экрана
   var winPosX=screen.width/2-winWidth/2;
   var winPosY=screen.height/2-winHeight/2;
   window.moveTo(winPosX, winPosY);

$(document).ready(function() {
      
      $(".tablinks").click(function(){
        $('.tablinks').removeClass('active')
        $(this).addClass('active')
        $('.tabcontent').hide()
        $('#'+$(this).val()).show()
      });
});