class HomeController < ApplicationController
  def show
    
    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = "5maOMf0e7yo0ZflLEgZ9dmJqu"
      config.consumer_secret     = "sTbUJXXB7LSoXFdqweq0wdCRHIZT9c8iUEycBZiLGZLnnXl4cK"
      config.access_token        = "1165244072-gZkDNmKpoPPtWLHgpBU1ft63eSHhPvbChzRHNEi"
      config.access_token_secret = "6kvKeApsPoNzB39icD3V1Oyz4lVcLxN6xTUpAlLWUGTuh"
    end
      
    #center: {lat: -34.397, lng: 150.644}, 
    longitude = -34.397
    latitude = 150.644

    str = "#{longitude.to_s},#{latitude.to_s},10km"
   # str = '31.515181,74.345034,10km'

    @search_results = client.search( '', geocode: str ).take(15).each do |tweet|
    end
    #puts @search_results

    #render json: @search_results
 end

end
