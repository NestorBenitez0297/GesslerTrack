# Guía de contribución — GesslerTrack

## Estructura de ramas

| Rama | Propósito | Se crea desde | Se integra en |
|------|-----------|---------------|---------------|
| `main` | Versión estable, lista para entregar al cliente | — | — |
| `develop` | Integración de funcionalidades del sprint | `main` | `main` (al cerrar sprint/release) |
| `feature/GESTR-<funcionalidad>` | Una funcionalidad o historia de usuario | `develop` | `develop` |
| `release/<version>` | Preparación de una entrega (p. ej. `release/1.0.0`) | `develop` | `main` y `develop` |
| `hotfix/GESTR-<funcionalidad>` | Corrección urgente en producción | `main` | `main` y `develop` |

Reglas:
- No se hacen commits directos en `main` ni en `develop`; todo entra por Pull Request con revisión.
- Una rama `feature/` por funcionalidad; se elimina después de integrarla.

## Nomenclatura de commits

```
GESTR-<funcionalidad>: <descripción en presente>
```

`<funcionalidad>` es el nombre corto de la funcionalidad afectada, en minúsculas y con guiones.

Ejemplos:
- `GESTR-estructura: organiza carpetas del proyecto por capas`
- `GESTR-pagos: agrega registro de abonos`
- `GESTR-vista-cliente: muestra historial de pagos`
- `GESTR-proyectos: corrige filtro por estado`

El hook `.githooks/commit-msg` valida este formato. Para activarlo después de clonar:

```
git config core.hooksPath .githooks
```

## Flujo de trabajo

```
git checkout develop && git pull
git checkout -b feature/GESTR-pagos
# ... cambios ...
git commit -m "GESTR-pagos: agrega registro de abonos"
git push -u origin feature/GESTR-pagos
gh pr create --base develop
```
