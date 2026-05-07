/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  ChevronRight, 
  CheckCircle2, 
  Crown, 
  LayoutDashboard, 
  Mail, 
  Menu, 
  X, 
  Play, 
  Search, 
  Star, 
  ShieldCheck, 
  Trophy, 
  User,
  Github,
  Twitter,
  Instagram,
} from 'lucide-react';
import { MATERIALS, QUESTIONS } from './constants';
import { Material, UserStats } from './types';

// --- Utils ---
const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isPremium, setIsPremium] = useState(() => {
    return localStorage.getItem('isPremium') === 'true';
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [userStats, setUserStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('userStats');
    return saved ? JSON.parse(saved) : {
      completedMaterials: [],
      quizScores: [],
      isPremium: false
    };
  });

  useEffect(() => {
    localStorage.setItem('isPremium', isPremium.toString());
    setUserStats(prev => ({ ...prev, isPremium }));
  }, [isPremium]);

  useEffect(() => {
    localStorage.setItem('userStats', JSON.stringify(userStats));
  }, [userStats]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleActivatePremium = () => {
    setIsPremium(true);
    alert('Selamat! Akses Premium Anda telah aktif. Nikmati semua materi dan latihan soal.');
  };

  const handleResetAccount = () => {
    if (confirm('Apakah Anda yakin ingin mereset akun? Semua proges dan status premium akan hilang.')) {
      setIsPremium(false);
      setUserStats({
        completedMaterials: [],
        quizScores: [],
        isPremium: false
      });
      setActiveTab('home');
    }
  };

  const filteredMaterials = useMemo(() => {
    return MATERIALS.filter(m => 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.shortDesc.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const statsPercent = useMemo(() => {
    const materialPercent = (userStats.completedMaterials.length / MATERIALS.length) * 100;
    const avgScore = userStats.quizScores.length > 0 
      ? userStats.quizScores.reduce((a, b) => a + b, 0) / userStats.quizScores.length 
      : 0;
    return { materialPercent, avgScore };
  }, [userStats]);

  return (
    <div className="min-h-screen bg-bg text-text-primary flex flex-col md:flex-row font-sans overflow-hidden">
      {/* Desktop Sidebar */}
      <nav className="hidden md:flex w-64 bg-sidebar border-r border-white/5 flex-col p-6 shrink-0 h-screen sticky top-0 overflow-y-auto">
        <div className="logo text-3xl font-black mb-10 tracking-tighter">MathXI.</div>
        
        <div className="space-y-2 flex-grow">
          {[
            { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'materi', label: 'Materi', icon: BookOpen },
            { id: 'latihan', label: 'Latihan Soal', icon: Play },
            { id: 'premium', label: 'Paket Premium', icon: Crown },
            { id: 'dashboard', label: 'Statistik', icon: Trophy },
            { id: 'kontak', label: 'Kontak', icon: Mail },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all group",
                activeTab === item.id 
                  ? "bg-accent/10 text-accent" 
                  : "text-text-secondary hover:bg-white/5 hover:text-text-primary"
              )}
            >
              <item.icon size={20} className={cn("transition-colors", activeTab === item.id ? "text-accent" : "text-text-secondary group-hover:text-text-primary")} />
              {item.label}
              {activeTab === item.id && (
                <motion.div layoutId="active-pill" className="ml-auto w-1 h-4 bg-accent rounded-full" />
              )}
            </button>
          ))}
        </div>

        <div className="mt-auto pt-6 border-t border-white/5 space-y-4">
          <div className="flex items-center gap-2 p-3 bg-white/5 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
              <User size={16} />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">Student User</p>
              <p className="text-[10px] text-text-secondary truncate uppercase">{isPremium ? 'Premium' : 'Free'}</p>
            </div>
          </div>
          <button 
            onClick={handleResetAccount}
            className="w-full py-2.5 text-xs font-bold text-danger border border-danger/20 rounded-xl hover:bg-danger/10 transition-all"
          >
            Reset Akun
          </button>
        </div>
      </nav>

      {/* Mobile Header */}
      <nav className="md:hidden sticky top-0 z-50 bg-bg/80 backdrop-blur-md border-b border-white/5 p-4 flex justify-between items-center">
        <div className="logo text-2xl font-black tracking-tighter">MathXI.</div>
        <div className="flex items-center gap-2">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-text-primary bg-white/5 rounded-lg">
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed inset-0 z-50 bg-bg p-6 flex flex-col pt-20"
            >
              <button 
                onClick={() => setIsMenuOpen(false)} 
                className="absolute top-6 right-6 p-2 bg-white/5 rounded-lg"
              >
                <X size={20} />
              </button>
              <div className="space-y-4">
                {[
                  { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
                  { id: 'materi', label: 'Materi', icon: BookOpen },
                  { id: 'latihan', label: 'Latihan Soal', icon: Play },
                  { id: 'premium', label: 'Paket Premium', icon: Crown },
                  { id: 'dashboard', label: 'Statistik', icon: Trophy },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id); setIsMenuOpen(false); }}
                    className={cn(
                      "w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-lg",
                      activeTab === item.id ? "bg-accent text-white" : "bg-white/5 text-text-secondary"
                    )}
                  >
                    <item.icon size={24} />
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        <header className="px-6 py-4 border-b border-white/5 flex flex-col sm:flex-row justify-between items-center bg-bg gap-4 shrink-0">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
            <input 
              type="text" 
              placeholder="Cari materi matriks, limit..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full pl-12 pr-6 py-2.5 text-sm outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/5 transition-all"
            />
          </div>
          <div className="flex items-center gap-4">
            {isPremium ? (
              <span className="px-4 py-1.5 bg-premium text-bg text-[10px] font-black rounded-full uppercase tracking-widest shadow-xl shadow-premium/20">Premium User</span>
            ) : (
              <span className="px-4 py-1.5 bg-text-secondary/20 text-text-secondary text-[10px] font-black rounded-full uppercase tracking-widest">Free Tier</span>
            )}
            <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-white/5" />
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'home' && <HomeView key="home" onStart={() => setActiveTab('materi')} />}
            {activeTab === 'materi' && (
              <MaterialsView 
                key="materi" 
                isPremium={isPremium} 
                onUpgrade={() => setActiveTab('premium')}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filteredMaterials={filteredMaterials}
                completedMaterials={userStats.completedMaterials}
                onToggleComplete={(id) => {
                  const completed = [...userStats.completedMaterials];
                  if (completed.includes(id)) {
                    setUserStats(prev => ({ ...prev, completedMaterials: completed.filter(i => i !== id) }));
                  } else {
                    setUserStats(prev => ({ ...prev, completedMaterials: [...completed, id] }));
                  }
                }}
              />
            )}
            {activeTab === 'latihan' && (
              <QuizView 
                key="latihan" 
                isPremium={isPremium} 
                onUpgrade={() => setActiveTab('premium')}
                onFinish={(score) => {
                  setUserStats(prev => ({ ...prev, quizScores: [...prev.quizScores, score] }));
                }}
              />
            )}
            {activeTab === 'premium' && (
              <PremiumView 
                key="premium" 
                isPremium={isPremium} 
                onActivate={handleActivatePremium}
                onReset={handleResetAccount}
              />
            )}
            {activeTab === 'dashboard' && (
              <DashboardView 
                key="dashboard" 
                userStats={userStats} 
                statsPercent={statsPercent}
                onNavigate={(tab) => setActiveTab(tab)}
              />
            )}
            {activeTab === 'kontak' && <ContactView key="kontak" />}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

// --- Views ---

function HomeView({ onStart }: { key?: string; onStart: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-12"
    >
      {/* Hero Section */}
      <section className="bg-linear-to-br from-accent to-purple-600 rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-white/20 transition-all duration-700" />
        
        <div className="relative z-10 space-y-6 max-w-2xl">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-black tracking-tight leading-tight"
          >
            Matematika <br />Kelas 11
          </motion.h1>
          <p className="text-white/80 text-lg md:text-xl font-medium leading-relaxed max-w-md">
            Kuasai konsep sulit dengan video interaktif, rangkuman rumus, dan ribuan latihan soal premium.
          </p>
          <button
            onClick={onStart}
            className="px-10 py-4 bg-white text-bg rounded-2xl font-black shadow-xl hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-wider"
          >
            Mulai Belajar
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Materials Grid (Mini) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black">Topik Utama</h2>
            <button onClick={onStart} className="text-accent text-sm font-bold hover:underline">Lihat Semua</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MATERIALS.slice(0, 4).map((m, idx) => (
              <div key={m.id} className="card-blur p-6 rounded-3xl hover:border-accent/30 transition-all cursor-pointer group">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen size={20} />
                </div>
                <h3 className="font-black text-lg mb-2">{m.title}</h3>
                <p className="text-text-secondary text-sm line-clamp-2">{m.shortDesc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Module (Mock) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="card-blur p-8 rounded-3xl space-y-6">
            <h2 className="text-xl font-black">Progres Belajar</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <p className="text-sm font-bold text-text-secondary">Topik Selesai</p>
                <p className="text-2xl font-black text-accent">4 <span className="text-sm text-text-secondary">/ 12</span></p>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-accent w-[35%] rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center p-4 bg-white/5 rounded-2xl">
                <p className="text-2xl font-black">75</p>
                <p className="text-[8px] font-black text-text-secondary uppercase tracking-widest">Skor Rata-rata</p>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-2xl">
                <p className="text-2xl font-black">12</p>
                <p className="text-[8px] font-black text-text-secondary uppercase tracking-widest">Streak Hari</p>
              </div>
            </div>
          </div>

          <div className="card-blur p-8 rounded-3xl space-y-6">
            <h3 className="text-xs font-black text-text-secondary uppercase tracking-widest">Kuis Harian</h3>
            <p className="font-black text-lg">Berapakah nilai dari sin 30°?</p>
            <div className="space-y-2">
              {['A. 1/2', 'B. 1/2√2', 'C. 1/2√3'].map((opt, i) => (
                <div key={i} className="p-3 bg-white/5 rounded-xl text-sm font-medium border border-transparent hover:border-accent/30 transition-all cursor-pointer">
                  {opt}
                </div>
              ))}
            </div>
            <button className="w-full py-3 bg-accent text-white rounded-xl font-bold shadow-lg shadow-accent/20">Submit Jawaban</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MaterialsView({ 
  isPremium, 
  onUpgrade, 
  searchQuery, 
  setSearchQuery, 
  filteredMaterials,
  completedMaterials,
  onToggleComplete
}: { 
  key?: string;
  isPremium: boolean; 
  onUpgrade: () => void;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  filteredMaterials: Material[];
  completedMaterials: string[];
  onToggleComplete: (id: string) => void;
}) {
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="max-w-7xl mx-auto px-4 py-12 space-y-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Materi Pembelajaran</h1>
          <p className="text-slate-500">Pilih topik yang ingin Anda kuasai hari ini.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Cari materi..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>

      {!isPremium && (
        <div className="p-6 bg-accent/10 border border-accent/20 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center text-accent">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="font-black text-lg">Beberapa materi terkunci</p>
              <p className="text-sm text-text-secondary">Aktifkan Premium untuk membuka semua pembahasan dan rumus eksklusif.</p>
            </div>
          </div>
          <button 
            onClick={onUpgrade}
            className="px-6 py-3 bg-premium text-bg font-black rounded-xl shadow-lg shadow-premium/20 flex items-center gap-2 hover:scale-105 transition-all"
          >
            Buka Akses Lengkap
          </button>
        </div>
      )}

      {selectedMaterial ? (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8 pb-20"
        >
          <button onClick={() => setSelectedMaterial(null)} className="text-accent font-bold flex items-center gap-1 hover:underline">
            &larr; Kembali ke Daftar
          </button>
          
          <div className="card-blur rounded-[32px] overflow-hidden shadow-2xl">
            <div className="p-8 md:p-12 space-y-8">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-4xl md:text-5xl font-black">{selectedMaterial.title}</h2>
                  <button 
                    onClick={() => onToggleComplete(selectedMaterial.id)}
                    className={cn(
                      "p-3 rounded-2xl border transition-all",
                      completedMaterials.includes(selectedMaterial.id) 
                        ? "bg-success/20 border-success/30 text-success" 
                        : "border-white/10 text-text-secondary"
                    )}
                  >
                    <CheckCircle2 size={24} />
                  </button>
                </div>
                <p className="text-xl text-text-secondary leading-relaxed italic border-l-4 border-accent pl-4">"{selectedMaterial.shortDesc}"</p>
              </div>

              <div className="prose prose-invert max-w-none space-y-10">
                <div>
                  <h3 className="text-2xl font-black mb-4">Penjelasan Materi</h3>
                  <p className="text-lg leading-relaxed text-text-secondary">{selectedMaterial.content}</p>
                </div>

                <div className="p-8 bg-accent/5 rounded-3xl border border-accent/10">
                  <h3 className="text-xl font-black mb-4 text-accent">Rumus Penting</h3>
                  <pre className="font-mono bg-bg p-6 rounded-2xl border border-white/5 overflow-x-auto text-xl uppercase tracking-wider text-accent shadow-inner">
                    {selectedMaterial.formula}
                  </pre>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="p-8 bg-white/5 rounded-3xl border border-white/5">
                    <h3 className="text-xl font-black mb-4">Contoh Soal</h3>
                    <p className="text-text-secondary font-medium">{selectedMaterial.example}</p>
                  </div>
                  <div className="p-8 bg-success/5 rounded-3xl border border-success/10">
                    <h3 className="text-xl font-black mb-4 text-success">Pembahasan</h3>
                    <p className="text-text-secondary whitespace-pre-wrap">{selectedMaterial.discussion}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((material, idx) => {
            const isLocked = !isPremium && idx > 2; // Unlock first 3
            const isCompleted = completedMaterials.includes(material.id);
            
            return (
              <motion.div
                key={material.id}
                layout
                whileHover={!isLocked ? { scale: 1.02, y: -5 } : {}}
                className={cn(
                  "relative group card-blur rounded-3xl p-8 flex flex-col justify-between shadow-sm hover:shadow-2xl transition-all overflow-hidden",
                  isLocked && "opacity-60 cursor-not-allowed"
                )}
                onClick={() => {
                  if (isLocked) onUpgrade();
                  else setSelectedMaterial(material);
                }}
              >
                {isLocked && (
                  <div className="absolute inset-0 bg-bg/80 backdrop-blur-md flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-2 text-bg font-black text-xs bg-premium px-6 py-3 rounded-full shadow-xl shadow-premium/20">
                      <Crown size={16} /> BUKA PREMIUM
                    </div>
                  </div>
                )}
                
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center",
                      isCompleted ? "bg-success/10 text-success" : "bg-accent/10 text-accent"
                    )}>
                      {isCompleted ? <CheckCircle2 size={24} /> : <BookOpen size={24} />}
                    </div>
                    {isLocked && <Crown className="text-premium" size={20} />}
                  </div>
                  <div>
                    <h3 className="text-xl font-black group-hover:text-accent transition-colors leading-tight">{material.title}</h3>
                    <p className="text-sm text-text-secondary line-clamp-2 mt-3 leading-relaxed">{material.shortDesc}</p>
                  </div>
                </div>
                
                <div className="mt-10 flex items-center justify-between">
                  <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Bab {idx + 1}</span>
                  <div className="flex items-center gap-1 text-sm font-black text-accent group-hover:gap-2 transition-all">
                    PELAJARI <ChevronRight size={16} />
                  </div>
                </div>

                {isCompleted && (
                  <div className="absolute -top-10 -right-10 w-20 h-20 bg-success/20 blur-2xl rounded-full" />
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}

function QuizView({ isPremium, onUpgrade, onFinish }: { key?: string; isPremium: boolean; onUpgrade: () => void; onFinish: (s: number) => void }) {
  const [quizState, setQuizState] = useState<'intro' | 'active' | 'result'>('intro');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const startQuiz = () => {
    if (!isPremium) {
      onUpgrade();
      return;
    }
    setQuizState('active');
    setCurrentIdx(0);
    setScore(0);
  };

  const handleNext = () => {
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null);
      setShowAnswer(false);
    } else {
      setQuizState('result');
      onFinish(score);
    }
  };

  const handleSelect = (idx: number) => {
    if (showAnswer) return;
    setSelectedOption(idx);
    setShowAnswer(true);
    if (idx === QUESTIONS[currentIdx].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      {quizState === 'intro' && (
        <div className="text-center space-y-10 py-12">
          <div className="w-24 h-24 bg-accent rounded-[32px] mx-auto flex items-center justify-center text-white shadow-2xl rotate-6 group">
            <Trophy size={48} className="group-hover:scale-110 transition-transform" />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-black">Latihan Soal Interaktif</h1>
            <p className="text-text-secondary max-w-lg mx-auto leading-relaxed text-lg">
              Uji pemahamanmu dengan 10 soal pilihan ganda yang mencakup seluruh materi kelas 11. Dapatkan skor terbaik dan buka lencana prestasimu!
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto py-8">
            {[
              { label: 'Jumlah Soal', val: '10' },
              { label: 'Waktu', val: 'Tanpa Batas' },
              { label: 'Tingkat', val: 'HOTS' },
              { label: 'Format', val: 'Interaktif' }
            ].map((i, idx) => (
              <div key={idx} className="card-blur p-6 rounded-3xl border border-white/5">
                <p className="text-[10px] text-text-secondary font-black uppercase tracking-widest mb-1">{i.label}</p>
                <p className="font-black text-xl">{i.val}</p>
              </div>
            ))}
          </div>
          <button 
            onClick={startQuiz}
            className="px-12 py-5 bg-accent hover:bg-accent-hover text-white rounded-[24px] font-black shadow-xl shadow-accent/20 flex items-center gap-3 mx-auto transition-all active:scale-95 text-lg"
          >
            Mulai Sekarang <Play size={20} />
          </button>
        </div>
      )}

      {quizState === 'active' && (
        <div className="space-y-8">
          <div className="flex justify-between items-center card-blur p-6 rounded-3xl border border-white/5 shadow-sm">
            <div className="flex items-center gap-3 font-black text-lg">
              <span className="text-accent">Soal {currentIdx + 1}</span>
              <span className="text-white/10">/</span>
              <span className="text-text-secondary">{QUESTIONS.length}</span>
            </div>
            <div className="w-48 h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-accent"
                initial={{ width: 0 }}
                animate={{ width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="card-blur p-10 rounded-[40px] border border-white/5 shadow-2xl space-y-10">
            <h2 className="text-2xl md:text-3xl font-black leading-tight text-center md:text-left">{QUESTIONS[currentIdx].question}</h2>
            
            <div className="grid grid-cols-1 gap-4">
              {QUESTIONS[currentIdx].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={showAnswer}
                  className={cn(
                    "w-full p-6 text-left rounded-[24px] border-2 transition-all font-bold text-lg flex justify-between items-center",
                    !showAnswer && "bg-white/5 hover:bg-white/10 border-transparent hover:border-accent/30",
                    showAnswer && idx === QUESTIONS[currentIdx].correctAnswer && "bg-success/10 border-success text-success",
                    showAnswer && selectedOption === idx && idx !== QUESTIONS[currentIdx].correctAnswer && "bg-danger/10 border-danger text-danger",
                    showAnswer && selectedOption !== idx && idx !== QUESTIONS[currentIdx].correctAnswer && "border-white/5 opacity-40"
                  )}
                >
                  {option}
                  {showAnswer && idx === QUESTIONS[currentIdx].correctAnswer && <CheckCircle2 size={24} />}
                  {showAnswer && selectedOption === idx && idx !== QUESTIONS[currentIdx].correctAnswer && <X size={24} />}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleNext}
              disabled={!showAnswer}
              className={cn(
                "px-10 py-4 rounded-2xl font-black flex items-center gap-2 transition-all text-sm uppercase tracking-widest",
                showAnswer ? "bg-accent text-white shadow-xl shadow-accent/20" : "bg-white/5 text-text-secondary cursor-not-allowed"
              )}
            >
              {currentIdx === QUESTIONS.length - 1 ? 'Selesai & Lihat Skor' : 'Selanjutnya'} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {quizState === 'result' && (
        <div className="text-center space-y-12 py-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-48 h-48 bg-accent rounded-full mx-auto flex items-center justify-center text-white text-6xl font-black shadow-[0_0_50px_rgba(139,92,246,0.3)] relative group"
          >
            {score * 10}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 border-4 border-dashed border-white/20 rounded-full"
            />
          </motion.div>
          <div className="space-y-4">
            <h2 className="text-4xl font-black">Luar Biasa!</h2>
            <p className="text-text-secondary text-xl font-medium">Anda menjawab {score} dari {QUESTIONS.length} pertanyaan dengan benar.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setQuizState('intro')}
              className="px-10 py-4 bg-accent text-white rounded-2xl font-black shadow-xl shadow-accent/20"
            >
              Ulangi Latihan
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="px-10 py-4 card-blur border border-white/5 rounded-2xl font-black text-white/70"
            >
              Beranda
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}

function PremiumView({ isPremium, onActivate, onReset }: { key?: string; isPremium: boolean; onActivate: () => void; onReset: () => void }) {
  const plans = [
    { name: 'Mingguan', price: 'Rp 25k', period: '/minggu', features: ['Akses Semua Materi', 'Latihan Soal Interaktif', 'Bantuan Tutor Dasar'], color: 'bg-blue-500' },
    { name: 'Bulanan', price: 'Rp 75k', period: '/bulan', features: ['Akses Semua Materi', 'Latihan Soal Interaktif', 'Bantuan Tutor 24/7', 'Bank Soal Eksklusif'], color: 'bg-accent', popular: true },
    { name: 'Tahunan', price: 'Rp 250k', period: '/tahun', features: ['Akses Semua Materi', 'Latihan Soal Interaktif', 'Bantuan Tutor 24/7', 'Video Pembahasan', 'Grup Diskusi VIP'], color: 'bg-success' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 py-12 space-y-20"
    >
      <div className="text-center space-y-6">
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">Investasi Terbaik Untuk <br /><span className="gradient-text">Masa Depanmu</span></h1>
        <p className="text-text-secondary max-w-2xl mx-auto text-lg font-medium leading-relaxed">Buka semua fitur premium dan jadilah juara matematika di kelasmu.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, idx) => (
          <motion.div
            key={idx}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            className={cn(
              "relative card-blur border-2 rounded-[40px] p-10 flex flex-col justify-between shadow-2xl transition-all hover:scale-105",
              plan.popular ? "border-premium ring-4 ring-premium/10" : "border-white/5"
            )}
          >
            {plan.popular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-2 bg-premium text-bg text-[10px] font-black rounded-full uppercase tracking-widest shadow-xl shadow-premium/20">
                Terpopuler
              </div>
            )}
            <div>
              <p className="text-sm font-black text-text-secondary uppercase tracking-widest mb-6">{plan.name}</p>
              <div className="flex items-baseline gap-1 mb-10">
                <span className="text-5xl font-black">{plan.price}</span>
                <span className="text-text-secondary font-bold">{plan.period}</span>
              </div>
              <ul className="space-y-6">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-4 text-text-primary font-medium">
                    <CheckCircle2 size={20} className="text-accent shrink-0" />
                    <span className="text-sm leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <button
              onClick={onActivate}
              disabled={isPremium}
              className={cn(
                "mt-12 w-full py-5 rounded-[24px] font-black transition-all active:scale-95 text-sm uppercase tracking-widest",
                isPremium ? "bg-white/5 text-text-secondary cursor-not-allowed" : cn("text-white shadow-xl", plan.color)
              )}
            >
              {isPremium ? 'AKUN PREMIUM AKTIF' : 'PILIH PAKET'}
            </button>
          </motion.div>
        ))}
      </div>

      <div className="bg-accent rounded-[40px] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden relative group">
        <div className="absolute -top-1/2 -left-1/4 w-full h-full bg-white/20 blur-3xl rounded-full transition-transform group-hover:scale-110 duration-700" />
        
        <div className="relative z-10 space-y-4 max-w-xl">
          <h2 className="text-4xl font-black leading-tight">Punya Akun Simulasi?</h2>
          <p className="text-white/80 text-lg font-medium">Anda dapat mengatur ulang status akun Anda untuk mencoba pengalaman dari awal.</p>
        </div>
        <div className="relative z-10">
          <button 
            onClick={onReset}
            className="px-10 py-5 bg-white text-bg rounded-[24px] font-black shadow-2xl transition-all hover:bg-white/90 uppercase tracking-widest text-sm"
          >
            Reset Akun
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function DashboardView({ 
  userStats, 
  statsPercent,
  onNavigate 
}: { 
  key?: string;
  userStats: UserStats; 
  statsPercent: { materialPercent: number; avgScore: number };
  onNavigate: (t: string) => void;
}) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 py-8 space-y-12"
    >
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-accent p-1 rounded-full ring-4 ring-accent/10">
              <div className="w-full h-full bg-bg rounded-full flex items-center justify-center overflow-hidden">
                <User size={40} className="text-text-secondary" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tight leading-tight">Halo, Pelajar Hebat!</h1>
              <p className="text-text-secondary text-lg font-medium">Semangat belajarmu adalah kunci kesuksesan.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className={cn(
              "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border",
              userStats.isPremium 
                ? "bg-premium/10 border-premium text-premium" 
                : "bg-white/5 border-white/10 text-white/50"
            )}>
              STATUS: {userStats.isPremium ? 'PREMIUM USER' : 'FREE USER'}
            </span>
            <span className="px-4 py-2 bg-success/10 border border-success text-success rounded-xl text-[10px] font-black uppercase tracking-widest">
              LEVEL: {userStats.completedMaterials.length > 5 ? 'MASTER' : 'PELAJAR'}
            </span>
          </div>
        </div>
        
        <div className="w-full lg:w-auto p-8 card-blur rounded-[32px] border border-white/5 flex flex-col sm:flex-row items-center gap-10 shadow-2xl">
          <div className="text-center px-6">
            <p className="text-[10px] text-text-secondary font-black uppercase tracking-widest mb-2">Materi Selesai</p>
            <p className="text-4xl font-black">{userStats.completedMaterials.length}</p>
          </div>
          <div className="hidden sm:block w-px h-12 bg-white/5" />
          <div className="text-center px-6">
            <p className="text-[10px] text-text-secondary font-black uppercase tracking-widest mb-2">Total Quiz</p>
            <p className="text-4xl font-black">{userStats.quizScores.length}</p>
          </div>
          <div className="hidden sm:block w-px h-12 bg-white/5" />
          <div className="text-center px-6">
            <p className="text-[10px] text-text-secondary font-black uppercase tracking-widest mb-2">Skor Rata-rata</p>
            <p className="text-4xl font-black text-accent">{(statsPercent.avgScore * 10).toFixed(0)}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card-blur rounded-[40px] p-10 border border-white/5 space-y-10">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black flex items-center gap-3">
              <LayoutDashboard size={28} className="text-accent" />
              Progres Materi
            </h3>
            <button onClick={() => onNavigate('materi')} className="text-sm font-black text-accent uppercase tracking-widest hover:underline">Detail</button>
          </div>
          <div className="space-y-6">
            <div className="flex justify-between text-lg font-black italic">
              <span className="text-text-secondary">Keseluruhan Bab</span>
              <span className="text-accent">{statsPercent.materialPercent.toFixed(0)}%</span>
            </div>
            <div className="h-4 bg-white/5 rounded-full overflow-hidden p-1 shadow-inner">
              <motion.div 
                className="h-full bg-linear-to-r from-accent to-pink-500 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                initial={{ width: 0 }}
                animate={{ width: `${statsPercent.materialPercent}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
            <p className="text-sm text-text-secondary font-medium">{userStats.completedMaterials.length} dari {MATERIALS.length} materi telah dipelajari.</p>
          </div>
        </div>

        <div className="card-blur rounded-[40px] p-10 border border-white/5 space-y-10">
          <h3 className="text-2xl font-black flex items-center gap-3">
            <Trophy size={28} className="text-premium" />
            Riwayat Skor
          </h3>
          <div className="space-y-4">
            {userStats.quizScores.length > 0 ? (
              userStats.quizScores.slice(-4).reverse().map((score, i) => (
                <div key={i} className="flex justify-between items-center p-5 rounded-[24px] bg-white/5 border border-white/5 group hover:bg-white/10 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-accent/10 flex items-center justify-center text-accent font-black text-xs">
                      #{userStats.quizScores.length - i}
                    </div>
                    <span className="font-bold text-lg">Quiz Matematika</span>
                  </div>
                  <span className="font-black text-xl text-accent">{score * 10}<span className="text-xs text-text-secondary">/100</span></span>
                </div>
              ))
            ) : (
              <div className="text-center py-10 opacity-50">
                <p className="text-text-secondary text-lg">Belum ada riwayat quiz.</p>
                <button onClick={() => onNavigate('latihan')} className="text-accent font-black text-sm mt-4 uppercase tracking-widest hover:underline">Mulai Sekarang</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ContactView() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto px-4 py-12"
    >
      <div className="card-blur rounded-[48px] border border-white/5 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row min-h-[600px]">
        <div className="lg:w-[40%] bg-accent p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 space-y-8">
            <h2 className="text-5xl font-black tracking-tight leading-tight">Berikan <br />Masukan.</h2>
            <p className="text-white/80 text-xl font-medium leading-relaxed">Ada pertanyaan atau butuh bantuan premium? Kami siap membantu mempercepat belajarmu.</p>
          </div>
          
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all">
                <Mail size={24} />
              </div>
              <span className="text-lg font-bold">support@mathxi.com</span>
            </div>
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all">
                <Instagram size={24} />
              </div>
              <span className="text-lg font-bold">@mathxi_official</span>
            </div>
          </div>
        </div>
        
        <div className="flex-1 p-12 lg:p-16 space-y-10 bg-white/2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-xs font-black text-text-secondary uppercase tracking-widest pl-2">Nama Lengkap</label>
              <input type="text" className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/5 transition-all font-medium" placeholder="John Doe" />
            </div>
            <div className="space-y-3">
              <label className="text-xs font-black text-text-secondary uppercase tracking-widest pl-2">Email</label>
              <input type="email" className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/5 transition-all font-medium" placeholder="john@example.com" />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-xs font-black text-text-secondary uppercase tracking-widest pl-2">Pesan</label>
            <textarea rows={5} className="w-full p-5 rounded-3xl bg-white/5 border border-white/10 outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/5 transition-all font-medium resize-none" placeholder="Apa yang bisa kami bantu?"></textarea>
          </div>
          <button className="w-full py-5 bg-accent hover:bg-accent-hover text-white rounded-[24px] font-black shadow-2xl shadow-accent/30 transition-all active:scale-95 uppercase tracking-widest text-sm">
            Kirim Pesan Sekarang
          </button>
        </div>
      </div>
    </motion.div>
  );
}
