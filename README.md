# offGridElectric
A currency converter in Node.js, MongoDB


1. Install Node
2. Clone the repo
3. cd to the directory where you cloned the app into
4. Npm Install to install module dependencies
5. install mongodb go to www.mongodb.com
6. start mongod using 
Path/to/mongodb/bin/mongod
7. run node server.js
8. Navigate to Localhost:8001

##### For Docker
1. run docker build -t offGridElectric
2. run docker-compose up
Make sure port 27017 is not held up by another process. Mongodb uses this port to connect on localhost
run lsof -i:27017 to see which process is holding onto port 27017

Server runs on port 8001 onn localhost

#### For Tests
1 run test.js on the directory in bash
