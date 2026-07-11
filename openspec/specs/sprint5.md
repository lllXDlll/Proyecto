# Sprint 5 - Reportes, Dashboard y Finalización del Sistema

## Objetivo del Sprint

Desarrollar el módulo de visualización y consulta de información que permita obtener indicadores del sistema, generar reportes y proporcionar una visión general del estado de los préstamos y del inventario.

---

# Historias de Usuario

## HU-18

### Código

HU-18

### Nombre

Visualizar Dashboard

### Prioridad

Alta

### Descripción

**Como** usuario autenticado,

**quiero** visualizar un panel principal con información resumida del sistema,

**para** conocer rápidamente el estado general de los equipos y préstamos.

### Criterios de aceptación

* El Dashboard mostrará la cantidad total de equipos.
* El Dashboard mostrará la cantidad de equipos disponibles.
* El Dashboard mostrará la cantidad de equipos prestados.
* El Dashboard mostrará la cantidad de usuarios registrados.
* La información deberá actualizarse automáticamente al cargar la página.

### Tareas técnicas

#### Frontend

* Diseñar la interfaz del Dashboard.
* Implementar tarjetas con indicadores.
* Consumir los servicios de estadísticas.
* Mostrar mensajes cuando no existan datos.

#### Backend

* Implementar el endpoint de estadísticas generales.
* Calcular los indicadores del sistema.
* Proteger el endpoint mediante JWT.

#### Base de datos

* Realizar consultas agregadas sobre usuarios, equipos y préstamos.
* Optimizar consultas para el Dashboard.

---

## HU-19

### Código

HU-19

### Nombre

Consultar estadísticas de préstamos

### Prioridad

Media

### Descripción

**Como** administrador,

**quiero** visualizar estadísticas de los préstamos realizados,

**para** analizar el uso de los equipos.

### Criterios de aceptación

* El sistema mostrará el número de préstamos realizados.
* El sistema mostrará el número de préstamos activos.
* El sistema mostrará el número de préstamos finalizados.
* La información podrá filtrarse por rango de fechas.

### Tareas técnicas

#### Frontend

* Crear la vista de estadísticas.
* Mostrar indicadores mediante tarjetas.
* Implementar filtros por fecha.

#### Backend

* Implementar endpoint para estadísticas.
* Procesar filtros de consulta.
* Validar parámetros recibidos.

#### Base de datos

* Ejecutar consultas agregadas.
* Filtrar registros por fecha.
* Optimizar consultas.

---

## HU-20

### Código

HU-20

### Nombre

Consultar equipos por estado

### Prioridad

Media

### Descripción

**Como** usuario autorizado,

**quiero** consultar los equipos agrupados por estado,

**para** conocer la disponibilidad actual del inventario.

### Criterios de aceptación

* El sistema permitirá visualizar equipos disponibles.
* El sistema permitirá visualizar equipos prestados.
* El sistema permitirá visualizar equipos en mantenimiento.
* El sistema permitirá visualizar equipos inactivos.

### Tareas técnicas

#### Frontend

* Crear filtros por estado.
* Mostrar resultados dinámicamente.
* Actualizar el listado sin recargar la página.

#### Backend

* Implementar endpoint para consulta por estado.
* Validar filtros recibidos.

#### Base de datos

* Consultar equipos por estado.
* Optimizar consultas mediante índices.

---

## HU-21

### Código

HU-21

### Nombre

Generar reporte de préstamos

### Prioridad

Media

### Descripción

**Como** administrador,

**quiero** generar un reporte del historial de préstamos,

**para** facilitar la consulta y análisis de la información registrada.

### Criterios de aceptación

* El sistema permitirá generar un reporte de préstamos.
* Será posible aplicar filtros por usuario.
* Será posible aplicar filtros por equipo.
* Será posible aplicar filtros por fechas.
* El reporte mostrará toda la información del préstamo.

### Tareas técnicas

#### Frontend

* Crear la interfaz de generación de reportes.
* Implementar filtros de búsqueda.
* Mostrar el resultado del reporte.

#### Backend

* Implementar endpoint para generación de reportes.
* Procesar filtros.
* Validar parámetros de consulta.

#### Base de datos

* Consultar la información del historial.
* Relacionar usuarios, equipos y préstamos.
* Optimizar consultas para reportes.

---

# Definition of Done

El Sprint se considerará finalizado cuando:

* El Dashboard muestre correctamente los indicadores del sistema.
* Sea posible consultar estadísticas de préstamos.
* Sea posible consultar equipos por estado.
* Sea posible generar reportes de préstamos.
* Todos los endpoints se encuentren protegidos mediante autenticación.
* Las pruebas unitarias e integración del módulo de reportes se ejecuten correctamente.
* La documentación del sprint haya sido actualizada.

---

# Entregables

* Dashboard principal.
* Módulo de estadísticas.
* Consulta de equipos por estado.
* Módulo de reportes de préstamos.
* Indicadores generales del sistema.

---

# Riesgos

* Consultas lentas al generar estadísticas sobre grandes volúmenes de datos.
* Inconsistencias en los indicadores por información desactualizada.
* Reportes incompletos debido a filtros incorrectamente implementados.
* Bajo rendimiento en consultas agregadas si no se optimizan adecuadamente.
