const fs = require("fs");
// const { Client } = require("pg");
// const csv = require("csv-parser");
const Pool = require("pg").Pool;
const fastcsv = require("fast-csv");
// require("dotenv").config();

// const client = new Client({
//   host: "eunk.postgres.database.azure.com",
//   port: 5432,
//   username: "eunk",
//   password: "kkmin123!",
//   database: "curation",
// });

// client.connect();

// fs.createReadStream("daejeon-sample-202212.csv")
//   .pipe(csv())
//   .on("data", (data) => {
//     const values = [data[5], data[1], data[9], data[3], data[2]];
//     const query = `INSERT INTO target_table (ISBN, title, subject, publisher, author) VALUES ($1, $2, $3, $4, $5)`;
//     client.query(query, values, (err, res) => {
//       console.log(err ? err.stack : res.rows[0]);
//     });
//   })
//   .on("end", () => {
//     client.end();
//   });

let stream = fs.createReadStream("test.csv");
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function (data) {
    // console.log(data);
    temp = [data[5], data[1], data[9], data[3], data[2]];
    // console.log(temp);
    csvData.push(temp);
  })
  .on("end", function () {
    // remove the first line: header
    csvData.shift();
    console.log(csvData);
    // create a new connection to the database
    const pool = new Pool({
      host: "eunk.postgres.database.azure.com",
      port: 5432,
      username: "eunk",
      password: "kkmin123!",
      database: "curation",
      ssl: true,
    });

    pool.connect((err, client, done) => {
      if (err) throw err;

      try {
        csvData.forEach((row) => {
          const query = `INSERT INTO book (ISBN, title, subject, publisher, author) VALUES ('${row[0]}', '${row[1]}', '${row[2]}', '${row[3]}', '${row[4]}')`;
          client.query(query, row, (err, res) => {
            if (err) {
              console.log(err.stack);
            } else {
              console.log("inserted " + res.rowCount + " row:", row);
            }
          });
        });
      } finally {
        done();
      }
    });
  });

stream.pipe(csvStream);

// const { Client } = require("pg");
// const fs = require("fs");
// const csv = require("csv-parser");
// require("dotenv").config();

// const client = new Client({
//   host: process.env.DB_HOST,
//   port: +process.env.DB_PORT,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: "curation",
// });
// client.connect();

// let results = [];
// fs.createReadStream("daejeon-sample-202212.csv")
//   .pipe(csv())
//   .on("data", (data) => {
//     // 번호0,도서명(1),저자2,출판사3,발행년도4,ISBN 5,세트ISBN 6,부가기호 7,권 8,주제분류번호 9,도서권수,대출건수,등록일자,
//     temp = [data[5], data[1], data[9], data[3], data[4], data[2]];
//     results.push(data);
//   })
//   .on("end", () => {
//     console.log(results);
//   });

// results.forEach(async (row) => {
//   const query =
//     "INSERT INTO book (ISBN, title, subject, publisher, publicationDate, author) VALUES";
//   const values = [row.column1, row.column2, row.column3, ];
//   await client.query(query, values);
// });

// client.end();
