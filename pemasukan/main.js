const inputTanggal = document.querySelector('#tanggal'),
    inputTabung = document.querySelector('#tabung'),
    btnTambah = document.querySelector('#btn-tambah'),
    btnClose = document.querySelector('#close')

const data = []
const hargaGas = 16000
const namaBulan = ['Januari', 'Februari', 'Maret', 'Aprin', 'Mei', 'Juni', 'July', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
function showData() {
    const tBody = document.querySelector('#tBody')
    document.querySelectorAll('#datas').forEach(datas => datas.remove())
    for (let i = 0; i < data.length; i++) {
        let d = new Date(data[i].tanggal)
        let ubahTanggal = d.getTime()

        let dd = new Date(data[i].tanggal)
        let ubahTanggall = d.toLocaleDateString("id")
        let tagTable = `
            <tr id='datas'>
              <td>${i + 1}</td>
              <td>${ubahTanggall}</td>
              <td>${data[i].tabung}</td>
              <td>${formatRupiah(data[i].harga)}</td>
              <td>${formatRupiah(data[i].total)}</td>
              <td><i class="ri-settings-4-fill" onclick='btnAksi(${i},${ubahTanggal},${data[i].tabung})'></i></td>
            </tr>
        `
        tBody.innerHTML += tagTable
    }
}

showData()

function showTotal() {
    const tTabung = document.querySelector('#total-tabung')
    const tHarga = document.querySelector('#total-harga')
    setInterval(() => {
        let totalTabung = 0,
            totalHarga = 0
        for (let i = 0; i < data.length; i++) {
            totalHarga += data[i].total
            totalTabung += parseInt(data[i].tabung)

            tTabung.innerHTML = totalTabung
            tHarga.innerHTML = formatRupiah(totalHarga)
        }
    }, 100);

    if (data.length === 0) {
        tTabung.innerHTML = 0
        tHarga.innerHTML = 0
    }

}
showTotal()

function showDownload() {
    const tBodyDonwload = document.querySelector('#tBody-download')
    document.querySelectorAll('#datas-download').forEach(datas => datas.remove())
    for (let i = 0; i < data.length; i++) {
        let d = new Date(data[i].tanggal)
        let ubahTanggal = d.toLocaleDateString("id")
        let tagTable = `
            <tr id='datas-download'>
              <td>${i + 1}</td>
              <td>${ubahTanggal}</td>
              <td>${data[i].tabung}</td>
              <td>${formatRupiah(data[i].harga)}</td>
              <td>${formatRupiah(data[i].total)}</td>
              </tr>
        `
        tBodyDonwload.innerHTML += tagTable
    }
}
showDownload()

function showTotalDownload() {
    const tTabung = document.querySelector('#total-tabung-download')
    const tHarga = document.querySelector('#total-harga-download')
    setInterval(() => {
        let totalTabung = 0,
            totalHarga = 0
        for (let i = 0; i < data.length; i++) {
            totalHarga += data[i].total
            totalTabung += parseInt(data[i].tabung)

            tTabung.innerHTML = totalTabung
            tHarga.innerHTML = formatRupiah(totalHarga)
        }
    }, 100);

    if (data.length === 0) {
        tTabung.innerHTML = 0
        tHarga.innerHTML = 0
    }

}
showTotalDownload()

function btnAksi(id, tanggal, tabung) {
    const editTanggal = document.querySelector('#tanggal-edit'),
        editTabung = document.querySelector('#tabung-edit')
    let dt = new Date(tanggal).toISOString().split('T')[0]
    document.querySelector('.popup').style.display = 'flex'
    let tagBtn = `
            <button id="btn-edit" onclick='btnEdit(${id},${tanggal},${tabung})'>Edit</button>
            <button id="btn-hapus" onclick='btnHapus(${id})'>Hapus</button>
    `
    document.querySelector('.btn').innerHTML = tagBtn

    editTanggal.value = dt
    editTabung.value = tabung

}

function btnHapus(id) {
    data.splice(id, 1)
    showData()
    alert('Data berhasil di hapus')
    btnClose.click()
    showTotal()
    showDownload()
}

function btnEdit(id, tanggal, tabung) {
    const tanggalEdit = document.querySelector('#tanggal-edit'),
        tabungEdit = document.querySelector('#tabung-edit')
    let infoEdit = {
        tanggal: tanggalEdit.value,
        tabung: tabungEdit.value,
        harga: hargaGas,
        total: tabungEdit.value * hargaGas

    }
    alert('data berhasil diubah')
    data[id] = infoEdit
    showData()
    showTotal()
    showDownload()
    btnClose.click()
}

btnTambah.addEventListener('click', e => {
    e.preventDefault()
    let infoTabung = inputTabung.value,
        infoTanggal = inputTanggal.value

    if (infoTabung != '' && infoTanggal != '') {
        let infoBarang = {
            tanggal: infoTanggal,
            tabung: infoTabung,
            harga: hargaGas,
            total: infoTabung * hargaGas
        }
        if (data.find(data => data.tanggal == infoTanggal)) {
            alert('Tanggal sudah ada')
            showData()
            showTotal()
            showDownload()
        } else {
            data.push(infoBarang)
            alert('Data berhasil di tambah')
            clear()
            showData()
            showTotal()
            showDownload()
        }
    } else {
        alert('Tanggal atau jumlah belum di isi')
        showData()
        showTotal()
        showDownload()
    }
})

function clear() {
    inputTabung.value = ''
    inputTanggal.value = ''
}

const formatRupiah = (money) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(money);
}

btnClose.addEventListener('click', () => {
    document.querySelector('.popup').style.display = 'none'
    document.querySelector('.btn').innerHTML = ''
})


function download() {
    const element = document.querySelector('.laporan-download'),
    pangkalan = document.querySelector('#pangkalan')
    document.querySelector('.nama').innerHTML = pangkalan.value
    element.style.display = 'flex'
    let bulan = new Date(),
        getBulan = namaBulan[bulan.getMonth() - 1]
    var opt = {
        filename: `Pemasukan Bulan ${getBulan}`,
    };

    // New Promise-based usage:
    html2pdf().set(opt).from(element).save();

        setTimeout(() => {
            element.style.display = 'none'
        }, 10);
}