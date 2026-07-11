# Sprint 1 - Autenticación e Inicialización del Proyecto

## Objetivo del Sprint

Implementar la estructura base del proyecto y desarrollar el módulo de autenticación que permita a los usuarios acceder de forma segura al Sistema de Gestión de Préstamos.

---

# Historias de Usuario

## HU-01

### Código

HU-01

### Nombre

Inicio de sesión de usuarios

### Prioridad

Alta

### Descripción

**Como** usuario autorizado,

**quiero** iniciar sesión utilizando mi nombre de usuario y contraseña,

**para** acceder únicamente a las funcionalidades permitidas por el sistema.

### Criterios de aceptación

* El sistema deberá mostrar un formulario de inicio de sesión.
* El usuario deberá ingresar su nombre de usuario y contraseña.
* El sistema deberá validar las credenciales.
* Si las credenciales son válidas, se generará un token JWT.
* El usuario será redirigido al Dashboard.
* Si las credenciales son incorrectas, el sistema mostrará un mensaje de error.
* Solo los usuarios activos podrán iniciar sesión.

### Tareas técnicas

#### Frontend

* Crear el proyecto React utilizando Vite.
* Configurar TypeScript.
* Configurar React Router.
* Diseñar la interfaz de inicio de sesión.
* Implementar validaciones del formulario.
* Consumir el endpoint de autenticación mediante Axios.
* Almacenar el JWT.
* Implementar la redirección al Dashboard.

#### Backend

* Crear el proyecto Express con TypeScript.
* Configurar la estructura inicial del proyecto.
* Configurar Express.
* Configurar variables de entorno.
* Implementar el endpoint de autenticación.
* Validar credenciales.
* Generar el token JWT.
* Implementar middleware de autenticación.

#### Base de datos

* Crear la base de datos PostgreSQL.
* Configurar Prisma ORM.
* Crear la migración inicial.
* Crear la tabla **usuarios**.
* Registrar un usuario administrador inicial.
* Almacenar contraseñas utilizando bcrypt.

---

## HU-02

### Código

HU-02

### Nombre

Cerrar sesión

### Prioridad

Alta

### Descripción

**Como** usuario autenticado,

**quiero** cerrar mi sesión,

**para** evitar accesos no autorizados al sistema.

### Criterios de aceptación

* El usuario podrá cerrar sesión desde cualquier página.
* El token JWT será eliminado del almacenamiento local.
* El usuario será redirigido a la pantalla de inicio de sesión.
* Las rutas protegidas dejarán de ser accesibles.

### Tareas técnicas

#### Frontend

* Agregar el botón de cierre de sesión.
* Eliminar el token almacenado.
* Redireccionar al Login.

#### Backend

* Implementar la validación del JWT en las rutas protegidas.

#### Base de datos

* No requiere modificaciones.

---

## HU-03

### Código

HU-03

### Nombre

Protección de rutas

### Prioridad

Alta

### Descripción

**Como** usuario del sistema,

**quiero** que únicamente los usuarios autenticados puedan acceder a las funcionalidades del sistema,

**para** garantizar la seguridad de la información.

### Criterios de aceptación

* Las rutas protegidas requerirán autenticación.
* Las solicitudes sin un JWT válido serán rechazadas.
* Las sesiones expiradas deberán volver a solicitar autenticación.

### Tareas técnicas

#### Frontend

* Crear componente de rutas protegidas.
* Validar la existencia del token antes de acceder a una vista.
* Redireccionar automáticamente al Login cuando la sesión expire.

#### Backend

* Implementar middleware para validar JWT.
* Proteger los endpoints privados.
* Manejar respuestas HTTP 401 y 403.

#### Base de datos

* No requiere modificaciones.

---

# Definition of Done

El Sprint se considerará finalizado cuando:

* Todas las historias de usuario hayan sido implementadas.
* El proyecto React y Express se encuentren configurados correctamente.
* La conexión con PostgreSQL mediante Prisma funcione correctamente.
* El usuario pueda iniciar y cerrar sesión.
* Las rutas protegidas funcionen correctamente.
* La autenticación mediante JWT esté operativa.
* Las pruebas unitarias del módulo de autenticación hayan sido ejecutadas satisfactoriamente.
* La documentación correspondiente haya sido actualizada.

---

# Entregables

* Proyecto React inicial.
* Proyecto Express inicial.
* Configuración de Prisma ORM.
* Base de datos PostgreSQL configurada.
* Módulo completo de autenticación.
* Protección de rutas.
* Gestión de sesiones mediante JWT.

---

# Riesgos

* Configuración incorrecta de Prisma.
* Errores de conexión con PostgreSQL.
* Manejo inadecuado del almacenamiento del JWT.
* Configuración incorrecta de variables de entorno.
