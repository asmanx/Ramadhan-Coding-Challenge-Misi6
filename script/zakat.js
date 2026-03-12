let jenisZakat = "penghasilan";

function pilihZakat(jenis) {

    jenisZakat = jenis;

    const formPenghasilan = document.getElementById("formPenghasilan");
    const formEmas = document.getElementById("formEmas");

    if (jenis === "penghasilan") {
        formPenghasilan.style.display = "block";
        formEmas.style.display = "none";
    } else {
        formPenghasilan.style.display = "none";
        formEmas.style.display = "block";
    }

}

function hitungZakat() {

    let hargaEmas;

    if (jenisZakat === "penghasilan") {
        hargaEmas = parseFloat(document.getElementById("hargaEmas").value);
    } else {
        hargaEmas = parseFloat(document.getElementById("hargaEmasEmas").value);
    }

    if (!hargaEmas) {
        alert("Isi harga emas terlebih dahulu");
        return;
    }

    let nisab = hargaEmas * 85;
    let total = 0;

    if (jenisZakat === "penghasilan") {

        let gaji = parseFloat(document.getElementById("gaji").value) || 0;
        let lain = parseFloat(document.getElementById("lain").value) || 0;

        total = gaji + lain;

    } else {

        let emas = parseFloat(document.getElementById("emas").value) || 0;
        total = emas * hargaEmas;

    }

    let status = total >= nisab ? "Wajib Zakat" : "Tidak Wajib";
    let zakat = total >= nisab ? total * 0.025 : 0;
    document.getElementById("total").innerText = "Rp " + total.toLocaleString();
    document.getElementById("nisab").innerText = "Rp " + nisab.toLocaleString();
    document.getElementById("status").innerText = status;
    document.getElementById("zakat").innerText = "Rp " + zakat.toLocaleString();

}

function resetForm() {
    document.querySelectorAll("input").forEach(i => i.value = "");
    document.getElementById("total").innerText = "-";
    document.getElementById("nisab").innerText = "-";
    document.getElementById("status").innerText = "-";
    document.getElementById("zakat").innerText = "-";

}