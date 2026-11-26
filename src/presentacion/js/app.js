const day=86400000,now=Date.now();
const P=[
{id:1,cli:"Clínica Dental Sonrisa",pro:"Sitio web + agenda en línea",ciu:"Medellín",est:"curso",res:"Laura G.",ent:3,tot:4800000,pag:[["Anticipo 50%",2400000,-20]]},
{id:2,cli:"Ferretería El Tornillo",pro:"Tienda virtual",ciu:"Cali",est:"riesgo",res:"Andrés P.",ent:2,tot:6500000,pag:[["Anticipo 30%",1950000,-35]]},
{id:3,cli:"Colegio San Gabriel",pro:"Portal institucional",ciu:"Bogotá",est:"curso",res:"Laura G.",ent:18,tot:9200000,pag:[["Anticipo 40%",3680000,-10]]},
{id:4,cli:"Café Origen",pro:"Landing page",ciu:"Bucaramanga",est:"entregado",res:"Nestor",ent:-4,tot:2100000,pag:[["Anticipo 50%",1050000,-30],["Saldo",1050000,-3]]},
{id:5,cli:"Taller Mecánico Rápido",pro:"Sitio corporativo",ciu:"Barranquilla",est:"curso",res:"Andrés P.",ent:25,tot:3400000,pag:[["Anticipo 50%",1700000,-6]]},
{id:6,cli:"Spa Aurora",pro:"Reservas en línea",ciu:"Medellín",est:"entregado",res:"Nestor",ent:-1,tot:5200000,pag:[["Anticipo 50%",2600000,-28]]}];
P.forEach(p=>{p.due=now+p.ent*day;p.log=[["Proyecto creado","—"]];p.pag=p.pag.map(x=>[x[0],x[1],now+x[2]*day])});
const EST={curso:"En curso",riesgo:"En riesgo",entregado:"Entregado",pagado:"Pagado"};
const $=s=>document.querySelector(s),cop=n=>"$"+Math.round(n).toLocaleString("es-CO");
const fd=t=>new Date(t).toLocaleDateString("es-CO",{day:"2-digit",month:"short"});
const paid=p=>p.pag.reduce((a,x)=>a+x[1],0),days=p=>Math.ceil((p.due-now)/day);
const isDue=p=>p.est!=="entregado"&&p.est!=="pagado"&&days(p)<=5;
let view="team",fc="",fe="",fp="",sel=null,adding=false;
function row(p){const pc=Math.round(paid(p)/p.tot*100),d=days(p);
return `<div class="row ${isDue(p)?"due":""}" data-id="${p.id}"><div><h3>${p.cli}</h3><small>${p.pro}</small></div>
<div><span class="badge b-${p.est}">${EST[p.est]}</span><br><small>${p.ciu}</small></div>
<div><small>Entrega</small><br><b>${fd(p.due)}</b>${isDue(p)?` <span class="badge b-riesgo">${d<0?"vencido":d+" d"}</span>`:""}</div>
<div><small>Pagado ${cop(paid(p))} de ${cop(p.tot)}</small><div class="prog"><i style="width:${pc}%"></i></div></div></div>`}
function team(){const act=P.filter(p=>p.est==="curso"||p.est==="riesgo"),pend=P.reduce((a,p)=>a+p.tot-paid(p),0),due=P.filter(isDue);
const list=P.filter(p=>(!fc||p.ciu===fc)&&(!fe||p.est===fe)&&(!fp||(fp==="pend"?paid(p)<p.tot:paid(p)>=p.tot)));
const ciu=[...new Set(P.map(p=>p.ciu))];
return `<section class="kpis"><div class="kpi"><span>Proyectos activos</span><b>${act.length}</b></div>
<div class="kpi al"><span>Pagos pendientes</span><b>${cop(pend)}</b></div>
<div class="kpi al"><span>Próximos a vencer (≤5 días)</span><b>${due.length}</b></div></section>
<div class="bar"><select id="fc"><option value="">Todas las ciudades</option>${ciu.map(c=>`<option ${c===fc?"selected":""}>${c}</option>`).join("")}</select>
<select id="fe"><option value="">Todos los estados</option>${Object.keys(EST).map(k=>`<option value="${k}" ${k===fe?"selected":""}>${EST[k]}</option>`).join("")}</select>
<select id="fp"><option value="">Todos los pagos</option><option value="pend" ${fp==="pend"?"selected":""}>Con saldo pendiente</option><option value="ok" ${fp==="ok"?"selected":""}>Pagados al 100%</option></select>
<span class="sp"></span><button class="btn" id="add">+ Nuevo proyecto</button></div>
<div class="list">${list.map(row).join("")||'<p class="note">Sin resultados para este filtro.</p>'}</div>
${adding?form():""}${sel?detail(P.find(p=>p.id===sel)):""}`}
function detail(p){return `<section class="panel" id="det"><h2>${p.cli} · ${p.pro}</h2>
<div class="g2"><label>Estado<select id="se">${Object.keys(EST).map(k=>`<option value="${k}" ${k===p.est?"selected":""}>${EST[k]}</option>`).join("")}</select></label>
<label>Comentario del cambio<input id="sc" placeholder="Ej.: cliente aprobó diseño"></label></div>
<div><button class="btn" id="sg">Guardar cambio</button> <button class="btn sec" id="cl">Cerrar</button></div>
<div class="g2"><label>Registrar pago (COP)<input id="pm" type="number" placeholder="Monto"></label><label>Concepto<input id="pc" placeholder="Ej.: Abono 2"></label></div>
<div><button class="btn" id="pg">Registrar pago</button></div>
<h3>Historial de pagos</h3>${hist(p)}<h3>Bitácora de cambios</h3>
<table>${p.log.map(l=>`<tr><td>${l[0]}</td><td>${l[1]}</td></tr>`).join("")}</table></section>`}
function hist(p){return `<table><tr><th>Fecha</th><th>Concepto</th><th>Monto</th></tr>${p.pag.map(x=>`<tr><td>${fd(x[2])}</td><td>${x[0]}</td><td>${cop(x[1])}</td></tr>`).join("")}
<tr><th></th><th>Saldo pendiente</th><th>${cop(p.tot-paid(p))}</th></tr></table>`}
function form(){return `<section class="panel" id="frm"><h2>Nuevo proyecto</h2><b>1. Cliente</b><div class="g2"><label>Nombre del cliente<input id="nc"></label><label>Ciudad<input id="nu"></label></div>
<b>2. Proyecto</b><div class="g2"><label>Descripción<input id="np"></label><label>Fecha de entrega<input id="nf" type="date"></label></div>
<b>3. Condiciones de pago</b><div class="g2"><label>Valor total (COP)<input id="nt" type="number"></label><label>Anticipo (COP)<input id="na" type="number"></label></div>
<div><button class="btn" id="ns">Crear proyecto</button> <button class="btn sec" id="nx">Cancelar</button></div></section>`}
function client(){const p=P.find(x=>x.id===1);return `<section class="panel"><h2>Hola, ${p.cli}</h2><p class="note">Esta es la vista de solo lectura que recibe el cliente mediante un enlace compartido.</p>
<div class="kpis"><div class="kpi"><span>Proyecto</span><b style="font-size:17px">${p.pro}</b></div><div class="kpi"><span>Estado</span><b style="font-size:17px">${EST[p.est]}</b></div><div class="kpi"><span>Entrega estimada</span><b style="font-size:17px">${fd(p.due)}</b></div></div>
<h3>Historial de pagos</h3>${hist(p)}</section>`}
function render(){$("#app").innerHTML=view==="team"?team():client();$("#vTeam").className=view==="team"?"on":"";$("#vClient").className=view==="client"?"on":"";bind()}
function bind(){const g=s=>$(s);
document.querySelectorAll(".row").forEach(r=>r.onclick=()=>{sel=+r.dataset.id;adding=false;render();$("#det").scrollIntoView({behavior:"smooth"})});
if(g("#fc")){g("#fc").onchange=e=>{fc=e.target.value;render()};g("#fe").onchange=e=>{fe=e.target.value;render()};g("#fp").onchange=e=>{fp=e.target.value;render()};g("#add").onclick=()=>{adding=true;sel=null;render()}}
if(g("#sg"))g("#sg").onclick=()=>{const p=P.find(x=>x.id===sel),n=g("#se").value;p.log.unshift([`${EST[p.est]} → ${EST[n]}${g("#sc").value?": "+g("#sc").value:""}`,fd(Date.now())]);p.est=n;render()};
if(g("#pg"))g("#pg").onclick=()=>{const p=P.find(x=>x.id===sel),m=+g("#pm").value;if(m>0){p.pag.push([g("#pc").value||"Abono",m,Date.now()]);render()}};
if(g("#cl"))g("#cl").onclick=()=>{sel=null;render()};
if(g("#nx"))g("#nx").onclick=()=>{adding=false;render()};
if(g("#ns"))g("#ns").onclick=()=>{const c=g("#nc").value.trim();if(!c)return g("#nc").focus();const f=g("#nf").value;
const id=P.length+1,tot=+g("#nt").value||0,an=+g("#na").value||0;P.unshift({id,cli:c,pro:g("#np").value||"Proyecto web",ciu:g("#nu").value||"—",est:"curso",res:"—",due:f?new Date(f+"T12:00").getTime():Date.now()+30*day,tot,pag:an?[["Anticipo",an,Date.now()]]:[],log:[["Proyecto creado",fd(Date.now())]]});adding=false;render()}}
$("#vTeam").onclick=()=>{view="team";render()};$("#vClient").onclick=()=>{view="client";render()};
render();
