const { nanoid } = require("nanoid");
const quiz = require("./quiz");

const addQuizHandler = (request, h) => {
  const {
    question,
    imgUrl,
    correctAnswer,
    incorrectAnswer1,
    incorrectAnswer2,
    incorrectAnswer3,
  } = request.payload;

  const id = nanoid(16);

  let hasImg;
  if (!imgUrl) {
    hasImg = false;
  } else {
    hasImg = true;
  }

  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  if (
    !question ||
    !correctAnswer ||
    !incorrectAnswer1 ||
    !incorrectAnswer2 ||
    !incorrectAnswer3
  ) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan soal kuis. Mohon isi semua data yang diperlukan",
    });
    response.code(400);
    response.header("Content-Type", "application/json");
    return response;
  }

  const incorrectAnswer = {
    incorrectAnswer1,
    incorrectAnswer2,
    incorrectAnswer3,
  };

  const newQuiz = {
    id,
    question,
    imgUrl,
    hasImg,
    correctAnswer,
    incorrectAnswer,
    insertedAt,
    updatedAt,
  };

  quiz.push(newQuiz);

  const response = h.response({
    status: "success",
    message: "Soal kuis berhasil ditambahkan",
    data: {
      quizId: id,
    },
  });
  response.code(201);
  response.header("Content-Type", "application/json");
  return response;
};

const getAllQuizHandler = (request) => {
  const { question, hasImg } = request.query;

  let filteredQuiz = [...quiz];

  if (question) {
    filteredQuiz = filteredQuiz.filter((dataQuiz) =>
      dataQuiz.question.toLowerCase().includes(question.toLowerCase())
    );
  }

  if (hasImg !== undefined) {
    const dataHasImg = hasImg === "1";
    filteredQuiz = filteredQuiz.filter(
      (dataQuiz) => dataQuiz.hasImg === dataHasImg
    );
  }

  return {
    status: "success",
    data: {
      quizs: filteredQuiz,
    },
  };
};

const getQuizByIdHandler = (request, h) => {
  const { quizId } = request.params;

  const dataQuiz = quiz.filter((q) => q.id === quizId)[0];

  if (dataQuiz !== undefined) {
    return {
      status: "success",
      data: {
        dataQuiz,
      },
    };
  }

  const response = h.response({
    status: "fail",
    message: "Soal kuis tidak ditemukan",
  });
  response.code(404);
  return response;
};

const editQuizByIdHandler = (request, h) => {
  const { quizId } = request.params;

  const {
    question,
    imgUrl,
    correctAnswer,
    incorrectAnswer1,
    incorrectAnswer2,
    incorrectAnswer3,
  } = request.payload;

  if (
    !question ||
    !correctAnswer ||
    !incorrectAnswer1 ||
    !incorrectAnswer2 ||
    !incorrectAnswer3
  ) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal memperbarui soal kuis. Mohon isi semua data yang diperlukan",
    });
    response.code(400);
    return response;
  }

  let hasImg;
  if (!imgUrl) {
    hasImg = false;
  } else {
    hasImg = true;
  }

  const updatedAt = new Date().toISOString();
  const index = quiz.findIndex((q) => q.id === quizId);

  const incorrectAnswer = {
    incorrectAnswer1,
    incorrectAnswer2,
    incorrectAnswer3,
  };

  if (index !== -1) {
    quiz[index] = {
      ...quiz[index],
      question,
      imgUrl,
      hasImg,
      correctAnswer,
      incorrectAnswer,
      updatedAt,
    };

    const response = h.response({
      status: "success",
      message: "Soal kuis berhasil diperbarui",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui soal kuis. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

const deleteQuizByIdHandler = (request, h) => {
  const { quizId } = request.params;

  const index = quiz.findIndex((q) => q.id === quizId);

  if (index !== -1) {
    quiz.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Soal kuis berhasil dihapus",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Soal kuis gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

const getRandomQuizs = (quiz, count) => {
  const shuffledQuiz = quiz.sort(() => 0.5 - Math.random());
  return shuffledQuiz.slice(0, count);
};

const getTenRandomQuizsHandler = (request, h) => {
  const count = 10;

  const allQuizs = getAllQuizHandler(request).data.quizs;

  const randomQuizs = getRandomQuizs(allQuizs, count);

  return h.response({
    status: "success",
    data: {
      quizs: randomQuizs,
    },
  });
};

module.exports = {
  addQuizHandler,
  getAllQuizHandler,
  getQuizByIdHandler,
  editQuizByIdHandler,
  deleteQuizByIdHandler,
  getTenRandomQuizsHandler,
};
