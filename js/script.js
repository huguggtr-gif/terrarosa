document.addEventListener("DOMContentLoaded", () => {

    /* =========================
    1. SIDE MENU
    ========================= */

    const menuBtn = document.querySelector(".menu-btn");
    const closeBtn = document.getElementById("closeBtn");
    const sideMenu = document.getElementById("sideMenu");
    const overlay = document.getElementById("overlay");

    const shopMenu = document.getElementById("shopMenu");
    const sideSubmenu = document.getElementById("sideSubmenu");
    const arrow = document.getElementById("arrow");

    if (menuBtn) {
        menuBtn.addEventListener("click", () => {
            sideMenu.classList.add("active");
            overlay.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    }

    const closeAll = () => {
        sideMenu.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = "";
    };

    if (closeBtn) closeBtn.addEventListener("click", closeAll);
    if (overlay) overlay.addEventListener("click", closeAll);

    if (shopMenu) {
        shopMenu.addEventListener("click", () => {
            sideSubmenu.classList.toggle("open");
            arrow.classList.toggle("rotated");
        });
    }


    /* =========================
    2. PROJECT REVEAL
    ========================= */

    const projectSection = document.querySelector(".projectinner");
    const projectItems = document.querySelectorAll(".projectinner > div");

    if (projectSection) {

        const observer = new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    projectItems.forEach((item, index) => {

                        setTimeout(() => {
                            item.classList.add("show");
                        }, index * 150);

                    });

                    observer.unobserve(entry.target);

                }

            });

        }, { threshold: 0.2 });

        observer.observe(projectSection);

    }


    /* =========================
3. CURSOR (PC ONLY)
========================= */

if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {

    const cursor = document.querySelector(".cursor-dot");

    if (cursor) {

        window.addEventListener("mousemove", (e) => {
            cursor.style.left = e.clientX + "px";
            cursor.style.top = e.clientY + "px";
        });

        const targets = "a, button, .category-item, .side-menu-link, .menu-btn, .close-btn, .discover-btn, input";

        document.addEventListener("mouseover", (e) => {
            if (e.target.closest(targets)) {
                cursor.classList.add("cursor-active");
            }
        });

        document.addEventListener("mouseout", (e) => {
            if (e.target.closest(targets)) {
                cursor.classList.remove("cursor-active");
            }
        });

    }

} else {

    // 모바일/태블릿에서는 커서 숨김
    const cursor = document.querySelector(".cursor-dot");
    if (cursor) {
        cursor.style.display = "none";
    }

}




});