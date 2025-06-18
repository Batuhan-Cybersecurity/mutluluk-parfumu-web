document.addEventListener('DOMContentLoaded', function() {
    // Aktif menü öğesini belirle
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === 'index.html' && linkPage === '#proje') ||
            (linkPage !== '#' && currentPage.includes(linkPage.replace('.html', '')))) {
            link.classList.add('active');
        }
    });

    // Mobil dropdown menü
    const dropdown = document.querySelector('.dropdown');
    if (dropdown && window.innerWidth <= 768) {
        const dropdownBtn = dropdown.querySelector('.dropdown-btn');
        dropdownBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const content = this.nextElementSibling;
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
    }

    // Yumuşak kaydırma
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // İletişim formu
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Mesajınız başarıyla gönderildi! En kısa sürede dönüş yapılacaktır.');
            this.reset();
        });
    }

    // Pozitif Parfüm Etkinliği
    const sprayBtn = document.getElementById('spray-btn');
    if (sprayBtn) {
        sprayBtn.addEventListener('click', function() {
            const messages = [
                "Bir arkadaşınıza kompliman yapın!",
                "Ailenize yardım edin!",
                "Gülümseyin ve pozitif enerji yayın!"
            ];
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            const messageBox = document.getElementById('happy-message');
            
            // Mesaj kutusunu oluştur veya güncelle
            if (!messageBox.querySelector('.alert')) {
                messageBox.innerHTML = `<div class="alert">✅ ${randomMessage}</div>`;
            } else {
                messageBox.querySelector('.alert').textContent = `✅ ${randomMessage}`;
            }
            
            // 3 saniye sonra mesajı kaldır
            setTimeout(() => {
                if (messageBox.querySelector('.alert')) {
                    messageBox.querySelector('.alert').remove();
                }
            }, 3000);
        });
    }

    // Afiş Paylaşım Butonları
    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const quote = this.parentElement.querySelector('p').textContent;
            navigator.clipboard.writeText(quote).then(() => {
                alert("Alıntı panoya kopyalandı! 📋\n\n" + quote);
            }).catch(err => {
                console.error('Panoya kopyalama hatası:', err);
                // Fallback for browsers that don't support clipboard API
                prompt("Alıntıyı kopyalamak için Ctrl+C tuşlarına basın:", quote);
            });
        });
    });
});

