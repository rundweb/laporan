const inputTanggal = document.querySelector(".tanggal"),
  inputTabung = document.querySelector(".tabung"),
  btnTambah = document.querySelector(".btn-tambah"),
  detail = document.querySelector(".pemasukan-detail"),
  close = document.querySelector(".bx-task-x"),
  detailTanggal = document.querySelector(".detail-tanggal"),
  detailTabung = document.querySelector(".detail-tabung"),
  detailHarga = document.querySelector(".detail-harga"),
  detailTotal = document.querySelector(".detail-total")

const hargaTabung = 16000;
const data = [];

// menampilkan data
function showData() {
  document.querySelectorAll(".datas").forEach((datas) => datas.remove());
  data.forEach((val, index) => {
    let tanggalUbah = new Date(val.tanggal);
    let tanggal = tanggalUbah.getDate();
    let bulan = tanggalUbah.getMonth();
    let tahun = tanggalUbah.getFullYear();

    let tanggalUpdate = `${tanggal}/${bulan}/${tahun}`;
    let waktuTanggal = tanggalUbah.getTime();
    let tagTable = `
            <tr class="datas">
                <td>${index + 1}</td>
                <td>${tanggalUpdate}</td>
                <td>${val.tabung}</td>
                <td><i class="bx bxs-folder-open" onclick='btnDetail(${index},${waktuTanggal},${
      val.tabung
    })'></i></td>
              </tr>
        `;

    document.querySelector(".table-body").innerHTML += tagTable;
  });
}

showData();

function showTotalTabung() {
  let totalTabung = 0;
  for (let i = 0; i < data.length; i++) {
    totalTabung += parseInt(data[i].tabung);
    document.querySelector(".total-tabung").innerHTML = totalTabung;
  }
}
showTotalTabung();

function btnDetail(id, tanggal, tabung) {
  detail.style.display = "flex";

  let ubahTanggal = new Date(tanggal).toISOString().split('T')[0]

  detailTanggal.value = ubahTanggal;
  detailTabung.value = tabung;
  detailHarga.value = hargaTabung
  detailTotal.value = tabung * hargaTabung
}

close.addEventListener("click", () => {
  detail.style.display = "none";
});

// tambah data

btnTambah.addEventListener("click", (e) => {
  e.preventDefault();
  let infoTanggal = inputTanggal.value,
    infoTabung = inputTabung.value;

  if (infoTanggal != "" && infoTabung != "") {
    let inputData = {
      tanggal: infoTanggal,
      tabung: infoTabung,
      harga: hargaTabung,
      total: infoTabung * hargaTabung,
    };
    if (data.find((data) => data.tanggal === infoTanggal)) {
      alert("Tanggal Sudah Ada");
      showData();
      showTotalTabung();
    } else {
      data.push(inputData);
      alert("Data berhasil ditambah");
      clearInput();
      showData();
      showTotalTabung();
    }
  } else {
    alert("Isi data terlebih dahulu");
  }
});

function clearInput() {
  inputTanggal.value = "";
  inputTabung.value = "";
}


const formatRupiah = (money) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(money);
}
