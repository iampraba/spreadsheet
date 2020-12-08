# spreadsheet

This repoistory is used to demonstrate how to generate & redirect  spreadsheet using office integrator api's.

Run following command to run the application

git clone https://github.com/iampraba/spreadsheet.git

cd spreadsheet

npm install

node index.js


Once server is started, user below url to generate a spreadsheet.

To Create a new - http://localhost:3000/spreadsheet/new

To create multiple session for same spreadsheet, use a document in the url. 

i.e - http://localhost:3000/spreadsheet/<spreadsheet-id> 

e.x: http://localhost:3000/spreadsheet/10000