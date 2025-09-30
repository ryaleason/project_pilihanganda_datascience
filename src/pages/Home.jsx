import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, Award, RotateCcw , Instagram, GithubIcon, Github, Globe} from 'lucide-react';

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const Home = () => {
  const originalQuestions = [
    {
      id: 1,
      question: "Apa makna utama dari 'The Power of Data'?",
      options: ["Data hanya sekadar angka", "Data tidak memiliki pengaruh", "Data hanya untuk dokumentasi", "Data dapat memengaruhi keputusan besar"],
      correct: 3
    },
    {
      id: 2,
      question: "Data Kuantitatif adalah?",
      options: ["Data berupa angka atau nilai numerik", "Data berupa kategori", "Data berupa teks deskriptif", "Data yang tidak bisa diukur"],
      correct: 0
    },
    {
      id: 3,
      question: "Data Kualitatif biasanya berbentuk?",
      options: ["Kategori atau deskripsi", "Angka", "Persentase", "Rasio"],
      correct: 0
    },
    {
      id: 4,
      question: "Contoh Data Numerik adalah?",
      options: ["Nama Kota", "Jenis Kelamin", "Umur", "Warna Baju"],
      correct: 2
    },
    {
      id: 5,
      question: "Data Kontinu adalah?",
      options: ["Data kategori", "Data terbatas jumlahnya", "Data dapat diukur dalam skala tak terhingga", "Data hanya berupa hitungan"],
      correct: 2
    },
    {
      id: 6,
      question: "Data Diskrit adalah?",
      options: ["Data yang berupa angka pecahan", "Data yang hanya berupa hitungan bulat", "Data berupa teks", "Data yang tidak bisa dihitung"],
      correct: 1
    },
    {
      id: 7,
      question: "Data Kategorikal adalah?",
      options: ["Data numerik", "Data dalam bentuk teks bebas", "Data dalam bentuk kelompok atau label", "Data berbentuk pecahan"],
      correct: 2
    },
    {
      id: 8,
      question: "Contoh Data Nominal adalah?",
      options: ["Umur", "Pendapatan", "Jenis Kelamin", "Berat Badan"],
      correct: 2
    },
    {
      id: 9,
      question: "Data Ordinal berbeda dengan Nominal karena?",
      options: ["Ordinal memiliki urutan", "Nominal memiliki urutan", "Ordinal tidak bisa diurutkan", "Nominal bisa diukur"],
      correct: 0
    },
    {
      id: 10,
      question: "Mengapa data penting dalam pengambilan keputusan?",
      options: ["Hanya sekadar referensi", "Mengurangi subjektivitas", "Tidak terlalu berpengaruh", "Hanya untuk dokumentasi"],
      correct: 1
    },
    {
      id: 11,
      question: "Knowledge (Pengetahuan) diperoleh dari?",
      options: ["Data mentah", "Pengalaman dan analisis", "Informasi dasar", "Tanpa proses apapun"],
      correct: 1
    },
    {
      id: 12,
      question: "Wisdom (Kebijaksanaan) adalah?",
      options: ["Hasil pengolahan data mentah", "Kemampuan membuat keputusan tepat berdasarkan pengetahuan", "Informasi dasar dari data", "Proses pembersihan data"],
      correct: 1
    },
    {
      id: 13,
      question: "Data-Driven Decision Making adalah?",
      options: ["Menggunakan intuisi", "Menggunakan data sebagai dasar keputusan", "Menggunakan pengalaman pribadi", "Menggunakan kebiasaan lama"],
      correct: 1
    },
    {
      id: 14,
      question: "Big Data in Action artinya?",
      options: ["Big Data hanya teori", "Big Data tidak relevan", "Big Data diterapkan dalam praktik nyata", "Big Data hanya untuk perusahaan besar"],
      correct: 2
    },
    {
      id: 15,
      question: "Tiga V dalam Big Data adalah?",
      options: ["Volume, Value, Validation", "Velocity, Variety, Volume", "Variable, Velocity, Value", "Validation, Visualization, Velocity"],
      correct: 1
    },
    {
      id: 16,
      question: "Perbedaan Small Data dan Big Data terletak pada?",
      options: ["Jumlah, kompleksitas, dan kecepatan data", "Hanya nama saja", "Jenis kategori data", "Cara input data"],
      correct: 0
    },
    {
      id: 17,
      question: "Fundamental Data Science mencakup?",
      options: ["Statistika, pemrograman, dan domain knowledge", "Hanya coding", "Hanya matematika", "Hanya teori"],
      correct: 0
    },
    {
      id: 18,
      question: "Data Scientist berbeda dengan Data Engineer karena?",
      options: ["Scientist membangun pipeline data", "Engineer melakukan analisis", "Scientist fokus analisis & modeling, Engineer fokus infrastruktur", "Tidak ada perbedaan"],
      correct: 2
    },
    {
      id: 19,
      question: "Dampak Data Science di dunia adalah?",
      options: ["Tidak signifikan", "Meningkatkan efisiensi dan inovasi", "Hanya di sektor IT", "Mengurangi jumlah data"],
      correct: 1
    },
    {
      id: 20,
      question: "Kalkulus digunakan dalam data science untuk?",
      options: ["Menghitung probabilitas", "Optimasi model machine learning", "Mengelola database", "Menghitung kategori data"],
      correct: 1
    },
    {
      id: 21,
      question: "Aljabar Linier penting karena?",
      options: ["Menghitung rata-rata", "Dasar komputasi vektor & matriks dalam machine learning", "Menghapus outlier", "Membuat grafik"],
      correct: 1
    },
    {
      id: 22,
      question: "Metodologi Data Science biasanya mencakup?",
      options: ["Data Collection, Cleaning, Analysis, Modeling", "Hanya Modeling", "Hanya Visualization", "Hanya Collection"],
      correct: 0
    },
    {
      id: 23,
      question: "Analisis Data bertujuan untuk?",
      options: ["Mencari pola dan insight dari data", "Mengurangi data", "Menghapus data", "Menambah noise"],
      correct: 0
    },
    {
      id: 24,
      question: "Contoh teknologi pendukung data science adalah?",
      options: ["Canva, Hadoop, Spark", "MS Word", "Photoshop", "TensorFlow"],
      correct: 3
    },
    {
      id: 25,
      question: "Database on Premise berbeda dengan Cloud karena?",
      options: ["Cloud disimpan di server lokal", "On Premise disimpan di server perusahaan, Cloud di server internet", "Tidak ada bedanya", "Cloud hanya untuk data kecil"],
      correct: 1
    },
    {
      id: 26,
      question: "Contoh tools pengolahan data adalah?",
      options: ["Excel, SQL, Python Pandas", "Chrome, Firefox, Safari", "Notepad, WordPad, Paint", "WhatsApp, Telegram, Signal"],
      correct: 0
    },
    {
      id: 27,
      question: "Contoh tools visualisasi data adalah?",
      options: ["Tableau, Power BI, Matplotlib", "SQL, MongoDB", "Kotlin, Java", "TensorFlow, Keras"],
      correct: 0
    },
    {
      id: 28,
      question: "Bahasa pemrograman yang populer untuk data science?",
      options: ["PHP dan Ruby", "HTML dan CSS", "Java dan Kotlin", "Python dan R"],
      correct: 3
    },
    {
      id: 29,
      question: "Python dikenal karena?",
      options: ["Sintaks mudah, banyak library data science", "Hanya untuk web", "Sulit dipelajari", "Tidak mendukung machine learning"],
      correct: 0
    },
    {
      id: 30,
      question: "R banyak digunakan untuk?",
      options: ["Membuat Game", "Analisis statistik dan visualisasi data", "Mendesain grafis", "Mengedit video"],
      correct: 1
    }
  ];


  const [questions, setQuestions] = useState(shuffleArray(originalQuestions));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800);
  const [isStarted, setIsStarted] = useState(false);

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
  };

  if (!isStarted) {
    return (
      <div className="min-h-screen flex-col  bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <Award className="w-20 h-20 text-indigo-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Kuis Latihan Data Science
            </h1>
            <p className="text-gray-600">Plihan Ganda</p>
          </div>

          <div className="bg-indigo-50 rounded-lg p-4 mb-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Jumlah Soal:</span>
              <span className="font-bold text-indigo-600">
                {questions.length} Soal
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Waktu:</span>
              <span className="font-bold text-indigo-600">30 Menit</span>
            </div>
          </div>

          <button
            onClick={() => setIsStarted(true)}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Mulai Kuis
          </button>
          <h1 className='text-sm text-gray-600 mt-4'>Bila ada kesalahan silahkan dm saya</h1>
        </div>

        <div className="grid grid-cols-3 grid-rows-1 mt-4 gap-4 ">
          <div className='bg-white py-1 px-3 shadow-lg cursor-pointer rounded-lg w-10 h-10 flex justify-center items-center'>
            <a href='https://www.instagram.com/ryaleason_/'><Instagram /></a>
          </div>
          <div className='bg-white py-1 px-3 shadow-lg cursor-pointer rounded-lg w-10 h-10 flex justify-center items-center'>
            <a href='https://github.com/ryaleason'><Github/></a>
          </div>
          <div className='bg-white py-1 px-3 cursor-pointer shadow-lg rounded-lg w-10 h-10 flex justify-center items-center'>
            <a href='https://ryaleason.github.io/portofolio/'><Globe /></a>
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
