const btnToggle = document.getElementById('toggle-dark');
const visor = document.getElementById('visor-markdown');

// --- LÓGICA DE TEMA (PERSISTENTE) ---
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    btnToggle.checked = true;
    document.documentElement.setAttribute('data-theme', 'dark');
}

btnToggle.addEventListener('change', () => {
    const theme = btnToggle.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
});

// --- LÓGICA DE PERSISTENCIA DE SCROLL ---
window.onbeforeunload = function() {
    localStorage.setItem('scrollPosition', window.scrollY);
};

// --- FUNCIÓN NÚCLEO DE CARGA ---
async function cargarMarkdown() {
    try {
        // 1. Intentar obtener de la URL (?file=archivo.md)
        const params = new URLSearchParams(window.location.search);
        let ruta = params.get('file');

        // 2. Si no hay en URL, intentar obtener del atributo data-source del HTML
        if (!ruta) {
            ruta = visor.getAttribute('data-source');
        }

        // 3. Si sigue sin haber ruta, definir un fallback (archivo por defecto)
        if (!ruta) {
            ruta = 'sample/sample.md';
        }

        console.log(`Cargando documento: ${ruta}`);

        const respuesta = await fetch(ruta);
        if (!respuesta.ok) throw new Error(`No se pudo encontrar el archivo: ${ruta}`);
        
        const texto = await respuesta.text();
        visor.innerHTML = marked.parse(texto);

        // Restaurar posición del scroll
        const savedScroll = localStorage.getItem('scrollPosition');
        if (savedScroll) {
            setTimeout(() => {
                window.scrollTo({
                    top: parseInt(savedScroll),
                    behavior: 'instant'
                });
            }, 50);
        }
    } catch (error) {
        visor.innerHTML = `<p style="color:red; border: 1px solid red; padding: 10px;">
            <strong>Error de carga:</strong> ${error.message}
        </p>`;
    }
}

cargarMarkdown();