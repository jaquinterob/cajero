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
        <span class="card-title center-align">Cajero automático</span>  <!--6-->
        <p class="center-align">Bienvenido</p> <!--6-->
        <div class="row"> <!--5-->
          <div class="input-field col s10 offset-s1"> <!--5-->
            <select class="campo" id="tipo_transaccion"> <!--8-->
              <option value="" disabled selected>Seleccione</option> <!--8-->
              <option value="consignar">Consignar</option>  <!--6-->
              <option value="retirar">Retirar</option>  <!--6-->
              <option value="consultar_saldo">Consultar saldo</option>  <!--6-->
            </select>
            <label>Seleccione tipo de transacción</label> <!--3-->
          </div>
          <div id="contenedor_tipo_cuenta" class="input-field col s10 offset-s1 ocultar">  <!--7-->
            <select class="campo" id="tipo_cuenta">  <!--8-->
              <option value="" disabled selected>Seleccione</option>  <!--5-->
              <option value="ahorros">Ahorros</option>  <!--6-->
              <option value="corriente">Corriente</option>  <!--6-->
            </select>
            <label for="tipo_cuenta">Seleccione tipo de cuenta</label>  <!--6-->
          </div>
          <div class="ocultar col s10 offset-s1" id="consignar">  <!--8-->
            <div class="input-field col s12">  <!--5-->
              <input  id="cuenta_consignar" type="number" class="validate numero_cuenta campo">  <!--11-->
              <label for="cuenta_consignar">Ingrese Cuenta destino</label> <!--6-->
            </div>
            <div class="input-field col s10 offset-s1">  <!--5-->
              <input  id="billetes_10" type="number" class="validate campo">  <!--11-->
              <label for="billetes_10"># de billetes de $10.000</label> <!--8-->
            </div>
            <div class="input-field col s10 offset-s1">  <!--5-->
              <input  id="billetes_20" type="number" class="validate campo">  <!--10-->
              <label for="billetes_20"># de billetes de $20.000</label>  <!--7-->
            </div>
            <div class="input-field col s10 offset-s1"> <!--5-->
              <input  id="billetes_50" type="number"class="validate campo"> <!--10-->
              <label for="billetes_50"># de billetes de $50.000</label> <!--6-->
            </div>
            <div class="input-field col s12 center-align">  <!--5-->
              <a onclick="efectuar_consignacion()" class="waves-effect waves-light btn blue">Consignar</a>  <!--9-->
            </div>
          </div>
          <div  class="ocultar col s10 offset-s1" id="retirar">  <!--8-->
            <div class="input-field col s8 offset-s2"> <!--5-->
              <input  id="tarjeta_retirar" type="number" class="validate  retirar   campo">  <!--11-->
              <label for="tarjeta_retirar"> N° tarjeta</label> <!--6-->
            </div>
            <div class="input-field col s4 offset-s4"> <!--4-->
              <input  id="pin_retirar" type="password" class="validate retirar  campo"> <!--11-->
              <label for="pin_retirar">PIN</label> <!--7-->
            </div>
            <div class="input-field col s8 offset-s2"> <!--4-->
              <input style="font-size:30px;color:red"  id="valor_retirar" type="number" class="validate retirar campo"> <!--19-->
              <label for="valor_retirar">Monto retiro</label> <!--6-->
            </div>
            <div class="input-field col s12 center-align"> <!--5-->
              <a onclick="efectuar_retiro('retirar')" class="waves-effect waves-light btn blue">Retirar</a> <!--11-->
            </div>
          </div>
          <div class="ocultar col s10 offset-s1" id="consultar_saldo"> <!--8-->
            <div class="input-field col s12"> <!--5-->
              <input  id="cuenta_consultar_saldo" type="number" class="validate consultar_saldo  campo"> <!--11-->
              <label for="cuenta_consultar_saldo">N° tarjeta</label> <!--6-->
            </div>
            <div class="input-field col s4 offset-s4"> <!--5-->
              <input  id="pin_consultar_saldo" type="password" class="validate consultar_saldo  campo"> <!--11-->
              <label for="pin_consultar_saldo">PIN</label> <!--7-->
            </div>
            <div class="input-field col s12 center-align"> <!--5-->
              <a onclick="efectuar_consulta_saldo()" class="waves-effect waves-light btn blue">Consultar</a> <!--10-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div style="font-family:Helvetica;color:#b2b5b7;font-size:9px;text-align: justify" class="col  l2 offset-l1 hide-on-med-and-down	"> <!--18-->
    Actividad 1. 12 %<br><br> <!--5-->
    Realizar el algoritmo, diagrama de flujo y programación en Código para el siguiente ejercicio. <br><br> <!--5-->
    Se tiene un cajero automático que recibe consignaciones, realiza retiros y entrega saldos para dos tipo de <!--1-->
    cuentas; 1 Cuenta corriente 2 Cuenta de Ahorros. <br><br> <!--5-->
    Para consignación debe validar cuentas de 11 digito y valor a consignar. Leer dinero y ubicarlo en cajas de <!--1-->
    dinero. Contar billetes que ingresan de 10,000 cajón 1, billetes de 20.000 cajón 2, billetes de 50.000 cajón <!--1-->
    3. y debe sumar del valor que tiene el cajero. <br><br> <!--5-->
    Para el retiro y el saldo debe solicitar tarjeta, clave y pin. Debe consultar si la cuenta tiene saldo y <!--1-->
    descontarlo. Para retiro debe Descontar billetes que salen de 10,000 cajón 1, billetes de 20.000 cajón 2, <!--1-->
    billetes de 50.000 cajón 3. y debe restar del valor que tiene el cajero. <br><br> <!--5-->
    Por ultimo debe entregar recibo de la operación.<!--1-->
  </div>
  <div  class="hoverable" id="inferior"> <!--8-->
    <div style="margin-top:2%" class="row"> <!--10-->
      <div  class="col  s3 m2 offset-m2 blue center-align"> <!--5-->
        <span id="mostrar_billetes_10"> Billetes de 10.000 = 1</span> <!--8-->
      </div>
      <div class="col s3 m2  green center-align"> <!--5-->
        <span id="mostrar_billetes_20"> Billetes de 20.000 = 1</span> <!--8-->
      </div>
      <div class="col s3 m2 purple center-align"> <!--5-->
        <span id="mostrar_billetes_50"> Billetes de 50.000 = 1</span> <!--8-->
      </div>
      <div class="col s3  m2 offset-m1 red center-align"> <!--5-->
        <b><span id="total_disponible"> Saldo = $80000</span></b> <!--10-->
      </div>
    </div>
  </div>
  <script type="text/javascript" src="js.js"></script> <!--8-->
</body>
</html>
<!--total 764-->
