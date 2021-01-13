import React, { Component } from 'react';
import Section from './components/Section/Section';
import s from './App.module.css'
import FeedbackOptions from './components/FeedbackOptions/FeedbackOptions';
import Statistics from './components/Statistics/Statistics';
import Notification from './components/Notification/Notification';

class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0
  }

  feedbackIncrement = option => {
    this.setState(state => ({ [option]: state[option] + 1,
  }))
  }
  
  countTotalFeedback = () => {
    return Object.values(this.state).reduce((acc, option) => acc + option, 0);
  };

  countPositiveFeedbackPercentage = () => {
    const { good } = this.state;
    return Math.round((good / this.countTotalFeedback()) * 100) || 0;
  };
  
  render() {
    const { good, neutral, bad } = this.state;
    return (
      <div className={s.container}>
        <Section title="Please give your feedback">
          <FeedbackOptions onLeaveFeedback={this.feedbackIncrement} options={Object.keys(this.state)}/> 
        </Section>
        <Section title="Statistics">
          {this.countTotalFeedback() ? (
            <Statistics good={good} neutral={neutral} bad={bad} total={this.countTotalFeedback()} positivePercentage={this.countPositiveFeedbackPercentage()} />
            ) : (
            <Notification message="NO FEEDBACK GIVEN" />
          )}
         </Section>
      </div>
    )
  }
}


export default App;
