
var params

// изменение ращмеров основного окна
function resizeScreen() {
   var winWidth=800; // ширина окна
   var winHeight=600; // высота окна
   
   // изменяем размер
   window.resizeTo(winWidth, winHeight);

   // окно в центр экрана
   var winPosX=screen.width/2-winWidth/2;
   var winPosY=screen.height/2-winHeight/2;
   window.moveTo(winPosX, winPosY);
}

// навигация по меню
function menuNavigate(){
  $(".tablinks").click(function(){
        $('.tablinks').removeClass('active')
        $(this).addClass('active')
      
        $('.tabcontent').hide()
        $('#'+$(this).val()).show()
       
      });
}


// считывание праметров
function readParams(){
    $.getJSON('config.json', function(data) {
    //var params = [];

    params = data;
    ///var obj = $.parseJSON(data);

    var output = $('#output_area')

    output.html('Инициализация параметров:' +  "<br />")
    output.append('ftp.url: '+params.ftp.url +  "<br />")
    output.append('ftp.user: '+params.ftp.user +  "<br />")
    output.append('ftp.filename: '+params.ftp.filename+  "<br />")


    /*alert(params.ftp.url)
    alert(params.ftp.user)
    alert(params.ftp.pass)
    alert(params.ftp.filename)*/


   // $.each(params, function(key,val ) {
      //  alert(key+"="+val)
      //params.push( "<li id='" + key + "'>" + val + "</li>" );
     // $('output_area').innerHTML = key + "=" + val ;
    //});


    
      // alert(data);
       //process text file line by line
       //$('.console').html(data.replace('n',''));
       //$('.console').html(data);
    });
}


function runCmd(p_cmd){

  var WshShell = new ActiveXObject("WScript.Shell");
  var oExec = WshShell.Exec(p_cmd);
  var input = "";

  //alert(params.ftp.url)

  while (!oExec.StdOut.AtEndOfStream) {
    input += oExec.StdOut.ReadLine() + "<br />";
  }

  if (input)
    $("#output_area").html(input);
          
}

function make_conf_to_pick(){
  //generate pck file 
  var txt = 'VER2' +'\r\n';
  txt += 'REM Список элементов' +'\r\n';
  txt +='\r\n';
  txt += 'METH MAIN_DOCUM VTB24_CONF_DOC'+'\r\n';
  

  var fso  = new ActiveXObject("Scripting.FileSystemObject"); 
  var fh = fso.CreateTextFile(".\\tmp\\ibsobj.pck", 2, true); 
  fh.Write(txt); 
  
  fh.Close(); 
  
}


// инициализация при запуске приложения
$(document).ready(function() {
      
      resizeScreen();

      menuNavigate();

      readParams();

      make_conf_to_pick();

});