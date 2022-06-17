@app
gordon-api

@http
get /recipes
post /recipes
get /upload-url

@static
folder ../gordon-web/dist
spa true

@tables
recipes
	id *String
	title String
	previewImage String


@aws
# profile default
region us-east-1
architecture arm64
