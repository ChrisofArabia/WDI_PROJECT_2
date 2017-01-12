const mongoose = require('mongoose');

const databaseUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/photo-walks';
mongoose.connect(databaseUrl);

const Landmark = require('../models/landmark');

Landmark.collection.drop();

const landmarks = [
  {
    'name': 'Whitechapel Bell Foundry',
    'address': '32-34 Whitechapel Road, London',
    'postcode': 'E1 1DY',
    'buildDate': '1738',
    'listed': 'Grade II',
    'publicaccess': 'On tours',
    'nearestTube': 'Aldgate East',
    'website': 'http://www.whitechapelbellfoundry.co.uk/',
    'lat': '51.517066',
    'lng': '-0.067102'
  },
  {
    'name': 'The Old Truman Brewery: The Sign of the Black Eagle',
    'address': '91 Brick Lane, London',
    'postcode': 'E1 6QR',
    'buildDate': '1800s various, 1924-27, 1970s, 2000s',
    'listed': 'Brewmaster\'s House and Vat House - Grade II; Director\'s House - Grade II*',
    'publicaccess': 'To public areas',
    'nearestTube': 'Aldgate East, Liverpool Street, Shoreditch High Street',
    'website': 'http://trumanbrewery.com/',
    'lat': '51.521266',
    'lng': '-0.071792'
  },
  {
    'name': 'Proof House',
    'address': '48 and 50 Commercial Road, London',
    'postcode': 'E1 1LP',
    'buildDate': '1757, 1826, 1872',
    'listed': 'Grade II',
    'publicaccess': 'none',
    'nearestTube': 'Aldgate East',
    'website': 'none',
    'lat': '51.514911',
    'lng': '-0.068135'
  },
  {
    'name': '37 Stepney Green: The Oldest House on the Green',
    'address': '37 Stepney Green, London',
    'postcode': 'E1 3JX',
    'buildDate': '1694',
    'listed': 'Grade II*',
    'publicaccess': 'none',
    'nearestTube': 'Stepney Green',
    'website': 'none',
    'lat': '51.519673',
    'lng': '-0.047447'
  },
  {
    'name': 'Trinity Green',
    'address': 'Trinity Green, Mile End Road, London',
    'postcode': 'E1 4TS',
    'buildDate': '1695',
    'listed': 'Grade I',
    'publicaccess': 'none',
    'nearestTube': 'Stepney Green, Whitechapel',
    'website': 'none',
    'lat': '51.520201',
    'lng': '-0.054775'
  },
  {
    'name': 'Christ Church, Spitalfields',
    'address': 'Commercial Street, London',
    'postcode': 'E1 6LY',
    'buildDate': '1714-29, 1979-2004, 2015',
    'listed': 'Grade I',
    'publicaccess': 'Yes',
    'nearestTube': 'Aldgate East, Liverpool Street',
    'website': 'http://ccspits.org/',
    'lat': '51.519107',
    'lng': '-0.074458'
  },
  {
    'name': 'Hanbury Hall',
    'address': '22b Hanbury Street, London',
    'postcode': 'E1 6QR',
    'buildDate': '1719, 1864, 2015',
    'listed': 'Grade II',
    'publicaccess': 'To the hall',
    'nearestTube': 'Liverpool Street',
    'website': 'none',
    'lat': '51.520263',
    'lng': '-0.073056'
  },
  {
    'name': 'Fournier Street: A Street with a Church at Both Ends',
    'address': 'Fournier, Princelet and Wilkes Street, London',
    'postcode': 'Various',
    'buildDate': 'Various',
    'listed': 'Various',
    'publicaccess': 'Check Historic England web pages for details',
    'nearestTube': 'Liverpool Street',
    'website': 'https://historicengland.org.uk/listing/the-list/results?q=fournier+street&searchtype=nhle',
    'lat': '51.519242',
    'lng': '-0.073131'
  },
  {
    'name': 'St George in the East',
    'address': '14 Cannon Street Road, London',
    'postcode': 'E1 0BH',
    'buildDate': '1714, 1726, 1960, 1963',
    'listed': 'Grade I',
    'publicaccess': 'Yes',
    'nearestTube': 'Shadwell, Tower Hill',
    'website': 'http://stgeorgeintheeast.withtank.com/',
    'lat': '51.509932',
    'lng': '-0.060600'
  },
  {
    'name': 'Brick Lane Jamme Masjid',
    'address': '59 Brick Lane, London',
    'postcode': 'E1 6QL',
    'buildDate': '1743, 1897, 1986, 2009',
    'listed': 'Grade II*',
    'publicaccess': 'Open for services and by arrangement',
    'nearestTube': 'Aldgate East',
    'website': 'http://www.bricklanejammemasjid.co.uk/',
    'lat': '51.519498',
    'lng': '-0.071795'
  }
];

landmarks.forEach((landmark) => {
  Landmark.create(landmark, (err, landmark) => {
    if (err) return console.log(err);
    return console.log(`${landmark.name} was saved.`);
  });
});
