document.addEventListener('DOMContentLoaded', () => {
    
    // --- NAVIGASI MOBILE ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');

    if(burger) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });
    }

    // --- ACCORDION (MITOS VS FAKTA) ---
    const accHeaders = document.querySelectorAll('.accordion-header');
    
    accHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const body = header.nextElementSibling;
            if (body.style.maxHeight) {
                body.style.maxHeight = null;
                header.querySelector('span').innerText = '+';
            } else {
                // Tutup yang lain
                document.querySelectorAll('.accordion-body').forEach(b => b.style.maxHeight = null);
                document.querySelectorAll('.accordion-header span').forEach(s => s.innerText = '+');
                // Buka yang ini
                body.style.maxHeight = body.scrollHeight + "px";
                header.querySelector('span').innerText = '-';
            }
        });
    });
});

// --- TABS LOGIC ---
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }
    tablinks = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    setTimeout(() => {
        document.getElementById(tabName).classList.add("active");
    }, 10);
    evt.currentTarget.className += " active";
}