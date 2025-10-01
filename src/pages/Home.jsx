import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, Award, RotateCcw, Instagram, GithubIcon, Github, Globe } from 'lucide-react';
import Swal from 'sweetalert2';

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
      options: [
        "Data yang memiliki nilai terbatas dan tidak bisa dipecah lagi",
        "Data yang dapat diukur dan memiliki nilai dalam rentang tertentu tanpa batasan pasti",
        "Data yang hanya berupa angka bulat seperti jumlah orang atau jumlah mobil",
        "Data yang berbentuk kategori seperti jenis kelamin atau warna"
      ],
      correct: 1
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
      options: [
        "Hanya berbeda pada ukuran file penyimpanan",
        "Jumlah data, kompleksitas, dan kecepatan pertumbuhan data",
        "Small Data selalu lebih akurat daripada Big Data",
        "Big Data hanya digunakan di perusahaan teknologi besar"
      ],
      correct: 1
    },
    {
      id: 17,
      question: "Fundamental Data Science mencakup?",
      options: [
        "Statistika, pemrograman, dan pemahaman bidang/domain knowledge",
        "Hanya pemrograman karena semua bisa dilakukan dengan coding",
        "Hanya matematika karena rumus adalah dasar utama data science",
        "Hanya teori tanpa praktik, karena praktik tidak diperlukan"
      ],
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
      options: [
        "Sintaks yang sederhana, komunitas luas, dan banyak library untuk data science",
        "Hanya digunakan untuk membangun website dengan framework seperti Django",
        "Bahasanya rumit dan sulit dipelajari untuk pemula",
        "Kurang cocok untuk machine learning karena tidak ada library pendukung"
      ],
      correct: 0
    },
    {
      id: 30,
      question: "R banyak digunakan untuk?",
      options: [
        "Membuat aplikasi grafis interaktif seperti game",
        "Analisis statistik, eksplorasi data, dan visualisasi hasil",
        "Desain visual seperti poster dan ilustrasi",
        "Pengeditan multimedia seperti video dan audio"
      ],
      correct: 1
    },
    {
      id: 31,
      question: "Scope Machine Learning meliputi ...",
      options: ["Prediksi", "Klasifikasi", "Clustering", "Semua benar"],
      correct: 3
    },
    {
      id: 32,
      question: "Salah satu faktor popularitas Machine Learning adalah ...",
      options: ["Mahal", "Kompleks", "Banyak dataset tersedia", "Tidak berguna"],
      correct: 2
    },
    {
      id: 33,
      question: "Tipe Machine Learning yang menggunakan label disebut ...",
      options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Deep Learning"],
      correct: 0
    },
    {
      id: 34,
      question: "Clustering termasuk ke dalam ...",
      options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Transfer Learning"],
      correct: 1
    },
    {
      id: 35,
      question: "Reward dan punishment digunakan pada ...",
      options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Deep Learning"],
      correct: 2
    },
    {
      id: 36,
      question: "Jaringan syaraf tiruan mendasari ...",
      options: ["Algoritma tradisional", "Deep Learning", "Database", "Statistik Deskriptif"],
      correct: 1
    },
    {
      id: 37,
      question: "Decision Tree adalah contoh ...",
      options: ["Deep Learning", "Algoritma Tradisional", "Clustering", "Big Data"],
      correct: 1
    },
    {
      id: 38,
      question: "Convolutional Neural Network (CNN) biasa dipakai untuk ...",
      options: ["Pengolahan teks", "Analisis gambar", "Clustering data", "Regresi sederhana"],
      correct: 1
    },
    {
      id: 39,
      question: "Algoritma K-Means digunakan untuk ...",
      options: ["Regresi", "Klasifikasi", "Clustering", "Prediksi deret waktu"],
      correct: 2
    },
    {
      id: 40,
      question: "Linear Regression digunakan untuk ...",
      options: ["Memprediksi nilai numerik", "Mengelompokkan data", "Mengurangi dimensi", "Menganalisis gambar"],
      correct: 0
    },
    {
      id: 41,
      question: "SVM (Support Vector Machine) digunakan untuk ...",
      options: ["Klasifikasi", "Clustering", "Visualisasi", "Pengukuran data"],
      correct: 0
    },
    {
      id: 42,
      question: "Random Forest adalah pengembangan dari ...",
      options: ["Decision Tree", "Linear Regression", "Naive Bayes", "KNN"],
      correct: 0
    },
    {
      id: 43,
      question: "TensorFlow adalah ...",
      options: ["Framework Machine Learning", "Bahasa Pemrograman", "Database", "Alat Visualisasi"],
      correct: 0
    },
    {
      id: 44,
      question: "Keras biasanya digunakan untuk ...",
      options: ["Deep Learning", "Big Data", "Data Cleaning", "Data Nominal"],
      correct: 0
    },
    {
      id: 44,
      question: "Apa komponen utama dalam Deep Learning?",
      options: [
        "Tabel Excel",
        "Diagram alir",
        "Jaringan saraf tiruan (Neural Network)",
        "Algoritma Sorting"
      ],
      correct: 2
    },
    {
      id: 46,
      question: "Matplotlib digunakan untuk ...",
      options: ["Pengolahan data", "Visualisasi data", "Machine Learning", "Database"],
      correct: 1
    },
    {
      id: 47,
      question: "Scikit-learn populer untuk ...",
      options: ["Deep Learning", "Machine Learning tradisional", "Data Visualization", "Big Data"],
      correct: 1
    },
    {
      id: 48,
      question: "SQL biasanya digunakan untuk ...",
      options: ["Mengelola database", "Melatih model", "Visualisasi data", "Data cleaning"],
      correct: 0
    },
    {
      id: 49,
      question: "Cloud Computing bermanfaat untuk ...",
      options: ["Menyimpan dan mengolah data", "Menentukan data nominal", "Menghitung aljabar", "Menjalankan statistik manual"],
      correct: 0
    },
    {
      id: 50,
      question: "Data Science berdampak pada ...",
      options: ["Kesehatan", "Bisnis", "Pendidikan", "Semua benar"],
      correct: 3
    },
    {
      id: 51,
      question: "Apa perbedaan utama antara Machine Learning dan Deep Learning?",
      options: [
        "Deep Learning menggunakan jaringan saraf tiruan berlapis",
        "Machine Learning selalu lebih akurat",
        "Machine Learning hanya dipakai untuk gambar",
        "Deep Learning tidak butuh data besar"
      ],
      correct: 0
    },
    {
      id: 52,
      question: "Mengapa Deep Learning membutuhkan data yang banyak?",
      options: [
        "Supaya database tidak kosong",
        "Agar data tidak hilang", ,
        "Untuk melatih parameter model yang kompleks",
      ],
      correct: 3
    },
    {
      id: 53,
      question: "Lapisan tersembunyi (hidden layer) pada neural network berfungsi untuk ...",
      options: [
        "Menambah data baru",
        "Mengubah input menjadi representasi lebih kompleks",
        "Menyimpan file model",
        "Menghapus data duplikat"
      ],
      correct: 1
    },
    {
      id: 54,
      question: "Apa fungsi aktivasi ReLU dalam neural network?",
      options: [
        "Membatasi output hanya 0 atau 1",
        "Mengubah data menjadi tabel",
        "Meningkatkan kecepatan komputasi dan mengatasi vanishing gradient",
        "Menghapus data kosong"
      ],
      correct: 2
    },
    {
      id: 55,
      question: "Convolutional Neural Network (CNN) biasanya digunakan untuk ...",
      options: [
        "Analisis teks",
        "Pemrosesan gambar",
        "Membuat grafik",
        "Analisis data keuangan"
      ],
      correct: 1
    },
    {
      id: 56,
      question: "Recurrent Neural Network (RNN) cocok digunakan untuk ...",
      options: [
        "Data gambar",
        "Data kategori sederhana",
        "Data tabel kecil",
        "Data urutan seperti teks atau suara",
      ],
      correct: 3
    },
    {
      id: 57,
      question: "Overfitting pada model machine learning berarti ...",
      options: [
        "Model bekerja sangat baik di data latih tetapi buruk di data baru",
        "Model tidak bisa membaca data",
        "Model selalu benar",
        "Model gagal dilatih"
      ],
      correct: 0
    },
    {
      id: 58,
      question: "Dropout dalam neural network digunakan untuk ...",
      options: [
        "Mempercepat loading data",
        "Mengurangi overfitting dengan menonaktifkan sebagian neuron",
        "Membuat data hilang",
        "Menyimpan model"
      ],
      correct: 1
    },
    {
      id: 59,
      question: "Apa keuntungan GPU dalam melatih Deep Learning?",
      options: [
        "Menyimpan lebih banyak data",
        "Mempercepat komputasi paralel untuk matriks besar",
        "Mengurangi ukuran file",
        "Menghapus noise data"
      ],
      correct: 1
    },
    {
      id: 60,
      question: "Transfer Learning dalam Deep Learning adalah ...",
      options: [
        "Menggunakan model yang sudah dilatih untuk tugas baru",
        "Memindahkan data antar komputer",
        "Menghapus model lama",
        "Menyalin data training"
      ],
      correct: 0
    }
  ];


  const [questions, setQuestions] = useState(shuffleArray(originalQuestions));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600);
  const [isStarted, setIsStarted] = useState(false);
  const [questionLimit, setQuestionLimit] = useState(null);

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
  };

  const startQuiz = () => {
    if (!questionLimit) {
      Swal.fire("Pilih jumlah soal dulu!", "", "warning");
      return;
    }
    const shuffled = shuffleArray(originalQuestions).slice(0, questionLimit);
    setQuestions(shuffled);
    setIsStarted(true);
  };

  if (!isStarted) {
    Swal.fire({
      title: 'Selamat Datang',
      text: 'Ini Bukanlah Soal Ujian Asli Dari Dicoding, Ini Hanya Untuk Latihan',
      icon: 'info',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
    })
    return (
      <div className="min-h-screen flex-col bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <Award className="w-20 h-20 text-indigo-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Kuis Latihan Data Science
            </h1>
            <p className="text-gray-600">Pilihan Ganda</p>
          </div>

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
