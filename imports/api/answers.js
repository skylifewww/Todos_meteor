import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Answers = new Mongo.Collection('answers');

if (Meteor.isServer) {

  Meteor.publish('answers', function answersPublication() {
    return Answers.find();
  });
}



Meteor.methods({
  'answers.insert'(text) {
    check(text, String);
    check(isRight, Boolean);

     if (this.username !== "skylife") {
      throw new Meteor.Error('not-authorized');
    }

     Answers.insert({
      text,
      isRight,
      taskId: String,
      
    });
  },
  'answers.remove'(answerId) {
    check(answerId, String);

    const answer = Answers.findOne(answerId);
    
    if (this.username !== "skylife") {
      throw new Meteor.Error('not-authorized');
    }

    Answers.remove(answerId);
  },

    
    var user = Meteor.user();
    var task = Tasks.findOne(answerAttributes.questionId);

    if (!question)
      throw new Meteor.Error('invalid-comment', 'Вы не можете добавить ответы');
    
    answer = _.extend(answerAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });
    
    // update the post with the number of comments
    Tasks.update(answer.taskId, {$inc: {answersCount: 1}});
    
    // create the comment, save the id
    answer._id = Answers.insert(answer);
    
    // now create a notification, informing the user that there's been a comment
    // createAnswerNotification(answer);
    
    return answer._id;
  }
});
