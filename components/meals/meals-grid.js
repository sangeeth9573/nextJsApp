import MealItem from './meal-item';
import clasees from './meals-grid.module.css';
export default function MealsGrid({meals}){
    return(
        <ul className={clasees.meals}>
            {meals.map(meal=><li key={meal.id}>
                <MealItem {...meal} />
            </li>)}
        </ul>
    )
}