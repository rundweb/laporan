const inputTanggal = document.querySelector(".tanggal"),
  inputJenis = document.querySelector(".jenis"),
  inputHarga = document.querySelector(".harga"),
  inputKeerangan = document.querySelector(".keterangan"),
  btnTambah = document.querySelector(".btn-tambah"),
  detailTanggal = document.querySelector(".detail-tanggal"),
  detailJenis = document.querySelector(".detail-jenis"),
  detailHarga = document.querySelector(".detail-harga"),
  detailKeterangan = document.querySelector(".detail-keterangan"),
  close = document.querySelector(".bx-task-x"),
  inputPemasukan = document.querySelector(".input-pemasukan"),
  detail = document.querySelector(".pengeluaran-detail");

const data = [];
const namaBulan = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "July",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

btnTambah.addEventListener("click", (e) => {
  e.preventDefault();
  let infoTanggal = inputTanggal.value,
    infoJenis = inputJenis.value,
    infoHarga = inputHarga.value,
    infoKeterangan = inputKeerangan.value;

  if (
    infoTanggal != "" &&
    infoJenis != "" &&
    infoHarga != "" &&
    infoKeterangan != ""
  ) {
    let tambahData = {
      tanggal: infoTanggal,
      jenis: infoJenis,
      harga: infoHarga,
      keterangan: infoKeterangan,
    };
    if (data.find((data) => data.jenis === infoJenis)) {
      alert("Jenis pengeluaran sudah ada");
    } else {
      data.push(tambahData);
      alert("Data berhasil ditambahkan");
      clear();
      showData();
      showTotalTabung();
    }
  } else {
    alert("Data belum di isi, silahkan isi terlebih dahulu");
  }
});

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
                <td>${val.jenis}</td>
                <td><i class="bx bxs-folder-open" onclick='btnDetail(${index},${waktuTanggal},"${
      val.jenis
    }",${val.harga},"${val.keterangan}")'></i></td>
              </tr>
        `;
    document.querySelector(".table-body").innerHTML += tagTable;

    let tagDownload = `
    <tr class="datas">
    <td>${index + 1}</td>
    <td>${tanggalUpdate}</td>
    <td>${val.jenis}</td>
    <td>${formatRupiah(val.harga)}</td>
    <td>${val.keterangan}</td>
  </tr>
    `;

    document.querySelector(".donwload-body").innerHTML += tagDownload;
  });
}

function showTotalTabung() {
  let hargaTotal = 0;
  for (let i = 0; i < data.length; i++) {
    hargaTotal += parseInt(data[i].harga);
    document.querySelector(".total-pengeluaran").innerHTML =
      formatRupiah(hargaTotal);
  }

  if (data.length === 0) {
    document.querySelector(".total-pengeluaran").innerHTML = "0";
  }
}

function btnDetail(id, tanggal, jenis, harga, keterangan) {
  detail.style.display = "flex";
  let tanggalUbah = new Date(tanggal);
  let tanggalBaru = tanggalUbah.getDate();
  let bulan = tanggalUbah.getMonth();
  let tahun = tanggalUbah.getFullYear();
  let tanggalUpdate = `${tanggalBaru}/${bulan}/${tahun}`;

  document.querySelector(".tgl").innerHTML = tanggalUpdate;

  let ubahTanggal = new Date(tanggal).toISOString().split("T")[0];

  detailTanggal.value = ubahTanggal;
  detailJenis.value = jenis;
  detailHarga.value = harga;
  detailKeterangan.value = keterangan;

  let btnDetail = `
  <button class="btn-edit" onclick="editData(${id},${tanggal},'${jenis}',${harga},'${keterangan}')"><i class="bx bx-edit"></i> Edit</button>
  <button class="btn-hapus" onclick="hapusData(${id})"><i class="bx bx-trash"></i> Hapus</button>
  `;
  document.querySelector(".btn-detail").innerHTML = btnDetail;
}

function hapusData(id) {
  data.splice(id, 1);
  showData();
  alert("Data berhasil dihapus");
  close.click();
  showTotalTabung();
}

function editData(id) {
  let infoEdit = {
    tanggal: detailTanggal.value,
    jenis: detailJenis.value,
    harga: detailHarga.value,
    keterangan: detailKeterangan.value,
  };

  data[id] = infoEdit;
  alert("Data berhasil di ubah");
  showData();
  close.click();
  showTotalTabung();
}

close.addEventListener("click", () => {
  detail.style.display = "none";
});

function clear() {
  inputTanggal.value = "";
  inputJenis.value = "";
  inputHarga.value = "";
  inputKeerangan.value = "";
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
  let hargaTotal = 0;
  for (let i = 0; i < data.length; i++) {
    hargaTotal += parseInt(data[i].harga);
    document.querySelector(".total-pengeluaranN").innerHTML =
      formatRupiah(hargaTotal);

    let saldo = inputPemasukan.value - hargaTotal;

    document.querySelector(".total-pemasukan").innerHTML = formatRupiah(
      inputPemasukan.value
    );

    document.querySelector(".total").innerHTML = formatRupiah(saldo);
  }

  let bulan = new Date(),
    getBulan = namaBulan[bulan.getMonth() - 1];
  document.querySelector(".bln").innerHTML = getBulan;

  var opt = {
    filename: `Pengeluaran Bulan ${getBulan}`,
  };

  html2pdf().set(opt).from(element).save();

  setTimeout(() => {
    element.style.display = "none";
  }, 10);
}
