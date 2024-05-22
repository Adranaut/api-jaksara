const { nanoid } = require("nanoid");
const aksara = require("./aksara");

const { connectToDatabase } = require("./db");

const addAksaraHandler = async (request, h) => {
  try {
    const client = await connectToDatabase();
    const { number, label, imgUrl } = request.payload;

    const id = nanoid(16);

    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    if (!number || !label || !imgUrl) {
      const response = h.response({
        status: "fail",
        message:
          "Gagal menambahkan aksara. Mohon isi semua data yang diperlukan",
      });
      response.code(400);
      response.header("Content-Type", "application/json");
      return response;
    }

    const query =
      "INSERT INTO aksara (id, number, label, img_url, insertedat, updatedat) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const values = [id, number, label, imgUrl, insertedAt, updatedAt];
    const result = await client.query(query, values);

    return {
      status: "success",
      message: "Aksara berhasil ditambahkan",
      data: result.rows[0],
    };
  } catch (error) {
    console.error("Error adding aksara:", error);
    return h
      .response({
        status: "fail",
        message: "Gagal menambahkan aksara",
      })
      .code(500);
  }
};

// const addAksaraHandler = (request, h) => {
//   const { number, label, imgUrl } = request.payload;

//   const id = nanoid(16);

//   const insertedAt = new Date().toISOString();
//   const updatedAt = insertedAt;

//   if (!number || !label || !imgUrl) {
//     const response = h.response({
//       status: "fail",
//       message: "Gagal menambahkan aksara. Mohon isi semua data yang diperlukan",
//     });
//     response.code(400);
//     response.header("Content-Type", "application/json");
//     return response;
//   }

//   const newAksara = {
//     id,
//     number,
//     label,
//     imgUrl,
//     insertedAt,
//     updatedAt,
//   };

//   aksara.push(newAksara);

//   const response = h.response({
//     status: "success",
//     message: "Aksara berhasil ditambahkan",
//     data: {
//       aksaraId: id,
//     },
//   });
//   response.code(201);
//   response.header("Content-Type", "application/json");
//   return response;
// };

const getAllAksaraHandler = (request) => {
  const { label } = request.query;

  let filteredAksara = [...aksara];

  if (label) {
    filteredAksara = filteredAksara.filter((dataAksara) =>
      dataAksara.label.toLowerCase().includes(label.toLowerCase())
    );
  }

  const simplifiedAksara = filteredAksara.map(
    ({ id, number, label, imgUrl }) => ({
      id,
      number,
      label,
      imgUrl,
    })
  );

  return {
    status: "success",
    data: {
      aksara: simplifiedAksara,
    },
  };
};

const getAksaraByIdHandler = (request, h) => {
  const { aksaraId } = request.params;

  const dataAksara = aksara.filter((a) => a.id === aksaraId)[0];

  if (dataAksara !== undefined) {
    return {
      status: "success",
      data: {
        dataAksara,
      },
    };
  }

  const response = h.response({
    status: "fail",
    message: "Aksara tidak ditemukan",
  });
  response.code(404);
  return response;
};

const editAksaraByIdHandler = (request, h) => {
  const { aksaraId } = request.params;

  const { number, label, imgUrl } = request.payload;

  if (!number || !label || !imgUrl) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui aksara. Mohon isi semua data yang diperlukan",
    });
    response.code(400);
    return response;
  }

  const updatedAt = new Date().toISOString();
  const index = aksara.findIndex((a) => a.id === aksaraId);

  if (index !== -1) {
    aksara[index] = {
      ...aksara[index],
      number,
      label,
      imgUrl,
      updatedAt,
    };

    const response = h.response({
      status: "success",
      message: "Aksara berhasil diperbarui",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui aksara. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

const deleteAksaraByIdHandler = (request, h) => {
  const { aksaraId } = request.params;

  const index = aksara.findIndex((a) => a.id === aksaraId);

  if (index !== -1) {
    aksara.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Aksara berhasil dihapus",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Aksara gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = {
  addAksaraHandler,
  getAllAksaraHandler,
  getAksaraByIdHandler,
  editAksaraByIdHandler,
  deleteAksaraByIdHandler,
};
