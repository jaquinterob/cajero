$(document).ready(function() {
  M.AutoInit()
  $(".ocultar").hide()
  listeners()
  console.log(contenedor_billetes);
});

var contenedor_billetes= {
  'billetes_10':1,
  'billetes_20':1,
  'billetes_50':1
}
function listeners(){
  $("#tipo_transaccion").change(()=>{$(".ocultar").hide();$("#contenedor_tipo_cuenta").show()});
  $("#tipo_cuenta").change(()=>{$("#"+$("#tipo_transaccion").val()).show()});
  $(".numero_cuenta").keyup((e)=>{
    console.log($(e.target).val());
    if (($(e.target).val()).length > 11) {
      M.toast({html:'Solo se permiten 11 números',classes:'red'});
      $(e.target).val(($(e.target).val()).substring(0,11))
      $(e.target).addClass('invalid');
      $(e.target).focus();
    }else{
      $(e.target).addClass('remove');
    }
  });
  $(".numero_cuenta").blur((e)=>{
    if (($(e.target).val()).length < 11) {
      M.toast({html:'La cuenta debe tener 11 dígitos',classes:'red'});
      $(e.target).addClass('invalid');
      $(e.target).focus();
    }else{
      $(e.target).addClass('remove');
    }
  });
}

function efectuar_consignacion(){
  if (validar_cuenta()) {
    $("#cuenta_consignar").removeClass('invalid');
    if (validar_dinero_a_consignar()) {
      console.log(contar_dinero_a_consignar());
    } else {
      M.toast({html:'No se ha ingresado ningun valor',classes:'red'});
    }
  } else {
    M.toast({html:'No se ingresado # cuenta...',classes:'red'});
    $("#cuenta_consignar").addClass('invalid');
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
  console.log(contenedor_billetes);
  terminar_transaccion();
  actualizar_visor_cajero();
}

function actualizar_visor_cajero(){
  $("#mostrar_billetes_10").html('<span id="mostrar_billetes_10"> Billetes de 10.000 = '+ contenedor_billetes.billetes_10 +'</span>');
  $("#mostrar_billetes_20").html('<span id="mostrar_billetes_10"> Billetes de 20.000 = '+ contenedor_billetes.billetes_20 +'</span>');
  $("#mostrar_billetes_50").html('<span id="mostrar_billetes_10"> Billetes de 50.000 = '+ contenedor_billetes.billetes_50 +'</span>');
  $("#total_disponible").html('Total disponible = $' + totalizar());
  $("#inferior").fadeOut('fast').fadeIn('fast');
  M.toast({html:'La consignación se realizó satisfactoriaente',classes:'blue'})
}

function totalizar(){
  return contenedor_billetes.billetes_10*10000 + contenedor_billetes.billetes_20*20000 + contenedor_billetes.billetes_50*50000;
}

function terminar_transaccion(){
  $(".ocultar").fadeOut('fast');
  $(".campo").each((evento,nodo)=>{
    $(nodo).val("");
  });
}
//queda pendiente validar los campos para consignar
