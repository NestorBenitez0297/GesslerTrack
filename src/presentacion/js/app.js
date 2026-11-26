/* Capa de presentación — Gessler Track
 * Dibuja la interfaz y delega reglas en GT.logica y almacenamiento en GT.persistencia.
 */
(function () {
"use strict";
const L = GT.logica, repo = GT.persistencia.crear();
const { DIA, ESTADOS: EST, cop } = L, esc = L.escapar;
const now = Date.now();

function semilla() {
  const P = [
  {id:1,cli:"Clínica Dental Sonrisa",pro:"Sitio web + agenda en línea",ciu:"Medellín",est:"curso",res:"Laura G.",ent:3,tot:4800000,pag:[["Anticipo 50%",2400000,-20]]},
  {id:2,cli:"Ferretería El Tornillo",pro:"Tienda virtual",ciu:"Cali",est:"riesgo",res:"Andrés P.",ent:2,tot:6500000,pag:[["Anticipo 30%",1950000,-35]]},
  {id:3,cli:"Colegio San Gabriel",pro:"Portal institucional",ciu:"Bogotá",est:"curso",res:"Laura G.",ent:18,tot:9200000,pag:[["Anticipo 40%",3680000,-10]]},
  {id:4,cli:"Café Origen",pro:"Landing page",ciu:"Bucaramanga",est:"entregado",res:"Nestor",ent:-4,tot:2100000,pag:[["Anticipo 50%",1050000,-30],["Saldo",1050000,-3]]},
  {id:5,cli:"Taller Mecánico Rápido",pro:"Sitio corporativo",ciu:"Barranquilla",est:"curso",res:"Andrés P.",ent:25,tot:3400000,pag:[["Anticipo 50%",1700000,-6]]},
  {id:6,cli:"Spa Aurora",pro:"Reservas en línea",ciu:"Medellín",est:"entregado",res:"Nestor",ent:-1,tot:5200000,pag:[["Anticipo 50%",2600000,-28]]}];
  P.forEach(p => { p.due = now + p.ent * DIA; delete p.ent; p.log = [["Proyecto creado", "—"]]; p.pag = p.pag.map(x => [x[0], x[1], now + x[2] * DIA]); });
  return P;
}

let P = repo.cargar(semilla);
let view = "team", fc = "", fe = "", fp = "", sel = null, adding = false, errores = [], erroresPago = [];
const $ = s => document.querySelector(s);
const fd = t => (typeof t === "number" ? new Date(t).toLocaleDateString("es-CO", { day: "2-digit", month: "short" }) : esc(t));
const guardar = () => repo.guardar(P);
const avisos = e => (e.length ? `<div class="err" role="alert">${e.map(m => `<div>${esc(m)}</div>`).join("")}</div>` : "");

function row(p) {
  const pc = L.porcentajePagado(p), d = L.diasRestantes(p, now), due = L.proximoAVencer(p, now);
  return `<div class="row ${due ? "due" : ""}" data-id="${p.id}"><div><h3>${esc(p.cli)}</h3><small>${esc(p.pro)}</small></div>
<div><span class="badge b-${p.est}">${EST[p.est]}</span><br><small>${esc(p.ciu)}</small></div>
<div><small>Entrega</small><br><b>${fd(p.due)}</b>${due ? ` <span class="badge b-riesgo">${d < 0 ? "vencido" : d + " d"}</span>` : ""}</div>
<div><small>Pagado ${cop(L.pagado(p))} de ${cop(p.tot)}</small><div class="prog"><i style="width:${pc}%"></i></div></div></div>`;
}

function team() {
  const k = L.indicadores(P, now);
  const list = L.filtrar(P, { ciudad: fc, estado: fe, pago: fp });
  const ciu = [...new Set(P.map(p => p.ciu))];
  return `<section class="kpis"><div class="kpi"><span>Proyectos activos</span><b>${k.activos}</b></div>
<div class="kpi al"><span>Pagos pendientes</span><b>${cop(k.pendiente)}</b></div>
<div class="kpi al"><span>Próximos a vencer (≤${L.DIAS_ALERTA} días)</span><b>${k.porVencer}</b></div></section>
<div class="bar"><select id="fc" aria-label="Ciudad"><option value="">Todas las ciudades</option>${ciu.map(c => `<option value="${esc(c)}" ${c === fc ? "selected" : ""}>${esc(c)}</option>`).join("")}</select>
<select id="fe" aria-label="Estado"><option value="">Todos los estados</option>${Object.keys(EST).map(k => `<option value="${k}" ${k === fe ? "selected" : ""}>${EST[k]}</option>`).join("")}</select>
<select id="fp" aria-label="Pago"><option value="">Todos los pagos</option><option value="pend" ${fp === "pend" ? "selected" : ""}>Con saldo pendiente</option><option value="ok" ${fp === "ok" ? "selected" : ""}>Pagados al 100%</option></select>
<span class="sp"></span><button class="btn sec" id="rst" title="Borra los cambios guardados y recarga los datos de demostración">Restablecer demo</button><button class="btn" id="add">+ Nuevo proyecto</button></div>
<div class="list">${list.map(row).join("") || '<p class="note">Sin resultados para este filtro.</p>'}</div>
${adding ? form() : ""}${sel ? detail(P.find(p => p.id === sel)) : ""}`;
}

function detail(p) {
  return `<section class="panel" id="det"><h2>${esc(p.cli)} · ${esc(p.pro)}</h2>
<div class="g2"><label>Estado<select id="se">${Object.keys(EST).map(k => `<option value="${k}" ${k === p.est ? "selected" : ""}>${EST[k]}</option>`).join("")}</select></label>
<label>Comentario del cambio<input id="sc" placeholder="Ej.: cliente aprobó diseño"></label></div>
<div><button class="btn" id="sg">Guardar cambio</button> <button class="btn sec" id="cl">Cerrar</button></div>
${avisos(erroresPago)}<div class="g2"><label>Registrar pago (COP)<input id="pm" type="number" min="1" placeholder="Monto"></label><label>Concepto<input id="pc" placeholder="Ej.: Abono 2"></label></div>
<div><button class="btn" id="pg">Registrar pago</button></div>
<h3>Historial de pagos</h3>${hist(p)}<h3>Bitácora de cambios</h3>
<table>${p.log.map(l => `<tr><td>${esc(l[0])}</td><td>${fd(l[1])}</td></tr>`).join("")}</table></section>`;
}

function hist(p) {
  return `<table><tr><th>Fecha</th><th>Concepto</th><th>Monto</th></tr>${p.pag.map(x => `<tr><td>${fd(x[2])}</td><td>${esc(x[0])}</td><td>${cop(x[1])}</td></tr>`).join("")}
<tr><th></th><th>Saldo pendiente</th><th>${cop(L.saldo(p))}</th></tr></table>`;
}

function form() {
  return `<section class="panel" id="frm"><h2>Nuevo proyecto</h2>${avisos(errores)}<b>1. Cliente</b><div class="g2"><label>Nombre del cliente *<input id="nc"></label><label>Ciudad<input id="nu"></label></div>
<b>2. Proyecto</b><div class="g2"><label>Descripción<input id="np"></label><label>Fecha de entrega<input id="nf" type="date"></label></div>
<b>3. Condiciones de pago</b><div class="g2"><label>Valor total (COP) *<input id="nt" type="number" min="1"></label><label>Anticipo (COP)<input id="na" type="number" min="0"></label></div>
<div><button class="btn" id="ns">Crear proyecto</button> <button class="btn sec" id="nx">Cancelar</button></div></section>`;
}

function client() {
  const p = P.find(x => x.id === 1) || P[P.length - 1];
  return `<section class="panel"><h2>Hola, ${esc(p.cli)}</h2><p class="note">Esta es la vista de solo lectura que recibe el cliente mediante un enlace compartido.</p>
<div class="kpis"><div class="kpi"><span>Proyecto</span><b style="font-size:17px">${esc(p.pro)}</b></div><div class="kpi"><span>Estado</span><b style="font-size:17px">${EST[p.est]}</b></div><div class="kpi"><span>Entrega estimada</span><b style="font-size:17px">${fd(p.due)}</b></div></div>
<h3>Historial de pagos</h3>${hist(p)}</section>`;
}

function render() {
  $("#app").innerHTML = view === "team" ? team() : client();
  $("#vTeam").className = view === "team" ? "on" : "";
  $("#vClient").className = view === "client" ? "on" : "";
  bind();
}

function bind() {
  const g = s => $(s);
  document.querySelectorAll(".row").forEach(r => r.onclick = () => { sel = +r.dataset.id; adding = false; erroresPago = []; render(); $("#det").scrollIntoView({ behavior: "smooth" }); });
  if (g("#fc")) {
    g("#fc").onchange = e => { fc = e.target.value; render(); };
    g("#fe").onchange = e => { fe = e.target.value; render(); };
    g("#fp").onchange = e => { fp = e.target.value; render(); };
    g("#add").onclick = () => { adding = true; sel = null; errores = []; render(); };
    g("#rst").onclick = () => { repo.reiniciar(); P = repo.cargar(semilla); sel = null; adding = false; render(); };
  }
  if (g("#sg")) g("#sg").onclick = () => {
    const p = P.find(x => x.id === sel), n = g("#se").value;
    if (L.validarEstado(n).length || n === p.est) return;
    L.cambiarEstado(p, n, g("#sc").value.trim(), Date.now()); guardar(); render();
  };
  if (g("#pg")) g("#pg").onclick = () => {
    const p = P.find(x => x.id === sel), m = +g("#pm").value;
    erroresPago = L.validarPago(p, m);
    if (!erroresPago.length) { L.registrarPago(p, g("#pc").value.trim(), m, Date.now()); guardar(); }
    render();
  };
  if (g("#cl")) g("#cl").onclick = () => { sel = null; render(); };
  if (g("#nx")) g("#nx").onclick = () => { adding = false; errores = []; render(); };
  if (g("#ns")) g("#ns").onclick = () => {
    const d = { cliente: g("#nc").value, ciudad: g("#nu").value, descripcion: g("#np").value, entrega: g("#nf").value, total: +g("#nt").value || 0, anticipo: +g("#na").value || 0 };
    errores = L.validarProyecto(d);
    if (errores.length) {
      const v = { nc: d.cliente, nu: d.ciudad, np: d.descripcion, nf: d.entrega, nt: g("#nt").value, na: g("#na").value };
      render(); Object.keys(v).forEach(k => g("#" + k).value = v[k]); return;
    }
    const id = Math.max(0, ...P.map(p => p.id)) + 1;
    P.unshift(L.crearProyecto(d, id, Date.now())); guardar(); adding = false; render();
  };
}

$("#vTeam").onclick = () => { view = "team"; render(); };
$("#vClient").onclick = () => { view = "client"; render(); };
render();
})();
