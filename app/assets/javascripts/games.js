var currentGame = {};
var showForm = false;

$(document).ready( function() {

  $('#toggle').on('click', function() {
    toggle();
  });

  $(document).on("submit", "#game-form form", function(event){
    event.preventDefault();
    var data = $(this).serializeArray();
    $.ajax({
      url: "/games",
      method: "POST",
      dataType: "JSON",
      data: data
    }).done( function(game){
      toggle()
      var g = '<li class="game-item" data-id="' + game.id + '" data-name="' + game.name + '">' + game.name + ' - ' + game.description + '<li>'
      $("#games-list").append(g);
    })
  })
  
  function toggle() {
    showForm = !showForm;
    $('#game-form').remove()
    $('#games-list').toggle()
    
    if (showForm) {
      $.ajax({
        url: '/game_form',
        method: 'GET'
      }).done( function(html) {
        $('#toggle').after(html);
      });
    }
  }

  $(document).on('click', ".game-item", function() {
    currentGame.id = this.dataset.id
    currentGame.name = this.dataset.name;
    $.ajax({
      url: '/games/' + currentGame.id + '/characters',
      method: 'GET',
      dataType: 'JSON'
    }).done( function(characters) {
      var list = $('#characters');
      $("#game").text('Characters in ' + currentGame.name)
      list.empty();
      characters.forEach( function(char) {
        var li = '<li class="list-group-item game-item" data-character-id="' + char.id + '">' + char.name + '-' + char.power + '</li>'
        list.append(li)
      });
    });
  });
});