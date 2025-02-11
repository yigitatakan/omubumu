export interface Question {
  id: number;
  optionA: string;
  optionB: string;
  votesA: number;
  votesB: number;
}

export interface QuestionState {
  currentQuestion: Question | null;
  answered: boolean;
  loading: boolean;
}
