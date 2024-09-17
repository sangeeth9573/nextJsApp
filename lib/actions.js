'use server';

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";
function invalidText(text)
{
   return !text || text.trim()==='';

}
export async function shareMeal(fromData){

   const meal={
    title : fromData.get('title'),
    summary : fromData.get('summary'),
    instructions : fromData.get('instructions'),
    image : fromData.get('image'),
    creator : fromData.get('name'),
    creator_email : fromData.get('email')
   }
   if(invalidText(meal.title)||
      invalidText(meal.summary)||
      invalidText(meal.instructions)||
      invalidText(meal.creator)||
      invalidText(meal.creator_email)||
      !meal.creator_email.includes('@')||
      !meal.image ||
      meal.image.size ===0)
      {
         return{
            message : 'Invalid Input'
         }
      }
   await saveMeal(meal);
   revalidatePath('/meals','layout');
   redirect('/meals');
  }