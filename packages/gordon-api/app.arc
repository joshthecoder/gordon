@app
gordon-api

@http
get /api/recipes
post /api/recipes
get /api/upload-url
post /api/login

@static
spa true
folder ../gordon-web/dist

@tables
recipes
	id *String
	title String
	previewImage String

users
  id *String

passwords
	userId *String


@aws
# profile default
region us-east-1
architecture arm64
bucket gordon-artifacts
policies
  arn:aws:iam::187872916272:policy/gordon-uploads
	architect-default-policies
