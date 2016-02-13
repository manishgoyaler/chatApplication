angular
  .module('Whatsapp')
  .controller('NewChatCtrl', NewChatCtrl);

function NewChatCtrl($scope, $reactive, $state, NewChat) {
  $reactive(this).attach($scope);

  this.hideNewChatModal = hideNewChatModal;
  this.newChat = newChat;

  this.subscribe('users');

  this.helpers({
    users() {
      return Meteor.users.find({ _id: { $ne: Meteor.userId() } });
    }
  });

  ////////////

  function hideNewChatModal() {
    NewChat.hideModal();
  }

  function newChat(userId) {
    let chat = Chats.findOne({ userIds: { $all: [Meteor.userId(), userId] } });
    if (chat) {
      return goToChat(chat._id);
    }

    Meteor.call('newChat', userId, goToChat);
  }

  function goToChat(chatId1 ,chatId2 ) {
    debugger;
    hideNewChatModal();
    return $state.go('tab.chat', { chatId: chatId2 });
  }
}
