var React = require('react');
var $ = require('jquery'); // We will need it later to get the quiz JSON
var Quiz = React.createClass({
});
module.exports = Quiz;

getInitialState: function(){
  return {
    quiz: {},
    user_answers: [],
    step: 0
  }
},

componentDidMount: function(quizId){
  $.getJSON("./assets/quiz.json", function(result) {
    this.setState({quiz: result});
  }.bind(this))
},

nextStep: function(){
  this.setState({step: (this.state.step + 1)});
},

setAnswer: function(event){
  this.state.user_answers[this.state.step] = this.state.user_answers[this.state.step] || [];
  this.state.user_answers[this.state.step][parseInt(event.target.value)] = event.target.checked;
},

isAnswerRight: function(index){
  var result = true;
 
  Object.keys(this.state.quiz.questions[index].answers).map(function(value, answer_index){
    var answer = this.state.quiz.questions[index].answers[value]
    if (!this.state.user_answers[index] || (answer.is_right != (this.state.user_answers[index][value] || false))) {
      result = false;
    }
  }.bind(this));
  return result;
},

computeScore: function(){
  var score = 0
  Object.keys(this.state.quiz.questions).map(function(value, index){
    if (this.isAnswerRight(index)) {
      score = score + 1;
    }
  }.bind(this));
  return score;
},

render: function(){
  if (!this.state.quiz.questions) {return <div></div>}
  return (
    <div>
      <h1>{this.state.quiz.title}</h1>
      {(this.state.step < this.state.quiz.questions.length
        ? (<Question
            id={this.state.step}
            data={this.state.quiz.questions[this.state.step]}
            validateAnswers={this.nextStep}
             setAnswer={this.setAnswer}/>)
        : (<div>{this.renderResult()}</div>)
      )}
    </div>
  )
}

var React = require('react');
var Question = React.createClass({
  propTypes: {
    setAnswer: React.PropTypes.func,
    validateAnswers: React.PropTypes.func,
    data: React.PropTypes.obj
  },

  render: function(){
    var answersNodes = Object.keys(this.props.data.answers).map(function(value, index){
      return (
        <div>
          <input
            id={"answer-input-" + index}
            type="checkbox"
            value={value}
            onChange={this.props.setAnswer}
            defaultChecked={false}/>
          <label htmlFor={"answer-input-" + index}>
            {(parseInt(index) + 1) + ": " + this.props.data.answers[index].value}
          </label>
        </div>
      )
    }.bind(this));

    return (
      <div>
        <h4>{(parseInt(this.props.id) + 1) + ": " + this.props.data.question}</h4>
        <form>
          {answersNodes}
        <br/>
        <button type="button" onClick={this.props.validateAnswers}>
          Validate answer
        </button>
        </form>
      </div>
    );
  }
});
module.exports = Question;

renderResult: function(){
  var result = Object.keys(this.state.quiz.questions).map(function(value, index){
    if (this.isAnswerRight(value)) {
      return (<div>{"Question " + index + ": You were right!"}</div>)
    } else {
      return (<div>{"Question " + index + ": You were wrong!"}</div>)
    }
  }.bind(this));
}