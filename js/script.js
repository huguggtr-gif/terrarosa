document.addEventListener('DOMContentLoaded', () => {
    // 1. CURSOR (생략 없이 원본 유지)
    const cursorEffect = document.querySelector(".cursor_effect");
    const cursorIcon = document.querySelector(".cursor_icon");
    document.documentElement.addEventListener("mousemove", (e) => {
        cursorEffect.style.translate = `${e.clientX}px ${e.clientY}px`;
    });
    const anchors = document.querySelectorAll("a, .toggle, .close-btn");
    anchors.forEach(a => {
        a.addEventListener("mouseover", () => cursorEffect.classList.add("on"));
        a.addEventListener("mouseout", () => cursorEffect.classList.remove("on"));
    });

    // 2. NAVBAR (생략 없이 원본 유지)
    const toggleBtn = document.getElementById('toggleBtn');
    const closeBtn = document.getElementById('closeBtn');
    const sideMenu = document.getElementById('sideMenu');
    toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        sideMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    closeBtn.addEventListener('click', () => {
        sideMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    const menuLinks = document.querySelectorAll('.side-menu-link');
    menuLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const submenu = this.nextElementSibling;
            if (submenu && submenu.classList.contains('side-submenu')) {
                e.preventDefault();
                submenu.classList.toggle('open');
                const arrow = this.querySelector('.arrow img');
                if (arrow) {
                    arrow.style.transform = submenu.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
                }
            }
        });
    });

    // 3. SLIDER (생략 없이 원본 유지)
    const setupSlider = (selector) => {
        const slides = document.querySelectorAll(`${selector} .slide`);
        let current = 0;
        if (slides.length === 0) return;
        setInterval(() => {
            slides[current].classList.remove('active');
            current = (current + 1) % slides.length;
            slides[current].classList.add('active');
        }, 3000);
    };
    setupSlider('.slider-container');
    setupSlider('.full-slider');

    // 4. PARALLAX (원본 로직 + 간섭 제거)
    window.addEventListener("scroll", () => {
        const main01 = document.querySelector(".main01-sticky");
        const main02 = document.querySelector(".main02-visual");
        const slider = document.querySelector(".slider-container");
        
        const scrollY = window.scrollY;
        const windowH = window.innerHeight;
        let progress = Math.min(scrollY / windowH, 1);

        // PC에서만 실행되도록 수정 (모바일 간섭 차단)
        if (window.innerWidth > 768) {
            if(main01) main01.style.transform = `translateY(-${progress * 20}%)`;
            if (slider) {
                slider.style.transform = `scale(${1 - (progress * 0.15)})`;
            }
            if(main02) {
                let moveY = 90 - (progress * 90); 
                main02.style.transform = `translateY(${moveY}%)`;
            }
        } else {
            // 모바일 초기화 (이미지 안보임 방지)
            if(main01) main01.style.transform = "none";
            if(main02) main02.style.transform = "none";
            if(slider) slider.style.transform = "none";
        }
    });
});