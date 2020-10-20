import path from 'path';

async function turnPizzasIntoPages({ graphql, actions }) {
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  const toppingTemplate = path.resolve('./src/templates/Topping.js');

  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
      toppings: allSanityTopping {
        nodes {
          vegetarian
          name
          id
        }
      } 
    }
  `);

  
  data.toppings.forEach((topping) => {
    
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        toppingData: topping
      }
    })
  })

  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

async function turnToppingsIntoPages(params) {}

export async function createPages(params) {
  await turnPizzasIntoPages(params);
}
