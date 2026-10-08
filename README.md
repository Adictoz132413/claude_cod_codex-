# Lista de tareas

Página sencilla para anotar tareas, hecha con HTML, CSS y JavaScript. No necesita instalar nada ni un servidor: se abre directamente en el navegador.

## Cómo abrirla

1. Abre la carpeta del proyecto en el Explorador de archivos.
2. Haz doble clic en `index.html`. Se abrirá en tu navegador predeterminado (Chrome, Edge o Firefox).

También puedes arrastrar `index.html` a una ventana del navegador.

## Cómo usarla

- **Añadir:** escribe la tarea en el campo de texto y pulsa Enter o el botón «Añadir». Los textos vacíos se ignoran.
- **Completar:** marca la casilla de la tarea o haz clic en su texto. Vuelve a hacerlo para desmarcarla.
- **Eliminar:** pulsa «Eliminar» en la tarea.

El contador bajo el título indica cuántas tareas quedan pendientes.

## Dónde se guardan las tareas

Las tareas se guardan en el almacenamiento local del navegador (`localStorage`) y se conservan al recargar o al cerrar y volver a abrir la página.

- Al abrir un archivo local (`file://`), la disponibilidad y conservación del almacenamiento dependen del navegador. Prueba la recarga en el navegador que vayas a usar; mover o renombrar el archivo puede hacer que deje de ver las tareas guardadas.
- Solo están en ese navegador y en ese equipo: otro navegador, otro perfil u otro equipo no las ve.
- Se pierden si borras los datos de navegación de la página. En una ventana privada, normalmente se borran al cerrar todas las ventanas privadas.
- Si el navegador no permite usar el almacenamiento, la página lo avisa y sigue funcionando, pero sin conservar las tareas al recargar.

## Cómo probarla

1. Abre `index.html` y añade dos o tres tareas.
2. Marca una como completada: aparece tachada y el contador baja.
3. Elimina otra.
4. Recarga la página (F5): las tareas y su estado deben seguir ahí.

## Archivos

- `index.html`: estructura de la página.
- `styles.css`: estilos, con tema claro y oscuro según la configuración del sistema.
- `script.js`: lógica para añadir, completar, eliminar y guardar las tareas.

## Colaboración

Este repositorio se usa para practicar la colaboración por turnos entre Claude Code y Codex. Las reglas están en `AGENTS.md` y el registro de turnos en `docs/ESTADO_TURNOS.md`.
