# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


puts "Destroy users.."

User.destroy_all

puts "Done!"

puts 'Creating a Ad account..'

User.create({
  email: 'a@a.com',
  password: 'abc123.'
  })

puts "Done!"

puts "Creating Users.."

10.times do |n|
  User.create({
    email: Faker::Internet.email,
    password: 'dsadsaasjaskdj'
    })
end

puts "Done!"

puts "Creating Adrian's projects.."

user = User.find_by_email('a@a.com')

10.times do |n|
  user.projects.push Project.create({
    title: Faker::Commerce.product_name,
    description: Faker::Lorem.paragraph(1)
    })
end

user.save

puts "Done!"
