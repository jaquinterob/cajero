$(document).ready(function() {//6
  inicializaciones()//2
  listeners()//2
});//2


var contenedor_billetes= {//4
  'billetes_10':100,//3
  'billetes_20':100,//3
  'billetes_50':100//3
}//1

function inicializaciones(){//4
  M.AutoInit()//3
  $("#modal_recibo").modal({dismissible: false});//9
  $(".ocultar").hide();//5
  actualizar_visor_cajero();//2
}//1

function listeners(){//4
  $("#tipo_transaccion").change(()=>{//8
    $(".ocultar").hide();//5
    $("#tipo_cuenta").val("");//5
    $('select').formSelect();//5
    $("#contenedor_tipo_cuenta").show();//5
  });//2
  $("#tipo_cuenta").change(()=>{$("#"+$("#tipo_transaccion").val()).show()});//16
  $(".numero_cuenta").keyup((e)=>{//9
    console.log($(e.target).val());//8
    if (($(e.target).val()).length > 11) {//12
      M.toast({html:'Solo se permiten 11 números',classes:'red'});//10
      $(e.target).val(($(e.target).val()).substring(0,11))//15
      $(e.target).addClass('invalid');//6
      $(e.target).focus();//5
    }else{//2
      $(e.target).addClass('remove');//6
    }//1
  });//2
  $(".numero_cuenta").blur((e)=>{//9
    if (($(e.target).val()).length < 11) {//12
      M.toast({html:'La cuenta debe tener 11 dígitos',classes:'red'});//10
      $(e.target).addClass('invalid');//6
      $(e.target).focus();//5
    }else{//2
      $(e.target).addClass('remove');//6
    }
  });
}

function efectuar_consignacion(){
  if (validar_cuenta()) {
    $("#cuenta_consignar").removeClass('invalid');
    if (validar_dinero_a_consignar()) {
      contar_dinero_a_consignar();
      mostrar_modal_consignar();
    } else {
      M.toast({html:'No se ha ingresado ningun valor',classes:'red'});
    }
  } else {//
    M.toast({html:'No se ingresado # cuenta...',classes:'red'});//10
    $("#cuenta_consignar").addClass('invalid');//8
  }
}

function contar_dinero_a_consignar(){
  var billetes_10 = $("#billetes_10").val() != '' ? $("#billetes_10").val() : 0 ;
  var billetes_20 = $("#billetes_20").val() != '' ? $("#billetes_20").val() : 0 ;
  var billetes_50 = $("#billetes_50").val() != '' ? $("#billetes_50").val() : 0 ;
  guardar_en_cajones(billetes_10,billetes_20,billetes_50);
  return (billetes_10 * 10000) + (billetes_20 * 20000) + (billetes_50 * 50000);
}

function validar_dinero_a_consignar(){
  if ($("#billetes_10").val() != '' || $("#billetes_20").val() != '' || $("#billetes_50").val() != '') {
    return true;
  } else {
    return false;
  }
}

function validar_cuenta(){
  if ($("#cuenta_consignar").val() != '') {
    return true;
  } else {
    return false;
  }
}

function guardar_en_cajones(billetes_10,billetes_20,billetes_50){
  contenedor_billetes.billetes_10 += parseInt(billetes_10);
  contenedor_billetes.billetes_20 += parseInt(billetes_20);
  contenedor_billetes.billetes_50 += parseInt(billetes_50);
  M.toast({html:'Consignación satisfactoria',classes:'blue'});
  actualizar_visor_cajero();
}

function actualizar_visor_cajero(){
  $("#mostrar_billetes_10").html('<span id="mostrar_billetes_10"> Billetes de 10.000 = '+ contenedor_billetes.billetes_10 +'</span>');
  $("#mostrar_billetes_20").html('<span id="mostrar_billetes_10"> Billetes de 20.000 = '+ contenedor_billetes.billetes_20 +'</span>');
  $("#mostrar_billetes_50").html('<span id="mostrar_billetes_10"> Billetes de 50.000 = '+ contenedor_billetes.billetes_50 +'</span>');
  $("#total_disponible").html('Total = $' + totalizar());
  $("#inferior").fadeOut('fast').fadeIn('fast');
}

function totalizar(){
  return contenedor_billetes.billetes_10*10000 + contenedor_billetes.billetes_20*20000 + contenedor_billetes.billetes_50*50000;
}

function terminar_transaccion(){
  $(".ocultar").fadeOut('fast');
  $(".campo").each((evento,nodo)=>{
    $(nodo).val("");
  });
  $('select').formSelect();
}

function efectuar_retiro(clase){
  if (validar_campo(clase)) {
    if (validar_valor_retirar($("#valor_retirar").val())){
      if (hay_suficiente_dinero($("#valor_retirar").val())) {
        entregar_dinero($("#valor_retirar").val())
      } else {
        M.toast({html:'Fondos insuficientes',classes:'red'});
      }
    } else {
      M.toast({html:'El valor a retirar no es multiplo de 10.000',classes:'red'});
    }
  } else {
    M.toast({html:'Faltan datos para efectuar el retiro',classes:'red'});
  }
}

function entregar_dinero(valor){
  var de10 = 0;
  var de20 = 0;
  var de50 = 0;
  if(valor >= 50000 && contenedor_billetes.billetes_50 >= 1){
    console.log(contenedor_billetes.billetes_50 >= 1);
    while (valor >= 50000 && contenedor_billetes.billetes_50 >= 1) {
      de50++;
      valor = valor - 50000;
      contenedor_billetes.billetes_50 -= 1
      console.log(valor,de50);
    }
    if (valor >= 20000 && contenedor_billetes.billetes_20 >= 1 ) {
      while (valor >= 20000 && contenedor_billetes.billetes_20 >= 1 ) {
        de20++;
        valor = valor - 20000;
        contenedor_billetes.billetes_20 -= 1
        console.log(valor,de20);
      }
      if (valor >= 10000 && contenedor_billetes.billetes_10 >= 1) {
        while (valor >= 10000 && contenedor_billetes.billetes_10 >= 1) {
          de10++;
          valor = valor - 10000;
          contenedor_billetes.billetes_10 -= 1
          console.log(valor,de10);
        }
      }
    }else{
      if (valor >= 10000 && contenedor_billetes.billetes_10  >= 1) {
        while (valor >= 10000 && contenedor_billetes.billetes_10  >= 1) {
          de10++;
          valor = valor - 10000;
          contenedor_billetes.billetes_10 -= 1
          console.log(valor,de10);
        }
      }
    }
  }else{
    if (valor >= 20000 && contenedor_billetes.billetes_20  >= 1) {
      while (valor >= 20000 && contenedor_billetes.billetes_20  >= 1) {
        de20++;
        valor = valor - 20000;
        contenedor_billetes.billetes_20 -= 1
        console.log(valor,de20);
      }
      if (valor >= 10000 && contenedor_billetes.billetes_10 >= 1) {
        while (valor >= 10000 && contenedor_billetes.billetes_10 >= 1) {
          de10++;
          valor = valor - 10000;
          contenedor_billetes.billetes_10 -= 1
          console.log(valor,de10);
        }
      }
    }else{
      if (valor >= 10000 && contenedor_billetes.billetes_10 >= 1) {
        while (valor >= 10000 && contenedor_billetes.billetes_10 >= 1) {
          de10++;
          valor = valor - 10000;
          contenedor_billetes.billetes_10 -= 1
          console.log(valor,de10);
        }
      }
    }
    if (valor >= 10000 && contenedor_billetes.billetes_10 >= 1) {
      while (valor >= 10000 && contenedor_billetes.billetes_10 >= 1) {
        de10++;
        valor = valor - 10000;
        contenedor_billetes.billetes_10 -= 1
        console.log(valor,de10);
      }
    }
  }
  var respuesta = [];
  respuesta['de10'] = de10;
  respuesta['de20'] = de20;
  respuesta['de50'] = de50;
  respuesta_texto = '';
  $("#titulo_modal").html('');
  $("#titulo_modal").html('COMPROBANTE DE RETIRO');
  $("#titulo_modal").append(`<br><span >Cuenta N° ${$("#tarjeta_retirar").val()} </span>`);
  $("#titulo_modal").append(`<br><span >Fecha ${(new Date()).getDate()}/${(new Date()).getMonth()}/${(new Date()).getFullYear()}  Hora ${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()} </span>`);
  if (respuesta['de10'] > 0) {$("#titulo_modal").append(`<br><span >Billetes de 10.000 = ${respuesta['de10']} </span>`)}
  if (respuesta['de20'] > 0) {$("#titulo_modal").append(`<br><span >Billetes de 20.000 = ${respuesta['de20']} </span>`)}
  if (respuesta['de50'] > 0) {$("#titulo_modal").append(`<br><span >Billetes de 50.000 = ${respuesta['de50']} </span>`)}
  $("#titulo_modal").append(`<br><span style="color:#386c86;font-size:30px" >Total retirado = $${$("#valor_retirar").val()}</span>`);
  $("#titulo_modal").append(`<br><em><span style="font-size:20px;color:grey;font-style: italic">Saldo = $${totalizar()}</span></em>`);
  actualizar_visor_cajero();
  abrir_modal_solamente();
  return respuesta;
}

function mostrar_modal_consignar(){
  var billetes_10 = $("#billetes_10").val() != '' ? $("#billetes_10").val() : 0 ;
  var billetes_20 = $("#billetes_20").val() != '' ? $("#billetes_20").val() : 0 ;
  var billetes_50 = $("#billetes_50").val() != '' ? $("#billetes_50").val() : 0 ;

  $("#titulo_modal").html('');
  $("#titulo_modal").html('COMPROBANTE DE CONSIGNACIÓN');
  $("#titulo_modal").append(`<br><span >Cuenta N° ${$("#cuenta_consignar").val()} </span>`);
  $("#titulo_modal").append(`<br><span >Fecha ${(new Date()).getDate()}/${parseInt((new Date()).getMonth()) + 1 }/${(new Date()).getFullYear()}  Hora ${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()} </span>`);
  $("#titulo_modal").append(`<br><span style="color:#386c86;font-size:30px" >Se consignó = $${(billetes_10 * 10000) + (billetes_20 * 20000) + (billetes_50 * 50000)}</span>`);
  $("#titulo_modal").append(`<br><em><span style="font-size:20px;color:grey;font-style: italic">Saldo = $${totalizar()}</span></em>`);
  // actualizar_visor_cajero();
  // terminar_transaccion();
  abrir_modal_solamente()
}

function abrir_modal_solamente(){
  var instance = M.Modal.getInstance($("#modal_recibo"));
  instance.open();
}

function hay_suficiente_dinero(valor){
  console.log(totalizar());
  return valor <= totalizar() ? true : false;
}

function validar_valor_retirar(valor){
  return valor % 10000 == 0 ? true : false;
}

function validar_campo(clase){
  var v = 0;
  $("."+clase).each((evento,nodo)=>{
    if ($(nodo).val() == '') {
      v++;
      $(nodo).addClass('invalid');
    } else {
      $(nodo).removeClass('invalid');
    }
  });
  return v==0 ? true : false;
}

function efectuar_consulta_saldo(){
  if (validar_campo('consultar_saldo')) {
    mostrar_modal_saldo();
  } else {
    M.toast({html:'Faltan datos para la consulta de saldo',classes:'red'});
  }
}

function mostrar_modal_saldo(){
  $("#titulo_modal").html('');
  $("#titulo_modal").html('CONSULTA DE SALDO');
  $("#titulo_modal").append(`<br><span >Cuenta N° ${$("#cuenta_consultar_saldo").val()} </span>`);
  $("#titulo_modal").append(`<br><span >Fecha ${(new Date()).getDate()}/${parseInt((new Date()).getMonth()) + 1 }/${(new Date()).getFullYear()}  Hora ${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()} </span>`);
  $("#titulo_modal").append(`<br><em><span style="color:#386c86;font-size:30px">Saldo actual = $${totalizar()}</span></em>`);
  abrir_modal_solamente()
}
