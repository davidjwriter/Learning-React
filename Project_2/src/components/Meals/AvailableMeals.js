import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem';
import { useEffect, useState, useCallback } from 'react';



const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    const fetchMeals = useCallback(async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('https://react-http-739a7-default-rtdb.firebaseio.com/meals.json');
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }

        const data = await response.json();
        console.log(data);

        const loadedMeals = [];

        for (const key in data) {
          loadedMeals.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }
        console.log(loadedMeals);
        setMeals(loadedMeals);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    }, []);

    useEffect(() => {
      fetchMeals();
    }, [fetchMeals]);


  let content = <p>Found no meals.</p>;

    if (meals.length > 0) {
      content = meals.map(meal => 
        <MealItem
            name={meal.name}
            description={meal.description}
            price={meal.price}
            key={meal.id}
            id={meal.id}>
        </MealItem>);
    }

    if (error) {
      content = <p>{error}</p>;
    }

    if (isLoading) {
      content = <p>Loading...</p>;
    }

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {content}
                </ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;