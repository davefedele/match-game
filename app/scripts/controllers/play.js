angular.module('matchGameApp')

.controller('PlayCtrl', function( $scope, Deck ){
  angular.extend($scope, Deck );
  $scope.pairsLeft = 52/2;
  $scope.flippedCards = [];
  $scope.matches = {};
  $scope.matched = 'Pick a card!';
  $scope.pairsFound = function(){
    var result = "";
    for( var key in $scope.matches) {
      result += key.slice(4,6) + ' ';
    }
    return result;
  };
  
  $scope.play = function(card, deck) {
    if( $scope.pairsLeft === 0 ) {
      $scope.pairsLeft = "Game Over";
    }else if( $scope.flippedCards.length === 2) {
      $scope.flippedCards[0][2] = '?';
      $scope.flippedCards[1][2] = '?';
      $scope.flippedCards = [];
    }

    if(!$scope.matches.hasOwnProperty(card)) {
      Deck.flipCard(card, deck);
      $scope.flippedCards.push(card);
    }

    if( $scope.flippedCards.length ===  2){
        if( $scope.flippedCards[0][1] === $scope.flippedCards[1][1] && $scope.flippedCards[0] !== $scope.flippedCards[1]) {
          //cards are matched
          $scope.matched = 'You found a match!';
          $scope.matches[$scope.flippedCards[0]] = true;
          $scope.matches[$scope.flippedCards[1]] = true;
          $scope.pairsLeft -= 1;
          $scope.flippedCards = [];
        }else{
          //cards are not a match
          $scope.matched = 'Not a match :(';
        }
    }
  }
  
  $scope.deck = Deck.shuffleDeck( Deck.makeDeck() );
})
.factory('Deck', function() {
  var counter = 0;

  makeDeck = function() {
    var deck = [];
    var suits = [ '♥', '♣', '♠', '♦' ];
    var values = [ 'A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K' ];
    
    suits.forEach(function( suit ) {
      values.forEach(function( value ) {
        deck.push( [suit, value, '?'] );
      });
    });
    return deck;    
  };

  shuffleDeck = function(deck) {
    for( var i=0; i<deck.length; i++ ) {
      var temp = deck[i];
      var randIndex = Math.floor( Math.random() * ( deck.length - i )) + i;
      deck[i] = deck[randIndex];
      deck[randIndex] = temp;
    }  
    return deck;
  };

  flipCard = function(card, deck) { 
    if(card[2] === '?') {
      card[2] = card[0] + card[1];
    }
    return card;
  };

  return {
    makeDeck: makeDeck,
    shuffleDeck: shuffleDeck,
    flipCard: flipCard
  }
});