const inputTanggal = document.querySelector('#tanggal'),
    inputTabung = document.querySelector('#tabung'),
    btnTambah = document.querySelector('#btn-tambah'),
    btnClose = document.querySelector('#close')

const data = []

function showData() {
    const tBody = document.querySelector('#tBody')
    document.querySelectorAll('#datas').forEach(datas => datas.remove())
    for (let i = 0; i < data.length; i++) {
        let d = new Date(data[i].tanggal)
        let ubahTanggal = d.getTime()
        let tagTable = `
            <tr id='datas'>
              <td>${i + 1}</td>
              <td>${data[i].tanggal}</td>
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


function btnAksi(id, tanggal, tabung) {
    const editTanggal = document.querySelector('#tanggal-edit'),
        editTabung = document.querySelector('#tabung-edit')
    let dt = new Date(tanggal).toISOString().split('T')[0]
    document.querySelector('.popup').style.display = 'flex'
    let tagBtn = `
            <button id="btn-edit">Edit</button>
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
}

btnTambah.addEventListener('click', e => {
    e.preventDefault()
    let infoTabung = inputTabung.value,
        infoTanggal = inputTanggal.value

    if (infoTabung != '' && infoTanggal != '') {
        let infoBarang = {
            tanggal: infoTanggal,
            tabung: infoTabung,
            harga: 15000,
            total: infoTabung * 15000
        }
        if (data.find(data => data.tanggal == infoTanggal)) {
            alert('Tanggal sudah ada')
            showData()
            showTotal()
        } else {
            data.push(infoBarang)
            alert('Data berhasil di tambah')
            clear()
            showData()
            showTotal()
        }
    } else {
        alert('Tanggal atau jumlah belum di isi')
        showData()
        showTotal()
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