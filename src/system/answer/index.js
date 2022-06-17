import answers from "./answers"
export default {
  answerQuestion(answer) {
    console.log(answer);
    if (answer) {
      return answers[0] + answer;
    } else {
      return answers[1]
    }
  }
}