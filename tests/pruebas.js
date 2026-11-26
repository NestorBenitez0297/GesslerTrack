/* Casos de prueba — Gessler Track
 * Un caso por criterio de aceptación de cada historia de usuario (Anexo C del informe técnico).
 * Se ejecutan abriendo tests/index.html en el navegador.
 */
(function (global) {
  "use strict";
  const L = global.GT.logica, R = global.GT.persistencia;
  const AHORA = Date.UTC(2026, 10, 26, 12), DIA = L.DIA;
  const proyecto = (o = {}) => Object.assign({ id: 1, cli: "Cliente", pro: "Sitio", ciu: "Cali", est: "curso", res: "—", due: AHORA + 10 * DIA, tot: 1000000, pag: [], log: [] }, o);
  const datosValidos = (o = {}) => Object.assign({ cliente: "Café Origen", ciudad: "Bogotá", descripcion: "Landing", entrega: "2026-12-20", total: 2000000, anticipo: 500000 }, o);

  const casos = [];
  const caso = (id, historia, pasos, esperado, fn) => casos.push({ id, historia, pasos, esperado, fn });
  function igual(a, b) { if (JSON.stringify(a) !== JSON.stringify(b)) throw new Error("Se obtuvo " + JSON.stringify(a) + ", se esperaba " + JSON.stringify(b)); }
  function cierto(v, m) { if (!v) throw new Error(m || "La condición no se cumple"); }

  /* HU Clientes / Proyectos */
  caso("CP-01", "Registrar cliente y proyecto", "Ingresar datos válidos y guardar", "Se crea el proyecto con el cliente, en estado En curso y con su anticipo",
    () => { const d = datosValidos(); igual(L.validarProyecto(d), []); const p = L.crearProyecto(d, 7, AHORA);
      igual([p.id, p.cli, p.est, L.pagado(p)], [7, "Café Origen", "curso", 500000]); });
  caso("CP-02", "Registrar cliente y proyecto", "Guardar con el nombre del cliente vacío", "El sistema muestra un mensaje de error claro",
    () => igual(L.validarProyecto(datosValidos({ cliente: "   " })), ["El nombre del cliente es obligatorio."]));
  caso("CP-03", "Registrar cliente y proyecto", "Guardar con valor total 0", "Mensaje: el valor total debe ser mayor que cero",
    () => igual(L.validarProyecto(datosValidos({ total: 0, anticipo: 0 })), ["El valor total debe ser mayor que cero."]));
  caso("CP-04", "Registrar cliente y proyecto", "Anticipo mayor que el valor total", "Mensaje: el anticipo no puede superar el valor total",
    () => igual(L.validarProyecto(datosValidos({ total: 100, anticipo: 200 })), ["El anticipo no puede superar el valor total."]));
  caso("CP-05", "Registrar cliente y proyecto", "Crear proyecto sin fecha de entrega", "Se asigna entrega a 30 días",
    () => igual(L.crearProyecto(datosValidos({ entrega: "" }), 1, AHORA).due, AHORA + 30 * DIA));

  /* HU Proyectos: estados y bitácora */
  caso("CP-06", "Cambiar estado", "Pasar de En riesgo a En curso con comentario", "Cambia el estado y queda registrado en la bitácora",
    () => { const p = L.cambiarEstado(proyecto({ est: "riesgo" }), "curso", "cliente aprobó", AHORA);
      igual([p.est, p.log[0][0]], ["curso", "En riesgo → En curso: cliente aprobó"]); });
  caso("CP-07", "Cambiar estado", "Enviar un estado inexistente", "El sistema lo rechaza",
    () => igual(L.validarEstado("borrado"), ["Estado no reconocido."]));

  /* HU Pagos */
  caso("CP-08", "Registrar pago", "Registrar un abono válido", "El saldo pendiente disminuye y se registra en la bitácora",
    () => { const p = L.registrarPago(proyecto(), "Abono 1", 400000, AHORA); igual([L.saldo(p), p.log.length], [600000, 1]); });
  caso("CP-09", "Registrar pago", "Registrar un pago de 0 o negativo", "Mensaje de error y no se registra",
    () => { igual(L.validarPago(proyecto(), 0), ["El monto del pago debe ser mayor que cero."]); igual(L.validarPago(proyecto(), -5).length, 1); });
  caso("CP-10", "Registrar pago", "Registrar un pago mayor que el saldo", "Mensaje de error indicando el saldo",
    () => cierto(/supera el saldo pendiente/.test(L.validarPago(proyecto(), 2000000)[0]), "No avisó que supera el saldo"));
  caso("CP-11", "Registrar pago", "Completar el saldo de un proyecto entregado", "El proyecto pasa automáticamente a Pagado",
    () => igual(L.registrarPago(proyecto({ est: "entregado" }), "Saldo", 1000000, AHORA).est, "pagado"));
  caso("CP-12", "Registrar pago", "Proyecto con valor total 0", "El porcentaje pagado es 0 (sin división por cero)",
    () => igual(L.porcentajePagado(proyecto({ tot: 0 })), 0));

  /* HU Entregables / Seguimiento */
  caso("CP-13", "Tablero de seguimiento", "Proyecto en curso con entrega en 5 días o menos", "Se marca como próximo a vencer",
    () => igual([L.proximoAVencer(proyecto({ due: AHORA + 5 * DIA }), AHORA), L.proximoAVencer(proyecto({ due: AHORA + 6 * DIA }), AHORA)], [true, false]));
  caso("CP-14", "Tablero de seguimiento", "Proyecto entregado con fecha vencida", "No se marca como próximo a vencer",
    () => igual(L.proximoAVencer(proyecto({ est: "entregado", due: AHORA - DIA }), AHORA), false));
  caso("CP-15", "Tablero de seguimiento", "Calcular indicadores de 3 proyectos", "Activos, saldo pendiente y por vencer correctos",
    () => igual(L.indicadores([proyecto(), proyecto({ est: "riesgo", due: AHORA + DIA }), proyecto({ est: "pagado", pag: [["x", 1000000, AHORA]] })], AHORA),
      { activos: 2, pendiente: 2000000, porVencer: 1 }));
  caso("CP-16", "Tablero de seguimiento", "Filtrar por ciudad, estado y saldo pendiente", "Solo quedan los proyectos que cumplen los tres filtros",
    () => igual(L.filtrar([proyecto({ id: 1 }), proyecto({ id: 2, ciu: "Bogotá" }), proyecto({ id: 3, pag: [["x", 1000000, AHORA]] })],
      { ciudad: "Cali", estado: "curso", pago: "pend" }).map(p => p.id), [1]));

  /* HU Acceso */
  caso("CP-17", "Control de acceso", "Rol Cliente intenta registrar pagos o ver el tablero", "El sistema niega el acceso",
    () => igual([L.puede("cliente", "registrar_pago"), L.puede("cliente", "ver_equipo"), L.puede("cliente", "ver_cliente")], [false, false, true]));
  caso("CP-18", "Control de acceso", "Rol Desarrollador intenta ver pagos o crear proyectos", "Puede cambiar estados, pero no ver pagos ni crear",
    () => igual([L.puede("desarrollador", "cambiar_estado"), L.puede("desarrollador", "ver_pagos"), L.puede("desarrollador", "crear_proyecto")], [true, false, false]));
  caso("CP-19", "Control de acceso", "Rol desconocido", "No tiene ningún permiso",
    () => igual(L.puede("intruso", "ver_equipo"), false));

  /* Seguridad */
  caso("CP-20", "Seguridad de entradas", "Ingresar <script> en el nombre del cliente", "El texto se muestra escapado, no se ejecuta",
    () => igual(L.escapar('<script>alert("x")</script>'), "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;"));

  /* Persistencia */
  caso("CP-21", "Persistencia", "Guardar proyectos y volver a cargarlos", "Los datos se recuperan iguales",
    () => { const r = R.crear(R.memoria()); r.cargar([]); r.guardar([proyecto({ id: 9 })]); igual(r.cargar([]).map(p => p.id), [9]); });
  caso("CP-22", "Persistencia", "Datos guardados corruptos", "Se recupera con los datos de demostración",
    () => { const m = R.memoria(); m.setItem(R.CLAVE, "{no es json"); igual(R.crear(m).cargar([proyecto({ id: 5 })]).map(p => p.id), [5]); });

  function ejecutar() {
    return casos.map(c => {
      try { c.fn(); return Object.assign({}, c, { estado: "Aprobado", obtenido: c.esperado }); }
      catch (e) { return Object.assign({}, c, { estado: "Fallido", obtenido: e.message }); }
    });
  }
  global.GT.pruebas = { casos, ejecutar };
})(typeof window !== "undefined" ? window : globalThis);
