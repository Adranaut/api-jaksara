const aksara = require("./aksara");

const addAksaraHandler = (request, h) => {
  const { id, label, imgUrl } = request.payload;

  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  if (!id || !label || !imgUrl) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan aksara. Mohon isi semua data yang diperlukan",
    });
    response.code(400);
    response.header("Content-Type", "application/json");
    return response;
  }

  const newAksara = {
    id,
    label,
    imgUrl,
    insertedAt,
    updatedAt,
  };

  aksara.push(newAksara);

  const response = h.response({
    status: "success",
    message: "Aksara berhasil ditambahkan",
    data: {
      aksaraId: id,
    },
  });
  response.code(201);
  response.header("Content-Type", "application/json");
  return response;
};

const getAllAksaraHandler = (request) => {
  const { label } = request.query;

  let filteredAksara = [...aksara];

  if (label) {
    filteredAksara = filteredAksara.filter((dataAksara) =>
      dataAksara.label.toLowerCase().includes(label.toLowerCase())
    );
  }

  const simplifiedAksara = filteredAksara.map(({ id, label, imgUrl }) => ({
    id,
    label,
    imgUrl,
  }));

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

  const { label, imgUrl } = request.payload;

  if (!label || !imgUrl) {
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
