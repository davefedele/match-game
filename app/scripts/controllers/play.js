angular.module( 'matchGameApp' )

.controller( 'PlayCtrl', function( $scope, $route, Game ){
  angular.extend( $scope, Game );
  $scope.gameOver = false;
  $scope.pairsLeft = 52/2;
  
  $scope.firstCard = "";
  $scope.secondCard = "";
  
  $scope.matches = {};
  $scope.foundMatch = false;
  $scope.message = 'Pick a card!';
  
  $scope.play = function( card ) {
    if( !card.flipped ) {
      Game.flipCard( card );
    }

    if( $scope.foundMatch === true) {
      $scope.foundMatch = false;
      $scope.firstCard.hidden = true;
      $scope.secondCard.hidden = true;
    }
    if( !$scope.firstCard || $scope.secondCard ){
      Game.flipCard($scope.firstCard);
      Game.flipCard($scope.secondCard);
      $scope.firstCard = $scope.secondCard = undefined;
    }

    if( $scope.firstCard ) {
        $scope.secondCard = card;
        if( $scope.firstCard.value === $scope.secondCard.value) {
          //remove and put to the side
          $scope.foundMatch = true;
          $scope.message = "You found a match!";
          $scope.pairsLeft -= 1;
        }else{
          $scope.message = "Try again...";
        }

    }else{
      $scope.firstCard = card;
      $scope.message = "Pick another card...";
    }
    
    if( $scope.pairsLeft === 0 ) {
      $scope.firstCard.hidden = true;
      $scope.secondCard.hidden = true;
      $scope.gameOver = true;
      $scope.message = "Congratulations, you win!";
    }
  };
  
  $scope.deck = Game.shuffleDeck( Game.makeDeck() );
})

.factory( 'Game', function() {
  var counter = 0;

  function Card( suit, value ) {
    this.suit  = suit;
    this.value = value;
    this.image = suit + "_" + value;
    this.flipped = false;
    this.hidden = false;
  }

  flipCard = function( card ) { 
    card.flipped = !card.flipped;
    return card;
  };

  makeDeck = function() {
    var deck = [];
    var suits = [ 'hearts', 'clubs', 'spades', 'diamonds' ];
    var values = [ 'ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king' ];
    
    suits.forEach(function( suit ) {
      values.forEach(function( value ) {
        var newCard = new Card( suit, value );
        deck.push(newCard);
      });
    });
    return deck;    
  };

  shuffleDeck = function( deck ) {
    for( var i=0; i<deck.length; i++ ) {
      var temp = deck[i];
      var randIndex = Math.floor( Math.random() * ( deck.length - i )) + i;
      deck[i] = deck[randIndex];
      deck[randIndex] = temp;
    }  
    return deck;
  };

  return {
    flipCard: flipCard,
    makeDeck: makeDeck,
    shuffleDeck: shuffleDeck
  }
});