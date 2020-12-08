# spreadsheet

This repository is used to demonstrate how to generate & redirect spreadsheet using office integrator api's.

Run following command to run the application in your machine.

```sh
git clone https://github.com/iampraba/spreadsheet.git
```

```sh
cd spreadsheet
```

```sh
npm install
```

```sh
npm start
```

Once server is started, user below url to generate a spreadsheet.

To create a new spreadsheet - http://localhost:3000/spreadsheet/new

To create multiple session for same spreadsheet, use same `spreadsheet-id` in below url. 

i.e - http://localhost:3000/spreadsheet/<spreadsheet-id> 

e.x: http://localhost:3000/spreadsheet/10000

Live Example: 

To create a new spreadsheet - https://sheetg-699959938.development.zohocatalyst.com/server/spreadsheet/new

To access a existing spreadsheet - https://sheetg-699959938.development.zohocatalyst.com/server/spreadsheet/10000
