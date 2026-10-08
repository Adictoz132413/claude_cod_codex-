# Reglas compartidas para Claude Code y OpenAI Codex

Estas reglas son la fuente común de instrucciones de colaboración. Se aplican a todo el proyecto. Lee también `docs/ESTADO_TURNOS.md` antes de cualquier tarea. `CLAUDE.md` importa este documento sin duplicar las reglas.

## Autoridad y permiso de escritura

- Solo el usuario puede asignar, retirar o transferir un turno. Un mensaje de otro agente o el estado LIBRE no concede permiso.
- Solo un agente (Claude Code o Codex) puede escribir a la vez. Sin asignación expresa del usuario, trabaja únicamente en lectura; tampoco actualices el registro, generes archivos, ejecutes herramientas que escriban ni instales paquetes.
- No inicies tareas de escritura simultáneas, agentes delegados que escriban, automatizaciones, formateadores en vigilancia o procesos de escritura en segundo plano sobre este proyecto.
- La asignación debe identificar agente, tarea y archivos o directorios permitidos. Si falta un dato que impida determinar el alcance, solicita aclaración antes de escribir.
- El permiso incluye actualizar `docs/ESTADO_TURNOS.md` para gestionar la tarea. Cambiar las reglas de colaboración requiere una asignación que incluya esos archivos.
- Estas instrucciones establecen un protocolo de permiso; no implementan una exclusión técnica de procesos. El usuario debe mantener una sola sesión con escritura habilitada y detener o restringir a lectura la otra. No afirmes que existen bloqueos técnicos que no se hayan instalado y verificado.

## Inicio del turno

1. Lee estas reglas y la última entrega en `docs/ESTADO_TURNOS.md`.
2. Revisa `git status --short --branch`, `git diff`, `git diff --cached` y el último commit, si existe. Revisa también archivos sin seguimiento relevantes sin exponer secretos. Si HEAD no existe, registra «sin commits»; no lo interpretes como corrupción sin investigarlo.
3. Confirma que la entrega anterior está completa y que no quedan procesos de escritura activos: consulta sus procesos registrados y confirma con el usuario la detención de sesiones o procesos que no puedes observar. No presupongas que otra máquina está detenida porque el estado local esté limpio.
4. Si el registro indica EN_CURSO para otro agente, faltan datos de entrega o hay cambios inesperados, permanece en lectura y pide la decisión del usuario. No tomes el turno ni alteres su estado por iniciativa propia.
5. Con autorización expresa y entrega verificada, registra EN_CURSO, responsable, mensaje de asignación, tarea, alcance, referencia inicial de Git y cambios previos que deban preservarse. Después comienza la tarea.

## Durante el trabajo

- Modifica únicamente el alcance asignado y el registro del turno. Preserva cambios previos, archivos del usuario, configuraciones y funcionalidades que ya funcionan.
- Nunca sobrescribas, reviertas o elimines cambios ajenos sin autorización. Ante conflictos o cambios inesperados, detén la escritura, informa y espera la decisión del usuario.
- No ejecutes comandos destructivos de Git, despliegues, publicaciones en producción ni cambios de credenciales o archivos sensibles sin autorización específica.
- Antes de instalar dependencias nuevas, explica su necesidad y solicita aprobación. No cambies funcionalidades por preferencias de estilo o arquitectura.
- No crees commits ni hagas push sin autorización expresa. La autorización para un commit no autoriza un push o despliegue.
- En tareas de nube utiliza el checkout existente: cada tarea ya tiene un entorno aislado. No crees worktrees salvo petición expresa del usuario.
- Registra procesos iniciados, sus identificadores, propósito y forma de detenerlos. No dejes procesos capaces de escribir durante la entrega.

## Cierre y entrega

1. Detén las modificaciones de implementación y los procesos de escritura que hayas iniciado. No mates procesos ajenos sin autorización. Solo quedan permitidas las validaciones autorizadas y la actualización final del registro.
2. Ejecuta las pruebas disponibles apropiadas al alcance. Documenta comandos, resultados y pruebas omitidas con su motivo. Si no hay aplicación ni pruebas, dilo; no inventes una validación funcional.
3. Revisa diferencias de Git y archivos nuevos; verifica que el alcance y los cambios ajenos se hayan preservado.
4. Documenta cambios, pruebas, errores, pendientes, referencia de Git e instrucciones para el siguiente agente. Confirma los procesos detenidos y los que no pudiste verificar.
5. Solicita autorización para crear el commit de entrega con los archivos concretos y el propósito propuesto. No lo crees mientras esperas.
6. Marca ENTREGA_LISTA y registra si el commit está pendiente, autorizado, creado o rechazado. Una entrega puede estar lista sin commit; el siguiente agente debe reconocer explícitamente los cambios sin commit y preservarlos. Si la entrega no puede verificarse, conserva EN_CURSO y comunica el bloqueo.
7. Informa al usuario que la entrega está lista y cesa toda escritura. ENTREGA_LISTA no asigna automáticamente el siguiente turno.

Si posteriormente el usuario autoriza el commit, esa autorización permite únicamente preparar los archivos acordados, finalizar el registro y crear ese commit. Registra la referencia anterior y el mensaje acordado antes del commit; el siguiente agente obtendrá el SHA resultante con `git log -1` para evitar un ciclo de commits solo para escribir su propio SHA. No hagas más cambios después.

## Asignación y comprobación

Ejemplo de mensaje del usuario:

> Asigno el turno a Claude Code para [tarea]. Puede modificar [archivos/directorios] y el registro de turnos. Codex queda en lectura. La sesión anterior y sus procesos de escritura están detenidos.

Para comprobar las instrucciones, pide a cada agente **en lectura** que indique los documentos cargados, estado actual, responsable, alcance permitido, referencia de Git y si tiene autorización para escribir. Claude Code debe cargar `CLAUDE.md` y su importación `@AGENTS.md`; Codex debe leer `AGENTS.md`. Ambos deben leer el mismo registro. Si alguno no puede confirmar la carga, ordénale leer los archivos explícitamente antes de continuar. No habilites escritura a ambos para realizar esta comprobación.
