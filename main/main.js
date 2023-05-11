const inputTanggal = document.querySelector(".tanggal"),
  inputTabung = document.querySelector(".tabung"),
  btnTambah = document.querySelector(".btn-tambah"),
  detail = document.querySelector(".pemasukan-detail"),
  close = document.querySelector(".bx-task-x"),
  detailTanggal = document.querySelector(".detail-tanggal"),
  detailTabung = document.querySelector(".detail-tabung"),
  detailHarga = document.querySelector(".detail-harga"),
  detailTotal = document.querySelector(".detail-total");

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

    let tagDownload = `
    <tr class="datas">
    <td>${index + 1}</td>
    <td>${tanggalUpdate}</td>
    <td>${val.tabung}</td>
    <td>${formatRupiah(val.harga)}</td>
    <td>${formatRupiah(val.total)}</td>
  </tr>
    `;

    document.querySelector(".donwload-body").innerHTML += tagDownload;
  });
}

showData();

function showTotalTabung() {
  let totalTabung = 0;
  let hargaTotal = 0;
  for (let i = 0; i < data.length; i++) {
    totalTabung += parseInt(data[i].tabung);
    hargaTotal += parseInt(data[i].total);
    document.querySelector(".total-tabung").innerHTML = totalTabung;
    document.querySelector(".total-tabung2").innerHTML = totalTabung;
    document.querySelector(".harga-total-tabung").innerHTML =
      formatRupiah(hargaTotal);
  }

  if (data.length === 0) {
    document.querySelector(".total-tabung").innerHTML = "0";
    document.querySelector(".total-tabung2").innerHTML = "0";
  }
}
showTotalTabung();

function btnDetail(id, tanggal, tabung) {
  detail.style.display = "flex";

  let tanggalUbah = new Date(tanggal);
  let tanggalBaru = tanggalUbah.getDate();
  let bulan = tanggalUbah.getMonth();
  let tahun = tanggalUbah.getFullYear();
  let tanggalUpdate = `${tanggalBaru}/${bulan}/${tahun}`;

  document.querySelector(".tgl").innerHTML = tanggalUpdate;

  let ubahTanggal = new Date(tanggal).toISOString().split("T")[0];

  detailTanggal.value = ubahTanggal;
  detailTabung.value = tabung;
  detailHarga.innerHTML = formatRupiah(hargaTabung);
  detailTotal.innerHTML = formatRupiah(tabung * hargaTabung);

  let btnDetail = `
  <button class="btn-edit" onclick="editData(${id},${tanggal},${tabung})"><i class="bx bx-edit"></i> Edit</button>
  <button class="btn-hapus" onclick="hapusData(${id})"><i class="bx bx-trash"></i> Hapus</button>
  `;
  document.querySelector(".btn-detail").innerHTML = btnDetail;
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

function hapusData(id) {
  data.splice(id, 1);
  showData();
  alert("Data berhasil dihapus");
  close.click();
  showTotalTabung();
}

function editData(id, tanggal, tabung) {
  let infoEdit = {
    tanggal: detailTanggal.value,
    tabung: detailTabung.value,
    harga: hargaTabung,
    total: detailTabung.value * hargaTabung,
  };

  data[id] = infoEdit;
  alert("Data berhasil di ubah");
  showData();
  showTotalTabung();
  close.click();
}

function clearInput() {
  inputTanggal.value = "";
  inputTabung.value = "";
}

const formatRupiah = (money) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(money);
};

function download() {
  const element = document.querySelector(".download");
  element.style.display = "flex";
  html2pdf().from(element).save();

  setTimeout(() => {
    element.style.display = "none";
  }, 10);
}
