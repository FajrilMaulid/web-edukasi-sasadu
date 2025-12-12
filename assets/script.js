document.addEventListener('DOMContentLoaded', () => {
    
    // --- NAVIGASI MOBILE (BURGER MENU) ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if(burger) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');
            
            // Burger Animation
            burger.classList.toggle('toggle');
        });
    }

    // --- ACCORDION (MITOS VS FAKTA) ---
    const accHeaders = document.querySelectorAll('.accordion-header');
    
    accHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const body = header.nextElementSibling;
            
            // Cek jika sedang terbuka, maka tutup
            if (body.style.maxHeight) {
                body.style.maxHeight = null;
                header.querySelector('span').innerText = '+';
            } else {
                // Tutup semua accordion lain sebelum membuka yang baru (opsional, biar rapi)
                document.querySelectorAll('.accordion-body').forEach(b => b.style.maxHeight = null);
                document.querySelectorAll('.accordion-header span').forEach(s => s.innerText = '+');
                
                // Buka yang diklik
                body.style.maxHeight = body.scrollHeight + "px";
                header.querySelector('span').innerText = '-';
            }
        });
    });
});

// --- TABS LOGIC (HUKUM & AGAMA) ---
// Fungsi ini dipanggil langsung dari HTML (onclick)
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    
    // Sembunyikan semua konten tab
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }
    
    // Hapus class 'active' dari semua tombol tab
    tablinks = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    
    // Tampilkan tab yang dipilih
    document.getElementById(tabName).style.display = "block";
    
    // Tambahkan sedikit delay untuk animasi fade-in agar mulus
    setTimeout(() => {
        document.getElementById(tabName).classList.add("active");
    }, 10);
    
    evt.currentTarget.className += " active";
}