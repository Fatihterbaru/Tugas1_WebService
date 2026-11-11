
const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

let biodata = [
    {
        id: 1,
        nama: "Andi Saputra",
        umur: 21,
        alamat: "Jakarta",
        pekerjaan: "Mahasiswa"
    },
    {
        id: 2,
        nama: "Siti Aminah",
        umur: 23,
        alamat: "Bandung",
        pekerjaan: "Desainer"
    }
];

let nextId = 3;

// ENDPOINT 1: GET SEMUA BIODATA
app.get("/api/biodata", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Seluruh data biodata berhasil ditampilkan",
        data: biodata
    });
});

// ENDPOINT 2: GET BIODATA BERDASARKAN ID
app.get("/api/biodata/:id", (req, res) => {
    const id = Number(req.params.id);

    const data = biodata.find(item => item.id === id);

    if (!data) {
        return res.status(404).json({
            status: "fail",
            message: "Biodata tidak ditemukan",
            data: null
        });
    }

    res.status(200).json({
        status: "success",
        message: "Detail biodata berhasil ditemukan",
        data: data
    });
});

 // POST: Menambahkan biodata baru
app.post("/api/biodata", (req, res) => {
    const { nama, umur, alamat, pekerjaan } = req.body;

    // Validasi input
    if (
    !nama || typeof nama !== "string" ||
    !alamat || typeof alamat !== "string" ||
    !pekerjaan || typeof pekerjaan !== "string" ||
    umur === undefined || umur === null ||
    umur === "" || !Number.isFinite(Number(umur)) ||
    Number(umur) <= 0
) {
    return res.status(400).json({
        status: "fail",
        message: "Semua field wajib diisi dengan format yang benar",
        data: null
    });
}

    // Membuat objek biodata baru
    const dataBaru = {
        id: nextId++,
        nama: nama,
        umur: Number(umur),
        alamat: alamat,
        pekerjaan: pekerjaan
    };

    // Menambahkan data ke Array
    biodata.push(dataBaru);

    res.status(201).json({
        status: "success",
        message: "Biodata berhasil ditambahkan",
        data: dataBaru
    });
});

// PUT: Mengubah biodata berdasarkan ID
app.put("/api/biodata/:id", (req, res) => {
    const id = Number(req.params.id);

    // Mencari posisi data berdasarkan ID
    const index = biodata.findIndex(item => item.id === id);

    if (
    !nama || typeof nama !== "string" ||
    !alamat || typeof alamat !== "string" ||
    !pekerjaan || typeof pekerjaan !== "string" ||
    umur === undefined || umur === null ||
    umur === "" || !Number.isFinite(Number(umur)) ||
    Number(umur) <= 0
) {
    return res.status(400).json({
        status: "fail",
        message: "Semua field wajib diisi dengan format yang benar",
        data: null
    });
}

    const { nama, umur, alamat, pekerjaan } = req.body;

    // Validasi input
    if (!nama || !umur || !alamat || !pekerjaan) {
        return res.status(400).json({
            status: "fail",
            message: "Semua field wajib diisi",
            data: null
        });
    }

    // Memperbarui data
    biodata[index] = {
        id: id,
        nama: nama,
        umur: Number(umur),
        alamat: alamat,
        pekerjaan: pekerjaan
    };

    res.status(200).json({
        status: "success",
        message: "Biodata berhasil diperbarui",
        data: biodata[index]
    });
});

 // DELETE: Menghapus biodata berdasarkan ID
app.delete("/api/biodata/:id", (req, res) => {
    const id = Number(req.params.id);

    // Mencari posisi data berdasarkan ID
    const index = biodata.findIndex(item => item.id === id);

    if (index === -1) {
        return res.status(404).json({
            status: "fail",
            message: "Biodata tidak ditemukan",
            data: null
        });
    }

    // Menghapus data dari Array
    const dataDihapus = biodata.splice(index, 1);

    res.status(200).json({
        status: "success",
        message: "Biodata berhasil dihapus",
        data: dataDihapus[0]
    });
});

// MENJALANKAN SERVER
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
