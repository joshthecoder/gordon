@app
gordon-api

@http
get /recipes

@static
folder ../gordon-web/dist
spa true

@aws
# profile default
region us-west-2
architecture arm64
