import path from 'path';
import fetch from 'isomorphic-fetch';

async function turnPizzasIntoPages({ graphql, actions }) {
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');

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
    }
  `);

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

async function turnToppingsIntoPages({ graphql, actions }) {
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');
  
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `)
  
  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name
      },
    });
  })
}

async function fetchBeersAndTurnIntoNodes({actions, createNodeId, createContentDigest}) {
  // 1. Fetch a  list of beers
  const res = await fetch('https://sampleapis.com/beers/api/ale');
  const beers = await res.json();
  // 2. Loop over each one
  for (const beer of beers) {
    // create a node for each beer
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };
    // 3. Create a node for that beer
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  }
}

async function turnSliceMastersIntoPages({graphql, actions}) {
  const {data} = await graphql(`
    query {
      sliceMasters: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }    
  `)
  
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE)
  const pageCount = Math.ceil(data.sliceMasters.totalCount / pageSize) 
  Array.from({length: pageCount}).forEach((_, index) => {
    console.log(`creating page ${index}`)
    actions.createPage({
      path: `/slicemaster/${index+1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      context: {
        skip: index * pageSize,
        currentPage: index + 1,
        pageSize: pageSize
      }
    })
  })
  
  console.log(data)
   
  const sliceMasterTemplate = path.resolve('./src/templates/SliceMaster.js')
  data.sliceMasters.nodes.forEach((person) => {
    actions.createPage({
      path: `slicemaster/${person.slug.current}`,
      component: sliceMasterTemplate,
      context: {
        slug: person.slug.current,
        name: person.name
      }
    })
  })
}

export async function sourceNodes(params) {
  await Promise.all(
    [
      fetchBeersAndTurnIntoNodes(params)
    ])
}

export async function createPages(params) {
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSliceMastersIntoPages(params)
  ])
}