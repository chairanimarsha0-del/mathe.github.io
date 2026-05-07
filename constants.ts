import { Material, Question } from './types';

export const MATERIALS: Material[] = [
  {
    id: 'program-linear',
    title: 'Program Linear',
    shortDesc: 'Metode optimasi untuk menyelesaikan masalah pertidaksamaan linear.',
    content: 'Program linear adalah teknik matematika yang digunakan untuk mendapatkan hasil terbaik (seperti keuntungan maksimum atau biaya minimum) dalam model matematika yang persyaratannya diwakili oleh hubungan linear.',
    formula: 'f(x, y) = ax + by (Fungsi Objektif)\nAx + By ≤ C (Kendala)',
    example: 'Tentukan nilai maksimum f(x, y) = 3x + 4y pada daerah 2x + y ≤ 8, x + 2y ≤ 10, x ≥ 0, y ≥ 0.',
    discussion: 'Titik potong: (0, 5), (4, 0), (2, 4). Masukkan ke f(x, y):\n(0, 5) -> 20\n(4, 0) -> 12\n(2, 4) -> 6 + 16 = 22 (Maksimum)'
  },
  {
    id: 'matriks',
    title: 'Matriks',
    shortDesc: 'Susunan bilangan dalam baris dan kolom.',
    content: 'Matriks adalah susunan skalar dalam baris dan kolom. Digunakan untuk menyelesaikan sistem persamaan linear.',
    formula: 'A + B (Penjumlahan)\nA x B (Perkalian)\ndet(A) = ad - bc (Determinan 2x2)',
    example: 'Jika A = [[1, 2], [3, 4]] dan B = [[5, 6], [7, 8]], tentukan A + B.',
    discussion: 'A + B = [[1+5, 2+6], [3+7, 4+8]] = [[6, 8], [10, 12]]'
  },
  {
    id: 'barisan-deret',
    title: 'Barisan dan Deret',
    shortDesc: 'Pola bilangan aritmatika dan geometri.',
    content: 'Barisan adalah urutan bilangan dengan pola tertentu. Deret adalah jumlah dari suku-suku barisan tersebut.',
    formula: 'Un = a + (n-1)d (Aritmatika)\nSn = n/2(a + Un)',
    example: 'Tentukan suku ke-10 dari barisan 2, 5, 8, ...',
    discussion: 'a = 2, d = 3. U10 = 2 + (10-1)3 = 2 + 27 = 29'
  },
  {
    id: 'peluang',
    title: 'Peluang',
    shortDesc: 'Studi tentang kemungkinan terjadinya suatu peristiwa.',
    content: 'Peluang mengukur seberapa mungkin suatu kejadian terjadi dalam ruang sampel.',
    formula: 'P(A) = n(A) / n(S)\n0 ≤ P(A) ≤ 1',
    example: 'Peluang muncul angka genap pada pelemparan satu dadu.',
    discussion: 'S = {1, 2, 3, 4, 5, 6}, n(S) = 6. A = {2, 4, 6}, n(A) = 3. P(A) = 3/6 = 0.5'
  },
  {
    id: 'statistik',
    title: 'Statistik',
    shortDesc: 'Pengumpulan, analisis, dan interpretasi data numerik.',
    content: 'Statistik membantu kita memahami kumpulan data melalui ukuran pemusatan (mean, median, modus) dan penyebaran.',
    formula: 'Mean = Σx / n\nMedian = Nilai Tengah',
    example: 'Data: 5, 7, 8, 5, 10. Hitung mean.',
    discussion: 'Mean = (5+7+8+5+10) / 5 = 35 / 5 = 7'
  },
  {
    id: 'trigonometri',
    title: 'Trigonometri',
    shortDesc: 'Hubungan antara sudut dan sisi segitiga.',
    content: 'Trigonometri kelas 11 fokus pada rumus jumlah dan selisih sudut serta identitas trigonometri.',
    formula: 'sin(A + B) = sin A cos B + cos A sin B\ncos(A + B) = cos A cos B - sin A sin B',
    example: 'Hitung nilai sin 75°.',
    discussion: 'sin 75° = sin(45° + 30°) = sin 45 cos 30 + cos 45 sin 30 = (1/2√2)(1/2√3) + (1/2√2)(1/2) = (√6 + √2)/4'
  },
  {
    id: 'transformasi-geometri',
    title: 'Transformasi Geometri',
    shortDesc: 'Perubahan posisi atau bentuk objek geometri.',
    content: 'Meliputi translasi (pergeseran), refleksi (pencerminan), rotasi (perputaran), dan dilatasi (perkalian).',
    formula: 'T(a, b): (x, y) -> (x+a, y+b)',
    example: 'Titik A(2, 3) ditranslasi oleh T(1, -2).',
    discussion: 'A\' = (2+1, 3-2) = (3, 1)'
  },
  {
    id: 'limit-fungsi',
    title: 'Limit Fungsi',
    shortDesc: 'Nilai yang didekati oleh suatu fungsi.',
    content: 'Limit menjelaskan perilaku fungsi saat variabel mendekati suatu nilai tertentu.',
    formula: 'lim x→a f(x) = L',
    example: 'lim x→2 (x² - 4) / (x - 2)',
    discussion: 'Faktorkan: (x-2)(x+2)/(x-2) = x+2. Substitusi x=2: 2+2 = 4'
  },
  {
    id: 'turunan-fungsi',
    title: 'Turunan Fungsi',
    shortDesc: 'Laju perubahan nilai fungsi.',
    content: 'Turunan atau derivatif adalah pengukuran bagaimana fungsi berubah seiring perubahan nilai input.',
    formula: 'f(x) = xⁿ -> f\'(x) = nxⁿ⁻¹',
    example: 'Tentukan turunan dari f(x) = 3x² + 5x - 2',
    discussion: 'f\'(x) = 2(3)x¹ + 1(5)x⁰ = 6x + 5'
  },
  {
    id: 'integral',
    title: 'Integral',
    shortDesc: 'Antiturunan atau luas di bawah kurva.',
    content: 'Integral adalah kebalikan dari turunan. Digunakan untuk menghitung luas daerah dan volume benda putar.',
    formula: '∫ xⁿ dx = (1/n+1)xⁿ⁺¹ + C',
    example: 'Hitung ∫ (2x + 3) dx.',
    discussion: '∫ 2x dx + ∫ 3 dx = x² + 3x + C'
  }
];

export const QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'Berapakah hasil dari 2x + 3 = 11?',
    options: ['3', '4', '5', '6'],
    correctAnswer: 1
  },
  {
    id: 2,
    question: 'Manakah yang merupakan rumus suku ke-n barisan aritmatika?',
    options: ['Un = a + nd', 'Un = arⁿ⁻¹', 'Un = a + (n-1)d', 'Sn = n/2(a + Un)'],
    correctAnswer: 2
  },
  {
    id: 3,
    question: 'Berapakah nilai dari sin 90°?',
    options: ['0', '0.5', '1/2√2', '1'],
    correctAnswer: 3
  },
  {
    id: 4,
    question: 'Turunan pertama dari f(x) = x³ adalah...',
    options: ['3x²', '2x³', '3x', 'x²'],
    correctAnswer: 0
  },
  {
    id: 5,
    question: 'Determinan matriks [[2, 1], [4, 3]] adalah...',
    options: ['2', '10', '1', '6'],
    correctAnswer: 0
  },
  {
    id: 6,
    question: 'Hasil dari ∫ 2x dx adalah...',
    options: ['x² + C', '2x² + C', 'x + C', '2 + C'],
    correctAnswer: 0
  },
  {
    id: 7,
    question: 'Jika peluang kejadian A adalah 0.3, maka peluang kejadian bukan A adalah...',
    options: ['0.3', '0.7', '1', '0'],
    correctAnswer: 1
  },
  {
    id: 8,
    question: 'Limit x mendekati 3 dari (x + 5) adalah...',
    options: ['3', '5', '8', '15'],
    correctAnswer: 2
  },
  {
    id: 9,
    question: 'Suku pertama barisan geometri 2, 6, 18, ... adalah...',
    options: ['2', '3', '6', '1'],
    correctAnswer: 0
  },
  {
    id: 10,
    question: 'Mean dari data 2, 4, 6, 8 adalah...',
    options: ['4', '5', '6', '10'],
    correctAnswer: 1
  }
];
