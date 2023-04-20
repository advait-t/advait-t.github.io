
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const geohash = require('ngeohash');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, "dist/web-tech-hw9")));

const segmentIdDict = {
  'music': 'KZFzniwnSyZfZ7v7nJ',
  'sports': 'KZFzniwnSyZfZ7v7nE',
  'art': 'KZFzniwnSyZfZ7v7na',
  'film': 'KZFzniwnSyZfZ7v7nn',
  'miscellaneous': 'KZFzniwnSyZfZ7v7n1'
};

app.use(cors());

app.get('/autocomplete', async (req, res) => {
  const keyword = req.query.keyword;
  const url = `https://app.ticketmaster.com/discovery/v2/suggest?apikey=fm1FxGE2q6GBSUHDM6LMN9Vt8CS3BH2r&keyword=${keyword}`;
  console.log(url);

  try {
    const response = await axios.get(url);
    const data = response.data;
    const autocomplete_list = [];

    // get the 5 words from the autocomplete list
    for (let i = 0; i < 5; i++) {
      const name = data?._embedded?.attractions?.[i]?.name || '';
      autocomplete_list.push(name);
    }

    res.status(200).send(autocomplete_list);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving autocomplete data');
  }
});


app.get('/venue_details', async (req, res) => {
  var venue_name = req.query.venue_name;

  url = `https://app.ticketmaster.com/discovery/v2/venues.json?keyword=${venue_name}&apikey=fm1FxGE2q6GBSUHDM6LMN9Vt8CS3BH2r`;
  console.log(url);
  try {
    var response = await axios.get(url);
    var data = response.data;

    var venue_dict = {};
    // get the venue_name, address, city, state, phone number, open hours, general rule, child rule
    venue_dict['venue_name'] = data?._embedded?.venues?.[0]?.name || '';
    venue_dict['address'] = data?._embedded?.venues?.[0]?.address?.line1 || '';
    venue_dict['city'] = data?._embedded?.venues?.[0]?.city?.name || '';
    venue_dict['state'] = data?._embedded?.venues?.[0]?.state?.name || '';
    venue_dict['postal_code'] = data?._embedded?.venues?.[0]?.postalCode || '';
    venue_dict['phone'] = data?._embedded?.venues?.[0]?.boxOfficeInfo?.phoneNumberDetail || '';
    venue_dict['open_hours'] = data?._embedded?.venues?.[0]?.boxOfficeInfo?.openHoursDetail || '';
    venue_dict['general_rule'] = data?._embedded?.venues?.[0]?.generalInfo?.generalRule || '';
    venue_dict['child_rule'] = data?._embedded?.venues?.[0]?.generalInfo?.childRule || '';
    venue_dict['latitude'] = parseFloat(data?._embedded?.venues?.[0]?.location?.latitude) || '';
    venue_dict['longitude'] = parseFloat(data?._embedded?.venues?.[0]?.location?.longitude) || '';

    res.json(venue_dict);
    console.log(venue_dict);

  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving venue data');
  }
})

const SpotifyWebApi = require('spotify-web-api-node');

app.get('/spotify_artist_info', async (req, res) => {
  const artistName = req.query.artist_name;
  const client_id = 'b572950b8f2e4a0aa1eed3cf789a712b';
  const client_secret = '174d38c02a144a59b707bef01d991c84';

  const spotifyApi = new SpotifyWebApi({
    clientId: client_id,
    clientSecret: client_secret,
  });

  try {
    const authResponse = await spotifyApi.clientCredentialsGrant();

    spotifyApi.setAccessToken(authResponse.body.access_token);

    const searchResult = await spotifyApi.searchArtists(artistName);

    const artist = searchResult.body.artists.items[0];
    const name = artist.name;
    const followers = artist.followers.total.toLocaleString();
    const popularity = artist.popularity;
    const genres = artist.genres;
    const artist_url = artist.external_urls.spotify;
    const icon = artist.images[0].url;
    const artist_id = artist.id;
    const artist_image = artist.images[0].url;

    const albumsResult = await spotifyApi.getArtistAlbums(artist_id);
    const albums = albumsResult.body.items;
    const albumCovers = albums.map(album => album.images[0].url).slice(0, 3);

    const final_json = {
      name: name,
      followers: followers,
      popularity: popularity,
      genres: genres,
      artist_url: artist_url,
      icon: icon,
      artist_id: artist_id,
      album_covers: albumCovers,
      artist_image: artist_image
    }

    res.json(final_json);

    console.log(final_json)
  }
  catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving artist data');
  }
});


// app.get('/event_details', async (req, res) => {
//   var event_id = req.query.event_id;

//   url = `https://app.ticketmaster.com/discovery/v2/events/${event_id}.json?apikey=fm1FxGE2q6GBSUHDM6LMN9Vt8CS3BH2r`;
//   console.log(url);
//   try {
//     var response = await axios.get(url);
//     var data = response.data;

//     var artist_dicts = [];
//     for (let i = 0; i < data?._embedded?.attractions?.length; i++) {
//       var artist_name = data?._embedded?.attractions?.[i]?.name || '';

//       var event_dict = {};
//       event_dict['artist'] = artist_name;
//       event_dict['artist_url'] = data?._embedded?.attractions?.[i]?.url || '';
//       event_dict['date'] = data?.dates?.start?.localDate || '';
//       event_dict['time'] = data?.dates?.start?.localTime || '';
//       event_dict['name1'] = data?.name || '';
//       event_dict['venue'] = data?._embedded?.venues?.[0]?.name || '';
//       event_dict['segment'] = data?.classifications?.[0]?.segment?.name || '';
//       event_dict['subGenre'] = data?.classifications?.[0]?.subGenre?.name || '';
//       event_dict['genre'] = data?.classifications?.[0]?.genre?.name || '';
//       event_dict['subType'] = data?.classifications?.[0]?.subType?.name || '';
//       event_dict['type'] = data?.classifications?.[0]?.type?.name || '';
//       event_dict['price_min'] = data?.priceRanges?.[0]?.min || '';
//       event_dict['price_max'] = data?.priceRanges?.[0]?.max || '';
//       event_dict['ticketstatus'] = data?.dates?.status?.code || '';
//       event_dict['buy_ticket_at'] = data?.url || '';
//       event_dict['seatmap'] = data?.seatmap?.staticUrl || '';

//       artist_dicts.push(event_dict);
//     }

//     res.json(artist_dicts);
//     console.log(artist_dicts);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error retrieving event data');
//   }
// });


app.get('/event_details', async (req, res) => {
  var event_id = req.query.event_id;

  url = `https://app.ticketmaster.com/discovery/v2/events/${event_id}.json?apikey=fm1FxGE2q6GBSUHDM6LMN9Vt8CS3BH2r`;
  console.log(url);
  try {
    var response = await axios.get(url);
    var data = response.data;

    var event_dict = {};
    var artist_list = [];
    for (let i = 0; i < data?._embedded?.attractions?.length; i++) {
      var artist_name = data?._embedded?.attractions?.[i]?.name || '';
      artist_list.push(artist_name);
    }

    event_dict['artist_list'] = artist_list;
    event_dict['date'] = data?.dates?.start?.localDate || '';
    event_dict['time'] = data?.dates?.start?.localTime || '';
    event_dict['name1'] = data?.name || '';
    event_dict['artist'] = data?._embedded?.attractions?.[0]?.name || '';
    event_dict['artist_url'] = data?._embedded?.attractions?.[0]?.url || '';
    event_dict['venue'] = data?._embedded?.venues?.[0]?.name || '';
    event_dict['segment'] = data?.classifications?.[0]?.segment?.name || '';
    event_dict['subgenre'] = data?.classifications?.[0]?.subGenre?.name || '';
    event_dict['genre'] = data?.classifications?.[0]?.genre?.name || '';
    event_dict['subtype'] = data?.classifications?.[0]?.subType?.name || '';
    event_dict['type'] = data?.classifications?.[0]?.type?.name || '';
    event_dict['price_min'] = data?.priceRanges?.[0]?.min || '';
    event_dict['price_max'] = data?.priceRanges?.[0]?.max || '';
    event_dict['ticketstatus'] = data?.dates?.status?.code || '';
    event_dict['buy_ticket_at'] = data?.url || '';
    event_dict['seatmap'] = data?.seatmap?.staticUrl || '';
    event_dict['music_related'] = data?.classifications?.[0]?.segment?.name || '';

    res.json(event_dict);
    console.log(event_dict);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving event data');
  }
});


app.get('/events', async (req, res) => {
  const keyword = req.query.keyword;
  const distance = req.query.distance;
  const category = req.query.category;
  const location1 = req.query.location;

  const segmentId = segmentIdDict[category] || '';

  if(location1.includes(',')){
    try {
      lat = location1.split(',')[0];
      lng = location1.split(',')[1];
      location = geohash.encode(lat, lng);
    }
    catch (error) {
      location = '';
    }
  } 
  else {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location1}&key=AIzaSyDVe0ljnwcozNPVhwtkBgVbqSdME6ng0-0`;
    try {
      const response = await axios.get(url);
      lat = response.data?.results[0].geometry?.location?.lat;
      lng = response.data?.results[0].geometry?.location?.lng;
      location = geohash.encode(lat, lng);
    }
    catch (error) {
      location = '';
    }
  }

  url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=fm1FxGE2q6GBSUHDM6LMN9Vt8CS3BH2r&keyword=${keyword}&segmentId=${segmentId}&radius=${distance}&unit=miles&geoPoint=${location}`;

  console.log(url);

  try {
    const response = await axios.get(url);
    const eventData = response.data._embedded?.events || [];
  
    const filteredData = eventData.map(event => {
      return {
        name: event?.name,
        date: event?.dates?.start?.localDate,
        time: event?.dates?.start?.localTime,
        venue: event?._embedded?.venues[0]?.name,
        icon: event?.images[0]?.url,
        genre: event?.classifications[0]?.segment?.name,
        event_id: event?.id,
      };
    });
  
    console.log(filteredData);
    res.json(filteredData);
  
  } catch (error) {
    console.error(error);
    res.status(500).json([]);
  }  
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});