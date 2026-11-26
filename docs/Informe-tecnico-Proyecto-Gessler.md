> Versión en Markdown del informe técnico. La versión de entrega es [Informe técnico - Proyecto Gessler.pdf](Informe%20t%C3%A9cnico%20-%20Proyecto%20Gessler.pdf), generada a partir del [DOCX](Informe-tecnico-Proyecto-Gessler.docx).

**UNIVERSIDAD IBEROAMERICANA**

Programa de Ingeniería de Software

# WebNova Track: sistema web de gestión de proyectos para Gessler, construido con estrategias ágiles de construcción de software

Participante: Nestor Javier Benitez Castro

Repositorio: [https://github.com/NestorBenitez0297/GesslerTrack](https://github.com/NestorBenitez0297/GesslerTrack)

26 de noviembre de 2026

## Resumen

Este informe técnico documenta la aplicación de estrategias de construcción de software en el proyecto WebNova Track, desarrollado en el programa de Ingeniería de Software de la Universidad Iberoamericana (IBERO) para Gessler, una empresa colombiana que crea y despliega páginas web funcionales para clientes de distintos sectores del país y que presenta dificultades para gestionar su operación. El marco general del trabajo es un proyecto académico por etapas —empatía y definición del problema, prototipado y socialización— desarrollado de forma individual por el estudiante, con apoyo de un asistente de inteligencia artificial (Claude) para la revisión de código, en el que se exige aplicar prácticas reales de ingeniería de software y no solo diseñar una solución en abstracto.

La pregunta orientadora fue: ¿cómo puede un estudiante de ingeniería de software construir, con estrategias de ingeniería de software verificables, una solución web que ordene la gestión de proyectos, clientes y entregables de Gessler? Para responder se combinó Design Thinking, en las fases de empatía, definición y prototipado, con un marco ágil basado en Scrum \[3\], apoyado en un ciclo de vida de desarrollo ágil de software seguro \[1\] y en una lectura del problema inspirada en el UNC-Method, un método de desarrollo basado en problemas \[2\]. El trabajo se organizó en sprints cortos con un backlog priorizado de historias de usuario, criterios de aceptación explícitos, control de versiones con ramas por funcionalidad, revisión de cada solicitud de integración (pull request) y pruebas funcionales sobre cada incremento. La calidad del producto se evaluó con las características de la norma ISO/IEC 25010 (adecuación funcional, usabilidad, fiabilidad y seguridad) \[6\], y la selección de componentes de terceros consideró las implicaciones de propiedad intelectual y licenciamiento \[4\].

Como resultado, el proceso produjo un backlog priorizado y trazable hasta las necesidades levantadas con el cliente, un modelo de requisitos funcionales y no funcionales, prototipos de interfaz navegables, una arquitectura web en capas (presentación, lógica de negocio y persistencia), un repositorio público en GitHub con una rama por funcionalidad y commits identificados con la nomenclatura GESTR-\<funcionalidad\>, y 22 casos de prueba automatizados asociados a las historias de usuario, todos aprobados. De las diez historias del backlog, siete quedaron terminadas, dos de forma parcial y una pendiente; durante la revisión del código se detectaron y corrigieron cuatro defectos, uno de ellos de seguridad. Cada actividad queda respaldada con evidencias documentales y pantallazos que se relacionan en las secciones de productos obtenidos y anexos. Además, la práctica de ceremonias cortas —planeación, seguimiento diario, revisión y retrospectiva— permitió detectar desviaciones de alcance de forma temprana y ajustar las prioridades con base en la retroalimentación del cliente.

Entre las conclusiones relevantes se destaca que la elección de una estrategia de construcción debe responder al contexto del problema y no a una moda metodológica \[5\]: en un proyecto con requisitos que se aclaran de forma gradual, un enfoque ágil con validación frecuente redujo la ambigüedad y mejoró la trazabilidad entre necesidad, requisito, código y prueba. También se concluye que la disciplina de trabajo —acuerdos explícitos, roles definidos aunque los asuma una sola persona y comunicación frecuente con el cliente— pesa tanto como las herramientas técnicas, tal como lo plantea la perspectiva Scrum y Peopleware \[3\], y que incorporar la seguridad desde las primeras iteraciones es más económico que corregirla al final del desarrollo \[1\].

Las aplicaciones posibles son tres: (i) servir de base para evolucionar WebNova Track hacia un producto que Gessler use en su operación diaria; (ii) funcionar como guía replicable para otras pequeñas empresas de desarrollo web que necesiten ordenar su gestión de proyectos con recursos limitados; y (iii) constituir una referencia académica sobre cómo documentar y evidenciar el uso de estrategias de construcción de software en un entorno virtual de aprendizaje.

El informe se estructura en introducción, materiales y métodos, resultados, discusión y conclusiones, e incluye las referencias en formato IEEE, los productos obtenidos y los anexos con los instrumentos de recolección de información. Se reconocen como limitaciones el tiempo acotado del periodo académico, el desarrollo a cargo de una sola persona y la imposibilidad de medir el uso sostenido del sistema en producción, aspectos que se plantean como trabajo futuro.

## Abstract

This technical report documents the application of software construction strategies in the WebNova Track project, developed in the Software Engineering program at Universidad Iberoamericana (IBERO) for Gessler, a Colombian company that creates and deploys functional websites for clients in different sectors across the country and that struggles to manage its operations. The general framework is a staged academic project —empathy and problem definition, prototyping, and socialization— carried out individually by the student, with an artificial intelligence assistant (Claude) supporting code review, in which students are expected to apply real software engineering practices rather than merely design a solution in the abstract.

The guiding question was: how can a software engineering student build, using verifiable software engineering strategies, a web solution that organizes Gessler's management of projects, clients, and deliverables? To answer it, Design Thinking was combined, in the empathy, definition, and prototyping phases, with an agile framework based on Scrum \[3\], supported by a secure agile software development life cycle \[1\] and by a reading of the problem inspired by the UNC-Method, a problem-based software development method \[2\]. The work was organized in short sprints with a prioritized product backlog of user stories, explicit acceptance criteria, version control with one branch per feature, a review of every pull request, and functional testing of every increment. Product quality was assessed using the characteristics of the ISO/IEC 25010 standard (functional suitability, usability, reliability, and security) \[6\], and the selection of third-party components took into account intellectual property and licensing implications \[4\].

As a result, the process produced a prioritized backlog traceable to the needs gathered from the client, a model of functional and non-functional requirements, navigable interface prototypes, a layered web architecture (presentation, business logic, and persistence), a public GitHub repository with one branch per feature and commits identified by the GESTR-\<feature\> naming convention, and 22 automated test cases linked to the user stories, all of which passed. Of the ten backlog stories, seven were completed, two partially, and one remains pending; four defects, one of them security-related, were found and fixed during code review. Every activity is backed by documentary evidence and screenshots, which are listed in the sections on products obtained and appendices. In addition, the practice of short ceremonies —planning, daily follow-up, review, and retrospective— made it possible to detect scope deviations early and to adjust priorities based on the client's feedback.

Among the relevant conclusions, the choice of a construction strategy must respond to the context of the problem rather than to a methodological trend \[5\]: in a project whose requirements become clearer gradually, an agile approach with frequent validation reduced ambiguity and improved traceability among need, requirement, code, and test. It is also concluded that work discipline —explicit agreements, clearly defined roles even when one person assumes them, and frequent communication with the client— weighs as much as technical tools, as the Scrum and Peopleware perspective argues \[3\], and that building security into the earliest iterations is cheaper than correcting it at the end of development \[1\].

Three applications are possible: (i) serving as the basis for evolving WebNova Track into a product that Gessler can use in its daily operations; (ii) acting as a replicable guide for other small web development companies that need to organize their project management with limited resources; and (iii) providing an academic reference on how to document and evidence the use of software construction strategies in a virtual learning environment.

The report is structured into introduction, materials and methods, results, discussion, and conclusions, and it includes the references in IEEE format, the products obtained, and the appendices with the data collection instruments. The limitations acknowledged are the limited time of the academic term, the fact that a single person developed the project, and the impossibility of measuring sustained use of the system in production, aspects that are proposed as future work.

## Palabras clave

construcción de software; metodologías ágiles; Scrum; Design Thinking; calidad de software; aplicación web; gestión de proyectos

## Introducción

La construcción de software abarca las actividades que transforman requisitos en un producto funcional: codificación, verificación, integración, pruebas y control de cambios. Su calidad depende menos de la herramienta elegida que de la estrategia con la que el equipo organiza el trabajo. La literatura describe una evolución desde modelos secuenciales, como cascada, hacia metodologías ágiles que aceptan el cambio como parte del proceso \[5\], y propone ciclos de vida que integran la seguridad desde el inicio del desarrollo \[1\].

### Descripción del problema

Gessler es una empresa que crea y despliega páginas web funcionales para clientes de distintas industrias en todo el país. Su crecimiento ha hecho difícil gestionar de forma ordenada los proyectos en curso, la información de los clientes y los entregables de cada sitio. La pregunta orientadora del proyecto es: ¿cómo puede un estudiante de ingeniería de software construir, aplicando estrategias de construcción de software verificables, una solución web que ordene la gestión de proyectos, clientes y entregables de Gessler?

### Antecedentes

Tres enfoques sustentan el trabajo. Primero, Scrum organiza el desarrollo en iteraciones cortas con roles, eventos y artefactos definidos \[7\], y su éxito depende de factores humanos como la comunicación y la autonomía del equipo, la perspectiva conocida como Peopleware \[3\]. Segundo, el UNC-Method propone partir de los problemas del dominio para derivar el desarrollo, lo que resulta útil cuando el cliente describe síntomas y no requisitos \[2\]. Tercero, el ciclo de vida ágil de software seguro incorpora actividades de seguridad en cada iteración \[1\]. A esto se suma la dimensión legal: el uso de librerías y plantillas de terceros exige conocer el régimen de propiedad intelectual aplicable en Colombia \[4\].

### Justificación

El proyecto es pertinente por tres razones. Académicamente, permite verificar la apropiación de estrategias de construcción de software en un caso con cliente real. Para Gessler, ofrece una base para ordenar su gestión con una solución a la medida de su operación. Y metodológicamente, deja evidencia de cómo se decide y se justifica una estrategia de construcción en un entorno virtual de aprendizaje.

### Objetivos

**Objetivo general.** Construir una solución web para la gestión de proyectos, clientes y entregables de Gessler aplicando estrategias de construcción de software ágiles, verificables y documentadas.

**Objetivos específicos.**

1.  Levantar y priorizar las necesidades de Gessler mediante técnicas de empatía y definición propias de Design Thinking.

2.  Organizar el desarrollo en sprints con un backlog de historias de usuario y criterios de aceptación.

3.  Establecer prácticas de construcción: control de versiones con ramas por funcionalidad, revisión de solicitudes de integración, pruebas funcionales y consideraciones de seguridad.

4.  Evaluar la calidad del producto según características de la norma ISO/IEC 25010 \[6\].

5.  Documentar procesos, productos y evidencias para que el docente pueda verificar cada etapa de ejecución.

## Materiales y métodos

El proyecto siguió un diseño aplicado de tipo mixto: un componente cualitativo para comprender el problema de Gessler y un componente de construcción iterativa para producir y validar el software. La estrategia combina Design Thinking en las etapas iniciales con Scrum \[7\] en la construcción, bajo un ciclo de vida que incorpora seguridad en cada iteración \[1\].

### Diseño y ejecución

1.  **Empatía y definición.** Entrevista y observación del flujo de trabajo de Gessler para identificar el problema central, y formulación del enunciado del problema siguiendo la lógica del UNC-Method, que parte del problema del dominio \[2\].

2.  **Planeación.** Conversión de las necesidades en un backlog de historias de usuario con criterios de aceptación, priorizado con el método MoSCoW (debe, debería, podría, no tendrá) y estimado en puntos de historia.

3.  **Construcción por sprints.** Interacciones cortas con planeación, seguimiento diario, revisión con el cliente y retrospectiva. Cada funcionalidad se desarrolla en una rama feature/GESTR-\<funcionalidad\>, se integra en develop mediante una solicitud de integración y pasa a main al cerrar la entrega; la convención completa está en el archivo CONTRIBUTING.md del repositorio \[8\].

4.  **Verificación y validación.** Revisión de cada solicitud de integración, con apoyo de un asistente de IA, pruebas funcionales por historia de usuario y validación del prototipo con Gessler.

5.  **Socialización.** Presentación de resultados, recopilación de retroalimentación y cierre documental.

### Roles del proyecto

Se definieron los tres roles de Scrum \[7\], asumidos por el estudiante según la actividad: Product Owner, para representar las necesidades de Gessler y priorizar el backlog; Scrum Master, para cuidar los acuerdos de trabajo y el ritmo de los sprints, siguiendo la importancia del factor humano descrita en \[3\]; y desarrollador, para diseñar, codificar y probar. Como apoyo se usó Claude, un asistente de inteligencia artificial, para revisar el código de cada solicitud de integración y proponer casos de prueba; las decisiones de diseño y la aprobación de cada cambio corresponden al estudiante.

### Aparatos, instrumentos y herramientas

| Categoría | Herramienta o instrumento | Uso en el proyecto |
|----|----|----|
| Recolección de información | Guía de entrevista y encuesta de necesidades | Levantar el problema y los requisitos con Gessler (ver Anexo A) |
| Gestión ágil | Tablero Kanban y backlog digital | Seguimiento de historias, sprints y tareas |
| Diseño | Herramienta de prototipado de interfaces | Prototipos navegables para validar con el cliente |
| Control de versiones | Git, GitHub y GitHub CLI | Ramas por funcionalidad, historial de cambios y revisión de solicitudes de integración |
| Desarrollo | Visual Studio Code y pila web del lado del cliente | Construcción del sistema con HTML5, CSS3 y JavaScript (ES2020), sin librerías de terceros; almacenamiento localStorage; Google Chrome para pruebas |
| Comunicación | Videoconferencia y mensajería con Gessler | Revisiones con el cliente en entorno virtual |

### Criterios de validación y controles de calidad

Una historia de usuario se considera terminada cuando cumple la definición de hecho acordada por el equipo. La calidad del producto se verificó con los controles que resume la siguiente tabla, alineados con las características de la norma ISO/IEC 25010 \[6\].

| Control | Característica de calidad | Criterio de aprobación |
|----|----|----|
| Pruebas funcionales por historia | Adecuación funcional | Todos los criterios de aceptación se cumplen |
| Revisión de solicitud de integración | Mantenibilidad | Cada cambio entra por una solicitud de integración revisada antes de integrarse a develop |
| Validación con el cliente | Usabilidad | Gessler acepta el flujo en la revisión del sprint |
| Manejo de errores y datos de prueba | Fiabilidad | El sistema responde con mensajes claros ante entradas inválidas |
| Validación de entradas y control de acceso | Seguridad | Cada rol accede solo a la información y acciones que le corresponden \[1\] |
| Revisión de licencias de componentes | Cumplimiento legal | Los componentes de terceros tienen licencia compatible con el uso previsto \[4\] |

## Resultados

El proyecto entregó un conjunto de productos trazables entre sí: de la necesidad levantada con Gessler se derivaron historias de usuario, de estas se construyeron funcionalidades y de cada funcionalidad se obtuvieron casos de prueba. Los datos cuantitativos se tomaron del repositorio del proyecto, donde puede seguirse el avance por ramas, solicitudes de integración e historial de cambios \[8\]. Los valores resaltados entre corchetes dependen de las sesiones con Gessler y se completan con los registros de esas sesiones.

### Backlog priorizado

| Épica | Historia de usuario (resumen) | Prioridad MoSCoW |
|----|----|----|
| Clientes | Como gestor de Gessler, quiero registrar y consultar los datos de un cliente para no depender de archivos dispersos | Debe |
| Proyectos | Como gestor, quiero crear un proyecto web asociado a un cliente y ver su estado para saber qué está en curso | Debe |
| Entregables | Como desarrollador, quiero registrar entregables con fecha y responsable para controlar los plazos | Debe |
| Acceso | Como administrador, quiero que cada rol vea solo lo que le corresponde para proteger la información \[1\] | Debe |
| Pagos | Como gestor, quiero registrar anticipos y abonos y ver el saldo pendiente para controlar el flujo de caja | Debe |
| Seguridad | Como gestor, quiero que el texto ingresado no pueda ejecutar código en la página para proteger a los usuarios \[1\] | Debe |
| Seguimiento | Como gestor, quiero un tablero con proyectos por estado para tomar decisiones rápidas | Debería |
| Persistencia | Como gestor, quiero que los cambios se conserven al cerrar el navegador para no perder información | Debería |
| Vista cliente | Como cliente, quiero consultar el estado, la entrega y mis pagos sin poder modificarlos | Debería |
| Reportes | Como gerente, quiero un resumen por cliente y por mes para evaluar la operación | Podría |

De las 10 historias, 7 están terminadas, 2 son parciales (Entregables: hay fecha, responsable y alerta de vencimiento, pero falta registrar entregables individuales; Acceso: el control por rol se aplica en el navegador, sin autenticación en servidor) y 1 está pendiente (Reportes). El estado de cada historia y su trazabilidad hacia el código y los casos de prueba se mantienen en docs/backlog.md del repositorio \[8\].

### Plan de sprints

| Sprint | Objetivo | Producto de salida | Evidencia |
|----|----|----|----|
| 1 | Entender el problema y definir el alcance | Enunciado del problema, mapa de empatía, backlog inicial | Anexo A; docs/backlog.md |
| 2 | Diseñar y validar prototipos | Prototipos navegables y arquitectura en capas | Figuras 1 a 8 |
| 3 | Construir gestión de clientes y proyectos | Primer incremento funcional con pruebas | Figuras 9 y 10; PR \#1 |
| 4 | Construir entregables, roles y tablero | Segundo incremento integrado mediante solicitudes de integración | Figuras 11, 12, 14 y 15; PR \#2 |
| 5 | Verificar, socializar y cerrar | Informe de pruebas, retroalimentación del cliente, informe técnico | Figuras 13 y 16; PR \#3 y \#4 |

### Indicadores de la ejecución

| Indicador | Valor |
|----|----|
| Historias de usuario planeadas / completadas | 10 / 7 (más 2 parciales) |
| Sprints ejecutados | 2 |
| Solicitudes de integración (pull requests) | 4 (#1 a \#4) |
| Casos de prueba ejecutados / aprobados | 22 / 22 |
| Defectos detectados y corregidos antes de la entrega | 4 |
| Ajustes pedidos por Gessler en las revisiones | No definidos aun |
| Ramas por funcionalidad (feature/GESTR-\*) | 5 |
| Commits con nomenclatura GESTR-\<funcionalidad\> | 11 |

Los cuatro defectos corregidos fueron: (1) el texto ingresado por el usuario se insertaba en la página sin escapar, con riesgo de inyección de HTML; (2) una división por cero en la barra de avance de pago cuando el valor total es 0; (3) identificadores repetidos al crear proyectos; y (4) el formulario no informaba por qué no se creaba un proyecto. Los defectos 1, 2 y 4 quedaron cubiertos por los casos CP-20, CP-12 y CP-02 a CP-04 (Anexo C).

### Arquitectura

La solución se diseñó en tres capas: presentación (interfaz web), lógica de negocio (reglas de proyectos, clientes y entregables, y control de acceso por roles) y persistencia (almacenamiento local del navegador en el prototipo, con la misma interfaz que tendrá el repositorio sobre base de datos relacional en la siguiente fase). La Figura 8 muestra las capas y los archivos que implementan cada una. Separar las capas permitió probar la lógica de forma aislada, sin interfaz, y sustituir la persistencia sin modificar las demás capas.

### Resultado de las pruebas de calidad

Se aplicó cada control descrito en la sección de materiales y métodos. Los resultados por característica de la norma ISO/IEC 25010 \[6\] se resumen así:

| Característica | Resultado | Evidencia |
|----|----|----|
| Adecuación funcional | 22 de 22 casos de prueba aprobados; 7 de 10 historias terminadas y 2 parciales | Anexo C; Figura 13 |
| Usabilidad | Mensajes de error claros en el formulario y en los pagos (Figuras 9 y 10). Observaciones de Gessler: \[observaciones de Gessler en la revisión\] | Anexo B |
| Fiabilidad | Las entradas inválidas se rechazan con un mensaje (CP-02 a CP-04, CP-07, CP-09, CP-10) y los datos guardados corruptos se recuperan (CP-22) | Anexo C |
| Seguridad | Tres roles verificados (CP-17 a CP-19; Figuras 11 y 12) y escape de HTML (CP-20). Hallazgo: el control de acceso se aplica en el navegador; la autenticación de usuarios requiere un servidor y queda para la siguiente fase | Anexo C; Figuras 11 y 12 |
| Cumplimiento legal | No se usan componentes de terceros: todo el código es propio, por lo que no hay restricciones de licencia \[4\] | Repositorio \[8\] |

Como no se aplicaron pruebas estadísticas de significancia, los hallazgos se presentan de forma descriptiva; el desarrollo individual y la duración del periodo académico no permiten un muestreo que las justifique.

## Discusión

La pregunta orientadora preguntaba si un estudiante podía construir, con estrategias verificables, una solución que ordenara la gestión de Gessler. Los hallazgos indican que sí, con una condición: la estrategia debe adaptarse al contexto. Los requisitos de Gessler no estaban cerrados al inicio, y por eso un enfoque ágil con revisiones frecuentes fue más adecuado que un modelo secuencial, algo que coincide con la evolución de las metodologías hacia el manejo del cambio \[5\].

Partir del problema y no de una lista de funciones, como propone el UNC-Method \[2\], evitó construir características que el cliente no necesitaba. Cada historia del backlog se justificó por una dificultad concreta de la operación, lo que facilitó priorizar con MoSCoW y dejar los reportes como funcionalidad opcional.

El factor humano resultó tan determinante como el técnico, aun en un proyecto individual. Asumir de forma consciente los roles de Product Owner, Scrum Master y desarrollador obligó a separar las decisiones de alcance de las de implementación, y las ceremonias cortas mantuvieron el ritmo de trabajo, en línea con la perspectiva Scrum y Peopleware \[3\]. El repositorio, con una rama y una solicitud de integración por funcionalidad, dejó visible el estado del trabajo para el cliente y para el docente \[8\]. La revisión del código con un asistente de IA no sustituye la revisión entre pares, pero permitió detectar antes de la entrega los cuatro defectos descritos en los resultados.

Incluir la seguridad desde los primeros sprints, por ejemplo con el control de acceso por roles, evitó rediseñar la lógica de negocio cerca de la entrega \[1\]. Del mismo modo, revisar las licencias de los componentes de terceros desde el diseño reduce el riesgo legal de entregar a un cliente un producto con dependencias que no puede usar \[4\].

Hay límites que condicionan la interpretación. El periodo académico fue corto, el proyecto lo desarrolló una sola persona y no se observó el sistema en uso real y sostenido, por lo que no se puede afirmar un impacto medido en la operación de Gessler. Tampoco hubo grupo de comparación con otra estrategia, de modo que la ventaja del enfoque ágil se sustenta en la experiencia del proyecto y en la literatura, no en un contraste experimental. Además, el control de acceso actual se ejecuta en el navegador y no reemplaza la autenticación en un servidor.

## Conclusiones y recomendaciones

La combinación de Design Thinking y Scrum, apoyada en un ciclo de vida seguro, permitió construir una solución web trazable para la gestión de proyectos, clientes y entregables de Gessler.

1.  La estrategia de construcción debe elegirse por el contexto del problema. Con requisitos que se aclaran gradualmente, la validación frecuente con el cliente redujo la ambigüedad \[5\].

2.  La trazabilidad entre necesidad, historia de usuario, código y prueba hizo verificable cada etapa y facilitó la revisión del docente.

3.  Los controles de calidad basados en ISO/IEC 25010 \[6\] dieron criterios objetivos de aprobación en lugar de juicios subjetivos.

4.  La seguridad y el licenciamiento se atienden mejor desde las primeras iteraciones que al final \[1\], \[4\].

5.  La comunicación con el cliente, los roles y los acuerdos de trabajo son parte de la estrategia de construcción, no un complemento, incluso cuando una sola persona asume todos los roles \[3\].

6.  Una nomenclatura de commits (GESTR-\<funcionalidad\>) validada automáticamente y una rama por funcionalidad convierten el historial del repositorio en evidencia verificable del proceso \[8\].

**Recomendaciones.** Para una siguiente fase se recomienda: automatizar las pruebas con integración continua; implementar la autenticación de usuarios en un servidor y migrar la persistencia a una base de datos relacional; medir el uso real del sistema en Gessler durante al menos un ciclo de proyectos; ampliar el control de acceso y el registro de auditoría; y definir una política de licencias y de propiedad de los entregables entre la empresa y sus clientes.

**Posibles aplicaciones.** El sistema puede evolucionar a un producto de uso diario en Gessler; el proceso documentado sirve como guía para otras pequeñas empresas de desarrollo web; y el informe es un modelo de cómo evidenciar estrategias de construcción de software en un entorno virtual de aprendizaje.

## Referencias bibliográficas

\[1\] M. Hernández, *Ciclo de vida de desarrollo ágil de software seguro*. Bogotá, Colombia: Fundación Universitaria Los Libertadores, 2020.

\[2\] C. Zapata Jaramillo y F. Arango Isaza, *Unc-method: un método de desarrollo de software basado en problemas*. Medellín, Colombia: Universidad Nacional de Colombia, Facultad de Ingeniería, 2009.

\[3\] G. Hernández, Á. Martínez, R. Jiménez y F. Jiménez, "Scrum y Peopleware: elementos clave para la gestión en la construcción de software," *Revista Ibérica de Sistemas e Tecnologias de Informação*, n.º E19, pp. 265–277, 2019.

\[4\] K. W. Mutter, "Propiedad intelectual y desarrollo en Colombia," *Estudios Socio-Jurídicos*, vol. 8, n.º 2, pp. 85–101, 2006.

\[5\] J. Z. Gamboa, "Evolución de las metodologías y modelos utilizados en el desarrollo de software," *INNOVA Research Journal*, vol. 3, n.º 10, pp. 20–33, 2018.

\[6\] *Systems and software engineering — Systems and software Quality Requirements and Evaluation (SQuaRE) — System and software quality models*, ISO/IEC 25010, 2011.

\[7\] K. Schwaber y J. Sutherland, *The Scrum Guide: The Definitive Guide to Scrum: The Rules of the Game*, 2020. \[En línea\]. Disponible en: https://scrumguides.org

\[8\] N. J. Benitez Castro, *GesslerTrack: sistema web de gestión de proyectos para Gessler*, repositorio de código fuente, GitHub, 2026. \[En línea\]. Disponible en: [https://github.com/NestorBenitez0297/GesslerTrack](https://github.com/NestorBenitez0297/GesslerTrack)

## Productos obtenidos

La siguiente lista corresponde a los productos de los que habla este informe. Para cada uno se anexa copia del documento de evidencia y pantallazo de la actividad correspondiente.

| N.º | Producto | Sprint | Evidencia a adjuntar |
|----|----|----|----|
| 1 | Guía de entrevista y resultados de empatía con Gessler | 1 | Documento y pantallazo de la sesión |
| 2 | Enunciado del problema y mapa de empatía | 1 | Documento y pantallazo |
| 3 | Backlog priorizado de historias de usuario | 1 | docs/backlog.md en el repositorio \[8\] |
| 4 | Prototipos navegables de interfaz | 2 | Figuras 1 a 7; index.html en el repositorio |
| 5 | Diagrama de arquitectura en capas | 2 | Figura 8; docs/img/arquitectura.svg |
| 6 | Repositorio con ramas, historial y solicitudes de integración | 3 y 4 | Figuras 14 a 16; enlace al repositorio \[8\] |
| 7 | Incrementos funcionales (clientes, proyectos, entregables, roles) | 3 y 4 | Figuras 1 a 7 y 9 a 12 |
| 8 | Casos de prueba e informe de resultados | 3 a 5 | Anexo C y Figura 13; tests/index.html |
| 9 | Actas de revisión y retrospectiva de cada sprint | 1 a 5 | Documento de cada acta |
| 10 | Informe técnico (este documento) | 5 | Archivo PDF cargado en la plataforma; copia en docs/ del repositorio |

**Seguimiento del avance:** el repositorio público permite revisar en todo momento las ramas, las solicitudes de integración y el historial de cambios del proyecto: [https://github.com/NestorBenitez0297/GesslerTrack](https://github.com/NestorBenitez0297/GesslerTrack).

### Capturas de pantalla del prototipo Gessler Track

Las figuras 1 a 7 corresponden al prototipo inicial (producto 4). Las figuras 8 a 16 se tomaron sobre la versión con arquitectura en capas, control de acceso por roles y pruebas automatizadas (productos 5 a 8), y sobre el repositorio en GitHub. Los datos mostrados son de demostración.

![Figura 1](img/informe/figura-01.png)

*Figura 1. Panel del equipo: indicadores de proyectos activos, pagos pendientes y entregas próximas a vencer, con el listado de proyectos y su avance de pago.*

![Figura 2](img/informe/figura-02.png)

*Figura 2. Filtros por ciudad y por estado de pago (ciudad Medellín, con saldo pendiente).*

![Figura 3](img/informe/figura-03.png)

*Figura 3. Formulario de nuevo proyecto en tres pasos: cliente, proyecto y condiciones de pago.*

![Figura 4](img/informe/figura-04.png)

*Figura 4. Proyecto recién creado, visible en el listado del equipo.*

![Figura 5](img/informe/figura-05.png)

*Figura 5. Detalle de un proyecto: cambio de estado, registro de pagos, historial de pagos y bitácora de cambios.*

![Figura 6](img/informe/figura-06.png)

*Figura 6. Cambio de estado de "En riesgo" a "En curso" con comentario, y registro de un abono que actualiza el saldo pendiente y la bitácora.*

![Figura 7](img/informe/figura-07.png)

*Figura 7. Vista de solo lectura para el cliente, con estado del proyecto, fecha estimada de entrega e historial de pagos.*

![Figura 8](img/informe/figura-08.png)

*Figura 8. Arquitectura en tres capas: presentación, lógica de negocio y persistencia, con los archivos que implementan cada una.*

![Figura 9](img/informe/figura-09.png)

*Figura 9. Validación del formulario de nuevo proyecto: el sistema informa que falta el nombre del cliente y que el anticipo supera el valor total (CP-02, CP-04).*

![Figura 10](img/informe/figura-10.png)

*Figura 10. Validación de pagos: un abono mayor que el saldo pendiente se rechaza con un mensaje que indica el saldo (CP-10).*

![Figura 11](img/informe/figura-11.png)

*Figura 11. Rol Desarrollador: ve el tablero, las entregas y el responsable de cada proyecto, pero no los montos ni los pagos (CP-18).*

![Figura 12](img/informe/figura-12.png)

*Figura 12. Rol Cliente: solo accede a la vista de lectura de su proyecto (CP-17).*

![Figura 13](img/informe/figura-13.png)

*Figura 13. Ejecución de los 22 casos de prueba en tests/index.html: 22 aprobados y 0 fallidos.*

![Figura 14](img/informe/figura-14.png)

*Figura 14. Ramas del repositorio en GitHub: main, develop y una rama feature/GESTR-\<funcionalidad\> por funcionalidad, cada una con su solicitud de integración.*

![Figura 15](img/informe/figura-15.png)

*Figura 15. Solicitudes de integración \#1 a \#4, una por funcionalidad.*

![Figura 16](img/informe/figura-16.png)

*Figura 16. Historial de commits con la nomenclatura GESTR-\<funcionalidad\>: \<descripción\>.*

## Anexos

### Anexo A. Guía de entrevista a Gessler

Instructivo: aplicar la entrevista a quien coordina los proyectos de la empresa, en sesión virtual de unos 40 minutos. Pedir permiso para grabar la sesión o, si no se autoriza, tomar notas durante la entrevista y completarlas justo después.

1.  ¿Cómo recibe hoy una solicitud de un nuevo cliente y qué pasos siguen hasta publicar su sitio?

2.  ¿Dónde guarda la información de clientes, acuerdos y entregables?

3.  ¿Qué retrasos o pérdidas de información ha tenido en los últimos proyectos?

4.  ¿Quién necesita ver el estado de cada proyecto y con qué frecuencia?

5.  ¿Qué información no debería ver cada rol del equipo?

6.  ¿Qué herramientas usa ya y cuáles no quiere reemplazar?

7.  Si el sistema resolviera una sola cosa, ¿cuál sería?

### Anexo B. Formato de retroalimentación del cliente

Instructivo: diligenciar al final de cada revisión de sprint y archivarlo con el acta.

| Aspecto                               | Calificación (1 a 5) | Comentario |
|---------------------------------------|----------------------|------------|
| El flujo cubre la necesidad planteada |                      |            |
| La interfaz es clara y fácil de usar  |                      |            |
| La información mostrada es correcta   |                      |            |
| Cambios que Gessler solicita          |                      |            |

### Anexo C. Casos de prueba ejecutados

Instructivo: crear al menos un caso por criterio de aceptación de cada historia de usuario y registrar el resultado y la evidencia. Los casos están automatizados en tests/pruebas.js y se ejecutan abriendo tests/index.html en el navegador; la tabla registra la ejecución del 26 de noviembre de 2026 en Google Chrome (Figura 13).

| Caso | Historia | Pasos | Resultado esperado | Resultado obtenido | Estado | Evidencia |
|----|----|----|----|----|----|----|
| CP-01 | Registrar cliente y proyecto | Ingresar datos válidos y guardar | Se crea el proyecto con el cliente, en estado En curso y con su anticipo | Igual al esperado | Aprobado | Figura 13 |
| CP-02 | Registrar cliente y proyecto | Guardar con el nombre del cliente vacío | El sistema muestra un mensaje de error claro | Igual al esperado | Aprobado | Figura 13 |
| CP-03 | Registrar cliente y proyecto | Guardar con valor total 0 | Mensaje: el valor total debe ser mayor que cero | Igual al esperado | Aprobado | Figura 13 |
| CP-04 | Registrar cliente y proyecto | Anticipo mayor que el valor total | Mensaje: el anticipo no puede superar el valor total | Igual al esperado | Aprobado | Figura 13 |
| CP-05 | Registrar cliente y proyecto | Crear proyecto sin fecha de entrega | Se asigna entrega a 30 días | Igual al esperado | Aprobado | Figura 13 |
| CP-06 | Cambiar estado | Pasar de En riesgo a En curso con comentario | Cambia el estado y queda registrado en la bitácora | Igual al esperado | Aprobado | Figura 13 |
| CP-07 | Cambiar estado | Enviar un estado inexistente | El sistema lo rechaza | Igual al esperado | Aprobado | Figura 13 |
| CP-08 | Registrar pago | Registrar un abono válido | El saldo pendiente disminuye y se registra en la bitácora | Igual al esperado | Aprobado | Figura 13 |
| CP-09 | Registrar pago | Registrar un pago de 0 o negativo | Mensaje de error y no se registra | Igual al esperado | Aprobado | Figura 13 |
| CP-10 | Registrar pago | Registrar un pago mayor que el saldo | Mensaje de error indicando el saldo | Igual al esperado | Aprobado | Figura 13 |
| CP-11 | Registrar pago | Completar el saldo de un proyecto entregado | El proyecto pasa automáticamente a Pagado | Igual al esperado | Aprobado | Figura 13 |
| CP-12 | Registrar pago | Proyecto con valor total 0 | El porcentaje pagado es 0 (sin división por cero) | Igual al esperado | Aprobado | Figura 13 |
| CP-13 | Tablero de seguimiento | Proyecto en curso con entrega en 5 días o menos | Se marca como próximo a vencer | Igual al esperado | Aprobado | Figura 13 |
| CP-14 | Tablero de seguimiento | Proyecto entregado con fecha vencida | No se marca como próximo a vencer | Igual al esperado | Aprobado | Figura 13 |
| CP-15 | Tablero de seguimiento | Calcular indicadores de 3 proyectos | Activos, saldo pendiente y por vencer correctos | Igual al esperado | Aprobado | Figura 13 |
| CP-16 | Tablero de seguimiento | Filtrar por ciudad, estado y saldo pendiente | Solo quedan los proyectos que cumplen los tres filtros | Igual al esperado | Aprobado | Figura 13 |
| CP-17 | Control de acceso | Rol Cliente intenta registrar pagos o ver el tablero | El sistema niega el acceso | Igual al esperado | Aprobado | Figura 13 |
| CP-18 | Control de acceso | Rol Desarrollador intenta ver pagos o crear proyectos | Puede cambiar estados, pero no ver pagos ni crear | Igual al esperado | Aprobado | Figura 13 |
| CP-19 | Control de acceso | Rol desconocido | No tiene ningún permiso | Igual al esperado | Aprobado | Figura 13 |
| CP-20 | Seguridad de entradas | Ingresar \<script\> en el nombre del cliente | El texto se muestra escapado, no se ejecuta | Igual al esperado | Aprobado | Figura 13 |
| CP-21 | Persistencia | Guardar proyectos y volver a cargarlos | Los datos se recuperan iguales | Igual al esperado | Aprobado | Figura 13 |
| CP-22 | Persistencia | Datos guardados corruptos | Se recupera con los datos de demostración | Igual al esperado | Aprobado | Figura 13 |

### Anexo D. Definición de hecho del proyecto

- El código cumple todos los criterios de aceptación de la historia.

- El cambio entró por una solicitud de integración revisada (con apoyo de un asistente de IA) antes de integrarse a develop.

- Los casos de prueba asociados fueron ejecutados y aprobados.

- La rama se integró a develop sin romper funcionalidades previas: los 22 casos de prueba siguen aprobados.

- Gessler vio la funcionalidad en la revisión del sprint.
