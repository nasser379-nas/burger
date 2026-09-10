// Ürün verileri
const urunler = [
    // Burgerler
    {
        id: 1,
        isim: "كلاسيك برجر",
        aciklama: "لحم بقري 150غ، خس، طماطم، بصل، صلصة خاصة",
        fiyat: 120,
        kategori: "burger",
        resim: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500"
    },
    {
        id: 2,
        isim: "تشيز برجر",
        aciklama: "لحم بقري 150غ، جبنة شيدر مضاعفة، مخلل، بصل",
        fiyat: 140,
        kategori: "burger",
        resim: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500"
    },
    {
        id: 3,
        isim: "دبل برجر",
        aciklama: "لحم بقري 300غ، طبقتين، صلصة برجر خاصة",
        fiyat: 180,
        kategori: "burger",
        resim: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500"
    },
    {
        id: 4,
        isim: "برجر دجاج",
        aciklama: "دجاج مقرمش، خس، طماطم، مايونيز",
        fiyat: 110,
        kategori: "burger",
        resim: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=500"
    },
    // İçecekler
    {
        id: 5,
        isim: "كولا",
        aciklama: "مشروب غازي منعش",
        fiyat: 30,
        kategori: "icecek",
        resim: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500"
    },
    {
        id: 6,
        isim: "عصير برتقال طازج",
        aciklama: "عصير برتقال طبيعي 100%",
        fiyat: 40,
        kategori: "icecek",
        resim: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500"
    },
    {
        id: 7,
        isim: "ميلك شيك",
        aciklama: "ميلك شيك بالفانيليا أو الشوكولاتة",
        fiyat: 50,
        kategori: "icecek",
        resim: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500"
    },
    // Yan Ürünler
    {
        id: 8,
        isim: "بطاطس مقلية",
        aciklama: "بطاطس مقلية مقرمشة، بهارات خاصة",
        fiyat: 60,
        kategori: "yan-urun",
        resim: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500"
    },
    {
        id: 9,
        isim: "حلقات البصل",
        aciklama: "حلقات بصل مقرمشة مع صلصة خاصة",
        fiyat: 50,
        kategori: "yan-urun",
        resim: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=500"
    }
];

// Sepet
let sepet = [];
let aktifKategori = 'hepsi';

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    // Preloader'ı kaldır
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hidden');
    }, 1000);
    
    sepetiYukle();
    urunleriGoster();
    
    // Header scroll efekti
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Radio butonları için event listener
    document.querySelectorAll('input[name="siparisTipi"]').forEach(radio => {
        radio.addEventListener('change', siparisTipiDegisti);
    });
});

// Menüye git
function menuyeGit() {
    document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
}

// Kategori filtrele
function filtrele(kategori, element) {
    aktifKategori = kategori;
    
    // Aktif butonu güncelle
    document.querySelectorAll('.filtre-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    element.classList.add('active');
    
    urunleriGoster();
}

// Ürünleri göster
function urunleriGoster() {
    const menuGrid = document.getElementById('menuGrid');
    menuGrid.innerHTML = '';
    
    const filtrelenmisUrunler = aktifKategori === 'hepsi' 
        ? urunler 
        : urunler.filter(urun => urun.kategori === aktifKategori);
    
    filtrelenmisUrunler.forEach(urun => {
        const urunKarti = document.createElement('div');
        urunKarti.className = 'urun-karti';
        urunKarti.innerHTML = `
            <div class="urun-resim-container">
                <img src="${urun.resim}" alt="${urun.isim}" class="urun-resim" loading="lazy">
                ${urun.kategori === 'burger' ? '<span class="urun-etiket">الأكثر مبيعاً</span>' : ''}
            </div>
            <div class="urun-bilgi">
                <h3>${urun.isim}</h3>
                <p class="urun-aciklama">${urun.aciklama}</p>
                <div class="urun-alt">
                    <span class="urun-fiyat">${urun.fiyat} ل.س</span>
                    <button class="btn-ekle" onclick="sepeteEkle(${urun.id})">
                        <i class="fas fa-plus"></i>
                        أضف للسلة
                    </button>
                </div>
            </div>
        `;
        menuGrid.appendChild(urunKarti);
    });
}

// Sepete ürün ekle (bildirim olmadan)
function sepeteEkle(urunId) {
    const urun = urunler.find(u => u.id === urunId);
    const sepetUrun = sepet.find(s => s.id === urunId);
    
    if (sepetUrun) {
        sepetUrun.adet++;
    } else {
        sepet.push({ ...urun, adet: 1 });
    }
    
    sepetiKaydet();
    sepetiGuncelle();
    
    // Sepet ikonuna küçük animasyon
    const sepetIkon = document.querySelector('.sepet-ikon');
    sepetIkon.style.animation = 'pulse 0.5s';
    setTimeout(() => {
        sepetIkon.style.animation = '';
    }, 500);
}

// Sepeti güncelle
function sepetiGuncelle() {
    const sepetSayisi = document.getElementById('sepetSayisi');
    const toplamAdet = sepet.reduce((toplam, urun) => toplam + urun.adet, 0);
    sepetSayisi.textContent = toplamAdet;
    
    if (toplamAdet === 0) {
        sepetSayisi.style.display = 'none';
    } else {
        sepetSayisi.style.display = 'flex';
    }
}

// Sepeti kaydet
function sepetiKaydet() {
    localStorage.setItem('altinBurgerSepeti', JSON.stringify(sepet));
    sepetiGuncelle();
}

// Sepeti yükle
function sepetiYukle() {
    const kayitliSepet = localStorage.getItem('altinBurgerSepeti');
    if (kayitliSepet) {
        sepet = JSON.parse(kayitliSepet);
        sepetiGuncelle();
    }
}

// Sepeti göster
function sepetiGoster() {
    const modal = document.getElementById('sepetModal');
    const sepetUrunleri = document.getElementById('sepetUrunleri');
    
    if (sepet.length === 0) {
        sepetUrunleri.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <i class="fas fa-shopping-bag" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
                <p style="color: var(--text-muted);">سلتك فارغة</p>
            </div>
        `;
    } else {
        sepetUrunleri.innerHTML = '';
        sepet.forEach(urun => {
            const sepetUrun = document.createElement('div');
            sepetUrun.className = 'sepet-urun';
            sepetUrun.innerHTML = `
                <img src="${urun.resim}" alt="${urun.isim}">
                <div class="sepet-urun-info">
                    <h4>${urun.isim}</h4>
                    <p>${urun.fiyat} ل.س</p>
                </div>
                <div class="sepet-urun-adet">
                    <button class="btn-adet" onclick="adetAzalt(${urun.id})">-</button>
                    <span>${urun.adet}</span>
                    <button class="btn-adet" onclick="adetArtir(${urun.id})">+</button>
                </div>
                <button class="btn-adet" onclick="urunSil(${urun.id})" style="background: rgba(214,48,49,0.2);">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            sepetUrunleri.appendChild(sepetUrun);
        });
    }
    
    toplamiGuncelle();
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Sepeti kapat
function sepetiKapat() {
    document.getElementById('sepetModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Toplamı güncelle
function toplamiGuncelle() {
    const toplamFiyat = document.getElementById('toplamFiyat');
    const toplam = sepet.reduce((sum, urun) => sum + (urun.fiyat * urun.adet), 0);
    toplamFiyat.textContent = toplam;
}

// Adet artır
function adetArtir(urunId) {
    const sepetUrun = sepet.find(u => u.id === urunId);
    if (sepetUrun) {
        sepetUrun.adet++;
        sepetiKaydet();
        sepetiGoster();
    }
}

// Adet azalt
function adetAzalt(urunId) {
    const sepetUrun = sepet.find(u => u.id === urunId);
    if (sepetUrun && sepetUrun.adet > 1) {
        sepetUrun.adet--;
        sepetiKaydet();
        sepetiGoster();
    }
}

// Ürün sil
function urunSil(urunId) {
    sepet = sepet.filter(u => u.id !== urunId);
    sepetiKaydet();
    sepetiGoster();
}

// Sipariş formunu göster
function siparisFormunuGoster() {
    sepetiKapat();
    document.getElementById('siparisModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Sipariş formunu kapat
function siparisFormunuKapat() {
    document.getElementById('siparisModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Sipariş tipi değişti
function siparisTipiDegisti() {
    const secilenTip = document.querySelector('input[name="siparisTipi"]:checked').value;
    const adresGroup = document.getElementById('adresGroup');
    
    if (secilenTip === 'paket') {
        adresGroup.style.display = 'block';
    } else {
        adresGroup.style.display = 'none';
    }
}

// WhatsApp'a sipariş gönder
function whatsappGonder() {
    // Form verilerini al
    const isim = document.getElementById('isim').value;
    const telefon = document.getElementById('telefon').value;
    const secilenTip = document.querySelector('input[name="siparisTipi"]:checked');
    const siparisTipi = secilenTip ? secilenTip.value : 'restoranda';
    const adres = document.getElementById('adres').value;
    const not = document.getElementById('not').value;
    
    // Zorunlu alanları kontrol et
    if (!isim || !telefon) {
        alert('الرجاء إدخال الاسم ورقم الهاتف!');
        return;
    }
    
    if (siparisTipi === 'paket' && !adres) {
        alert('الرجاء إدخال العنوان!');
        return;
    }
    
    // Sipariş mesajını oluştur
    let siparisMesaji = '🍔 *طلب جديد - البرجر الذهبي*\n\n';
    siparisMesaji += '📋 *تفاصيل الطلب:*\n';
    
    sepet.forEach(urun => {
        siparisMesaji += `• ${urun.adet}x ${urun.isim} - ${urun.fiyat * urun.adet} ل.س\n`;
    });
    
    const toplam = sepet.reduce((sum, urun) => sum + (urun.fiyat * urun.adet), 0);
    siparisMesaji += `\n💰 *المجموع: ${toplam} ل.س*\n\n`;
    
    siparisMesaji += '👤 *معلومات الزبون:*\n';
    siparisMesaji += `الاسم: ${isim}\n`;
    siparisMesaji += `الهاتف: ${telefon}\n`;
    
    if (siparisTipi === 'restoranda') {
        siparisMesaji += `نوع الطلب: في المطعم\n`;
    } else {
        siparisMesaji += `نوع الطلب: توصيل\n`;
        siparisMesaji += `العنوان: ${adres}\n`;
    }
    
    if (not) {
        siparisMesaji += `📝 ملاحظات: ${not}\n`;
    }
    
    // WhatsApp numarası (Suriye - başında ülke kodu 963 ile)
    const whatsappNumarasi = '963985795832';
    const whatsappLink = `https://wa.me/${whatsappNumarasi}?text=${encodeURIComponent(siparisMesaji)}`;
    
    // WhatsApp'ı aç
    window.open(whatsappLink, '_blank');
    
    // Sepeti temizle
    sepet = [];
    sepetiKaydet();
    sepetiGuncelle();
    
    // Modalı kapat
    document.getElementById('siparisModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}