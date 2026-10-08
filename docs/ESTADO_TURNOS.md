# Registro compartido de turnos

## Estados

- **LIBRE**: nadie tiene turno; solo lectura hasta asignación expresa del usuario.
- **EN_CURSO**: el agente asignado tiene permiso exclusivo dentro del alcance registrado.
- **ENTREGA_LISTA**: el agente terminó y cesó la escritura; el siguiente necesita una nueva asignación del usuario.

Conserva las entregas anteriores en el historial al iniciar una nueva. El estado no sustituye la autorización del usuario ni bloquea técnicamente otros procesos.

## Última entrega / estado actual

- **Estado del turno:** ENTREGA_LISTA.
- **Agente responsable:** OpenAI Codex.
- **Autorización:** petición expresa del usuario para configurar únicamente el sistema de colaboración entre Claude Code y Codex.
- **Tarea asignada:** crear reglas compartidas, carga de reglas para Claude y registro de turnos; sin desarrollar la aplicación.
- **Archivos que pueden modificarse:** `AGENTS.md`, `CLAUDE.md`, `docs/ESTADO_TURNOS.md`.
- **Referencia inicial de Git:** rama local `work`, sin commits; repositorio inicialmente vacío y sin cambios. Remoto GitHub configurado para `Adictoz132413/claude_cod_codex-`.
- **Cambios realizados:** creados los tres documentos autorizados; definidos asignación exclusiva, lectura sin turno, preservación de cambios, comprobación de entrega y aprobación separada de commits.
- **Pruebas realizadas y resultados:** inspección de Git y de la estructura completada; consulta de lectura `git ls-remote origin HEAD refs/heads/main` exitosa sin referencias devueltas. Validación documental de importación, campos, alcance y espacios en blanco completada. No hay aplicación, manifiestos, dependencias ni pruebas funcionales disponibles.
- **Errores encontrados:** `git log` no puede mostrar historial porque la rama todavía no tiene commits; condición esperada en un repositorio vacío. No se encontró `main` en la consulta remota.
- **Pendientes:** decidir cómo compartir esta entrega con Claude Code y autorizar por separado cualquier push. No se ha renombrado la rama ni hecho push. El usuario decidirá si desea usar `main` antes de publicar.
- **Último commit o referencia de Git:** referencia anterior: sin commits; HEAD simbólico apunta a `refs/heads/work`. Esta entrega se guarda como primer commit autorizado; comprobar su creación y obtener su SHA con `git log -1 --format='%H %s'` para obtener la referencia de entrega.
- **Commit de entrega:** autorizado expresamente por el usuario con «Autorizo el primer commit con los tres archivos de colaboración». Mensaje acordado: `docs: configurar colaboración por turnos entre Claude y Codex`.
- **Procesos de escritura:** no se iniciaron servidores, vigilantes, tareas delegadas ni procesos persistentes de escritura. Los comandos de creación y validación terminaron. No se puede certificar desde este entorno el estado de sesiones externas del usuario.
- **Instrucciones para el siguiente agente:** leer `AGENTS.md` y este registro; Claude debe cargar además `CLAUDE.md`. Consultar el primer commit de entrega y verificar que contiene exclusivamente los tres documentos acordados; preservar cualquier cambio posterior. Confirmar con el usuario que no hay otra sesión con escritura activa. No modificar nada hasta recibir una asignación expresa con tarea y alcance. Si se autoriza solo el commit, incluir exclusivamente estos tres archivos y comprobar el índice antes de confirmar.

## Plantilla para próximos turnos

Al recibir una asignación válida, archiva la entrega anterior en una sección de historial y completa estos campos:

- Estado: EN_CURSO / ENTREGA_LISTA / LIBRE.
- Agente responsable:
- Autorización expresa del usuario:
- Tarea asignada:
- Archivos que pueden modificarse:
- Referencia inicial y cambios previos que deben preservarse:
- Cambios realizados:
- Pruebas realizadas y resultados (incluidas omitidas):
- Errores encontrados:
- Pendientes:
- Último commit o referencia de Git:
- Commit de entrega y estado de autorización:
- Procesos de escritura iniciados, detenidos o pendientes de verificar:
- Instrucciones para el siguiente agente:
