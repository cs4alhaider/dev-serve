# dev-serve

### TODO:

- [x] add express and nodemon
- [x] build services json model
- [x] get `('/all')` to retrieve all data
- [x] enable get `/services/:id`
- [ ] enable get `/testData?relatedToProject=MMD-3993,MMD-4003`
- [x] use `yup` for requests validations
- [x] use `helmet` for security
- [x] mapping all services to same app services using `app.use`
- [x] docker file
- [x] docker-compose
- [ ] automate creating files
- [ ] segregate `POST`, `PUT`, and `DELETE` requests to admins only
- [ ] service endpoint `/postman/collections` to convert all available services into Postman collections v2
- [ ] service endpoint `/postman/environments` to retrieve all environments variables for Postman v2
- [ ] service endpoint `/postman/globals` to retrieve all global variables for Postman v2
- [ ] build docker image
- [ ] upload and share docker image
- [ ] deploy docker image
- [ ] create CI/CD pipeline to listen on pull requests and branch changes to take actions
  - [ ] validate code
  - [ ] run `prettier` for code styling
  - [ ] restart server once code pushed into master branch
  - [ ] optional -> send Slack notification
- [ ] optional todos:
  - [ ] build simple mobile app if useful to add test data by internal teams
  - [ ] integrate mongoDB
  - [ ] build user model
  - [ ] simple UI for login
  - [ ] username and password access to view all services and test data
  - [ ] reporting all users logs and number of requests
