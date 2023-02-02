const fs = require("fs");
const Pool = require("pg").Pool;
const fastcsv = require("fast-csv");
require("dotenv").config();
console.log(require("dotenv").config());

const filePath = "daejeon-sample-202212.csv";

let stream = fs.createReadStream(filePath);
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function (data) {
    temp = [data[5], data[1], data[9], data[3], data[2]];
    csvData.push(temp);
  })
  .on("end", function () {
    // remove the first line: header
    csvData.shift();
    // create a new connection to the database
    const pool = new Pool({
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: "curation",
      ssl: true,
    });

    pool.connect((err, client, done) => {
      if (err) throw err;

      try {
        csvData.forEach((row) => {
          const query = `INSERT INTO book (ISBN, title, subject, publisher, author) VALUES ($1, $2, $3, $4, $5)`;
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
