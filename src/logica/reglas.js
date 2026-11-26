/* Capa de lógica de negocio — Gessler Track
 * Reglas de proyectos, pagos, entregas y permisos por rol.
 * Funciones puras: no tocan el DOM ni el almacenamiento, por eso se prueban de forma aislada (tests/).
 */
(function (global) {
  "use strict";
  const DIA = 86400000;
  const ESTADOS = { curso: "En curso", riesgo: "En riesgo", entregado: "Entregado", pagado: "Pagado" };
  const DIAS_ALERTA = 5;

  /* Permisos por rol (HU Acceso). */
  const ROLES = { gestor: "Gestor", desarrollador: "Desarrollador", cliente: "Cliente" };
  const PERMISOS = {
    gestor: ["ver_equipo", "ver_cliente", "crear_proyecto", "cambiar_estado", "registrar_pago", "ver_pagos"],
    desarrollador: ["ver_equipo", "cambiar_estado"],
    cliente: ["ver_cliente", "ver_pagos"]
  };
  const puede = (rol, accion) => (PERMISOS[rol] || []).includes(accion);

  /* Pagos */
  const pagado = p => p.pag.reduce((a, x) => a + x[1], 0);
  const saldo = p => Math.max(0, p.tot - pagado(p));
  const porcentajePagado = p => (p.tot > 0 ? Math.min(100, Math.round(pagado(p) / p.tot * 100)) : 0);

  /* Entregas */
  const diasRestantes = (p, ahora) => Math.ceil((p.due - ahora) / DIA);
  const proximoAVencer = (p, ahora) =>
    p.est !== "entregado" && p.est !== "pagado" && diasRestantes(p, ahora) <= DIAS_ALERTA;

  /* Indicadores del tablero (HU Seguimiento) */
  const indicadores = (lista, ahora) => ({
    activos: lista.filter(p => p.est === "curso" || p.est === "riesgo").length,
    pendiente: lista.reduce((a, p) => a + saldo(p), 0),
    porVencer: lista.filter(p => proximoAVencer(p, ahora)).length
  });

  /* Filtros: ciudad, estado y estado de pago ("pend" | "ok") */
  const filtrar = (lista, f) => lista.filter(p =>
    (!f.ciudad || p.ciu === f.ciudad) &&
    (!f.estado || p.est === f.estado) &&
    (!f.pago || (f.pago === "pend" ? pagado(p) < p.tot : pagado(p) >= p.tot)));

  /* Validaciones (HU Clientes / Proyectos): devuelven lista de mensajes; vacía = válido */
  function validarProyecto(d) {
    const e = [];
    if (!d.cliente || !d.cliente.trim()) e.push("El nombre del cliente es obligatorio.");
    if (!(d.total > 0)) e.push("El valor total debe ser mayor que cero.");
    if (d.anticipo < 0) e.push("El anticipo no puede ser negativo.");
    if (d.total > 0 && d.anticipo > d.total) e.push("El anticipo no puede superar el valor total.");
    if (d.entrega && isNaN(new Date(d.entrega + "T12:00").getTime())) e.push("La fecha de entrega no es válida.");
    return e;
  }
  function validarPago(p, monto) {
    const e = [];
    if (!(monto > 0)) e.push("El monto del pago debe ser mayor que cero.");
    else if (monto > saldo(p)) e.push("El pago supera el saldo pendiente (" + cop(saldo(p)) + ").");
    return e;
  }
  const validarEstado = est => (ESTADOS[est] ? [] : ["Estado no reconocido."]);

  /* Operaciones de dominio: devuelven el proyecto actualizado */
  function crearProyecto(d, id, ahora) {
    return {
      id, cli: d.cliente.trim(), pro: (d.descripcion || "").trim() || "Proyecto web",
      ciu: (d.ciudad || "").trim() || "—", est: "curso", res: "—",
      due: d.entrega ? new Date(d.entrega + "T12:00").getTime() : ahora + 30 * DIA,
      tot: d.total, pag: d.anticipo > 0 ? [["Anticipo", d.anticipo, ahora]] : [],
      log: [["Proyecto creado", ahora]]
    };
  }
  function cambiarEstado(p, nuevo, comentario, ahora) {
    p.log.unshift([ESTADOS[p.est] + " → " + ESTADOS[nuevo] + (comentario ? ": " + comentario : ""), ahora]);
    p.est = nuevo;
    return p;
  }
  function registrarPago(p, concepto, monto, ahora) {
    p.pag.push([concepto || "Abono", monto, ahora]);
    p.log.unshift(["Pago registrado: " + (concepto || "Abono") + " " + cop(monto), ahora]);
    if (saldo(p) === 0 && p.est === "entregado") cambiarEstado(p, "pagado", "saldo completado", ahora);
    return p;
  }

  /* Utilidades de seguridad y formato */
  const escapar = s => String(s).replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  function cop(n) { return "$" + Math.round(n).toLocaleString("es-CO"); }

  global.GT = global.GT || {};
  global.GT.logica = {
    DIA, ESTADOS, ROLES, PERMISOS, DIAS_ALERTA, puede, pagado, saldo, porcentajePagado,
    diasRestantes, proximoAVencer, indicadores, filtrar, validarProyecto, validarPago, validarEstado,
    crearProyecto, cambiarEstado, registrarPago, escapar, cop
  };
})(typeof window !== "undefined" ? window : globalThis);
