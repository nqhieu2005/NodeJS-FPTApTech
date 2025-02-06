const { error } = require('console');
const http = require('http');
const { extname } = require('path');

let products = [
    { id: 1, name: "Laptop", price: 15000000 },
    { id: 2, name: "Chuột không dây", price: 500000 },
    { id: 3, name: "Bàn phím cơ", price: 1200000 }
];

let productID = products.length + 1;
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify(products));
    } else if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const product = JSON.parse(body);
                if (!product.name || !product.price) {
                    res.writeHead(400);
                    res.end(JSON.stringify({
                        error: "Dữ liệu không hợp lệ. Vui lòng gửi theo định dạng",
                        example: { name: "Sản phẩm mẫu", price: 100000 }
                    }));
                    return;
                }
                product.id = productID++;
                products.push(product);

                res.writeHead(201);
                res.end(JSON.stringify({ message: "Sản phẩm đã thêm", data: product }));
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({
                    error: "Dữ liệu JSON không hợp lệ. Vui lòng gửi theo định dạng.",
                    example: { name: "Sản phẩm mẫu", price: 100000 }
                }));
            }
        });
    } else {
        res.writeHead(405);
        res.end(JSON.stringify({ error: "Phương thức không được hỗ trợ" }));
    }
});

server.listen(4000, () => console.log("API chạy tại http://localhost:4000"));