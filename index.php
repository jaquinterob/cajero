<!DOCTYPE html>
<html lang=es dir="ltr">
<head>
  <meta name="viewport" content="width=device-width, user-scalable=no">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
  <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>
  <meta charset="utf-8">
  <title>Cajero</title>
</head>
<body>
  <style type="text/css" src="estilo.css">
  body,html{
    height:100%; /*Siempre es necesario cuando trabajamos con alturas*/
  }
  #inferior{
    color: #FFF;
    background: rgba(156, 156, 156, 0.7);
    position:fixed; /*El div será ubicado con relación a la pantalla*/
    left:0px; /*A la derecha deje un espacio de 0px*/
    right:0px; /*A la izquierda deje un espacio de 0px*/
    bottom:0px; /*Abajo deje un espacio de 0px*/
    height:80px; /*alto del div*/
    z-index:999;
  }
</style>

<div id="modal_recibo" class="modal">
  <div class="modal-content center-align">
    <span style="font-size:20px;color:grey" id="titulo_modal">Iformación de retiro | retiro exitoso</span><br>
  </div>
  <div class="modal-footer">
    <a href="#!" class="modal-close waves-effect waves-green btn-flat">Entendido</a>
  </div>
</div>
<div style="margin-top:4%" class="row">
  <div class="col s12 m8 offset-m2 l4 offset-l4">
    <div class="card">
      <div class="card-content">
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
              <label for="tarjeta_retirar">Ingrese Número de tarjeta</label>
            </div>
            <div class="input-field col s8 offset-s2 ">
              <input  id="clave_retirar" type="number" class="validate retirar  campo">
              <label for="clave_retirar">Ingrese clave</label>
            </div>
            <div class="input-field col s4 offset-s4">
              <input  id="pin_retirar" type="password" class="validate retirar  campo">
              <label for="pin_retirar">Ingrese PIN</label>
            </div>
            <div class="input-field col s8 offset-s2">
              <input style="font-size:30px;color:red"  id="valor_retirar" type="number" class="validate retirar campo">
              <label for="valor_retirar">Ingrese VALOR A RETIRAR</label>
            </div>
            <div class="input-field col s12 center-align">
              <a onclick="efectuar_retiro('retirar')" class="waves-effect waves-light btn blue">Retirar</a>
            </div>
          </div>

          <div class="ocultar col s10 offset-s1" id="consultar_saldo">
            <div class="input-field col s12">
              <input  id="cuenta_consultar_saldo" type="text" class="validate  campo">
              <label for="cuenta_consultar_saldo">Ingrese Número de cuenta</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div  class="hoverable " id="inferior">
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
      <b><span id="total_disponible"> Total = $80000</span></b>
    </div>
  </div>
</div>
<script type="text/javascript" src="js.js"></script>
</body>
</html>