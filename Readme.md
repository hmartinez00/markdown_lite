# 📖 Dynamic Markdown Viewer

Un visor web ligero, moderno y personalizable para renderizar archivos Markdown dinámicamente. Diseñado para ser integrado fácilmente en cualquier flujo de documentación técnica, con soporte nativo para temas y persistencia de estado.



## ✨ Características Principales

* **Renderizado Dinámico:** Utiliza `Marked.js` para convertir Markdown en HTML en tiempo real.
* **Modo Claro/Oscuro:** Sistema de temas integrado mediante variables CSS con persistencia en `localStorage`.
* **Persistencia de Scroll:** Mantiene la posición de lectura tras recargas automáticas (ideal para flujos de trabajo con *Live Server*).
* **Carga Flexible de Archivos:**
    * **Atributo Data:** Define el archivo base directamente en el HTML.
    * **Parámetros URL:** Cambia el documento dinámicamente usando `?file=nombre.md`.
* **Tablas Avanzadas:** Soporte optimizado para tablas Markdown y HTML complejas.

## 📁 Estructura del Visor

```text
├── assets/
│   ├── js/
│   │   └── visor.js      # Lógica de renderizado, scroll y temas
│   └── css/
│       └── estilos.css   # Estilos base y variables de color
├── index.html            # Contenedor principal
└── sample.md             # Archivo de ejemplo
```

## 🚀 Instalación y Uso Rápido

1.  Clona este repositorio o copia las carpetas `assets/` y el archivo `index.html` a tu proyecto.
2.  Asegúrate de tener un servidor local activo (necesario para las peticiones `fetch`):
    ```bash
    # Usando Python
    python -m http.server 8000
    ```
3.  Accede a `http://localhost:8000`.

## ⚙️ Configuración

### Definir el archivo por defecto
En el `index.html`, localiza el contenedor del visor y utiliza el atributo `data-source`:
```html
<div id="visor-markdown" data-source="tu_archivo.md"></div>
```

### Cambio dinámico mediante URL
Puedes visualizar cualquier archivo `.md` presente en la raíz simplemente pasando su nombre en la URL. Esto permite usar un solo visor para múltiples documentos:
`http://localhost:8000/index.html?file=manual_tecnico.md`

## 🎨 Personalización
Para ajustar los colores, edita las variables en `assets/css/estilos.css`. El visor utiliza un esquema de nombres intuitivo:

```css
:root {
    --bg-color: #ffffff;    /* Color de fondo principal */
    --text-color: #333333;  /* Color de texto */
    /* ... */
}
```

## 🛠️ Dependencias
* [Marked.js](https://marked.js.org/) (Cargado vía CDN).
