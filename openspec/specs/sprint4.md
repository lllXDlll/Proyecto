# Sprint 4 - Gestión de Préstamos

## Objetivo del Sprint

Desarrollar el módulo de gestión de préstamos que permita registrar, consultar y finalizar préstamos de equipos, garantizando el control de disponibilidad del inventario y la trazabilidad de las operaciones realizadas.

---

# Historias de Usuario

## HU-13

### Código

HU-13

### Nombre

Registrar préstamo de equipo

### Prioridad

Alta

### Descripción

**Como** encargado del laboratorio,

**quiero** registrar el préstamo de un equipo a un usuario,

**para** mantener el control de los equipos entregados.

### Criterios de aceptación

* El sistema deberá permitir seleccionar un usuario registrado.
* El sistema deberá permitir seleccionar únicamente equipos disponibles.
* El sistema registrará la fecha y hora del préstamo.
* El estado del equipo cambiará automáticamente a **Prestado**.
* El préstamo quedará asociado al usuario correspondiente.
* El sistema impedirá registrar un préstamo sobre un equipo no disponible.

### Tareas técnicas

#### Frontend

* Crear la vista de registro de préstamos.
* Implementar formulario de selección de usuario y equipo.
* Mostrar únicamente equipos disponibles.
* Validar la información antes del envío.
* Mostrar mensajes de éxito y error.

#### Backend

* Implementar el endpoint para registrar préstamos.
* Validar la existencia del usuario.
* Validar la disponibilidad del equipo.
* Registrar el préstamo.
* Actualizar automáticamente el estado del equipo.

#### Base de datos

* Crear el modelo **Prestamo**.
* Relacionar la entidad con **Usuario** y **Equipo**.
* Registrar la fecha de préstamo.
* Actualizar el estado del equipo.

---

## HU-14

### Código

HU-14

### Nombre

Registrar devolución de equipo

### Prioridad

Alta

### Descripción

**Como** encargado del laboratorio,

**quiero** registrar la devolución de un equipo,

**para** actualizar su disponibilidad y mantener el historial del préstamo.

### Criterios de aceptación

* El sistema permitirá registrar únicamente préstamos activos.
* La devolución registrará la fecha y hora correspondiente.
* El estado del equipo cambiará automáticamente a **Disponible**.
* El préstamo será marcado como finalizado.
* No será posible registrar dos devoluciones para un mismo préstamo.

### Tareas técnicas

#### Frontend

* Crear la vista de devolución de equipos.
* Mostrar únicamente préstamos activos.
* Solicitar confirmación antes de registrar la devolución.
* Actualizar automáticamente la información mostrada.

#### Backend

* Implementar el endpoint de devolución.
* Validar que el préstamo se encuentre activo.
* Actualizar el estado del préstamo.
* Actualizar el estado del equipo.

#### Base de datos

* Registrar la fecha de devolución.
* Actualizar el estado del préstamo.
* Actualizar el estado del equipo.

---

## HU-15

### Código

HU-15

### Nombre

Consultar préstamos activos

### Prioridad

Alta

### Descripción

**Como** encargado del laboratorio,

**quiero** visualizar los préstamos activos,

**para** conocer qué equipos permanecen prestados.

### Criterios de aceptación

* El sistema mostrará únicamente los préstamos activos.
* Se visualizará el usuario responsable.
* Se visualizará el equipo prestado.
* Se mostrará la fecha del préstamo.
* Solo usuarios autenticados podrán acceder a la información.

### Tareas técnicas

#### Frontend

* Crear la vista de préstamos activos.
* Implementar tabla de resultados.
* Agregar ordenamiento por fecha.
* Implementar paginación.

#### Backend

* Implementar endpoint para consultar préstamos activos.
* Proteger el endpoint mediante JWT.
* Implementar paginación.

#### Base de datos

* Consultar préstamos activos.
* Relacionar usuarios y equipos.
* Optimizar consultas mediante índices.

---

## HU-16

### Código

HU-16

### Nombre

Consultar historial de préstamos

### Prioridad

Media

### Descripción

**Como** administrador,

**quiero** consultar el historial de préstamos,

**para** realizar el seguimiento del uso de los equipos.

### Criterios de aceptación

* El sistema mostrará préstamos activos y finalizados.
* Será posible consultar el historial por usuario.
* Será posible consultar el historial por equipo.
* Se visualizarán las fechas de préstamo y devolución.

### Tareas técnicas

#### Frontend

* Crear la vista del historial.
* Implementar filtros por usuario.
* Implementar filtros por equipo.
* Implementar búsqueda por fechas.

#### Backend

* Implementar endpoint del historial.
* Implementar filtros de consulta.
* Validar parámetros de búsqueda.

#### Base de datos

* Consultar el historial completo.
* Optimizar consultas con relaciones.
* Implementar índices para consultas frecuentes.

---

## HU-17

### Código

HU-17

### Nombre

Validar disponibilidad de equipos

### Prioridad

Alta

### Descripción

**Como** encargado del laboratorio,

**quiero** que el sistema valide automáticamente la disponibilidad de un equipo,

**para** evitar préstamos duplicados o inconsistencias en el inventario.

### Criterios de aceptación

* Solo podrán prestarse equipos con estado **Disponible**.
* No podrán prestarse equipos en mantenimiento.
* No podrán prestarse equipos inactivos.
* No podrán prestarse equipos actualmente prestados.
* El sistema mostrará un mensaje cuando el préstamo no pueda realizarse.

### Tareas técnicas

#### Frontend

* Mostrar el estado del equipo antes del préstamo.
* Mostrar mensajes de validación.
* Impedir el envío del formulario cuando el equipo no esté disponible.

#### Backend

* Validar el estado del equipo antes del registro.
* Retornar mensajes de error apropiados.
* Garantizar la integridad de la operación.

#### Base de datos

* Validar el estado del equipo antes de registrar el préstamo.
* Mantener la consistencia entre las tablas de equipos y préstamos.

---

# Definition of Done

El Sprint se considerará finalizado cuando:

* Sea posible registrar préstamos de equipos.
* Sea posible registrar devoluciones.
* Sea posible consultar préstamos activos.
* Sea posible consultar el historial de préstamos.
* El sistema valide automáticamente la disponibilidad de los equipos.
* El estado de los equipos se actualice automáticamente durante los préstamos y devoluciones.
* Todas las operaciones estén protegidas mediante autenticación y autorización.
* Las pruebas unitarias y de integración del módulo de préstamos se ejecuten correctamente.
* La documentación del sprint haya sido actualizada.

---

# Entregables

* Módulo completo de gestión de préstamos.
* Registro de préstamos.
* Registro de devoluciones.
* Consulta de préstamos activos.
* Historial de préstamos.
* Validación automática de disponibilidad de equipos.

---

# Riesgos

* Inconsistencias entre el estado del equipo y el estado del préstamo.
* Préstamos simultáneos sobre un mismo equipo.
* Pérdida de trazabilidad por registros incompletos.
* Errores en las relaciones entre usuarios, equipos y préstamos.
