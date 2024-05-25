const mongoose = require('mongoose');
//const mongoURI = "mongodb+srv://amuverma543:987654321@cluster0.llod3bi.mongodb.net/hungrezy";
const mongoURI = process.env.MONGO_URL;
const connectToMongoDB = async () => {
   try {
      await mongoose.connect(mongoURI, {
         useNewUrlParser: true,
         useUnifiedTopology: true
      });
      
      console.log('Connected to MongoDB Atlas');

      // Access the collection directly through Mongoose
      const FoodItem = mongoose.model('food_items', new mongoose.Schema({}), 'food_items');

      // Fetch data from the collection
      const docs = await FoodItem.find({}).exec();
      //console.log('Documents in collection:', docs);

      // Fetch data from the 'foodCategory' collection
      const foodCategories = mongoose.model('foodCategory', new mongoose.Schema({}), 'foodCategory');
      const docs2 = await foodCategories.find({}).exec();
     // console.log('Food categories:', docs2);

      // Assign fetched data to global variables if needed
      global.food_items = docs;
      global.foodCategory = docs2;

   } catch (err) {
      console.error('Error connecting to MongoDB Atlas or fetching data:', err);
   }
}

module.exports = connectToMongoDB;

