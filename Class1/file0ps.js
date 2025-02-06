const fs = require('fs');

fs.writeFileSync('example.txt', "Hello, my name is Hieu. I am learning node js!");
console.log("Đã ghi nội dung vào file example.txt");

const data = fs.readFileSync('example.txt', 'utf8');
console.log("Content: ", data);