
# import flask
from flask import Flask, request, redirect, url_for, Response, send_from_directory
import requests
import json
from geolib import geohash
# from flask_cors import CORS

def get_segment_id(segment):
    segment_id_dict = {'music': 'KZFzniwnSyZfZ7v7nJ', 'sports': 'KZFzniwnSyZfZ7v7nE', 'art': 'KZFzniwnSyZfZ7v7na', 'film': 'KZFzniwnSyZfZ7v7nn', 'miscellaneous': 'KZFzniwnSyZfZ7v7n1'}
    return segment_id_dict[segment]

def convert_lat_long_to_geopoint(lat, long):
    try:
        geo = geohash.encode(lat, long, 5)
    except:
        geo = ''
    return geo

def get_lat_long_from_google_cloud(address):
    api_key = 'AIzaSyDVe0ljnwcozNPVhwtkBgVbqSdME6ng0-0'
    url = f'https://maps.googleapis.com/maps/api/geocode/json?address={address}&key={api_key}'
    try:
        r = requests.get(url)
        response_dict = json.loads(r.text)
        lat = response_dict['results'][0]['geometry']['location']['lat']
        lng = response_dict['results'][0]['geometry']['location']['lng']

        geo = convert_lat_long_to_geopoint(lat, lng)
        return geo
    except:
        return ''

def create_url_for_ticketmaster(values_dict):
    unit = 'miles'
    api_key = 'fm1FxGE2q6GBSUHDM6LMN9Vt8CS3BH2r'


    if ',' in values_dict['location']:
        try:
            lat, long = values_dict['location'].split(',')
            geohash = convert_lat_long_to_geopoint(float(lat), float(long))
        except:
            geohash = ''
    else:
        geohash = get_lat_long_from_google_cloud(values_dict['location'])

    if geohash == '':
        return ''

    if values_dict['category'] == 'default':
        events_url = f'https://app.ticketmaster.com/discovery/v2/events.json?apikey={api_key}&keyword={values_dict["keyword"]}&radius={values_dict["distance"]}&unit={unit}&geoPoint={geohash}'
    else:
        events_url = f'https://app.ticketmaster.com/discovery/v2/events.json?apikey={api_key}&keyword={values_dict["keyword"]}&segmentId={get_segment_id(values_dict["category"])}&radius={values_dict["distance"]}&unit={unit}&geoPoint={geohash}'

    return events_url

def get_ticketmaster_events(url):

    if url == '':
        events_list = []
        json_data = json.dumps(events_list)
        return json_data

    r = requests.get(url)
    response = r.content
    data = json.loads(response)
    if not data or '_embedded' not in data:
        events_list = []
        json_data = json.dumps(events_list)
        return json_data

    else:
        data = data['_embedded']['events']

        events_list = []
        for event in data:
            # try:
            event_dict = {}
            try:
                event_dict['name'] = event['name']
            except:
                event_dict['name'] = ''
            try:
                event_dict['date'] = event['dates']['start']['localDate']
            except:
                event_dict['date'] = ''
            try:
                event_dict['time'] = event['dates']['start']['localTime']
            except:
                event_dict['time'] = ''
            try:
                event_dict['segment'] = event['classifications'][0]['segment']['name']
            except:
                event_dict['segment'] = ''
            try:
                event_dict['venue'] = event['_embedded']['venues'][0]['name']
            except:
                event_dict['venue'] = ''
            try:
                event_dict['image'] = event['images'][0]['url']
            except:
                event_dict['image'] = ''
            try:
                event_dict['event_id'] = event['id']
            except:
                event_dict['event_id'] = ''
                
            events_list.append(event_dict)

        json_data = json.dumps(events_list)

        return json_data
    

def get_event_details(event_id):
    api_key = 'fm1FxGE2q6GBSUHDM6LMN9Vt8CS3BH2r'
    url = f'https://app.ticketmaster.com/discovery/v2/events/{event_id}?apikey={api_key}'
    r = requests.get(url)
    response = r.content
    data = json.loads(response)

    event_dict = {}

    try:
        event_dict['date'] = data['dates']['start']['localDate']
    except:
        event_dict['date'] = ''
    try:
        event_dict['time'] = data['dates']['start']['localTime']
    except:
        event_dict['time'] = ''

    try:
        event_dict['name'] = data['name']
    except:
        event_dict['name'] = ''

    try:
        event_dict['artist'] = data['_embedded']['attractions'][0]['name']
    except:
        event_dict['artist'] = ''

    try:
        event_dict['artist_url'] = data['_embedded']['attractions'][0]['url']
    except:
        event_dict['artist_url'] = ''

    try:
        event_dict['venue'] = data['_embedded']['venues'][0]['name']
    except:
        event_dict['venue'] = ''

    try:
        event_dict['segment'] = data['classifications'][0]['segment']['name']
    except:
        event_dict['segment'] = ''

    try:
        event_dict['subGenre'] = data['classifications'][0]['subGenre']['name']
    except:
        event_dict['subGenre'] = ''

    try:
        event_dict['genre'] = data['classifications'][0]['genre']['name']
    except:
        event_dict['genre'] = ''

    try:
        event_dict['subType'] = data['classifications'][0]['subType']['name']
    except:
        event_dict['subType'] = ''
        
    try:
        event_dict['type'] = data['classifications'][0]['type']['name']
    except:
        event_dict['type'] = ''

    try:
        event_dict['priceMin'] = data['priceRanges'][0]['min']
    except:
        event_dict['priceMin'] = ''

    try:
        event_dict['priceMax'] = data['priceRanges'][0]['max']
    except:
        event_dict['priceMax'] = ''

    try:
        event_dict['status'] = data['dates']['status']['code']
    except:
        event_dict['status'] = ''

    try:
        event_dict['buy_ticket_at'] = data['url']
    except:
        event_dict['buy_ticket_at'] = ''

    try:
        event_dict['seatmap'] = data['seatmap']['staticUrl']
    except:
        event_dict['seatmap'] = ''

    json_data = json.dumps(event_dict)
    return json_data


def get_venue_details(venue_name):
    api_key = 'fm1FxGE2q6GBSUHDM6LMN9Vt8CS3BH2r'
    url = f'https://app.ticketmaster.com/discovery/v2/venues?apikey={api_key}&keyword={venue_name}'
    r = requests.get(url)
    response = r.content

    data = json.loads(response)
    data = data['_embedded']['venues'][0]

    venue_dict = {}

    try:
        venue_dict['name'] = data['name']
    except:
        venue_dict['name'] = ''

    try:
        venue_dict['url'] = data['url']
    except:
        venue_dict['url'] = ''

    try:
        venue_dict['address'] = data['address']['line1']
    except:
        venue_dict['address'] = ''
    
    try:
        venue_dict['city'] = data['city']['name']
    except:
        venue_dict['city'] = ''

    try:
        venue_dict['state'] = data['state']['stateCode']
    except:
        venue_dict['state'] = ''

    try:
        venue_dict['postalCode'] = data['postalCode']
    except:
        venue_dict['postalCode'] = ''

    try:
        venue_dict['venue_image'] = data['images'][0]['url']
    except:
        venue_dict['venue_image'] = ''

    address_list = venue_dict['address'].split(' ')
    address = '+'.join(address_list)
    google_address = '+'.join([address, venue_dict['city'], venue_dict['state'], venue_dict['postalCode']])
    google_maps_url = f'https://www.google.com/maps/search/?api=1&query={google_address}'

    venue_dict['google_maps_url'] = google_maps_url

    # complete address
    venue_dict['complete_address'] = f'{venue_dict["address"]}, {venue_dict["city"]}, {venue_dict["state"]} {venue_dict["postalCode"]}'

    json_data = json.dumps(venue_dict)
    
    return json_data

# create an instance of the Flask class
app = Flask(__name__)
@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

@app.route('/data_table', methods=['GET'])
def get_data():

    # get the data from the form
    values_dict = {}
    values_dict['keyword'] = request.args.get('keyword')
    values_dict['distance'] = request.args.get('distance')
    if values_dict['distance'] == '':
        values_dict['distance'] = '10'
    values_dict['category'] = request.args.get('category')
    values_dict['location'] = request.args.get('location')

    json_data= get_ticketmaster_events(create_url_for_ticketmaster(values_dict))

    return json_data

@app.route('/eventdetails', methods=['GET'])
def get_event_details_data():
    event_id = request.args.get('eventid')
    event = get_event_details(event_id)

    return event

@app.route('/venuedetails', methods=['GET'])
def get_venue_details_data():
    venue_name = request.args.get('venuename')
    venue = get_venue_details(venue_name)

    return venue

@app.route('/')
def run():
    return send_from_directory('static','home_page.html')

# run the app
if __name__ == '__main__':
    app.run(debug=True)
