const mongoose = require('mongoose');
const BusStop = require('../models/BusStop');

// Dakshina Kannada District Government Bus Stops
const dakshinaKannadaBusStops = [
  // Mangalore City Bus Stops
  {
    placeId: 'dk_mangalore_ksrtc_central',
    name: 'KSRTC Bus Stand Mangalore (Central)',
    address: 'Bejai, Mangalore, Karnataka 575004',
    city: 'Mangalore',
    coordinates: { latitude: 12.8739, longitude: 74.8430 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Bejai, Mangalore'
  },
  {
    placeId: 'dk_mangalore_state_bank',
    name: 'State Bank Bus Stop',
    address: 'State Bank, Mangalore, Karnataka 575001',
    city: 'Mangalore',
    coordinates: { latitude: 12.8698, longitude: 74.8429 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'State Bank, Mangalore'
  },
  {
    placeId: 'dk_mangalore_pumpwell',
    name: 'Pumpwell Bus Stop',
    address: 'Pumpwell Circle, Mangalore, Karnataka 575002',
    city: 'Mangalore',
    coordinates: { latitude: 12.8974, longitude: 74.8479 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Pumpwell, Mangalore'
  },
  {
    placeId: 'dk_mangalore_hampankatta',
    name: 'Hampankatta Bus Stop',
    address: 'Hampankatta, Mangalore, Karnataka 575001',
    city: 'Mangalore',
    coordinates: { latitude: 12.8699, longitude: 74.8421 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Hampankatta, Mangalore'
  },
  {
    placeId: 'dk_mangalore_surathkal',
    name: 'Surathkal Bus Stop',
    address: 'Surathkal, Mangalore, Karnataka 575014',
    city: 'Mangalore',
    coordinates: { latitude: 13.0067, longitude: 74.7951 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Surathkal, Mangalore'
  },
  {
    placeId: 'dk_mangalore_kuloor',
    name: 'Kuloor Bus Stop',
    address: 'Kuloor, Mangalore, Karnataka 575013',
    city: 'Mangalore',
    coordinates: { latitude: 12.8895, longitude: 74.8686 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Kuloor, Mangalore'
  },
  {
    placeId: 'dk_mangalore_kankanady',
    name: 'Kankanady Bus Stop',
    address: 'Kankanady, Mangalore, Karnataka 575002',
    city: 'Mangalore',
    coordinates: { latitude: 12.8842, longitude: 74.8583 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Kankanady, Mangalore'
  },
  {
    placeId: 'dk_mangalore_kottara',
    name: 'Kottara Bus Stop',
    address: 'Kottara Chowki, Mangalore, Karnataka 575006',
    city: 'Mangalore',
    coordinates: { latitude: 12.8889, longitude: 74.8819 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Kottara, Mangalore'
  },
  {
    placeId: 'dk_mangalore_padil',
    name: 'Padil Bus Stop',
    address: 'Padil, Mangalore, Karnataka 575007',
    city: 'Mangalore',
    coordinates: { latitude: 12.8231, longitude: 74.8914 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Padil, Mangalore'
  },
  {
    placeId: 'dk_mangalore_kavoor',
    name: 'Kavoor Bus Stop',
    address: 'Kavoor, Mangalore, Karnataka 575015',
    city: 'Mangalore',
    coordinates: { latitude: 12.8427, longitude: 74.8330 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Kavoor, Mangalore'
  },

  // Bantwal Taluk
  {
    placeId: 'dk_bantwal_bus_stand',
    name: 'Bantwal Bus Stand',
    address: 'BC Road, Bantwal, Karnataka 574211',
    city: 'Bantwal',
    coordinates: { latitude: 12.8956, longitude: 75.0348 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'BC Road, Bantwal'
  },
  {
    placeId: 'dk_bc_road',
    name: 'BC Road Bus Stop',
    address: 'BC Road, Bantwal, Karnataka 574211',
    city: 'BC Road',
    coordinates: { latitude: 12.8889, longitude: 75.0364 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'BC Road, Bantwal'
  },
  {
    placeId: 'dk_vittal',
    name: 'Vittal Bus Stand',
    address: 'Vittal, Bantwal Taluk, Karnataka 574243',
    city: 'Vittal',
    coordinates: { latitude: 12.7785, longitude: 75.2034 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Vittal, Bantwal'
  },
  {
    placeId: 'dk_thumbe',
    name: 'Thumbe Bus Stop',
    address: 'Thumbe, Bantwal, Karnataka 574222',
    city: 'Thumbe',
    coordinates: { latitude: 12.8392, longitude: 74.9458 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Thumbe, Bantwal'
  },
  {
    placeId: 'dk_panemangalore',
    name: 'Panemangalore Bus Stop',
    address: 'Panemangalore, Bantwal, Karnataka 574231',
    city: 'Panemangalore',
    coordinates: { latitude: 12.8142, longitude: 75.0892 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Panemangalore, Bantwal'
  },

  // Belthangady Taluk
  {
    placeId: 'dk_belthangady',
    name: 'Belthangady Bus Stand',
    address: 'Belthangady, Karnataka 574214',
    city: 'Belthangady',
    coordinates: { latitude: 13.0069, longitude: 75.2722 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Belthangady'
  },
  {
    placeId: 'dk_dharmasthala',
    name: 'Dharmasthala Bus Stand',
    address: 'Dharmasthala, Belthangady, Karnataka 574216',
    city: 'Dharmasthala',
    coordinates: { latitude: 12.9549, longitude: 75.3821 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Dharmasthala, Belthangady'
  },
  {
    placeId: 'dk_ujire',
    name: 'Ujire Bus Stand',
    address: 'Ujire, Belthangady, Karnataka 574240',
    city: 'Ujire',
    coordinates: { latitude: 13.0631, longitude: 75.1892 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Ujire, Belthangady'
  },
  {
    placeId: 'dk_venoor',
    name: 'Venoor Bus Stop',
    address: 'Venoor, Belthangady, Karnataka 574217',
    city: 'Venoor',
    coordinates: { latitude: 12.9897, longitude: 75.3156 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Venoor, Belthangady'
  },

  // Puttur Taluk
  {
    placeId: 'dk_puttur',
    name: 'Puttur Bus Stand',
    address: 'Puttur, Karnataka 574201',
    city: 'Puttur',
    coordinates: { latitude: 12.7596, longitude: 75.1991 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Puttur'
  },
  {
    placeId: 'dk_uppinangady',
    name: 'Uppinangady Bus Stand',
    address: 'Uppinangady, Puttur, Karnataka 574241',
    city: 'Uppinangady',
    coordinates: { latitude: 12.8917, longitude: 75.2861 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Uppinangady, Puttur'
  },
  {
    placeId: 'dk_kadaba',
    name: 'Kadaba Bus Stop',
    address: 'Kadaba, Puttur, Karnataka 574221',
    city: 'Kadaba',
    coordinates: { latitude: 12.7039, longitude: 75.3256 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Kadaba, Puttur'
  },
  {
    placeId: 'dk_kabaka',
    name: 'Kabaka Bus Stop',
    address: 'Kabaka, Puttur, Karnataka 574260',
    city: 'Kabaka',
    coordinates: { latitude: 12.7231, longitude: 75.2489 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Kabaka, Puttur'
  },

  // Sullia Taluk
  {
    placeId: 'dk_sullia',
    name: 'Sullia Bus Stand',
    address: 'Sullia, Karnataka 574239',
    city: 'Sullia',
    coordinates: { latitude: 12.5605, longitude: 75.3859 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Sullia'
  },
  {
    placeId: 'dk_subrahmanya',
    name: 'Subrahmanya Bus Stand',
    address: 'Subrahmanya, Sullia, Karnataka 574238',
    city: 'Subrahmanya',
    coordinates: { latitude: 12.7806, longitude: 75.4275 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Subrahmanya, Sullia'
  },
  {
    placeId: 'dk_bellare',
    name: 'Bellare Bus Stop',
    address: 'Bellare, Sullia, Karnataka 574214',
    city: 'Bellare',
    coordinates: { latitude: 12.6789, longitude: 75.4123 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Bellare, Sullia'
  },

  // Moodbidri
  {
    placeId: 'dk_moodbidri',
    name: 'Moodbidri Bus Stand',
    address: 'Moodbidri, Karnataka 574227',
    city: 'Moodbidri',
    coordinates: { latitude: 13.0676, longitude: 74.9934 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Moodbidri'
  },

  // Coastal Areas
  {
    placeId: 'dk_ullal',
    name: 'Ullal Bus Stop',
    address: 'Ullal, Mangalore, Karnataka 575020',
    city: 'Ullal',
    coordinates: { latitude: 12.8058, longitude: 74.8606 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Ullal, Mangalore'
  },
  {
    placeId: 'dk_thokkottu',
    name: 'Thokkottu Bus Stop',
    address: 'Thokkottu, Mangalore, Karnataka 575028',
    city: 'Thokkottu',
    coordinates: { latitude: 12.7892, longitude: 74.8764 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Thokkottu, Mangalore'
  },

  // Other Important Bus Stops
  {
    placeId: 'dk_mulki',
    name: 'Mulki Bus Stand',
    address: 'Mulki, Mangalore, Karnataka 574154',
    city: 'Mulki',
    coordinates: { latitude: 13.0906, longitude: 74.7939 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Mulki, Mangalore'
  },
  {
    placeId: 'dk_bajpe',
    name: 'Bajpe Bus Stop',
    address: 'Bajpe, Mangalore, Karnataka 574142',
    city: 'Bajpe',
    coordinates: { latitude: 12.9597, longitude: 74.8894 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Bajpe, Mangalore'
  },
  {
    placeId: 'dk_kateel',
    name: 'Kateel Bus Stop',
    address: 'Kateel, Mangalore, Karnataka 574143',
    city: 'Kateel',
    coordinates: { latitude: 13.0267, longitude: 74.9539 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Kateel, Mangalore'
  },
  {
    placeId: 'dk_manipal_end_point',
    name: 'Manipal End Point Bus Stop',
    address: 'End Point, Manipal, Karnataka 576104',
    city: 'Manipal',
    coordinates: { latitude: 13.3494, longitude: 74.7906 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Manipal'
  }
];

// Additional Dakshina Kannada bus stops (extended coverage)
const additionalDkStops = [
  // Mangalore urban extensions
  {
    placeId: 'dk_mangalore_deralakatte',
    name: 'Deralakatte Bus Stop',
    address: 'Deralakatte, Mangalore, Karnataka 575018',
    city: 'Mangalore',
    coordinates: { latitude: 12.8143, longitude: 74.8723 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Deralakatte, Mangalore'
  },
  {
    placeId: 'dk_mangalore_kulshekar',
    name: 'Kulshekar Bus Stop',
    address: 'Kulshekar, Mangalore, Karnataka 575005',
    city: 'Mangalore',
    coordinates: { latitude: 12.8730, longitude: 74.8650 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Kulshekar, Mangalore'
  },
  {
    placeId: 'dk_mangalore_yeyyadi',
    name: 'Yeyyadi Bus Stop',
    address: 'Yeyyadi, Mangalore, Karnataka 575008',
    city: 'Mangalore',
    coordinates: { latitude: 12.9125, longitude: 74.8690 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Yeyyadi, Mangalore'
  },
  {
    placeId: 'dk_mangalore_bondel',
    name: 'Bondel Bus Stop',
    address: 'Bondel, Mangalore, Karnataka 575008',
    city: 'Mangalore',
    coordinates: { latitude: 12.9342, longitude: 74.8698 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Bondel, Mangalore'
  },
  // Bantwal taluk additions
  {
    placeId: 'dk_bantwal_melkar',
    name: 'Melkar Bus Stop',
    address: 'Melkar, Bantwal, Karnataka 574231',
    city: 'Bantwal',
    coordinates: { latitude: 12.8768, longitude: 75.0294 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Melkar, Bantwal'
  },
  {
    placeId: 'dk_bantwal_farangipete',
    name: 'Farangipete Bus Stop',
    address: 'Farangipete, Bantwal, Karnataka 574143',
    city: 'Bantwal',
    coordinates: { latitude: 12.9070, longitude: 74.9760 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Farangipete, Bantwal'
  },
  // Belthangady additions
  {
    placeId: 'dk_belthangady_guruvayanakere',
    name: 'Guruvayanakere Bus Stop',
    address: 'Guruvayanakere, Belthangady, Karnataka 574217',
    city: 'Belthangady',
    coordinates: { latitude: 13.0158, longitude: 75.2846 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Guruvayanakere, Belthangady'
  },
  // Puttur/Sullia corridor
  {
    placeId: 'dk_puttur_nekkilady',
    name: 'Nekkilady Bus Stop',
    address: 'Nekkilady, Puttur, Karnataka 574202',
    city: 'Puttur',
    coordinates: { latitude: 12.7720, longitude: 75.2100 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Nekkilady, Puttur'
  },
  {
    placeId: 'dk_sullia_jalsur',
    name: 'Jalsur Bus Stop',
    address: 'Jalsur, Sullia, Karnataka 574239',
    city: 'Sullia',
    coordinates: { latitude: 12.5825, longitude: 75.4080 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Jalsur, Sullia'
  },
  {
    placeId: 'dk_uppinangady_nelyadi',
    name: 'Nelyadi Bus Stop',
    address: 'Nelyadi, Uppinangady, Karnataka 574241',
    city: 'Uppinangady',
    coordinates: { latitude: 12.8663, longitude: 75.4450 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Nelyadi, Uppinangady'
  },
  // Moodbidri additions
  {
    placeId: 'dk_moodbidri_alangar',
    name: 'Alangar Bus Stop',
    address: 'Alangar, Moodbidri, Karnataka 574227',
    city: 'Moodbidri',
    coordinates: { latitude: 13.0820, longitude: 74.9990 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Alangar, Moodbidri'
  },
  // Coastal stretch additions
  {
    placeId: 'dk_mangalore_someshwara',
    name: 'Someshwara Bus Stop',
    address: 'Someshwara, Mangalore, Karnataka 575023',
    city: 'Mangalore',
    coordinates: { latitude: 12.8053, longitude: 74.8565 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Someshwara, Mangalore'
  },
  {
    placeId: 'dk_mangalore_talapady',
    name: 'Talapady Bus Stop',
    address: 'Talapady, Mangalore, Karnataka 575023',
    city: 'Mangalore',
    coordinates: { latitude: 12.7840, longitude: 74.8790 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Talapady, Mangalore'
  },
  {
    placeId: 'dk_mulki_haleyangadi',
    name: 'Haleyangadi Bus Stop',
    address: 'Haleyangadi, Mulki, Karnataka 574146',
    city: 'Mulki',
    coordinates: { latitude: 13.0650, longitude: 74.7895 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Haleyangadi, Mulki'
  },
  {
    placeId: 'dk_mulki_karnad',
    name: 'Karnad Bus Stop',
    address: 'Karnad, Mulki, Karnataka 574154',
    city: 'Mulki',
    coordinates: { latitude: 13.0595, longitude: 74.7910 },
    types: ['bus_station', 'transit_station'],
    businessStatus: 'OPERATIONAL',
    vicinity: 'Karnad, Mulki'
  }
];

async function seedDakshinaKannadaBusStops() {
  try {
    console.log('🌱 Starting Dakshina Kannada Bus Stops seeding...');

    // Connect to MongoDB if not already connected
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ksrtc-tracking', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('✅ Connected to MongoDB');
    }

    // Delete existing Dakshina Kannada bus stops
    const dkCities = [...new Set([...dakshinaKannadaBusStops, ...additionalDkStops].map(stop => stop.city))];
    console.log(`🗑️  Removing old bus stops for cities: ${dkCities.join(', ')}`);
    
    const deleteResult = await BusStop.deleteMany({
      city: { $in: dkCities }
    });
    console.log(`🗑️  Deleted ${deleteResult.deletedCount} old bus stops`);

    // Insert new bus stops
    let insertedCount = 0;
    let skippedCount = 0;

    for (const stopData of [...dakshinaKannadaBusStops, ...additionalDkStops]) {
      try {
        const busStop = new BusStop({
          ...stopData,
          lastFetched: new Date()
        });
        await busStop.save();
        insertedCount++;
        console.log(`✅ Added: ${stopData.name} (${stopData.city})`);
      } catch (error) {
        if (error.code === 11000) {
          skippedCount++;
          console.log(`⏭️  Skipped duplicate: ${stopData.name}`);
        } else {
          console.error(`❌ Error adding ${stopData.name}:`, error.message);
        }
      }
    }

    console.log('\n📊 Seeding Summary:');
    console.log(`✅ Successfully inserted: ${insertedCount} bus stops`);
    console.log(`⏭️  Skipped duplicates: ${skippedCount} bus stops`);
    console.log(`📍 Total unique cities: ${dkCities.length}`);
    console.log(`🌟 Dakshina Kannada bus stops seeding completed!\n`);

    return { insertedCount, skippedCount, cities: dkCities };
  } catch (error) {
    console.error('❌ Error seeding bus stops:', error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  seedDakshinaKannadaBusStops()
    .then(() => {
      console.log('✅ Seeding completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Seeding failed:', error);
      process.exit(1);
    });
}

module.exports = { seedDakshinaKannadaBusStops, dakshinaKannadaBusStops };

