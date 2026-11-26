# Backlog priorizado y trazabilidad — Gessler Track

Prioridad MoSCoW: **Debe** (Must), **Debería** (Should), **Podría** (Could).
Estado al 26/11/2026, verificado contra el repositorio.

| ID | Épica | Historia de usuario | Prioridad | Estado | Código | Casos de prueba |
|----|-------|---------------------|-----------|--------|--------|-----------------|
| HU-01 | Clientes | Como gestor de Gessler, quiero registrar y consultar los datos de un cliente para no depender de archivos dispersos | Debe | Hecha | `validarProyecto`, `crearProyecto` | CP-01 a CP-05 |
| HU-02 | Proyectos | Como gestor, quiero crear un proyecto web asociado a un cliente y ver su estado para saber qué está en curso | Debe | Hecha | `crearProyecto`, `cambiarEstado`, `validarEstado` | CP-01, CP-06, CP-07 |
| HU-03 | Pagos | Como gestor, quiero registrar anticipos y abonos y ver el saldo pendiente para controlar el flujo de caja | Debe | Hecha | `registrarPago`, `validarPago`, `saldo` | CP-08 a CP-12 |
| HU-04 | Entregables | Como desarrollador, quiero ver la fecha de entrega y el responsable de cada proyecto para controlar los plazos | Debe | Parcial: fecha, alerta de vencimiento y responsable; falta registrar entregables individuales | `proximoAVencer`, `diasRestantes` | CP-13, CP-14 |
| HU-05 | Acceso | Como administrador, quiero que cada rol vea solo lo que le corresponde para proteger la información | Debe | Hecha en el cliente; la autenticación con servidor queda para la siguiente fase | `PERMISOS`, `puede` | CP-17 a CP-19 |
| HU-06 | Seguimiento | Como gestor, quiero un tablero con proyectos por estado para tomar decisiones rápidas | Debería | Hecha | `indicadores`, `filtrar` | CP-15, CP-16 |
| HU-07 | Seguridad | Como gestor, quiero que el texto ingresado no pueda ejecutar código en la página para proteger a los usuarios | Debe | Hecha | `escapar` | CP-20 |
| HU-08 | Persistencia | Como gestor, quiero que los cambios se conserven al cerrar el navegador para no perder información | Debería | Hecha (localStorage); base de datos relacional en la siguiente fase | `repositorio.js` | CP-21, CP-22 |
| HU-09 | Vista cliente | Como cliente, quiero consultar el estado, la entrega y mis pagos sin poder modificarlos | Debería | Hecha | `client()` en `app.js` | CP-17 |
| HU-10 | Reportes | Como gerente, quiero un resumen por cliente y por mes para evaluar la operación | Podría | Pendiente | — | — |

## Resumen

- Historias planeadas: 10
- Hechas: 7 · Parciales: 2 (HU-04, HU-05) · Pendientes: 1 (HU-10)
- Casos de prueba: 22 ejecutados, 22 aprobados (`tests/index.html`)

## Trazabilidad con el repositorio

| Funcionalidad | Rama | Pull request |
|---------------|------|--------------|
| Estructura de carpetas, ramas y nomenclatura | `feature/GESTR-estructura` | integrada en `develop` |
| Arquitectura en tres capas y corrección de defectos | `feature/GESTR-capas` | #1 |
| Control de acceso por roles | `feature/GESTR-acceso` | #2 |
| Casos de prueba | `feature/GESTR-pruebas` | #3 |
| Documentación, diagrama e informe técnico | `feature/GESTR-documentacion` | #4 |
