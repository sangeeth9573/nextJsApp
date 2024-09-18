
import slugify from 'slugify';
import xss from 'xss';
import { put } from '@vercel/blob';
import { MongoClient } from 'mongodb';

export async function getMeals() {
    const client = await MongoClient.connect('mongodb+srv://17b65a0104:CrafYbXogKyHwXPh@meals.hdfpe.mongodb.net/mealTable?retryWrites=true&w=majority&appName=meals');
    const db = client.db();
    const mealCollection = db.collection('mealTable');
    const result = await mealCollection.find().toArray();
    client.close();
    return result;
}

export async function mealDetails(searchSlug) {
    const client = await MongoClient.connect('mongodb+srv://17b65a0104:CrafYbXogKyHwXPh@meals.hdfpe.mongodb.net/mealTable?retryWrites=true&w=majority&appName=meals');
    const db = client.db();
    const mealCollection = db.collection('mealTable');
    const result = await mealCollection.findOne({ slug: searchSlug });
    client.close();
    return result;
}

export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);
    const extention = meal.image.name.split('.').pop();
    const fileName = `${meal.title}.${extention}`;
    // const stream = fs.createWriteStream(`public/images/${fileName}`);
    //const bufferArray = await meal.image.arrayBuffer();
    // stream.write(Buffer.from(bufferArray),(error)=>{
    //    if(error)
    //    {
    //     throw new Error('Saving the Image Failed!');
    //    }
    // })
    const { url } = await put(fileName, meal.image, {
        access: 'public',
    });
    meal.image = url;
    const client = await MongoClient.connect('mongodb+srv://17b65a0104:CrafYbXogKyHwXPh@meals.hdfpe.mongodb.net/mealTable?retryWrites=true&w=majority&appName=meals');
    const db = client.db();
    const mealCollection = db.collection('mealTable');
    await mealCollection.insertOne(meal);
    client.close();

}