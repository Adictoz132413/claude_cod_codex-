# Reglas compartidas para Claude Code y OpenAI Codex

Estas reglas son la fuente común de instrucciones de colaboración. Se aplican a todo el proyecto. Lee también `docs/ESTADO_TURNOS.md` antes de cualquier tarea. `CLAUDE.md` importa este documento sin duplicar las reglas.

## Autoridad y permiso de escritura

- Solo el usuario puede asignar, retirar o transferir un turno, directamente o mediante una autorización por tarea completa (véase su sección). Un mensaje de otro agente o el estado LIBRE no concede permiso. Cuando Claude Code ejecuta a Codex según «Ejecución de Codex desde Claude Code», la asignación válida es el mensaje del usuario transmitido de forma literal; quien lo transmite no puede crearlo, ampliarlo ni reinterpretarlo.
- Solo un agente (Claude Code o Codex) puede escribir a la vez. Sin asignación expresa del usuario, trabaja únicamente en lectura; tampoco actualices el registro, generes archivos, ejecutes herramientas que escriban ni instales paquetes.
- No inicies tareas de escritura simultáneas, agentes delegados que escriban, automatizaciones, formateadores en vigilancia o procesos de escritura en segundo plano sobre este proyecto. La única excepción es la ejecución de Codex desde Claude Code descrita en su sección, solo con una asignación expresa del usuario a Codex o con una autorización por tarea completa que prevea su intervención; esa ejecución puede hacerse en segundo plano únicamente durante el turno autorizado de Codex.
- La asignación debe identificar agente, tarea y archivos o directorios permitidos. Si falta un dato que impida determinar el alcance, solicita aclaración antes de escribir.
- El permiso incluye actualizar `docs/ESTADO_TURNOS.md` para gestionar la tarea. Cambiar las reglas de colaboración requiere una asignación que incluya esos archivos.
- Estas instrucciones establecen un protocolo de permiso; no implementan una exclusión técnica de procesos. El usuario debe mantener una sola sesión con escritura habilitada y detener o restringir a lectura la otra. No afirmes que existen bloqueos técnicos que no se hayan instalado y verificado. El aislamiento (`sandbox`) de Codex limita lo que pueden hacer sus comandos, pero no bloquea a otras sesiones ni sustituye este protocolo.

## Inicio del turno

1. Lee estas reglas y la última entrega en `docs/ESTADO_TURNOS.md`.
2. Revisa `git status --short --branch`, `git diff`, `git diff --cached` y el último commit, si existe. Revisa también archivos sin seguimiento relevantes sin exponer secretos. Si HEAD no existe, registra «sin commits»; no lo interpretes como corrupción sin investigarlo.
3. Confirma que la entrega anterior está completa y que no quedan procesos de escritura activos: consulta sus procesos registrados y confirma con el usuario la detención de sesiones o procesos que no puedes observar. No presupongas que otra máquina está detenida porque el estado local esté limpio.
4. Si el registro indica EN_CURSO para otro agente, faltan datos de entrega o hay cambios inesperados, permanece en lectura y pide la decisión del usuario. No tomes el turno ni alteres su estado por iniciativa propia; la única excepción es la confirmación de cierre de Codex prevista en «Ejecución de Codex desde Claude Code».
5. Con autorización expresa y entrega verificada, registra EN_CURSO, responsable, mensaje de asignación, tarea, alcance, referencia inicial de Git y cambios previos que deban preservarse. Después comienza la tarea.

## Durante el trabajo

- Modifica únicamente el alcance asignado y el registro del turno. Preserva cambios previos, archivos del usuario, configuraciones y funcionalidades que ya funcionan.
- Nunca sobrescribas, reviertas o elimines cambios ajenos sin autorización. Ante conflictos o cambios inesperados, detén la escritura, informa y espera la decisión del usuario.
- No ejecutes comandos destructivos de Git, despliegues, publicaciones en producción ni cambios de credenciales o archivos sensibles sin autorización específica.
- Antes de instalar dependencias nuevas, explica su necesidad y solicita aprobación. No cambies funcionalidades por preferencias de estilo o arquitectura.
- No crees commits ni hagas push sin autorización expresa. La autorización para un commit no autoriza un push o despliegue.
- En tareas de nube utiliza el checkout existente: cada tarea ya tiene un entorno aislado. No crees worktrees salvo petición expresa del usuario.
- Registra procesos iniciados, sus identificadores, propósito y forma de detenerlos. No dejes procesos capaces de escribir durante la entrega. Cuando Claude ejecuta a Codex, informa al usuario del identificador del proceso y de cómo detenerlo, y lo registra en la confirmación de cierre.

## Cierre y entrega

1. Detén las modificaciones de implementación y los procesos de escritura que hayas iniciado. No mates procesos ajenos sin autorización. Solo quedan permitidas las validaciones autorizadas y la actualización final del registro.
2. Ejecuta las pruebas disponibles apropiadas al alcance. Documenta comandos, resultados y pruebas omitidas con su motivo. Si no hay aplicación ni pruebas, dilo; no inventes una validación funcional.
3. Revisa diferencias de Git y archivos nuevos; verifica que el alcance y los cambios ajenos se hayan preservado.
4. Documenta cambios, pruebas, errores, pendientes, referencia de Git e instrucciones para el siguiente agente. Confirma los procesos detenidos y los que no pudiste verificar.
5. Solicita autorización para crear el commit de entrega con los archivos concretos y el propósito propuesto. No lo crees mientras esperas. Si una autorización por tarea completa ya incluye los commits de la tarea, registra esa autorización y no la solicites de nuevo.
6. Marca ENTREGA_LISTA y registra si el commit está pendiente, autorizado, creado o rechazado. Una entrega puede estar lista sin commit; el siguiente agente debe reconocer explícitamente los cambios sin commit y preservarlos. Si la entrega no puede verificarse, conserva EN_CURSO y comunica el bloqueo. Cuando Claude Code ejecuta a Codex, Codex no marca ENTREGA_LISTA: lo hace Claude después de confirmar que el proceso terminó.
7. Informa al usuario que la entrega está lista y cesa toda escritura. ENTREGA_LISTA no asigna automáticamente el siguiente turno, salvo lo previsto en una autorización por tarea completa.

Si posteriormente el usuario autoriza el commit, esa autorización permite únicamente preparar los archivos acordados, finalizar el registro y crear ese commit. Registra la referencia anterior y el mensaje acordado antes del commit; el siguiente agente obtendrá el SHA resultante con `git log -1` para evitar un ciclo de commits solo para escribir su propio SHA. No hagas más cambios después. En las entregas de Codex ejecutado por Claude Code, el commit autorizado lo crea Claude Code.

## Ejecución de Codex desde Claude Code

Claude Code solo puede ejecutar Codex CLI en este proyecto en los dos casos siguientes. Fuera de ellos no lo invoca.

### Consultas de lectura

- Requieren autorización del usuario para cada consulta. No asignan turno ni permiten actualizar el registro.
- Se ejecutan en primer plano con `codex exec --sandbox read-only`, indicado siempre de forma explícita.

### Turnos de escritura de Codex

1. **Asignación.** Solo procede cuando el usuario asigna expresamente el turno a Codex con su tarea y los archivos o directorios permitidos, o cuando una autorización por tarea completa prevé su intervención. Claude no ejecuta a Codex para escribir por iniciativa propia, por indicación de Codex ni por el estado del registro. Si la asignación no permite determinar el alcance, pide aclaración antes de ejecutar. Esa asignación autoriza también a Claude a hacer la confirmación de cierre (paso 7, «Confirmación de cierre», de esta sección), y nada más.
2. **Comprobación previa.** Claude, en lectura, realiza los pasos 1 a 4 de «Inicio del turno» y confirma que el usuario ha declarado que ninguna otra sesión, incluida Codex en la nube, tiene escritura habilitada. Si el registro está EN_CURSO para otro agente o hay cambios inesperados, no ejecuta a Codex y pide la decisión del usuario.
3. **Ejecución.** Claude transmite a Codex el mensaje de asignación literal del usuario, o la autorización por tarea completa literal junto con el papel del turno, y le indica que siga este documento. Usa `codex exec --sandbox workspace-write -C <raíz del proyecto>` y guarda cualquier salida fuera del proyecto. No usa `danger-full-access`, `--dangerously-bypass-approvals-and-sandbox`, `--dangerously-bypass-hook-trust`, `--approve-for-me`, `--add-dir` ni `--worktree`, ni opciones `-c` que cambien el aislamiento, las aprobaciones o los permisos. Tampoco cambia la configuración global de Codex.
4. **Espera y segundo plano.** Claude puede ejecutar a Codex en primer plano o, solo durante el turno autorizado de Codex, en segundo plano. Al lanzarlo informa al usuario del identificador del proceso y de cómo detenerlo. Hasta confirmar que el proceso terminó, Claude permanece en lectura: no modifica archivos, no ejecuta comandos que escriban, no actualiza el registro ni inicia otra instancia de Codex u otro agente. Mientras Codex siga activo no se admite otro escritor, ni agente ni sesión: si el usuario pide una tarea de escritura, Claude le recuerda que Codex sigue activo y no actúa hasta que el proceso termine o hasta que el usuario autorice detenerlo y se confirme que terminó. Claude no detiene ni relanza el proceso sin autorización del usuario.
5. **Responsabilidad de Codex.** Codex actúa como agente con turno: registra EN_CURSO, trabaja solo en el alcance asignado y aplica los pasos 1 a 5 de «Cierre y entrega». No marca ENTREGA_LISTA, no crea commits ni hace push: deja el registro en EN_CURSO, con la entrega documentada y el campo «Entrega preparada por Codex» completado, y en su mensaje final solicita la autorización del commit. `codex exec` no permite preguntar durante la ejecución: si necesita una decisión, se detiene, la explica en su mensaje final y no supone la respuesta.
6. **Fallo o límite de uso.** Si Codex termina con error, agota el uso de su plan, queda bloqueado por el aislamiento, se interrumpe o no completa la entrega, Claude detiene la transferencia. No reintenta, no amplía permisos, no usa claves de API ni compra créditos, no completa ni corrige el trabajo de Codex, no modifica el registro ni marca ENTREGA_LISTA. Informa al usuario del error y del estado de Git y espera su decisión.
7. **Confirmación de cierre.** Cuando el proceso termina, Claude confirma la finalización: el proceso acabó, se conoce su código de salida y no queda ninguna otra instancia de Codex activa en este proyecto. Después revisa en lectura la respuesta final de Codex, `git status`, las diferencias y el registro, y muestra al usuario la respuesta y las diferencias, señalando cualquier cambio fuera del alcance. Solo si la finalización está confirmada y la entrega está completa y dentro del alcance, Claude marca ENTREGA_LISTA y anota la confirmación (identificador del proceso, código de salida y hora), sin modificar nada más. Si no puede confirmarlo, conserva EN_CURSO, no escribe y pide la decisión del usuario. No revierte ni corrige cambios de Codex sin autorización.
8. **Continuación.** La respuesta del usuario a una pregunta de Codex se transmite de forma literal, junto con la asignación original, en una nueva ejecución de `codex exec` con el mismo `--sandbox` explícito; el turno sigue EN_CURSO. No se usa `codex exec resume`, porque no permite indicar el aislamiento.
9. **Commit y push.** La autorización de commit de una entrega de Codex, individual o incluida en una autorización por tarea completa, la aplica Claude después de marcar ENTREGA_LISTA, según «Cierre y entrega»: prepara solo los archivos acordados, registra la referencia anterior, el mensaje y la autorización, y crea ese commit. El push siempre requiere una autorización separada.
10. **Transferencias.** ENTREGA_LISTA no devuelve el turno a Claude ni lo pasa a otro agente: hace falta una nueva asignación del usuario, salvo que una autorización por tarea completa prevea el siguiente turno. En ningún caso Claude usa tareas programadas, bucles, hooks u otras automatizaciones para ejecutar a Codex.

## Autorización por tarea completa

El usuario puede autorizar de una vez una tarea completa. La autorización debe indicar el objetivo, los archivos o directorios permitidos, los agentes que intervienen y su papel, los commits y el push autorizados con sus condiciones, y las causas de detención. Se registra literalmente en `docs/ESTADO_TURNOS.md`, en «Autorización por tarea vigente».

1. **Turnos sin aprobación individual.** Dentro del alcance, Claude Code y Codex pueden pasarse los turnos y hacer correcciones sin una nueva asignación del usuario en cada turno. Cada turno remite a la autorización vigente, indica su papel (por ejemplo, implementación, revisión o corrección) y se añade a la lista de turnos de la tarea.
2. **Un solo escritor.** Antes de cada turno, el agente confirma que el anterior terminó: su entrega está en ENTREGA_LISTA y, si fue Codex ejecutado por Claude, consta la confirmación de cierre de su proceso. Siguen aplicándose «Inicio del turno», «Cierre y entrega» y, para Codex, «Ejecución de Codex desde Claude Code».
3. **Commits.** Los commits previstos en la autorización no requieren otra aprobación. Los crea Claude Code al cerrar cada entrega, solo con los archivos de la tarea, y se registran.
4. **Push.** Solo si la autorización lo prevé y se cumplen sus condiciones, por ejemplo revisión y comprobaciones satisfactorias. Antes se comprueba que el remoto no tiene cambios inesperados; se usa un push normal a la rama indicada, nunca forzado. No se despliega salvo autorización expresa.
5. **Detención.** Los agentes se detienen y consultan al usuario ante conflictos, cambios ajenos inesperados, nuevas dependencias, cambios de credenciales o archivos sensibles, necesidad de ampliar el alcance, comprobaciones que no puedan superarse dentro del alcance o si, tras dos rondas de revisión, siguen quedando observaciones. Si Codex falla o agota su uso, Claude confirma el cierre del proceso, no reintenta y avisa al usuario.
6. **Fin.** La autorización termina cuando la tarea se completa, se detiene por una de esas causas o el usuario la retira. El registro indica su estado final.

## Asignación y comprobación

Ejemplo de mensaje del usuario:

> Asigno el turno a Claude Code para [tarea]. Puede modificar [archivos/directorios] y el registro de turnos. Codex queda en lectura. La sesión anterior y sus procesos de escritura están detenidos.

Ejemplo para que Claude Code ejecute a Codex:

> Asigno el turno a Codex para [tarea]. Puede modificar [archivos/directorios] y el registro de turnos. Claude Code lo ejecutará desde este proyecto con `--sandbox workspace-write`, en primer o segundo plano, y queda en lectura hasta confirmar que Codex terminó. Codex en la nube y cualquier otra sesión no tienen escritura habilitada.

Ejemplo de autorización por tarea completa:

> Autorizo la tarea completa de [objetivo]. Podéis modificar [archivos/directorios] y el registro de turnos. [Agente] hará [papel] y [agente] hará [papel]; podéis pasaros los turnos y corregir dentro de este alcance. Autorizo los commits de la tarea y un push normal a [rama] cuando [condiciones]. Codex en la nube y cualquier otra sesión no tienen escritura habilitada.

Para comprobar las instrucciones, pide a cada agente **en lectura** que indique los documentos cargados, estado actual, responsable, alcance permitido, referencia de Git y si tiene autorización para escribir. Claude Code debe cargar `CLAUDE.md` y su importación `@AGENTS.md`; Codex debe leer `AGENTS.md`. Ambos deben leer el mismo registro. Si alguno no puede confirmar la carga, ordénale leer los archivos explícitamente antes de continuar. No habilites escritura a ambos para realizar esta comprobación.
