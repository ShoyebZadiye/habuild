"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  {
    id: "goal",
    question: "Tumhe yoga se kya chahiye?",
    emoji: "🎯",
    motiveLine: "Iske hisaab se hum tumhara sahi batch recommend karenge!",
    options: [
      { label: "Back & body pain theek karna 🌿", value: "pain" },
      { label: "Stress & anxiety kam karna 😮‍💨", value: "stress" },
      { label: "Energy badhani / neend sudhaarni 🌙", value: "energy" },
      { label: "Weight loss karna ⚡", value: "weight" },
    ],
  },
  {
    id: "time",
    question: "Roz kitna time de sakte ho?",
    emoji: "⏱️",
    motiveLine: "Sirf 5 min bhi kaafi hai shuru karne ke liye!",
    options: [
      { label: "Sirf 5 minutes", value: "5min" },
      { label: "10–15 minutes", value: "15min" },
      { label: "20–30 minutes", value: "30min" },
      { label: "30+ minutes", value: "30plus" },
    ],
  },
  {
    id: "when",
    question: "Kab practice karna prefer karoge?",
    emoji: "🌅",
    motiveLine: "Consistency time se zyada important hai!",
    options: [
      { label: "Subah — morning flow 🌅", value: "morning" },
      { label: "Shaam — wind down 🌙", value: "evening" },
      { label: "Kabhi bhi, flexible hoon ✨", value: "anytime" },
    ],
  },
  {
    id: "level",
    question: "Yoga ka experience kitna hai?",
    emoji: "🌱",
    motiveLine: "Beginner ho ya expert — challenge mein sab ka swagat hai!",
    options: [
      { label: "Bilkul naya hoon 🌱", value: "beginner" },
      { label: "Kuch baar try kiya hai", value: "novice" },
      { label: "Kabhi kabhi karta/karti hoon", value: "intermediate" },
      { label: "Regular practitioner hoon 🔥", value: "advanced" },
    ],
  },
];

const progressLabels = [
  "Chaliye shuru karte hain! 🙌",
  "Badiya choice! Aage badhte hain 💪",
  "Aap amazing kar rahe ho! 🔥",
  "Last question! Almost done ⭐",
];

export default function QuizPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [direction, setDirection] = useState(1);
  const [selected, setSelected] = useState<string | null>(null);

  const current = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleSelect = (value: string) => {
    if (selected) return;
    setSelected(value);
    const newAnswers = { ...answers, [current.id]: value };
    setAnswers(newAnswers);

    setTimeout(() => {
      setSelected(null);
      if (currentIndex < questions.length - 1) {
        setDirection(1);
        setCurrentIndex((i) => i + 1);
      } else {
        const params = new URLSearchParams(newAnswers).toString();
        router.push(`/plan?${params}`);
      }
    }, 380);
  };

  return (
    <main className="min-h-screen flex flex-col px-5 py-8 max-w-md mx-auto">

      {/* Progress */}
      <div className="flex flex-col gap-2 mb-7">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[var(--accent)] font-semibold">{progressLabels[currentIndex]}</span>
          <span className="text-xs text-[var(--muted)]">{currentIndex + 1} / {questions.length}</span>
        </div>
        <div className="w-full bg-[var(--card)] rounded-full h-2">
          <motion.div
            className="h-2 rounded-full bg-[var(--accent)]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          initial={{ opacity: 0, x: direction * 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -60 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-6 flex-1"
        >
          <div className="flex flex-col gap-2">
            <span className="text-5xl">{current.emoji}</span>
            <h2 className="text-2xl font-black leading-snug">{current.question}</h2>
            <p className="text-xs text-[var(--muted)]">{current.motiveLine}</p>
          </div>

          <div className="flex flex-col gap-3 mt-2">
            {current.options.map((opt) => {
              const isSelected = selected === opt.value;
              return (
                <motion.button
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  animate={isSelected ? { scale: [1, 0.97, 1.02, 1] } : {}}
                  transition={{ duration: 0.3 }}
                  className={`w-full text-left rounded-2xl px-5 py-4 text-base font-medium transition-colors cursor-pointer flex items-center justify-between gap-3
                    ${isSelected
                      ? "bg-[var(--accent)] border border-[var(--accent)] text-black"
                      : "bg-[var(--card)] border border-[var(--border)] hover:border-[var(--accent)] active:scale-[0.98]"
                    }`}
                >
                  <span>{opt.label}</span>
                  {isSelected && (
                    <motion.span
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="text-black font-black text-xl shrink-0"
                    >
                      ✓
                    </motion.span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
