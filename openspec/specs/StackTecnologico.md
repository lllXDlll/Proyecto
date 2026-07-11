# Stack Tecnológico

## Objetivo

Este documento define el conjunto de tecnologías seleccionadas para el desarrollo del **Sistema de Gestión de Préstamos**. La selección del stack busca garantizar compatibilidad entre herramientas, facilidad de mantenimiento, soporte para pruebas automatizadas y un proceso de despliegue sencillo.

## Frontend

| Tecnología   | Propósito                                                             |
| ------------ | --------------------------------------------------------------------- |
| React        | Desarrollo de la interfaz de usuario basada en componentes.           |
| TypeScript   | Lenguaje principal para el desarrollo del frontend.                   |
| Vite         | Herramienta para el desarrollo y construcción de la aplicación React. |
| React Router | Gestión de navegación entre vistas de la aplicación.                  |
| Axios        | Consumo de la API REST desde el cliente.                              |

## Backend

| Tecnología           | Propósito                                             |
| -------------------- | ----------------------------------------------------- |
| Node.js              | Entorno de ejecución para el servidor.                |
| Express              | Framework para el desarrollo de la API REST.          |
| TypeScript           | Lenguaje principal para el desarrollo del backend.    |
| Prisma ORM           | Acceso y gestión de la base de datos mediante un ORM. |
| JSON Web Token (JWT) | Autenticación y autorización basada en tokens.        |
| bcrypt               | Cifrado seguro de contraseñas.                        |

## Base de Datos

| Tecnología | Propósito                                                      |
| ---------- | -------------------------------------------------------------- |
| PostgreSQL | Sistema gestor de base de datos relacional.                    |
| Supabase   | Servicio administrado para alojar la base de datos PostgreSQL. |

## Pruebas

| Tipo de prueba           | Herramienta |
| ------------------------ | ----------- |
| Pruebas unitarias        | Jest        |
| Pruebas de integración   | Supertest   |
| Pruebas End-to-End (E2E) | Playwright  |
| Pruebas de carga         | k6          |

## Control de Versiones

| Tecnología | Propósito                                       |
| ---------- | ----------------------------------------------- |
| Git        | Control de versiones del proyecto.              |
| GitHub     | Repositorio remoto y gestión del código fuente. |

## Metodología de Desarrollo

| Tecnología | Propósito                                                                                       |
| ---------- | ----------------------------------------------------------------------------------------------- |
| Scrum      | Gestión ágil del proyecto mediante iteraciones.                                                 |
| OpenSpec   | Implementación de Spec-Driven Development (SDD) para el desarrollo guiado por especificaciones. |
