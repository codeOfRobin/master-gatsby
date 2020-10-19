import { graphql } from 'gatsby';
import React from 'react';
import PizzaList from '../components/PizzaList';
import ToppingsFilter from '../components/ToppsingsFilter';

export default function PizzasPage({ data }) {
  const pizzas = data.pizzas.nodes;
  return (
    <>
      <ToppingsFilter />
      <p> Hey! There are {pizzas.length} pizzas</p>
      <PizzaList pizzas={pizzas} />
    </>
  );
}

export const query = graphql`
  query PizzaQuery {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fixed(width: 200, height: 200) {
              ...GatsbySanityImageFixed
            }
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
