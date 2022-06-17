import question from './question';
import answer from './answer';
export default {
  analysis(arr) {
    let questionSummary = question.getSentence(arr)
    let answerSentence=answer.answerQuestion(questionSummary)
    return answerSentence;
  },
}