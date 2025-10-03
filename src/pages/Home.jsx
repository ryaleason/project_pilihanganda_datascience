import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, Award, RotateCcw, Instagram, GithubIcon, Github, Globe } from 'lucide-react';
import Swal from 'sweetalert2';
import { questionHard } from '../data/QuestionHard';
import { originalQuestions } from '../data/QuestionEasy';

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};


const Home = () => {


  const [questions, setQuestions] = useState(shuffleArray(originalQuestions));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600);
  const [isStarted, setIsStarted] = useState(false);
  const [questionLimit, setQuestionLimit] = useState(null);
  const [difficulty, setDifficulty] = useState(null);

  useEffect(() => {
    if (isStarted && !isFinished && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleFinish();
    }
  }, [isStarted, isFinished, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleAnswer = (optionIndex) => {
    setAnswers({
      ...answers,
      [currentQuestion]: optionIndex,
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleFinish = () => {
    setIsFinished(true);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correct) {
        correct++;
      }
    });
    return correct;
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setIsFinished(false);
    setTimeLeft(1800);
    setIsStarted(false);
    setQuestions(shuffleArray(originalQuestions));
    setQuestions([]);
    setDifficulty(null);
  };

  const startQuiz = () => {
    if (!difficulty) {
      Swal.fire("Pilih tingkat kesulitan dulu!", "", "warning");
      return;
    }
    if (!questionLimit) {
      Swal.fire("Pilih jumlah soal dulu!", "", "warning");
      return;
    }

    const source = difficulty === "easy" ? originalQuestions : questionHard;
    const shuffled = shuffleArray(source).slice(0, questionLimit);
    setQuestions(shuffled);
    setIsStarted(true);
  };


useEffect(() => {
  if (!isStarted) {
    Swal.fire({
      title: 'Selamat Datang',
      text: 'Ini Bukanlah Soal Ujian Asli Dari Dicoding, Ini Hanya Untuk Latihan',
      icon: 'info',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
    });
  }
}, [isStarted]);




  if (!isStarted) {
    return (
      <div className="min-h-screen flex-col bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <Award className="w-20 h-20 text-indigo-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Kuis Latihan Data Science
            </h1>
            <p className="text-gray-600">Pilih tingkat kesulitan & jumlah soal</p>
          </div>

          {/* Tingkat Kesulitan */}
          <div className="flex gap-4 mb-6 justify-center">
            <button
              onClick={() => setDifficulty("easy")}
              className={`px-4 py-2 rounded-lg font-semibold border-2 transition-colors ${difficulty === "easy"
                ? "bg-green-600 text-white border-green-600"
                : "border-gray-300 text-gray-700 hover:border-green-400"
                }`}
            >
              Easy
            </button>
            <button
              onClick={() => setDifficulty("hard")}
              className={`px-4 py-2 rounded-lg font-semibold border-2 transition-colors ${difficulty === "hard"
                ? "bg-red-600 text-white border-red-600"
                : "border-gray-300 text-gray-700 hover:border-red-400"
                }`}
            >
              Hard
            </button>
          </div>

          {/* Jumlah Soal */}
          <div className="flex gap-4 mb-6 justify-center">
            <button
              onClick={() => setQuestionLimit(30)}
              className={`px-4 py-2 rounded-lg font-semibold border-2 transition-colors ${questionLimit === 30
                ? "bg-indigo-600 text-white border-indigo-600"
                : "border-gray-300 text-gray-700 hover:border-indigo-400"
                }`}
            >
              30 Soal
            </button>
            <button
              onClick={() => setQuestionLimit(50)}
              className={`px-4 py-2 rounded-lg font-semibold border-2 transition-colors ${questionLimit === 50
                ? "bg-indigo-600 text-white border-indigo-600"
                : "border-gray-300 text-gray-700 hover:border-indigo-400"
                }`}
            >
              50 Soal
            </button>
            <button
              onClick={() => setQuestionLimit(60)}
              className={`px-4 py-2 rounded-lg font-semibold border-2 transition-colors ${questionLimit === 60
                ? "bg-indigo-600 text-white border-indigo-600"
                : "border-gray-300 text-gray-700 hover:border-indigo-400"
                }`}
            >
              60 Soal
            </button>
          </div>

          <div className="bg-indigo-50 rounded-lg p-4 mb-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Kesulitan:</span>
              <span className="font-bold text-indigo-600">
                {difficulty ? difficulty.toUpperCase() : "-"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Jumlah Soal:</span>
              <span className="font-bold text-indigo-600">
                {questionLimit ? questionLimit : "-"} Soal
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Waktu:</span>
              <span className="font-bold text-indigo-600">60 Menit</span>
            </div>
          </div>

          <button
            onClick={startQuiz}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Mulai Kuis
          </button>
          <h1 className="text-sm text-gray-600 mt-4">
            Bila ada kesalahan silahkan DM saya
          </h1>
        </div>

        <div className="grid grid-cols-3 grid-rows-1 mt-4 gap-4 ">
          <div className="bg-white py-1 px-3 shadow-lg cursor-pointer rounded-lg w-10 h-10 flex justify-center items-center">
            <a href="https://www.instagram.com/ryaleason_/"><Instagram /></a>
          </div>
          <div className="bg-white py-1 px-3 shadow-lg cursor-pointer rounded-lg w-10 h-10 flex justify-center items-center">
            <a href="https://github.com/ryaleason"><Github /></a>
          </div>
          <div className="bg-white py-1 px-3 cursor-pointer shadow-lg rounded-lg w-10 h-10 flex justify-center items-center">
            <a href="https://ryaleason.github.io/portofolio/"><Globe /></a>
          </div>
        </div>
      </div>
    );
  }

  if (isFinished) {
    const score = calculateScore();
    const percentage = (score / questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
        <div className="max-w-3xl w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="text-center mb-8">
              <Award
                className={`w-24 h-24 mx-auto mb-4 ${percentage >= 70 ? "text-green-500" : "text-orange-500"
                  }`}
              />
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Kuis Selesai!
              </h2>
              <p className="text-gray-600">Berikut adalah hasil Anda</p>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 mb-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-indigo-600 mb-2">
                  {score}/{questions.length}
                </div>
                <div className="text-xl text-gray-700">
                  Skor: {percentage.toFixed(0)}%
                </div>
              </div>
            </div>

            <button
              onClick={resetQuiz}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 mb-6"
            >
              <RotateCcw className="w-5 h-5" />
              Ulangi Kuis
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Pembahasan Jawaban</h3>
            <div className="space-y-6">
              {questions.map((q, index) => {
                const userAnswer = answers[index];
                const isCorrect = userAnswer === q.correct;

                return (
                  <div key={q.id} className={`border-2 rounded-lg p-4 ${isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                    <div className="flex items-start gap-3 mb-3">
                      {isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                      )}
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 mb-2">
                          {index + 1}. {q.question}
                        </p>

                        {userAnswer !== undefined ? (
                          <div className="space-y-2">
                            <div className={`p-2 rounded ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                              <span className="text-sm font-medium text-gray-700">Jawaban Anda: </span>
                              <span className={`text-sm ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                                {q.options[userAnswer]}
                              </span>
                            </div>

                            {!isCorrect && (
                              <div className="p-2 rounded bg-green-100">
                                <span className="text-sm font-medium text-gray-700">Jawaban Benar: </span>
                                <span className="text-sm text-green-800">
                                  {q.options[q.correct]}
                                </span>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="p-2 rounded bg-gray-100">
                              <span className="text-sm font-medium text-gray-700">Tidak dijawab</span>
                            </div>
                            <div className="p-2 rounded bg-green-100">
                              <span className="text-sm font-medium text-gray-700">Jawaban Benar: </span>
                              <span className="text-sm text-green-800">
                                {q.options[q.correct]}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-3xl mx-auto py-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 text-indigo-600">
              <Clock className="w-5 h-5" />
              <span className="font-bold text-lg">{formatTime(timeLeft)}</span>
            </div>
            <div className="text-gray-600 font-semibold">
              Soal {currentQuestion + 1} dari {questions.length}
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {currentQ.question}
          </h2>

          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${answers[currentQuestion] === index
                  ? "border-indigo-600 bg-indigo-50 text-indigo-900"
                  : "border-gray-200 hover:border-indigo-300 bg-white"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${answers[currentQuestion] === index
                      ? "border-indigo-600 bg-indigo-600"
                      : "border-gray-300"
                      }`}
                  >
                    {answers[currentQuestion] === index && (
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            className="flex-1 py-3 rounded-lg font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Sebelumnya
          </button>

          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleFinish}
              className="flex-1 py-3 rounded-lg font-semibold bg-green-600 text-white hover:bg-green-700 transition-colors"
            >
              Selesai
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex-1 py-3 rounded-lg font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            >
              Selanjutnya
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
