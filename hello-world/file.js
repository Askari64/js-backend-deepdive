const fs = require("fs");

//Sync
//fs.writeFileSync('./test.txt', "Hello World")

//Async
//fs.writeFile('./test.txt', "Hello World from Async \n", (err) => {})

fs.writeFileSync(
  "./contacts.txt",
  "Askari: +91 123456743 \nAnubis: +91 567898654 \nLisa: +74 45678975 \n"
);

/*const contacts = fs.readFileSync("./contacts.txt", "utf-8");
console.log(contacts);*/

fs.readFile("./contacts.txt", "utf-8", (err, result) => {
  if (err) {
    console.log("Error", err);
  } else {
    console.log(result);
  }
});

//fs.appendFileSync('./test.txt', `Today is ${new Date().getUTCDate().toLocaleString()} \n`)

//copy file
//fs.copyFileSync("./contacts.txt", "./copyContacts.txt");

//delete file
//fs.unlinkSync("./copyContacts.txt");
console.log(fs.statSync('./contacts.txt'))

//makes a new directory
//fs.mkdirSync('./myFiles')