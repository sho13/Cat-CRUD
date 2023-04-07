# Codecademy-CRUD
## Codecademy-CRUD is a RESTful API that allows users to upload and manage cat pictures. The API supports the following operations:

- Upload a cat pic.
- Delete a cat pic.
- Update a previously uploaded cat pic (not just metadata) in place.
- Fetch a particular cat image file by its ID.
- Fetch a list of the uploaded cat pics.

The API uses HTTP response codes to indicate success or failure and provides error handling. Documentation is provided for the API's behavior, and instructions are included for getting the API up and running.

### Technologies Used
This app is built using Node.js, Express.js, and Sqlite3
Jest is used for testing
Swagger is used for OpenAPI documentation.


## Documentation

### Installation

```
git clone https://github.com/sho13/codecademy-crud.git
cd codecademy-crud
```
**Install dependencies**:

**NPM**:
`npm install`

## Get Server started
`npm start`

### Watchmode
`npm run watch`

## Use Docker
`npm run docker-build`

`npm run docker-start`

## Test
`npm test`
Cats only i'm sorry :sob:

## API Reference
[Open API documentation (Cat endpoints only)](localhost:3000/api/docs)

### Authentication endpoints:
#### POST auth/register - Create a new user account. Params: username, password.

example:

`curl -X POST -H "Content-Type: application/json" -d '{"username": "username", "password": "password"}' localhost:3000/auth/register`

#### POST auth/login - Logs in an existing user. Params: username, password. 

(Note: storing session id is necessary for cUrl requests with `-c FILENAME.txt` command)

example:

`curl -X POST -H "Content-Type: application/json" -d '{"username": "narsha", "password": "password"}' localhost:3000/auth/login -c session.txt`

#### POST auth/logout - Logs out an existing user. Params: none 

(Note: No params required but session data must be sent back with `-b FILENAME.txt` and if you're not cd'd in the fodler will need it to be `-b PATH/TO/FILENAME.txt`)

example:

`curl -s -X POST localhost:3000/auth/logout -b session.txt`

### Cat Endpoints:
(Note: All of these endpoints, except for `GET /cats` require the appropriate user to be signed in and send back session data with `-b FILENAME.txt`.

#### GET /cats - returns a list of uploaded Cat pics. Params: none

example:

`curl -s GET localhost:3000/api/cats`

#### GET /cats/:id - returns the image file of a single Cat that belongs to the signed in user. Params: id (number id of cat)

example:

`curl -s GET localhost:3000/api/cats/1 -b session.txt`

#### POST /cats - Upload one cat pic and get the file back. multipart/form-data: name (string name of cat), media (path to local file string)

example:

`curl -v -X POST -F 'media=@/PATH/OF/CAT.png' -F "name=cattycat" localhost:3000/api/cats -b session.txt`

#### PUT /cats/:id - updates a single Cat's image file and metadata and returns its metadata. Old file will be deleted. Params: id (number id of cat) multipart/form-data: name (string name of cat), media (path to local file string)

example:

`curl -s -X PUT -F 'media=@/PATH/OF/CAT.png' -F "name=kattykat" localhost:3000/api/cats/4 -b session.txt`

#### DELETE /cats/:id - deletes a single Cat entry and its corresponding image file. Params: id (number id of cat)

example:

`curl -v -X DELETE localhost:3000/api/cats/1 -b session.txt`


### Future Improvements
Some possible improvements for the project include:

- Storing cat pictures in a cloud storage service like AWS S3.
- Providing additional image processing capabilities like resizing and cropping.
