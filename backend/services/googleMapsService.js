const axios = require('axios');

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const GEOCODING_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
const PLACES_API_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
const PLACE_DETAILS_API_URL = 'https://maps.googleapis.com/maps/api/place/details/json';

class GoogleMapsService {
  /**
   * Get coordinates for a city using Geocoding API
   * @param {string} cityName - Name of the city
   * @returns {Promise<{latitude: number, longitude: number}>}
   */
  async getCityCoordinates(cityName) {
    try {
      const response = await axios.get(GEOCODING_API_URL, {
        params: {
          address: `${cityName}, Karnataka, India`,
          key: GOOGLE_MAPS_API_KEY
        }
      });

      if (response.data.status === 'OK' && response.data.results.length > 0) {
        const location = response.data.results[0].geometry.location;
        return {
          latitude: location.lat,
          longitude: location.lng,
          formattedAddress: response.data.results[0].formatted_address
        };
      } else {
        throw new Error(`Geocoding failed: ${response.data.status}`);
      }
    } catch (error) {
      console.error('Error fetching city coordinates:', error.message);
      throw error;
    }
  }

  /**
   * Find bus stations near a location using Places API
   * @param {number} latitude - Latitude of center point
   * @param {number} longitude - Longitude of center point
   * @param {number} radius - Search radius in meters (default 5000m = 5km)
   * @returns {Promise<Array>}
   */
  async findNearbyBusStations(latitude, longitude, radius = 5000) {
    try {
      const response = await axios.get(PLACES_API_URL, {
        params: {
          location: `${latitude},${longitude}`,
          radius: radius,
          type: 'bus_station',
          key: GOOGLE_MAPS_API_KEY
        }
      });

      if (response.data.status === 'OK' || response.data.status === 'ZERO_RESULTS') {
        return response.data.results || [];
      } else {
        throw new Error(`Places API failed: ${response.data.status}`);
      }
    } catch (error) {
      console.error('Error fetching nearby bus stations:', error.message);
      throw error;
    }
  }

  /**
   * Get additional bus stops using transit_station type (fallback)
   * @param {number} latitude 
   * @param {number} longitude 
   * @param {number} radius 
   * @returns {Promise<Array>}
   */
  async findNearbyTransitStations(latitude, longitude, radius = 5000) {
    try {
      const response = await axios.get(PLACES_API_URL, {
        params: {
          location: `${latitude},${longitude}`,
          radius: radius,
          type: 'transit_station',
          key: GOOGLE_MAPS_API_KEY
        }
      });

      if (response.data.status === 'OK' || response.data.status === 'ZERO_RESULTS') {
        return response.data.results || [];
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error fetching transit stations:', error.message);
      return [];
    }
  }

  /**
   * Get detailed information about a place
   * @param {string} placeId - Google Place ID
   * @returns {Promise<Object>}
   */
  async getPlaceDetails(placeId) {
    try {
      const response = await axios.get(PLACE_DETAILS_API_URL, {
        params: {
          place_id: placeId,
          fields: 'name,formatted_address,geometry,rating,user_ratings_total,photos,business_status,types',
          key: GOOGLE_MAPS_API_KEY
        }
      });

      if (response.data.status === 'OK') {
        return response.data.result;
      } else {
        throw new Error(`Place Details failed: ${response.data.status}`);
      }
    } catch (error) {
      console.error('Error fetching place details:', error.message);
      throw error;
    }
  }

  /**
   * Transform Google Places API result to our format
   * @param {Object} place - Google Place object
   * @param {string} cityName - City name
   * @returns {Object}
   */
  transformPlaceData(place, cityName) {
    return {
      placeId: place.place_id,
      name: place.name,
      address: place.vicinity || place.formatted_address || 'Address not available',
      city: cityName,
      coordinates: {
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng
      },
      types: place.types || [],
      rating: place.rating || null,
      userRatingsTotal: place.user_ratings_total || 0,
      photos: place.photos ? place.photos.map(photo => ({
        photoReference: photo.photo_reference,
        height: photo.height,
        width: photo.width
      })) : [],
      businessStatus: place.business_status || 'OPERATIONAL',
      vicinity: place.vicinity || ''
    };
  }

  /**
   * Search for bus stops with keyword
   * @param {number} latitude 
   * @param {number} longitude 
   * @param {string} keyword 
   * @param {number} radius 
   */
  async searchBusStopsWithKeyword(latitude, longitude, keyword = 'bus stop', radius = 5000) {
    try {
      const response = await axios.get(PLACES_API_URL, {
        params: {
          location: `${latitude},${longitude}`,
          radius: radius,
          keyword: keyword,
          key: GOOGLE_MAPS_API_KEY
        }
      });

      if (response.data.status === 'OK' || response.data.status === 'ZERO_RESULTS') {
        return response.data.results || [];
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error searching bus stops with keyword:', error.message);
      return [];
    }
  }
}

module.exports = new GoogleMapsService();

