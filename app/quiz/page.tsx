"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  {
    id: "goal",
    question: "What's your biggest struggle right now?",
    emoji: "🎯",
    options: [
      { label: "Back & body pain", value: "pain" },
      { label: "Stress & anxiety", value: "stress" },
      { label: "Low energy / bad sleep", value: "energy" },
      { label: "Want to lose weight", value: "weight" },
    ],
  },
  {
    id: "time",
    question: "How much time can you spare daily?",
    emoji: "⏱️",
    options: [
      { label: "Just 5 minutes", value: "5min" },
      { label: "10–15 minutes", value: "15min" },
      { label: "20–30 minutes", value: "30min" },
      { label: "30+ minutes", value: "30plus" },
    ],
  },
  {
    id: "when",
    question: "When do you prefer to practice?",
    emoji: "🌅",
    options: [
      { label: "Morning (rise & shine)", value: "morning" },
      { label: "Afternoon (lunch break)", value: "afternoon" },
      { label: "Evening (wind down)", value: "evening" },
      { label: "Anytime, I'm flexible", value: "anytime" },
    ],
  },
  {
    id: "level",
    question: "What's your experience with yoga?",
    emoji: "🌱",
    options: [
      { label: "Complete beginner", value: "beginner" },
      { label: "Tried it a few times", value: "novice" },
      { label: "Practice occasionally", value: "intermediate" },
      { label: "Regular practitioner", value: "advanced" },
    ],
  },
];

export default function QuizPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [direction, setDirection] = useState(1);

  const current = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  const handleSelect = (value: string) => {
    const newAnswers = { ...answers, [current.id]: value };
    setAnswers(newAnswers);

    if (currentIndex < questions.length - 1) {
      setDirection(1);
      setTimeout(() => setCurrentIndex((i) => i + 1), 200);
    } else {
      const params = new URLSearchParams(newAnswers).toString();
      router.push(`/plan?${params}`);
    }
  };

  return (
    <main className="min-h-screen flex flex-col px-5 py-8 max-w-md mx-auto">
      {/* Progress bar */}
      <div className="w-full bg-[var(--card)] rounded-full h-1.5 mb-8">
        <motion.div
          className="h-1.5 rounded-full bg-[var(--accent)]"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <p className="text-xs text-[var(--muted)] uppercase tracking-widest mb-8">
        Question {currentIndex + 1} of {questions.length}
      </p>

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
          </div>

          <div className="flex flex-col gap-3 mt-2">
            {current.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className="w-full text-left bg-[var(--card)] border border-[var(--border)] rounded-2xl px-5 py-4 text-base font-medium transition-all hover:border-[var(--accent)] hover:bg-[#1f1410] active:scale-[0.98] cursor-pointer"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
