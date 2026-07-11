# Sprint 3 - Gestión de Equipos

## Objetivo del Sprint

Desarrollar el módulo de gestión de equipos que permita registrar, consultar, actualizar y desactivar los equipos disponibles para préstamo, manteniendo un inventario actualizado y controlando su disponibilidad dentro del sistema.

---

# Historias de Usuario

## HU-08

### Código

HU-08

### Nombre

Registrar equipo

### Prioridad

Alta

### Descripción

**Como** administrador,

**quiero** registrar nuevos equipos en el inventario,

**para** que puedan ser gestionados y prestados a los usuarios.

### Criterios de aceptación

* El sistema permitirá registrar un nuevo equipo.
* Cada equipo deberá poseer un código de inventario único.
* Se registrará la información básica del equipo.
* El equipo será creado con estado **Disponible**.
* Solo los administradores podrán registrar equipos.

### Tareas técnicas

#### Frontend

* Crear la vista de registro de equipos.
* Implementar formulario de registro.
* Validar los campos obligatorios.
* Mostrar mensajes de éxito y error.
* Consumir el endpoint de creación de equipos.

#### Backend

* Implementar el endpoint para registrar equipos.
* Validar la unicidad del código de inventario.
* Validar permisos del administrador.
* Registrar el equipo en la base de datos.

#### Base de datos

* Crear el modelo **Equipo** en Prisma.
* Definir el código de inventario como único.
* Registrar el estado inicial del equipo.
* Registrar fechas de creación y actualización.

---

## HU-09

### Código

HU-09

### Nombre

Consultar equipos

### Prioridad

Alta

### Descripción

**Como** usuario autorizado,

**quiero** visualizar el inventario de equipos,

**para** conocer cuáles se encuentran disponibles para préstamo.

### Criterios de aceptación

* El sistema mostrará el listado de equipos.
* Se visualizará el estado de cada equipo.
* El sistema permitirá ordenar los resultados.
* Solo los usuarios autenticados podrán consultar el inventario.

### Tareas técnicas

#### Frontend

* Crear la vista de listado de equipos.
* Implementar tabla de equipos.
* Mostrar estado y datos principales.
* Agregar paginación.

#### Backend

* Implementar endpoint para listar equipos.
* Proteger el endpoint mediante JWT.
* Implementar paginación.

#### Base de datos

* Consultar los registros de equipos.
* Optimizar consultas para el listado.

---

## HU-10

### Código

HU-10

### Nombre

Actualizar información de equipos

### Prioridad

Alta

### Descripción

**Como** administrador,

**quiero** modificar la información de un equipo,

**para** mantener actualizado el inventario.

### Criterios de aceptación

* El sistema permitirá editar la información del equipo.
* No será posible duplicar códigos de inventario.
* Solo los administradores podrán realizar modificaciones.
* Los cambios deberán reflejarse inmediatamente.

### Tareas técnicas

#### Frontend

* Crear formulario de edición.
* Mostrar la información actual del equipo.
* Validar los datos antes del envío.

#### Backend

* Implementar endpoint para actualizar equipos.
* Validar la unicidad del código de inventario.
* Validar permisos del administrador.

#### Base de datos

* Actualizar los registros del equipo.
* Registrar la fecha de modificación.

---

## HU-11

### Código

HU-11

### Nombre

Desactivar equipo

### Prioridad

Alta

### Descripción

**Como** administrador,

**quiero** desactivar equipos,

**para** impedir que sean prestados sin eliminar su historial del sistema.

### Criterios de aceptación

* El sistema permitirá desactivar equipos.
* Los equipos desactivados no aparecerán como disponibles para préstamo.
* El historial asociado al equipo deberá conservarse.
* Solo los administradores podrán realizar esta operación.

### Tareas técnicas

#### Frontend

* Agregar la opción para desactivar equipos.
* Solicitar confirmación antes de realizar la operación.
* Actualizar automáticamente el listado.

#### Backend

* Implementar endpoint para desactivar equipos.
* Validar permisos del administrador.
* Impedir préstamos sobre equipos desactivados.

#### Base de datos

* Actualizar el estado del equipo a **Inactivo**.
* Mantener la integridad referencial con el historial de préstamos.

---

## HU-12

### Código

HU-12

### Nombre

Buscar y filtrar equipos

### Prioridad

Media

### Descripción

**Como** usuario autorizado,

**quiero** buscar y filtrar equipos,

**para** localizar rápidamente el equipo que necesito.

### Criterios de aceptación

* El sistema permitirá buscar equipos por nombre.
* El sistema permitirá buscar por código de inventario.
* El sistema permitirá filtrar por estado.
* Los resultados deberán actualizarse de forma dinámica.

### Tareas técnicas

#### Frontend

* Implementar barra de búsqueda.
* Agregar filtros por estado.
* Actualizar el listado dinámicamente.

#### Backend

* Implementar filtros en el endpoint de consulta.
* Validar parámetros de búsqueda.
* Optimizar consultas.

#### Base de datos

* Implementar consultas filtradas.
* Crear índices si son necesarios para mejorar el rendimiento.

---

# Definition of Done

El Sprint se considerará finalizado cuando:

* Sea posible registrar equipos.
* Sea posible consultar el inventario.
* Sea posible actualizar la información de los equipos.
* Sea posible desactivar equipos sin eliminar su historial.
* Sea posible buscar y filtrar equipos.
* Todas las operaciones estén protegidas mediante autenticación y autorización.
* Las pruebas unitarias y de integración del módulo de equipos se ejecuten satisfactoriamente.
* La documentación del sprint haya sido actualizada.

---

# Entregables

* Módulo completo de gestión de equipos.
* CRUD de equipos con desactivación lógica.
* Consulta de disponibilidad.
* Búsqueda y filtrado de equipos.
* Integración con PostgreSQL mediante Prisma.

---

# Riesgos

* Registro de equipos con códigos duplicados.
* Inconsistencias en el estado de disponibilidad.
* Accesos no autorizados a funciones administrativas.
* Consultas lentas cuando aumente el número de equipos registrados.
