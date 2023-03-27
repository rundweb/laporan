const inputTanggal = document.querySelector('#tanggal'),
    inputpengeluaran = document.querySelector('#pengeluaran'),
    inputJenis = document.querySelector('#jenis'),
    inputKeterngan = document.querySelector('#keterangan')

const btnTambah = document.querySelector('.btn-tambah'),
    btnClose = document.querySelector('.close')

const data = []

// btnDetail.addEventListener('click',e=>{
//     e.preventDefault()
//     document.querySelector('.popup').style.display = 'flex'
// })

btnClose.addEventListener('click', () => {
    document.querySelector('.popup').style.display = 'none'
})

function showData() {
    document.querySelectorAll('.datas').forEach(d => d.remove())
    for (let i = 0; i < data.length; i++) {
        let ubahTanggal = new Date(data[i].tanggal)
        let tanggalTime = ubahTanggal.getTime()
        let tagTable = `
            <tr class='datas'>
              <td>${i + 1}</td>
              <td>${data[i].tanggal}</td>
              <td>${data[i].jenis}</td>
              <td>
                <button class="btn-detail" onclick="btnDetail(${i},${tanggalTime},${data[i].jenis},${data[i].pengeluaran},${data[i].keterangan})">
                  <i class="ri-folder-5-line"></i>
                </button>
              </td>
            </tr>
       `

        document.querySelector('tbody').innerHTML += tagTable
    }
}

showData()

function btnDetail(id,tanggal,jenis,pengeluaran,keterangan){
    document.querySelector('.popup').style.display = 'flex'
    const tanggalEdit = document.querySelector('#tanggal-edit'),
     pengeluranEdit = document.querySelector('#pengeluaran-edit'),
     jenisEdit = document.querySelector('#jenis-edit'),
     keteranganEdit = document.querySelector('#keterangan-edit')

    let ubahTanggal = new Date(tanggal)

    console.log(id,tanggal,jenis,pengeluaran,keterangan)
}


btnTambah.addEventListener('click', e => {
    e.preventDefault()

    const inputTanggal = document.querySelector('#tanggal').value,
        inputpengeluaran = document.querySelector('#pengeluaran').value,
        inputJenis = document.querySelector('#jenis').value,
        inputKeterngan = document.querySelector('#keterangan').value
    let infoData = {
        tanggal: inputTanggal,
        jenis: inputJenis,
        pengeluaran: inputpengeluaran,
        keterangan: inputKeterngan
    }
    if (inputTanggal == '' || inputpengeluaran == '' || inputJenis == '' || inputKeterngan == '') {
        alert('Data belum di isi')
        showData()
    } else if (data.find(d => d.tanggal == inputTanggal)) {
        alert('Tanggal Sudah ada')
        showData()
    } else {

        data.push(infoData)
        alert('data berhasil ditambahkan')
        clearInput()
        showData()
        console.log(data)
    }
})




function clearInput() {
    inputTanggal.value = ''
    inputpengeluaran.value = ''
    inputJenis.value = ''
    inputKeterngan.value = ''
}

