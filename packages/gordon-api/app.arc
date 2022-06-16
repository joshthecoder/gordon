@app
gordon-api

@http
get /recipes
post /recipes

@static
folder ../gordon-web/dist
spa true

@tables
recipes
	id *String
	title String


@aws
# profile default
region us-west-2
architecture arm64
