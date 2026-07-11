# Sprint 6 - Pruebas, Optimización y Despliegue

## Objetivo del Sprint

Realizar la validación integral del Sistema de Gestión de Préstamos mediante pruebas automatizadas, optimizar el rendimiento de la aplicación y desplegar la versión estable en un entorno de producción, garantizando su correcto funcionamiento y disponibilidad.

---

# Historias de Usuario

## HU-22

### Código

HU-22

### Nombre

Ejecutar pruebas unitarias

### Prioridad

Alta

### Descripción

**Como** equipo de desarrollo,

**quiero** ejecutar pruebas unitarias sobre los módulos implementados,

**para** verificar que cada componente funcione correctamente de manera independiente.

### Criterios de aceptación

* Las pruebas deberán cubrir la lógica de negocio de los módulos principales.
* Todas las pruebas deberán ejecutarse sin errores.
* Los resultados deberán documentarse.
* La cobertura deberá ser suficiente para validar las funcionalidades críticas.

### Tareas técnicas

#### Frontend

* Implementar pruebas unitarias para componentes críticos.
* Validar formularios y componentes reutilizables.
* Ejecutar la suite de pruebas.

#### Backend

* Implementar pruebas unitarias para servicios y controladores.
* Validar reglas de negocio.
* Ejecutar la suite de pruebas con Jest.

#### Base de datos

* Preparar datos de prueba.
* Configurar entorno aislado para las pruebas.

---

## HU-23

### Código

HU-23

### Nombre

Ejecutar pruebas de integración

### Prioridad

Alta

### Descripción

**Como** equipo de desarrollo,

**quiero** verificar la integración entre frontend, backend y base de datos,

**para** asegurar que los módulos funcionen correctamente como un sistema integrado.

### Criterios de aceptación

* Los servicios REST deberán responder correctamente.
* La comunicación entre los módulos deberá ser exitosa.
* Las operaciones CRUD deberán completarse sin errores.
* Los resultados deberán documentarse.

### Tareas técnicas

#### Frontend

* Validar la comunicación con la API.
* Verificar el manejo de respuestas y errores.

#### Backend

* Implementar pruebas de integración utilizando Supertest.
* Validar endpoints protegidos y públicos.
* Verificar la comunicación con PostgreSQL.

#### Base de datos

* Configurar una base de datos de pruebas.
* Preparar datos de prueba.
* Restaurar el estado inicial después de cada ejecución.

---

## HU-24

### Código

HU-24

### Nombre

Ejecutar pruebas End-to-End

### Prioridad

Alta

### Descripción

**Como** equipo de desarrollo,

**quiero** ejecutar pruebas End-to-End,

**para** validar el funcionamiento completo de los procesos principales desde la perspectiva del usuario.

### Criterios de aceptación

* Se validará el inicio de sesión.
* Se validará la gestión de usuarios.
* Se validará la gestión de equipos.
* Se validará el registro y devolución de préstamos.
* Todas las pruebas deberán ejecutarse satisfactoriamente.

### Tareas técnicas

#### Frontend

* Preparar el entorno para pruebas E2E.
* Validar los flujos completos de la interfaz.

#### Backend

* Garantizar la disponibilidad de la API para las pruebas.
* Configurar datos necesarios para los escenarios.

#### Base de datos

* Preparar datos de prueba.
* Restaurar el estado de la base de datos al finalizar cada ejecución.

---

## HU-25

### Código

HU-25

### Nombre

Ejecutar pruebas de carga

### Prioridad

Media

### Descripción

**Como** equipo de desarrollo,

**quiero** evaluar el comportamiento del sistema bajo carga,

**para** identificar posibles problemas de rendimiento antes del despliegue.

### Criterios de aceptación

* Se ejecutarán pruebas sobre los endpoints principales.
* Se registrarán tiempos de respuesta.
* Se identificarán posibles cuellos de botella.
* Los resultados serán documentados.

### Tareas técnicas

#### Frontend

* No requiere implementación específica.

#### Backend

* Configurar escenarios de prueba con k6.
* Analizar métricas obtenidas.
* Optimizar los endpoints con mayor tiempo de respuesta.

#### Base de datos

* Analizar consultas lentas.
* Optimizar índices cuando sea necesario.

---

## HU-26

### Código

HU-26

### Nombre

Desplegar la aplicación

### Prioridad

Alta

### Descripción

**Como** usuario final,

**quiero** acceder al sistema desde Internet,

**para** utilizar la aplicación sin necesidad de ejecutarla en un entorno local.

### Criterios de aceptación

* La aplicación deberá encontrarse disponible en Render.
* La API deberá comunicarse correctamente con la base de datos alojada en Supabase.
* Todas las funcionalidades deberán operar correctamente en producción.
* Las variables de entorno deberán configurarse adecuadamente.
* El sistema deberá estar accesible mediante una URL pública.

### Tareas técnicas

#### Frontend

* Generar la versión de producción de React.
* Configurar la integración con la API en producción.
* Validar el funcionamiento de la interfaz desplegada.

#### Backend

* Configurar el despliegue en Render.
* Configurar variables de entorno.
* Configurar la conexión con Supabase.
* Validar el correcto funcionamiento de la API en producción.

#### Base de datos

* Configurar la instancia PostgreSQL en Supabase.
* Ejecutar las migraciones con Prisma.
* Validar la integridad de los datos.
* Configurar copias de seguridad según las capacidades del servicio.

---

# Definition of Done

El Sprint se considerará finalizado cuando:

* Todas las pruebas unitarias se ejecuten correctamente.
* Todas las pruebas de integración finalicen satisfactoriamente.
* Todas las pruebas End-to-End validen los flujos principales del sistema.
* Se ejecuten pruebas de carga y se documenten los resultados.
* La aplicación se encuentre desplegada en Render.
* La conexión con la base de datos PostgreSQL de Supabase funcione correctamente.
* La documentación técnica y de usuario esté actualizada.
* Se publique una versión estable del sistema.

---

# Entregables

* Suite de pruebas unitarias.
* Suite de pruebas de integración.
* Suite de pruebas End-to-End.
* Informe de pruebas de carga.
* Aplicación desplegada en Render.
* Base de datos PostgreSQL operativa en Supabase.
* Versión estable del Sistema de Gestión de Préstamos.

---

# Riesgos

* Errores detectados durante las pruebas finales que requieran cambios en funcionalidades ya implementadas.
* Problemas de configuración durante el despliegue en Render.
* Fallos de conectividad entre Render y Supabase.
* Diferencias entre el entorno de desarrollo y el entorno de producción.
* Incremento en los tiempos de respuesta bajo condiciones de alta carga.
