namespace :populate do
  desc "populate"
  task games: :environment do
      20.times do
        game = Game.create(name: Faker::Movies::HarryPotter.book, description: Faker::Movies::HarryPotter.house)
        5.times { Character.create(name: Faker::Games::Pokemon.name, power: Faker::Games::Pokemon.move, game_id: game.id) }
      end
    end
  end

