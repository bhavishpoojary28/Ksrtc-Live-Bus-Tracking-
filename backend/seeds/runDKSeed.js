require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const { seedDakshinaKannadaBusStops } = require('./dakshinaKannadaBusStops');

console.log('🚀 Running Dakshina Kannada Bus Stops Seeder...\n');
console.log('📝 This will add 36+ government bus stops from Dakshina Kannada district\n');

seedDakshinaKannadaBusStops()
  .then((result) => {
    console.log('\n✅ SUCCESS! Bus stops have been added to your database.');
    console.log(`\n📊 Results:`);
    console.log(`   - Inserted: ${result.insertedCount} bus stops`);
    console.log(`   - Skipped: ${result.skippedCount} duplicates`);
    console.log(`   - Cities covered: ${result.cities.length}`);
    console.log(`\n🌍 Cities: ${result.cities.join(', ')}`);
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ FAILED! Error occurred during seeding:', error.message);
    process.exit(1);
  });

