class Api::MapController < ApplicationController
  def new
  end

  def show
    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = "5maOMf0e7yo0ZflLEgZ9dmJqu"
      config.consumer_secret     = "sTbUJXXB7LSoXFdqweq0wdCRHIZT9c8iUEycBZiLGZLnnXl4cK"
      config.access_token        = "1165244072-gZkDNmKpoPPtWLHgpBU1ft63eSHhPvbChzRHNEi"
      config.access_token_secret = "6kvKeApsPoNzB39icD3V1Oyz4lVcLxN6xTUpAlLWUGTuh"
    end

    #center: {lat: -34.397, lng: 150.644}, 
    latitude = params[:lat]
    longitude = params[:lng]

    #str = '31.515181,74.345034,10km'
    str = "#{latitude.to_s},#{longitude.to_s},10km"

    @search_results = client.search( '', geocode: str ).take(10)

    render json: @search_results
 end


  def delete
  end

  def update
  end

  def destroy
  end
end
