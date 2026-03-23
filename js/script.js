document.addEventListener('DOMContentLoaded', () => {
    // 1. CURSOR
    const cursorEffect = document.querySelector(".cursor_effect");
    const cursorIcon = document.querySelector(".cursor_icon");
    const cursorSlideText = document.querySelector('.cursor-slide-text');

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

    // 3. SLIDER
    const setupSlider = (selector) => {
        const slides = document.querySelectorAll(`${selector} .slide`);
        let current = 0;
        if (slides.length === 0) return;

        const total = slides.length;

        const updateCursorText = () => {
            if (cursorSlideText) {
                cursorSlideText.textContent = `${current + 1} / ${total}`;
            }
        };
        updateCursorText();

        const sliderEl = document.querySelector(selector);

        if (sliderEl && selector === '.slider-container') {
            // 첫번째 슬라이더 — 클릭으로 넘기기
            sliderEl.addEventListener('click', () => {
                slides[current].classList.remove('active');
                current = (current + 1) % total;
                slides[current].classList.add('active');
                updateCursorText();
            });

            // 커서 모드 전환
            sliderEl.addEventListener('mouseenter', () => {
                cursorEffect.classList.add('slider-mode');
            });
            sliderEl.addEventListener('mouseleave', () => {
                cursorEffect.classList.remove('slider-mode');
            });

        } else {
            // full-slider — 자동 슬라이드 유지
            setInterval(() => {
                slides[current].classList.remove('active');
                current = (current + 1) % total;
                slides[current].classList.add('active');
            }, 3000);
        }
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

        if (window.innerWidth > 768) {
            if (main01) main01.style.transform = `translateY(-${progress * 20}%)`;
            if (slider) slider.style.transform = `scale(${1 - (progress * 0.15)})`;
            if (main02) {
                let moveY = 90 - (progress * 90);
                main02.style.transform = `translateY(${moveY}%)`;
            }
        } else {
            if (main01) main01.style.transform = "none";
            if (main02) main02.style.transform = "none";
            if (slider) slider.style.transform = "none";
        }
    });

    // 5. BEST 섹션 — 모바일 탭 토글
    const bestImgWraps = document.querySelectorAll('.best-img-wrap');
    bestImgWraps.forEach(wrap => {
        wrap.addEventListener('click', () => {
            if (wrap.classList.contains('tapped')) {
                wrap.classList.remove('tapped');
                return;
            }
            bestImgWraps.forEach(w => w.classList.remove('tapped'));
            wrap.classList.add('tapped');
        });
    });
    document.querySelectorAll('.best-item').forEach(item => {
        const color = item.dataset.color;
        if (color) {
            item.querySelector('.best-hover-info').style.backgroundColor = color;
        }
    });



    // 6. MAGAZINE Slider
    const magWrap = document.querySelector('#magazine .wrap');
const magNext = document.querySelector('#magazine .next-btn');
const magPrev = document.querySelector('#magazine .prev-btn');
const magCards = document.querySelectorAll('#magazine .card');

let magIndex = 0;
const showCount = 3; // 화면에 보이는 개수
const totalMag = magCards.length;

magNext.addEventListener('click', () => {
    if (magIndex < totalMag - showCount) {
        magIndex++;
        magWrap.style.transform = `translateX(-${(100 / showCount) * magIndex}%)`;
    }
});

magPrev.addEventListener('click', () => {
    if (magIndex > 0) {
        magIndex--;
        magWrap.style.transform = `translateX(-${(100 / showCount) * magIndex}%)`;
    }
});
});