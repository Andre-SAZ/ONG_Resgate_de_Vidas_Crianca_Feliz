document.addEventListener("DOMContentLoaded", function () {
    const botoesFiltro = document.querySelectorAll(".btn-filtro");
    const itensGaleria = document.querySelectorAll(".galeria-item");

    if (botoesFiltro.length === 0 || itensGaleria.length === 0) return;

    botoesFiltro.forEach(botao => {
        botao.addEventListener("click", () => {
            // Atualiza o estado visual do botão ativo
            botoesFiltro.forEach(btn => btn.classList.remove("active"));
            botao.classList.add("active");

            const valorFiltro = Math.abs(botao.getAttribute("data-filter")) ? botao.getAttribute("data-filter") : botao.getAttribute("data-filter").trim();

            itensGaleria.forEach(item => {
                // Altera as classes para filtrar usando as propriedades de display do CSS
                if (valorFiltro === "todas" || item.classList.contains(valorFiltro)) {
                    item.classList.remove("hide");
                    item.classList.add("show");
                } else {
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
            });
        });
    });
});