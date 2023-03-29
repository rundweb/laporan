const inputTanggal = document.querySelector('#tanggal'),
    inputpengeluaran = document.querySelector('#pengeluaran'),
    inputJenis = document.querySelector('#jenis'),
    inputKeterngan = document.querySelector('#keterangan'),
    editTanggal = document.querySelector('#tanggal-edit'),
    editJenis = document.querySelector('#jenis-edit'),
    editPengeluaran = document.querySelector('#pengeluaran-edit'),
    editKeterangan = document.querySelector('#keterangan-edit')

const btnTambah = document.querySelector('.btn-tambah'),
    btnClose = document.querySelector('.close')

const data = []
const saldo = []
const pemasukan = []




const namaBulan = ['Januari', 'Februari', 'Maret', 'Aprin', 'Mei', 'Juni', 'July', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
// btnDetail.addEventListener('click',e=>{
//     e.preventDefault()
//     document.querySelector('.popup').style.display = 'flex'
// })

btnClose.addEventListener('click', () => {
    document.querySelector('.popup').style.display = 'none'
    clearInput()
})



function showData() {
    document.querySelectorAll('.datas').forEach(d => d.remove())
    for (let i = 0; i < data.length; i++) {
        let ubahTanggal = new Date(data[i].tanggal)
        let tanggalTime = ubahTanggal.getTime()

        let d = new Date(data[i].tanggal)
        let ubahTanggall = d.toLocaleDateString("id")
        let tagTable = `
            <tr class='datas'>
              <td>${i + 1}</td>
              <td>${ubahTanggall}</td>
              <td>${data[i].jenis}</td>
              <td>
                <button class="btn-detail" onclick='btnAksi(${i},${tanggalTime},"${data[i].jenis}",${data[i].pengeluaran},"${data[i].keterangan}")'><i class="ri-folder-5-line"></i></button>
                  
              </td>
            </tr>
       `
        document.querySelector('.tbody').innerHTML += tagTable
    }
}
showData()


function btnAksi(id, tanggal, jenis, pengeluaran, keterangan) {
    document.querySelector('.popup').style.display = 'flex'
    let ubahTanggal = new Date(tanggal).toISOString().split('T')[0]
    editTanggal.value = ubahTanggal
    editJenis.value = jenis
    editPengeluaran.value = pengeluaran
    editKeterangan.value = keterangan

    let tagBtn = `
            <button class="btn-edit" onclick='btnEdit(${id},${ubahTanggal})'>Edit</button>
            <button class="btn-hapus" onclick='btnHapus(${id})'>Hapus</button>
    `

    document.querySelector('.btn').innerHTML = tagBtn

}

function btnHapus(id) {
    data.splice(id, 1)

    alert('data berhasil di hapus')
    showData()
    showDownload()
    showTotalDownload()
    clearInput()
    btnClose.click()
}

function btnEdit(id, tanggal) {
    let infoEdit = {
        tanggal: editTanggal.value,
        jenis: editJenis.value,
        pengeluaran: editPengeluaran.value,
        keterangan: editKeterangan.value

    }

    data[id] = infoEdit
    alert('data berhasil diubah')
    btnClose.click()
    clearInput()
    showData()
    showDownload()
    showTotalDownload()

}

btnTambah.addEventListener('click', e => {
    e.preventDefault()
    let infoTanggal = inputTanggal.value,
        infoJenis = inputJenis.value,
        infoPengeluaran = inputpengeluaran.value,
        infoKeterangan = inputKeterngan.value
    let infoData = {
        tanggal: infoTanggal,
        jenis: infoJenis,
        pengeluaran: infoPengeluaran,
        keterangan: infoKeterangan
    }
    if (infoTanggal == '' || infoJenis == '' || infoPengeluaran == '' || infoKeterangan == '') {
        alert('Data belum di isi')
        showData()
        showDownload()
        showTotalDownload()

    } else if (data.find(d => d.tanggal == infoTanggal)) {
        alert('Tanggal Sudah ada')
        showData()
        showDownload()
        showTotalDownload()

    } else {
        data.push(infoData)
        alert('data berhasil ditambahkan')
        showData()
        showDownload()
        showTotalDownload()
        clearInput()

    }
})

function showDownload() {
    document.querySelectorAll('.datass').forEach(d => d.remove())
    for (let i = 0; i < data.length; i++) {
        let d = new Date(data[i].tanggal)
        let ubahTanggal = d.toLocaleDateString("id")
        let tagTablee = `
            <tr class='datass'>
              <td>${i + 1}</td>
              <td>${ubahTanggal}</td>
              <td>${data[i].jenis}</td>
              <td>${formatRupiah(data[i].pengeluaran)}</td>
              <td>${data[i].keterangan}</td>
            </tr>
       `
        document.querySelector('.tbody-download').innerHTML += tagTablee
    }
}
showDownload()

function showTotalDownload() {
    const total = document.querySelector('.total')
    setTimeout(() => {
        let totalHarga = 0
        for (let i = 0; i < data.length; i++) {
            totalHarga += parseInt(data[i].pengeluaran)
            total.innerHTML = formatRupiah(totalHarga)
            document.querySelector('.pengeluaran-setoran').innerHTML = formatRupiah(totalHarga)

            if (saldo.length == 0) {
                saldo.push(totalHarga)
            }else{
                saldo.shift()
                saldo.push(totalHarga)
            }
        }
    }, 100);

    if (data.length === 0) {
        total.innerHTML = 0
    }

}
showTotalDownload()

// menangkap includes


function clearInput() {
    inputTanggal.value = ''
    inputpengeluaran.value = ''
    inputJenis.value = ''
    inputKeterngan.value = ''
    document.querySelector('.btn').innerHTML = ''
    editTanggal.value = ''
    editJenis.value = ''
    editPengeluaran.value = ''
    editKeterangan.value = ''

}


function download() {
    var downloaded = document.querySelector('.pengeluaran-download')
    var pangkalan = document.querySelector('#pangkalan')
    document.querySelector('.nama').innerHTML = pangkalan.value
    var gas = document.querySelector('#gas').value
    let pemasukanGas = gas * 16000
    pemasukan.push(pemasukanGas)
    document.querySelector('.setoran').innerHTML = formatRupiah(pemasukan)
    let jumlah =  pemasukanGas - saldo
    
    document.querySelector('.pengeluaran-download').style.display = 'flex'

    document.querySelector('.saldo').innerHTML = formatRupiah(jumlah)
    let bulan = new Date(),
        getBulan = namaBulan[bulan.getMonth() - 1]
    document.querySelector('.bulan-lalu').innerHTML = getBulan
    var opt = {
        filename: `Pengeluaran Bulan ${getBulan}`,
    };

    // New Promise-based usage:
    html2pdf().set(opt).from(downloaded).save();

    setTimeout(() => {
        document.querySelector('.pengeluaran-download').style.display = 'none'
    }, 10);
}

const formatRupiah = (money) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(money);
}
