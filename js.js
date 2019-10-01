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

function efectuar_consignacion(){//4
  if (validar_cuenta()) {//5
    $("#cuenta_consignar").removeClass('invalid');//6
    if (validar_dinero_a_consignar()) {//5
      contar_dinero_a_consignar();//2
      mostrar_modal_consignar();//2
    } else {//2
      M.toast({html:'No se ha ingresado ningun valor',classes:'red'});//10
    }
  } else {//2
    M.toast({html:'No se ingresado # cuenta...',classes:'red'});//10
    $("#cuenta_consignar").addClass('invalid');//8
  }
}

function contar_dinero_a_consignar(){//4
  var billetes_10 = $("#billetes_10").val() != '' ? $("#billetes_10").val() : 0 ;//18
  var billetes_20 = $("#billetes_20").val() != '' ? $("#billetes_20").val() : 0 ;//18
  var billetes_50 = $("#billetes_50").val() != '' ? $("#billetes_50").val() : 0 ;//18
  guardar_en_cajones(billetes_10,billetes_20,billetes_50);//5
  return (billetes_10 * 10000) + (billetes_20 * 20000) + (billetes_50 * 50000);//15
}

function validar_dinero_a_consignar(){ //4
  if ($("#billetes_10").val() != '' || $("#billetes_20").val() != '' || $("#billetes_50").val() != '') {//26
    return true;//2
  } else {//2
    return false;//2
  }
}

function validar_cuenta(){//4
  if ($("#cuenta_consignar").val() != '') {//10
    return true;//2
  } else {//2
    return false;//2
  }
}

function guardar_en_cajones(billetes_10,billetes_20,billetes_50){//7
  contenedor_billetes.billetes_10 += parseInt(billetes_10);//7
  contenedor_billetes.billetes_20 += parseInt(billetes_20);//7
  contenedor_billetes.billetes_50 += parseInt(billetes_50);//7
  M.toast({html:'Consignación satisfactoria',classes:'blue'});//10
  actualizar_visor_cajero();//2
}

function actualizar_visor_cajero(){//4
  $("#mostrar_billetes_10").html('<span id="mostrar_billetes_10"> Billetes de 10.000 = '+ contenedor_billetes.billetes_10 +'</span>');//18
  $("#mostrar_billetes_20").html('<span id="mostrar_billetes_10"> Billetes de 20.000 = '+ contenedor_billetes.billetes_20 +'</span>');//18
  $("#mostrar_billetes_50").html('<span id="mostrar_billetes_10"> Billetes de 50.000 = '+ contenedor_billetes.billetes_50 +'</span>');//18
  $("#total_disponible").html('Total = $' + totalizar());//11
  $("#inferior").fadeOut('fast').fadeIn('fast');//9
}

function totalizar(){//4
  return contenedor_billetes.billetes_10*10000 + contenedor_billetes.billetes_20*20000 + contenedor_billetes.billetes_50*50000;//15
}

function terminar_transaccion(){//3
  $(".ocultar").fadeOut('fast');//6
  $(".campo").each((evento,nodo)=>{//9
    $(nodo).val("");//5
  });
  $('select').formSelect();//5
}

function efectuar_retiro(clase){//5
  if (validar_campo(clase)) {//6
    if (validar_valor_retirar($("#valor_retirar").val())){//10
      if (hay_suficiente_dinero($("#valor_retirar").val())) {//10
        entregar_dinero($("#valor_retirar").val())//7
      } else {//2
        M.toast({html:'Fondos insuficientes',classes:'red'});//10
      }
    } else {//2
      M.toast({html:'El valor a retirar no es multiplo de 10.000',classes:'red'});//10
    }
  } else {//2
    M.toast({html:'Faltan datos para efectuar el retiro',classes:'red'});//10
  }
}

function entregar_dinero(valor){//4
  var de10 = 0;//4
  var de20 = 0;//4
  var de50 = 0;//4
  if(valor >= 50000 && contenedor_billetes.billetes_50 >= 1){//11
    while (valor >= 50000 && contenedor_billetes.billetes_50 >= 1) {//11
      de50++;//2
      valor = valor - 50000;//5
      contenedor_billetes.billetes_50 -= 1//5
    }
    if (valor >= 20000 && contenedor_billetes.billetes_20 >= 1 ) {//11
      while (valor >= 20000 && contenedor_billetes.billetes_20 >= 1 ) {//11
        de20++;//2
        valor = valor - 20000;//5
        contenedor_billetes.billetes_20 -= 1//5
      }
      if (valor >= 10000 && contenedor_billetes.billetes_10 >= 1) {//11
        while (valor >= 10000 && contenedor_billetes.billetes_10 >= 1) {//11
          de10++;//2
          valor = valor - 10000;//5
          contenedor_billetes.billetes_10 -= 1//5
        }
      }
    }else{//2
      if (valor >= 10000 && contenedor_billetes.billetes_10  >= 1) {//11
        while (valor >= 10000 && contenedor_billetes.billetes_10  >= 1) {//11
          de10++;//2
          valor = valor - 10000;//5
          contenedor_billetes.billetes_10 -= 1//5
        }
      }
    }
  }else{//2
    if (valor >= 20000 && contenedor_billetes.billetes_20  >= 1) {//11
      while (valor >= 20000 && contenedor_billetes.billetes_20  >= 1) {//11
        de20++;//2
        valor = valor - 20000;//5
        contenedor_billetes.billetes_20 -= 1//
      }
      if (valor >= 10000 && contenedor_billetes.billetes_10 >= 1) {//11
        while (valor >= 10000 && contenedor_billetes.billetes_10 >= 1) {//11
          de10++;//2
          valor = valor - 10000;//5
          contenedor_billetes.billetes_10 -= 1//5
        }
      }
    }else{//2
      if (valor >= 10000 && contenedor_billetes.billetes_10 >= 1) {//11
        while (valor >= 10000 && contenedor_billetes.billetes_10 >= 1) {//11
          de10++;//2
          valor = valor - 10000;//5
          contenedor_billetes.billetes_10 -= 1//5
        }
      }
    }
    if (valor >= 10000 && contenedor_billetes.billetes_10 >= 1) {//11
      while (valor >= 10000 && contenedor_billetes.billetes_10 >= 1) {//11
        de10++;//2
        valor = valor - 10000;//5
        contenedor_billetes.billetes_10 -= 1//5
      }
    }
  }
  var respuesta = [];//4
  respuesta['de10'] = de10;//5
  respuesta['de20'] = de20;//5
  respuesta['de50'] = de50;//5
  respuesta_texto = '';//3
  $("#titulo_modal").html('');//5
  $("#titulo_modal").html('COMPROBANTE DE RETIRO');//6
  $("#titulo_modal").append(`<br><span >Cuenta N° ${$("#tarjeta_retirar").val()} </span>`);//19
  $("#titulo_modal").append(`<br><span >Fecha ${(new Date()).getDate()}/${(new Date()).getMonth()}/${(new Date()).getFullYear()}  Hora ${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()} </span>`);//57
  if (respuesta['de10'] > 0) {$("#titulo_modal").append(`<br><span >Billetes de 10.000 = ${respuesta['de10']} </span>`)}//26
  if (respuesta['de20'] > 0) {$("#titulo_modal").append(`<br><span >Billetes de 20.000 = ${respuesta['de20']} </span>`)}//26
  if (respuesta['de50'] > 0) {$("#titulo_modal").append(`<br><span >Billetes de 50.000 = ${respuesta['de50']} </span>`)}//26
  $("#titulo_modal").append(`<br><span style="color:#386c86;font-size:30px" >Total retirado = $${$("#valor_retirar").val()}</span>`);//27
  $("#titulo_modal").append(`<br><em><span style="font-size:20px;color:grey;font-style: italic">Saldo = $${totalizar()}</span></em>`);//31
  actualizar_visor_cajero();//2
  abrir_modal_solamente();//2
  return respuesta;//2
}

function mostrar_modal_consignar(){//4
  var billetes_10 = $("#billetes_10").val() != '' ? $("#billetes_10").val() : 0 ;//19
  var billetes_20 = $("#billetes_20").val() != '' ? $("#billetes_20").val() : 0 ;//19
  var billetes_50 = $("#billetes_50").val() != '' ? $("#billetes_50").val() : 0 ;//19

  $("#titulo_modal").html('');//5
  $("#titulo_modal").html('COMPROBANTE DE CONSIGNACIÓN');//6
  $("#titulo_modal").append(`<br><span >Cuenta N° ${$("#cuenta_consignar").val()} </span>`);//19
  $("#titulo_modal").append(`<br><span >Fecha ${(new Date()).getDate()}/${parseInt((new Date()).getMonth()) + 1 }/${(new Date()).getFullYear()}  Hora ${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()} </span>`);//63
  $("#titulo_modal").append(`<br><span style="color:#386c86;font-size:30px" >Se consignó = $${(billetes_10 * 10000) + (billetes_20 * 20000) + (billetes_50 * 50000)}</span>`);//35
  $("#titulo_modal").append(`<br><em><span style="font-size:20px;color:grey;font-style: italic">Saldo = $${totalizar()}</span></em>`);//32
  abrir_modal_solamente()//2
}

function abrir_modal_solamente(){//4
  var instance = M.Modal.getInstance($("#modal_recibo"));//10
  instance.open();//3
}

function hay_suficiente_dinero(valor){//5
  return valor <= totalizar() ? true : false;//9
}

function validar_valor_retirar(valor){//5
  return valor % 10000 == 0 ? true : false;//10
}

function validar_campo(clase){//5
  var v = 0;//4
  $("."+clase).each((evento,nodo)=>{//10
    if ($(nodo).val() == '') {//10
      v++;//2
      $(nodo).addClass('invalid');//6
    } else {//2
      $(nodo).removeClass('invalid');//6
    }
  });
  return v==0 ? true : false;//8
}

function efectuar_consulta_saldo(){//4
  if (validar_campo('consultar_saldo')) {//6
    mostrar_modal_saldo();//2
  } else {//2
    M.toast({html:'Faltan datos para la consulta de saldo',classes:'red'});//10
  }
}

function mostrar_modal_saldo(){//4
  $("#titulo_modal").html('');//5
  $("#titulo_modal").html('CONSULTA DE SALDO');//6
  $("#titulo_modal").append(`<br><span >Cuenta N° ${$("#cuenta_consultar_saldo").val()} </span>`);//19
  $("#titulo_modal").append(`<br><span >Fecha ${(new Date()).getDate()}/${parseInt((new Date()).getMonth()) + 1 }/${(new Date()).getFullYear()}  Hora ${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()} </span>`);//63
  $("#titulo_modal").append(`<br><em><span style="color:#386c86;font-size:30px">Saldo actual = $${totalizar()}</span></em>`);//27
  abrir_modal_solamente()//2
}
//total 1921
//luego de la depuración  1864
