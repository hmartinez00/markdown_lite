# 🚀 Documentación del Proyecto: Sistema Core V3

Este documento sirve como ejemplo para demostrar las capacidades del visor Markdown con soporte para imágenes optimizadas y tablas complejas.

## 1. Arquitectura del Sistema
El sistema se divide en tres capas principales que gestionan el flujo de datos desde la entrada del usuario hasta la persistencia.

| Capa | Componente | Responsabilidad |
| --- | --- | --- |
| **Frontend** | React / Next.js | Interfaz de usuario y gestión de estado global. |
| **Backend** | Laravel 11 | Lógica de negocio, autenticación y API REST. |
| **Data** | PostgreSQL | Almacenamiento persistente y relacional. |

---

## 2. Flujos de Trabajo de Procesamiento
A continuación, se detalla la lógica de los servicios internos. Esta tabla utiliza celdas combinadas para agrupar procesos por su origen de datos.

<table>
    <thead>
        <tr>
            <th colspan="2">Proceso Principal</th>
            <th>Origen</th>
            <th>Frecuencia</th>
            <th>Descripción</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="2">Ingesta de Datos</td>
            <td>Webhook Receptor</td>
            <td>API Externa</td>
            <td>Tiempo Real</td>
            <td>Recibe notificaciones JSON de servicios de terceros y las encola.</td>
        </tr>
        <tr>
            <td>Batch Importer</td>
            <td>S3 Bucket</td>
            <td>Cada 6 horas</td>
            <td>Procesa archivos CSV masivos para actualización de inventario.</td>
        </tr>
        <tr>
            <td rowspan="2">Notificaciones</td>
            <td>Servicio de Email</td>
            <td>Redis Queue</td>
            <td rowspan="2">Bajo demanda</td>
            <td>Envío de correos transaccionales mediante SMTP.</td>
        </tr>
        <tr>
            <td>Push Manager</td>
            <td>Firebase</td>
            <td>Envío de alertas móviles a dispositivos Android/iOS.</td>
        </tr>
    </tbody>
</table>

---

## 3. Capturas de Interfaz
Aquí se simula la inserción de una imagen que originalmente estaba en Base64 y ahora es referenciada de forma optimizada:

![Dashboard del Sistema](assets/img/Markdown-mark.svg)\
*Figura 1: Vista previa del panel de administración generado automáticamente.*

---

## 4. Ejemplo de Implementación
El siguiente bloque de código muestra cómo inicializar el servicio de procesamiento en Python:

```python
def inicializar_proceso(config_path):
    """
    Carga la configuración y arranca el worker de procesamiento.
    """
    print(f"Cargando configuración desde: {config_path}")
    # Lógica de inicialización
    return True
```