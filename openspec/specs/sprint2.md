# Sprint 2 - Gestión de Usuarios

## Objetivo del Sprint

Desarrollar el módulo de gestión de usuarios que permita a los administradores registrar, consultar, actualizar y desactivar usuarios del sistema, garantizando el control de acceso y la administración de los usuarios autorizados.

---

# Historias de Usuario

## HU-04

### Código

HU-04

### Nombre

Registrar usuario

### Prioridad

Alta

### Descripción

**Como** administrador,

**quiero** registrar nuevos usuarios,

**para** permitirles acceder al Sistema de Gestión de Préstamos.

### Criterios de aceptación

* El sistema deberá permitir registrar nuevos usuarios.
* El nombre de usuario deberá ser único.
* La contraseña deberá almacenarse cifrada.
* Solo un administrador podrá registrar usuarios.
* El usuario será creado con estado **Activo**.

### Tareas técnicas

#### Frontend

* Crear la vista de registro de usuarios.
* Implementar formulario de registro.
* Validar campos obligatorios.
* Mostrar mensajes de éxito y error.
* Consumir el endpoint de creación de usuarios.

#### Backend

* Implementar endpoint para registrar usuarios.
* Validar permisos del administrador.
* Validar duplicidad del nombre de usuario.
* Cifrar la contraseña mediante bcrypt.
* Registrar el usuario.

#### Base de datos

* Crear el modelo de usuarios en Prisma.
* Definir restricciones de unicidad.
* Registrar fecha de creación.
* Registrar estado del usuario.

---

## HU-05

### Código

HU-05

### Nombre

Consultar usuarios

### Prioridad

Alta

### Descripción

**Como** administrador,

**quiero** visualizar el listado de usuarios registrados,

**para** administrar los accesos al sistema.

### Criterios de aceptación

* El sistema mostrará todos los usuarios registrados.
* Se visualizará el estado de cada usuario.
* Solo los administradores podrán acceder al listado.
* La información deberá mostrarse de forma paginada o filtrable.

### Tareas técnicas

#### Frontend

* Crear la vista de listado de usuarios.
* Implementar tabla de usuarios.
* Agregar búsqueda por nombre.
* Implementar paginación.

#### Backend

* Crear endpoint para listar usuarios.
* Implementar búsqueda por nombre.
* Proteger el endpoint mediante JWT.

#### Base de datos

* Consultar usuarios activos e inactivos.
* Optimizar consultas mediante índices si es necesario.

---

## HU-06

### Código

HU-06

### Nombre

Editar información de usuarios

### Prioridad

Alta

### Descripción

**Como** administrador,

**quiero** actualizar la información de un usuario,

**para** mantener sus datos actualizados.

### Criterios de aceptación

* El sistema permitirá modificar la información del usuario.
* No será posible duplicar nombres de usuario.
* Solo los administradores podrán realizar modificaciones.
* Los cambios deberán reflejarse inmediatamente.

### Tareas técnicas

#### Frontend

* Crear formulario de edición.
* Mostrar información actual del usuario.
* Validar datos antes del envío.

#### Backend

* Implementar endpoint de actualización.
* Validar duplicidad de usuarios.
* Validar permisos del administrador.

#### Base de datos

* Actualizar registros de usuarios.
* Registrar fecha de modificación.

---

## HU-07

### Código

HU-07

### Nombre

Desactivar usuario

### Prioridad

Alta

### Descripción

**Como** administrador,

**quiero** desactivar usuarios,

**para** impedir su acceso sin eliminar su información histórica.

### Criterios de aceptación

* El sistema permitirá desactivar usuarios.
* Los usuarios desactivados no podrán iniciar sesión.
* La información histórica del usuario deberá conservarse.
* Solo un administrador podrá realizar esta operación.

### Tareas técnicas

#### Frontend

* Agregar acción para desactivar usuarios.
* Solicitar confirmación antes de la operación.
* Actualizar automáticamente el listado.

#### Backend

* Implementar endpoint para desactivar usuarios.
* Validar permisos.
* Impedir el acceso de usuarios desactivados.

#### Base de datos

* Actualizar el estado del usuario a **Inactivo**.
* Mantener la integridad referencial con los préstamos registrados.

---

# Definition of Done

El Sprint se considerará finalizado cuando:

* Sea posible registrar usuarios.
* Sea posible consultar el listado de usuarios.
* Sea posible editar la información de los usuarios.
* Sea posible desactivar usuarios.
* Solo los administradores puedan acceder a las funciones de administración.
* Todas las operaciones estén protegidas mediante JWT.
* Las pruebas unitarias e integración del módulo de usuarios se ejecuten correctamente.
* La documentación correspondiente haya sido actualizada.

---

# Entregables

* Módulo completo de gestión de usuarios.
* CRUD de usuarios (sin eliminación física).
* Protección mediante roles y JWT.
* Integración con PostgreSQL mediante Prisma.
* Interfaces de administración de usuarios.

---

# Riesgos

* Registro de usuarios duplicados.
* Asignación incorrecta de permisos.
* Errores en el cifrado de contraseñas.
* Modificaciones no autorizadas por una validación insuficiente de roles.
