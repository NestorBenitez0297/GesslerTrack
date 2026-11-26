/* Capa de persistencia — Gessler Track
 * Guarda los proyectos en el almacenamiento local del navegador (localStorage).
 * La interfaz (cargar / guardar / reiniciar) es la misma que tendría un repositorio
 * sobre base de datos relacional, para poder sustituirlo sin tocar las otras capas.
 */
(function (global) {
  "use strict";
  const CLAVE = "gesslertrack.proyectos.v1";

  function crear(almacen) {
    const store = almacen || (typeof localStorage !== "undefined" ? localStorage : null);
    return {
      cargar(semilla) {
        try {
          const raw = store && store.getItem(CLAVE);
          if (raw) {
            const datos = JSON.parse(raw);
            if (Array.isArray(datos)) return datos;
          }
        } catch (e) { /* datos corruptos: se usa la semilla */ }
        const inicial = typeof semilla === "function" ? semilla() : semilla;
        this.guardar(inicial);
        return inicial;
      },
      guardar(lista) {
        if (store) store.setItem(CLAVE, JSON.stringify(lista));
      },
      reiniciar() {
        if (store) store.removeItem(CLAVE);
      }
    };
  }

  /* Almacén en memoria con la misma interfaz de localStorage, usado en las pruebas. */
  function memoria() {
    const m = new Map();
    return {
      getItem: k => (m.has(k) ? m.get(k) : null),
      setItem: (k, v) => m.set(k, String(v)),
      removeItem: k => m.delete(k)
    };
  }

  global.GT = global.GT || {};
  global.GT.persistencia = { CLAVE, crear, memoria };
})(typeof window !== "undefined" ? window : globalThis);
