
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
        
      $('.tabcontent').addClass('hide');  // скроем все элементы
      $('.tablinks').removeClass('active'); // уберем у всех табов класс active


      $(this).removeClass('hide');        // у текущего уберем класс hide

      $(this).addClass('active');         // текущему элементу доабвим класс active
      
      var act_m = '#'+ $(this).val();

      //alert(act_m)
      $(act_m).removeClass('hide');    // у блока с id тек элемета уберем класс hide
       
      $(act_m).show(); 
      });
}

function read_array(p_arr, p_out){
  $.each(p_arr, function( index, value ) {


      if ($.isArray(value)) {
          read_array(value);
       } else { 
        p_out.append( index + ": " + value + "<br />");
      }
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

    //read_array(params, output);

    output.append('ftp.url: '+params.ftp.url +  "<br />")
    output.append('ftp.user: '+params.ftp.user +  "<br />")
    output.append('ftp.filename: '+params.ftp.filename+  "<br />")

    output.append('-----------------------------------<br />');
    output.append('pick: '+params.arm.pick+  "<br />")

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



// запуск команд из оболочки
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


// формирование pck файла
function make_pck(){
  //generate pck file 
  var txt = 'VER2' +'\r\n';
  txt += 'REM Список элементов' +'\r\n';
  txt +='\r\n';
  txt += 'METH CONV_57 U2018_BR_13446'+'\r\n';
  txt += 'METH RKO NEW#AUTO_JUR'+'\r\n';
  txt += 'METH RKO NEW#AUTO_JUR_EXT'+'\r\n';
  txt += 'CRIT VTB24_ENCASH_AGR VW_CRIT_VTB24_ENCASH_AGR_KS3'+'\r\n';
  txt += 'METH VTB24_ENCASH_AGR PROV_IN_REG_KS3'+'\r\n';
  txt += 'METH VTB24_ENCASH_AGR TEST_BO'+'\r\n';
  txt += 'METH VTB24_ENCASH_AGR VTB_RESERV'+'\r\n';
  txt += 'METH VTB24_ENCASH_AGR VTB_RESERV_GR';
  

  var fso  = new ActiveXObject("Scripting.FileSystemObject"); 
  var fh = fso.CreateTextFile(".\\tmp\\ibsobj.pck", 2, true); 
  fh.Write(txt); 
  
  fh.Close(); 
  
}

// generate config file for picker
function make_patch(p_element){


  var server, user, owner

  var full_path = $('#'+p_element).val();

  var arr_path = full_path.split('\\');
  
  var l_file_name = arr_path[arr_path.length-1];  //имя pck
   
  arr_path.splice(arr_path.length-1, 1);  

  var l_path = arr_path.join('\\');               // путь pck

  server = 'VTB24_DEV';
  user = 'IBS';
  owner = 'IBS'

  var txt = '<?xml version="1.0" encoding="Windows-1251"?>' + '\r\n' + '\r\n'

  txt +='<configuration'+ '\r\n'
  txt += '  version="1" '+ '\r\n'
  txt +=  ' server="'+server+'"'+ '\r\n'
  txt += '  user="'+user+'"'+ '\r\n'
  txt += '  owner="'+owner+'"'+ '\r\n'
  txt += '  pfx-file=" "'+ '\r\n'
  txt += '  show-monitor="true"'+ '\r\n'
  txt +='>'+ '\r\n'+ '\r\n'
  txt += '<download'+ '\r\n'
  txt +=     '  pck-file="'+full_path+'"'+ '\r\n'
  txt +=     '  storage-file="'+l_path+'\\ibsobj.mdb"'+ '\r\n'        
  txt +=     '  dependent-mode="include"'+ '\r\n'
  txt +=     '  enabled="true"'+ '\r\n'
  txt += '/>'+ '\r\n'+ '\r\n'
  txt +='</configuration>'+ '\r\n'


   var fso  = new ActiveXObject("Scripting.FileSystemObject"); 
   var fh = fso.CreateTextFile(".\\tmp\\make.xml", 2, true); 
   fh.Write(txt); 
  
   fh.Close(); 

   var output = $('#output_area')

   output.html(params.arm.pick +' /cf "'+ l_path +'\\make.xml" /p IBS /lf "'+l_path +'\\log.txt" ')

   alert(params.arm.pick +' /cf "'+ l_path +'\\make.xml" /p IBS /lf "'+l_path +'\\log.txt" ')

  runCmd(params.arm.pick +' /cf "'+ l_path +'\\make.xml" /p IBS /lf "'+l_path +'\\log.txt" ')

}




// инициализация при запуске приложения
$(document).ready(function() {

      resizeScreen();

      menuNavigate();

      readParams();

      alert(params.ftp.url)
      //$('#get_ftp').val(params.ftp.url)

      
});