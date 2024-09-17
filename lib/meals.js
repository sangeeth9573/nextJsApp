import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import fs from 'node:fs';
import {put } from '@vercel/blob';
const db = sql('meals.db');

export async function getMeals(){
   // await new Promise((resolve)=>setTimeout(resolve,2000));
   db.open;
    return db.prepare('SELECT * FROM meals').all();
    db.close();
}

export async function mealDetails(slug) {
    db.open;
    return db.prepare(`SELECT * FROM meals WHERE slug = ?`).get(slug);
    db.close();
}

export async function saveMeal(meal) {
    meal.slug = slugify(meal.title,{lower:true});
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
    const {url} = await put(fileName, meal.image, {
        access: 'public',
      });
    meal.image = url;
    db.open;
    db.prepare(`INSERT INTO meals (title,summary,instructions,image,slug,creator,creator_email) 
        VALUES(
        @title,
        @summary,
        @instructions,
        @image,
        @slug,
        @creator,
         @creator_email)`).run(meal);

         db.close();
}