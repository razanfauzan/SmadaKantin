// Cek apakah ada data keranjang yang tersimpan di localStorage
let keranjang = JSON.parse(localStorage.getItem("keranjang")) || {};

// Fungsi menyimpan keranjang ke localStorage
function simpanKeLocalStorage() {
    localStorage.setItem("keranjang", JSON.stringify(keranjang));
}

// Fungsi update tampilan keranjang
function updateKeranjang() {
    let keranjangList = document.getElementById("keranjang-list");
    let totalHarga = document.getElementById("total");
    let cartCount = document.getElementById("cart-count");

    keranjangList.innerHTML = ""; // Kosongkan daftar sebelum update
    let total = 0;
    let totalItem = 0;

    for (let nama in keranjang) {
        let item = keranjang[nama];
        total += item.harga * item.jumlah;
        totalItem += item.jumlah;
        
        let li = document.createElement("li");
        li.classList.add("keranjang-item");
        li.innerHTML = `
            <div class="item-info">
                <span class="item-nama">${nama}</span>
                <span class="item-harga">Rp ${item.harga * item.jumlah}</span>
                <span class="item-jumlah">(x${item.jumlah})</span>
            </div>
            <div class="item-buttons">
                <button onclick="kurangiItem('${nama}', ${item.harga})">
                    <i class="bi bi-dash-lg"></i>
                </button>
                <button onclick="tambahKeKeranjang('${nama}', ${item.harga})">
                    <i class="bi bi-plus-lg"></i>
                </button>
            </div>`;
        
        keranjangList.appendChild(li);
    }

    totalHarga.textContent = total;
    cartCount.textContent = totalItem;
    
    // Tampilkan atau sembunyikan badge
    cartCount.style.opacity = totalItem > 0 ? "1" : "0";
    
    simpanKeLocalStorage();
}

// Fungsi menambahkan item ke keranjang (ditekan "+")
function tambahKeKeranjang(nama, harga) {
    if (!keranjang[nama]) {
        keranjang[nama] = { harga: harga, jumlah: 0 };
    }
    keranjang[nama].jumlah++;

    // Perbarui tampilan jumlah di daftar menu
    document.getElementById(`jumlah-${nama}`).textContent = keranjang[nama].jumlah;
    
    updateKeranjang();
}

// Fungsi mengurangi item dari keranjang (ditekan "-")
function kurangiItem(nama, harga) {
    if (keranjang[nama]) {
        keranjang[nama].jumlah--;
        if (keranjang[nama].jumlah === 0) {
            delete keranjang[nama];
        }
    }

    // Perbarui tampilan jumlah di daftar menu
    document.getElementById(`jumlah-${nama}`).textContent = keranjang[nama] ? keranjang[nama].jumlah : 0;
    
    updateKeranjang();
}

// Fungsi mengosongkan keranjang
function hapusSemua() {
    keranjang = {};
    updateKeranjang();
}

// Fungsi memproses pesanan
function pesanSekarang() {
    if (Object.keys(keranjang).length === 0) {
        alert("Keranjang masih kosong! Silakan tambahkan menu terlebih dahulu.");
        return;
    }

    let pesan = "Pesanan Anda:\n";
    let total = 0;

    for (let nama in keranjang) {
        let item = keranjang[nama];
        pesan += `${nama} (x${item.jumlah}) - Rp${item.harga * item.jumlah}\n`;
        total += item.harga * item.jumlah;
    }

    pesan += `\nTotal: Rp${total}`;
    alert(pesan);

    hapusSemua();
}

// Load keranjang saat halaman dimuat
function toggleKeranjang() {
    let keranjang = document.getElementById("keranjang");

    if (keranjang.classList.contains("show")) {
        keranjang.classList.remove("show"); // Sembunyikan dengan geser ke kanan
        setTimeout(() => {
            keranjang.style.display = "none";
        }, 500); // Tunggu animasi selesai sebelum benar-benar disembunyikan
    } else {
        keranjang.style.display = "block"; // Tampilkan dulu sebelum animasi
        setTimeout(() => {
            keranjang.classList.add("show");
        }, 10); // Tambahkan kelas setelah elemen terlihat agar transisi berjalan
    }
}

