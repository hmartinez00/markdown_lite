const btnToggle = document.getElementById('toggle-dark');
const visor = document.getElementById('visor-markdown');
const mainContainer = document.querySelector('main'); // Referencia al contenedor con scroll

// --- LÓGICA DE TEMA ---
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

// --- CARGA DE MARKDOWN ---
async function cargarMarkdown() {
    try {
        const params = new URLSearchParams(window.location.search);
        let ruta = params.get('file') || visor.getAttribute('data-source') || 'sample/sample.md';

        const respuesta = await fetch(ruta);
        if (!respuesta.ok) throw new Error(`No se pudo encontrar: ${ruta}`);
        
        const texto = await respuesta.text();
        visor.innerHTML = marked.parse(texto);

        generarTOC();

        // Restaurar scroll en el contenedor MAIN
        const savedScroll = localStorage.getItem('scrollPosition');
        if (savedScroll) {
            setTimeout(() => {
                mainContainer.scrollTop = parseInt(savedScroll);
            }, 50);
        }
    } catch (error) {
        visor.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
    }
}

// Guardar scroll del contenedor correcto
mainContainer.onscroll = function() {
    localStorage.setItem('scrollPosition', mainContainer.scrollTop);
};

function generarTOC() {
    const tocList = document.getElementById('toc-list');
    tocList.innerHTML = ""; 

    const headers = visor.querySelectorAll('h2, h3');

    headers.forEach((header, index) => {
        const id = `header-${index}`;
        header.id = id;

        const li = document.createElement('li');
        li.className = 'toc-item';

        const a = document.createElement('a');
        a.href = `#${id}`;
        a.textContent = header.textContent;
        a.className = `toc-link ${header.tagName.toLowerCase() === 'h2' ? 'toc-h2' : 'toc-h3'}`;

        a.addEventListener('click', (e) => {
            e.preventDefault();
            // Scroll suave relativo al contenedor MAIN
            header.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });

        li.appendChild(a);
        tocList.appendChild(li);
    });
}

cargarMarkdown();