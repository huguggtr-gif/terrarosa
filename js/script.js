document.addEventListener('DOMContentLoaded', () => {
    // 1. CURSOR
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

    // 2. NAVBAR
const toggleBtn = document.getElementById('toggleBtn');
const closeBtn = document.getElementById('closeBtn');
const sideMenu = document.getElementById('sideMenu');

// 메뉴 열기
toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    sideMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
    // 로고 애니메이션 코드를 JS에서 지웠습니다. (CSS에서 처리)
});

// 메뉴 닫기
closeBtn.addEventListener('click', () => {
    sideMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// 서브메뉴 토글 (기존 로직 유지하되 깔끔하게 정리)
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

    // 3. SLIDER
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

    // 4. PARALLAX
   window.addEventListener("scroll", () => {
    const main01 = document.querySelector(".main01-sticky");
    const main02 = document.querySelector(".main02-visual");
    const slider = document.querySelector(".slider-container");
    
    const scrollY = window.scrollY;
    const windowH = window.innerHeight;

    let progress = Math.min(scrollY / windowH, 1);

    // [연출 1] 메인 01번 상승 (텍스트+이미지 통째로 위로)
    main01.style.transform = `translateY(-${progress * 20}%)`;

    // [연출 2] 슬라이더 크기 조절
    // 이제 translateX(-50%)를 쓸 필요가 없습니다!
    if (slider) {
        slider.style.transform = `scale(${1 - (progress * 0.15)})`;
    }

    // [연출 3] 메인 02번 상승
    let moveY = 90 - (progress * 90); 
    main02.style.transform = `translateY(${moveY}%)`;
});
});