import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import Pizzalist from '../components/PizzaList'

export default function SingleToppingPage({ data: { topping } }) {
  return (
	<div>
	  <div>
		<h2 className="mark">{pizza.name}</h2>
		<ul>
		  {pizza.toppings.map((topping) => (
			<li key={topping.id}>{topping.name}</li>
		  ))}
		</ul>
	  </div>
	</div>
  );
}

export const query = graphql`
  query($slug: String!) {
	pizza: sanityPizza(slug: { current: { eq: $slug } }) {
	  name
	  id
	  image {
		asset {
		  fluid(maxWidth: 800) {
			...GatsbySanityImageFluid
		  }
		}
	  }
	  toppings {
		name
		id
		vegetarian
	  }
	}
  }
`;
