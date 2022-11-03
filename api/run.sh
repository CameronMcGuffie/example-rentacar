#!/bin/sh
echo 'TEST MIGRATE'
rails db:migrate RAILS_ENV=development
bundle exec rails s -p 3000 -b '0.0.0.0'