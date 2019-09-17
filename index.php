<!DOCTYPE html> <!--2-->
<html lang=es dir="ltr">  <!--8-->
<head> <!--2-->
  <link rel="icon" type="image/png" href="favicon.png" />  <!--11-->
  <link rel=”shortcut icon” type=”image/png” href=”favicon.png”/>  <!--11-->
  <meta name="viewport" content="width=device-width, user-scalable=no">  <!--13-->
  <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script> <!--9-->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"> <!--9-->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script> <!--8-->
  <meta charset="utf-8">  <!--5-->
  <title>Cajero</title>  <!--5-->
</head> 
<body> <!--2-->
  <style type="text/css"> /*2*/
  body,html{ /*3*/
    height:100%; /*3*/
  }
  #inferior{ /*3*/
    color: #FFF; /*4*/
    background: rgba(156, 156, 156, 0.7);  /*8*/
    position:fixed;/*3*/
    left:0px; /*3*/
    right:0px; /*3*/
    bottom:0px; /*3*/
    height:80px; /*3*/
    z-index:999;/*5*/
  }
</style>

<div id="modal_recibo" class="modal">   <!--8-->
  <div class="modal-content center-align">  <!--5-->
    <span style="font-size:20px;color:grey" id="titulo_modal">Iformación de retiro | retiro exitoso</span><br> <!--15-->
  </div>
  <div class="modal-footer"> <!--5-->
    <a onclick="terminar_transaccion()" href="#!" class="modal-close waves-effect waves-green btn-flat">Entendido</a> <!--12-->
  </div>
</div>
<div style="margin-top:4%" class="row"> <!--8-->
  <div style="font-family:Helvetica;color:#b2b5b7;font-size:9px;text-align: justify" class="col l3 offset-l1  hide-on-med-and-down"> <!--17-->
    <h6>Taller de Análisis de algoritmos</h6>  <!--3-->
    <span style="font-size:11px"> <p>Por: <br> <!--11-->
      John Quintero <br> <!--3-->
      Miguel Pérez <br>  <!--3-->
      Johnatan Meneses <br><br>  <!--5-->
      Docente:<br> <!--4-->
      Ing. Luis Fernando Londono Lopez <br><br> <!--5-->
       Repositorio Público:<br>  <!--4-->
      <a href="https://github.com/jaquinterob/cajero">https://github.com/jaquinterob/cajero</a><br><br>  <!--7-->
      Institución Universitaria de Envigado <br> <!--3-->
      Agosto 2019</p>  <!--1-->
    </span>
  </div>
  <div class="col s12 m8 offset-m2 l4 ">  <!--5-->
    <div class="card">  <!--5-->
      <div class="card-content">  <!--5-->
        <span class="card-title center-align">Cajero automático</span>
        <p class="center-align">Bienvenido</p>
        <div class="row">
          <div class="input-field col s10 offset-s1">
            <select class="campo" id="tipo_transaccion">
              <option value="" disabled selected>Seleccione</option>
              <option value="consignar">Consignar</option>
              <option value="retirar">Retirar</option>
              <option value="consultar_saldo">Consultar saldo</option>
            </select>
            <label>Seleccione tipo de transacción</label>
          </div>
          <div id="contenedor_tipo_cuenta" class="input-field col s10 offset-s1 ocultar">
            <select class="campo" id="tipo_cuenta">
              <option value="" disabled selected>Seleccione</option>
              <option value="ahorros">Ahorros</option>
              <option value="corriente">Corriente</option>
            </select>
            <label for="tipo_cuenta">Seleccione tipo de cuenta</label>
          </div>
          <div class="ocultar col s10 offset-s1" id="consignar">
            <div class="input-field col s12">
              <input  id="cuenta_consignar" type="number" class="validate numero_cuenta campo">
              <label for="cuenta_consignar">Ingrese Cuenta destino</label>
            </div>
            <div class="input-field col s10 offset-s1">
              <input  id="billetes_10" type="number" class="validate campo">
              <label for="billetes_10"># de billetes de $10.000</label>
            </div>
            <div class="input-field col s10 offset-s1">
              <input  id="billetes_20" type="number" class="validate campo">
              <label for="billetes_20"># de billetes de $20.000</label>
            </div>
            <div class="input-field col s10 offset-s1">
              <input  id="billetes_50" type="number"class="validate campo">
              <label for="billetes_50"># de billetes de $50.000</label>
            </div>
            <div class="input-field col s12 center-align">
              <a onclick="efectuar_consignacion()" class="waves-effect waves-light btn blue">Consignar</a>
            </div>
          </div>
          <div  class="ocultar col s10 offset-s1" id="retirar">
            <div class="input-field col s8 offset-s2">
              <input  id="tarjeta_retirar" type="number" class="validate  retirar   campo">
              <label for="tarjeta_retirar"> N° tarjeta</label>
            </div>
            <div class="input-field col s4 offset-s4">
              <input  id="pin_retirar" type="password" class="validate retirar  campo">
              <label for="pin_retirar">PIN</label>
            </div>
            <div class="input-field col s8 offset-s2">
              <input style="font-size:30px;color:red"  id="valor_retirar" type="number" class="validate retirar campo">
              <label for="valor_retirar">Monto retiro</label>
            </div>
            <div class="input-field col s12 center-align">
              <a onclick="efectuar_retiro('retirar')" class="waves-effect waves-light btn blue">Retirar</a>
            </div>
          </div>
          <div class="ocultar col s10 offset-s1" id="consultar_saldo">
            <div class="input-field col s12">
              <input  id="cuenta_consultar_saldo" type="number" class="validate consultar_saldo  campo">
              <label for="cuenta_consultar_saldo">N° tarjeta</label>
            </div>
            <div class="input-field col s4 offset-s4">
              <input  id="pin_consultar_saldo" type="password" class="validate consultar_saldo  campo">
              <label for="pin_consultar_saldo">PIN</label>
            </div>
            <div class="input-field col s12 center-align">
              <a onclick="efectuar_consulta_saldo()" class="waves-effect waves-light btn blue">Consultar</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div style="font-family:Helvetica;color:#b2b5b7;font-size:9px;text-align: justify" class="col  l2 offset-l1 hide-on-med-and-down	">
    Actividad 1. 12 %<br><br>
    Realizar el algoritmo, diagrama de flujo y programación en Código para el siguiente ejercicio. <br><br>
    Se tiene un cajero automático que recibe consignaciones, realiza retiros y entrega saldos para dos tipo de
    cuentas; 1 Cuenta corriente 2 Cuenta de Ahorros. <br><br>
    Para consignación debe validar cuentas de 11 digito y valor a consignar. Leer dinero y ubicarlo en cajas de
    dinero. Contar billetes que ingresan de 10,000 cajón 1, billetes de 20.000 cajón 2, billetes de 50.000 cajón
    3. y debe sumar del valor que tiene el cajero. <br><br>
    Para el retiro y el saldo debe solicitar tarjeta, clave y pin. Debe consultar si la cuenta tiene saldo y
    descontarlo. Para retiro debe Descontar billetes que salen de 10,000 cajón 1, billetes de 20.000 cajón 2,
    billetes de 50.000 cajón 3. y debe restar del valor que tiene el cajero. <br><br>
    Por ultimo debe entregar recibo de la operación.
  </div>
  <div  class="hoverable" id="inferior">
    <div style="margin-top:2%" class="row">
      <div  class="col  s3 m2 offset-m2 blue center-align">
        <span id="mostrar_billetes_10"> Billetes de 10.000 = 1</span>
      </div>
      <div class="col s3 m2  green center-align">
        <span id="mostrar_billetes_20"> Billetes de 20.000 = 1</span>
      </div>
      <div class="col s3 m2 purple center-align">
        <span id="mostrar_billetes_50"> Billetes de 50.000 = 1</span>
      </div>
      <div class="col s3  m2 offset-m1 red center-align">
        <b><span id="total_disponible"> Saldo = $80000</span></b>
      </div>
    </div>
  </div>
  <script type="text/javascript" src="js.js"></script>
</body>
</html>
