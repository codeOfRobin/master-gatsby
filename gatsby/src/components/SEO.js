import React from 'react';
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

export default function SEO({children, location, description, title, image}) {
	
	const {site} = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					title
					description
					twitter
				}
			}
			}	
	`)
	
	return (<Helmet titleTemplate={`%s - ${site.siteMetadata.title}`}>
	<html lang="en"/>
	<title> {title} </title>
	<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
	<link rel="alternate-icon" href="/favicon.ico" />
	</Helmet>)
}