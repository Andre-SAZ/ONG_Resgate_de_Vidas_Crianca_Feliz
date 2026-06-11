document.addEventListener("DOMContentLoaded", function () {

    // ... (Mantenha aqui os códigos do banner principal e do menu hambúrguer) ...

    // === CÓDIGO DA GALERIA (FILTROS ORIGINAIS) ===
    const filterBtns = document.querySelectorAll('.btn-filtro');
    const galleryItems = document.querySelectorAll('.galeria-item');

    if (filterBtns.length > 0 && galleryItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove classe ativa de todos e adiciona no botão clicado
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Descobre qual é a categoria selecionada
                const filterValue = btn.getAttribute('data-filter');

                // Mostra ou esconde as imagens usando as classes do CSS
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.classList.remove('hide');
                        item.classList.add('show');
                    } else {
                        item.classList.remove('show');
                        item.classList.add('hide');
                    }
                });
            });
        });
    }

    // ... (Aqui em baixo mantém o código do Slider Principal e do Menu Hambúrguer) ...

    // (Pode manter o código do filtro da galeria intacto aqui em cima)

    const slidesWrapper = document.querySelector('.slides-wrapper');
    const dots = document.querySelectorAll('.nav-dot');

    if (slidesWrapper && dots.length > 0) {
        let currentSlide = 0;
        const totalSlides = dots.length;
        let autoPlayInterval;

        function goToSlide(index) {
            slidesWrapper.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
            currentSlide = index;
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
                if (window.innerWidth > 768) resetAutoPlay();
            });
        });

        function nextSlide() {
            let next = (currentSlide + 1) % totalSlides;
            goToSlide(next);
        }

        function startAutoPlay() {
            // Apenas liga o autoplay se for ecrã de desktop (maior que 768px)
            if (window.innerWidth > 768) {
                autoPlayInterval = setInterval(nextSlide, 5000);
            }
        }

        function resetAutoPlay() {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        }

        // --- LÓGICA DE SWIPE (ARRASTAR COM O DEDO) ---
        let startX = 0;
        let endX = 0;

        slidesWrapper.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            clearInterval(autoPlayInterval); // Pausa sempre que o utilizador toca
        }, { passive: true });

        slidesWrapper.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            let diff = startX - endX;
            // Se arrastou mais de 50px para a esquerda
            if (diff > 50) {
                let next = (currentSlide + 1) % totalSlides;
                goToSlide(next);
            }
            // Se arrastou mais de 50px para a direita
            else if (diff < -50) {
                let prev = (currentSlide - 1 + totalSlides) % totalSlides;
                goToSlide(prev);
            }
            // Retoma autoplay apenas no desktop
            if (window.innerWidth > 768) resetAutoPlay();
        }

        // Inicia na primeira vez
        startAutoPlay();

        // Se o utilizador virar o telemóvel ou redimensionar a janela, ajusta o autoplay
        window.addEventListener('resize', () => {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        });
    }

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        // Abre e fecha o menu ao clicar no hambúrguer
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');

            // Acessibilidade: atualiza o estado para leitores de ecrã
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
        });

        // Fecha o menu automaticamente quando se clica num link (melhora a experiência do utilizador)
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }
});