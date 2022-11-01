FROM ruby:2.7.0

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /app

WORKDIR /app 

ADD ./api/Gemfile /app/Gemfile
ADD ./api/Gemfile.lock /app/Gemfile.lock

RUN bundle install

ADD ./api /app