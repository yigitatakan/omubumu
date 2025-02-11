'use client';

import { useEffect, useState } from 'react';
import { database } from '../../lib/firebase';
import { ref, get, update } from 'firebase/database';
import { Question } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [question, setQuestion] = useState<Question | null>(null);
  const [answered, setAnswered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | null>(null);
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [percentageA, setPercentageA] = useState(50);
  const [percentageB, setPercentageB] = useState(50);
  const [isReversed, setIsReversed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const loadRandomQuestion = async () => {
    setLoading(true);
    try {
      let questions = allQuestions;
      
      if (questions.length === 0) {
        const questionsRef = ref(database, 'questions');
        const snapshot = await get(questionsRef);
        questions = Object.values(snapshot.val() || {});
        setAllQuestions(questions);
      }
      
      if (questions.length === 0) {
        setLoading(false);
        return;
      }

      const unansweredQuestions = questions.filter(
        (q: Question) => !answeredQuestions.includes(q.id)
      );

      let randomQuestion;
      if (unansweredQuestions.length === 0) {
        setAnsweredQuestions([]);
        randomQuestion = questions[Math.floor(Math.random() * questions.length)];
      } else {
        randomQuestion = unansweredQuestions[Math.floor(Math.random() * unansweredQuestions.length)];
      }

      // Seçilen sorunun güncel oy durumunu al
      const questionRef = ref(database, `questions/${randomQuestion.id}`);
      const questionSnapshot = await get(questionRef);
      const updatedQuestion = questionSnapshot.val();
      
      setQuestion(updatedQuestion);
      setAnswered(false);
      setSelectedOption(null);
      setTotalVotes(updatedQuestion.votesA + updatedQuestion.votesB);
      
      // Rastgele pozisyon
      setIsReversed(Math.random() < 0.5);
    } catch (error) {
      console.error('Soru yüklenirken hata oluştu:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    loadRandomQuestion();
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleVote = async (option: 'A' | 'B') => {
    if (!question || answered) return;

    setSelectedOption(option);
    try {
      const questionRef = ref(database, `questions/${question.id}`);
      const updates = {
        [`votesA`]: option === 'A' ? question.votesA + 1 : question.votesA,
        [`votesB`]: option === 'B' ? question.votesB + 1 : question.votesB,
      };

      await update(questionRef, updates);
      setAnswered(true);
      setAnsweredQuestions(prev => [...prev, question.id]);
      setTotalVotes((question.votesA + question.votesB) + 1);

      // Soruları güncelle
      const updatedQuestions = allQuestions.map(q => 
        q.id === question.id 
          ? {...q, 
             votesA: option === 'A' ? q.votesA + 1 : q.votesA,
             votesB: option === 'B' ? q.votesB + 1 : q.votesB
            }
          : q
      );
      setAllQuestions(updatedQuestions);

      setTimeout(() => {
        loadRandomQuestion();
      }, 2000);
    } catch (error) {
      console.error('Oy verilirken hata oluştu:', error);
    }
  };

  const calculatePercentage = (votes: number) => {
    if (!answered) return '50';
    const total = totalVotes || (question?.votesA || 0) + (question?.votesB || 0);
    if (total === 0) return '50';
    return ((votes / total) * 100).toFixed(1);
  };

  useEffect(() => {
    if (answered && question) {
      const pctA = parseFloat(calculatePercentage(question.votesA));
      const pctB = parseFloat(calculatePercentage(question.votesB));
      
      // Minimum %20 - Maximum %80 olacak şekilde ayarla
      let adjustedA = Math.min(Math.max(pctA, 20), 80);
      let adjustedB = Math.min(Math.max(pctB, 20), 80);
      
      // Toplamın %100 olmasını sağla
      const total = adjustedA + adjustedB;
      if (total !== 100) {
        const ratio = 100 / total;
        adjustedA *= ratio;
        adjustedB *= ratio;
      }
      
      setPercentageA(adjustedA);
      setPercentageB(adjustedB);
    } else {
      setPercentageA(50);
      setPercentageB(50);
    }
  }, [answered, question, totalVotes]);

  if (!mounted) {
    return null;
  }

  if (loading || !question) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-gray-900">
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-white text-2xl"
        >
          Yükleniyor...
        </motion.div>
      </div>
    );
  }

  return (
    <main className={`h-screen w-screen ${isMobile ? 'flex flex-col' : 'flex'} overflow-hidden bg-gray-900`}>
      <motion.div 
        className={`${
          isMobile ? 'h-[50vh]' : 'h-full'
        } flex items-center justify-center bg-option-red relative ${
          isMobile ? 'w-full' : isReversed ? 'absolute right-0' : 'absolute left-0'
        } ${
          selectedOption === (isReversed ? 'A' : 'B') ? 'opacity-50' : ''
        } ${
          !answered && 'hover:shadow-lg hover:shadow-red-600/50'
        }`}
        onClick={() => !answered && handleVote(isReversed ? 'B' : 'A')}
        whileHover={!answered ? { scale: 1.01 } : {}}
        initial={isMobile ? { height: '50vh' } : { width: '50%' }}
        animate={{
          ...(isMobile 
            ? { 
                height: answered 
                  ? `${isReversed ? percentageB : percentageA}vh` 
                  : '50vh'
              }
            : {
                width: answered 
                  ? `${isReversed ? percentageB : percentageA}%` 
                  : '50%'
              }
          ),
          transition: { duration: 1, ease: "easeInOut" }
        }}
        style={{ cursor: !answered ? 'pointer' : 'default' }}
      >
        <div className="max-w-2xl px-6 md:px-8 text-center relative h-full flex flex-col items-center justify-center">
          <motion.h2 
            className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {isReversed ? question.optionB : question.optionA}
          </motion.h2>
          <AnimatePresence mode="wait">
            {answered && (
              <motion.div 
                className="w-full text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <motion.p 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1,
                    transition: {
                      scale: {
                        type: "spring",
                        stiffness: 200,
                        damping: 20
                      }
                    }
                  }}
                >
                  <motion.span
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CountUp
                      start={0}
                      end={parseFloat(calculatePercentage(isReversed ? question.votesB : question.votesA))}
                      duration={1}
                      decimals={1}
                    />
                    %
                  </motion.span>
                </motion.p>
                <p className="text-base sm:text-lg md:text-xl mt-2 opacity-90">{isReversed ? question.votesB : question.votesA} oy</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div
        className={`${
          isMobile ? 'h-[50vh]' : 'h-full'
        } flex items-center justify-center bg-option-blue relative ${
          isMobile ? 'w-full' : isReversed ? 'absolute left-0' : 'absolute right-0'
        } ${
          selectedOption === (isReversed ? 'B' : 'A') ? 'opacity-50' : ''
        } ${
          !answered && 'hover:shadow-lg hover:shadow-blue-600/50'
        }`}
        onClick={() => !answered && handleVote(isReversed ? 'A' : 'B')}
        whileHover={!answered ? { scale: 1.01 } : {}}
        initial={isMobile ? { height: '50vh' } : { width: '50%' }}
        animate={{
          ...(isMobile 
            ? { 
                height: answered 
                  ? `${isReversed ? percentageA : percentageB}vh` 
                  : '50vh'
              }
            : {
                width: answered 
                  ? `${isReversed ? percentageA : percentageB}%` 
                  : '50%'
              }
          ),
          transition: { duration: 1, ease: "easeInOut" }
        }}
        style={{ cursor: !answered ? 'pointer' : 'default' }}
      >
        <div className="max-w-2xl px-6 md:px-8 text-center relative h-full flex flex-col items-center justify-center">
          <motion.h2 
            className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {isReversed ? question.optionA : question.optionB}
          </motion.h2>
          <AnimatePresence mode="wait">
            {answered && (
              <motion.div 
                className="w-full text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <motion.p 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1,
                    transition: {
                      scale: {
                        type: "spring",
                        stiffness: 200,
                        damping: 20
                      }
                    }
                  }}
                >
                  <motion.span
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CountUp
                      start={0}
                      end={parseFloat(calculatePercentage(isReversed ? question.votesA : question.votesB))}
                      duration={1}
                      decimals={1}
                    />
                    %
                  </motion.span>
                </motion.p>
                <p className="text-base sm:text-lg md:text-xl mt-2 opacity-90">{isReversed ? question.votesA : question.votesB} oy</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </main>
  );
}
