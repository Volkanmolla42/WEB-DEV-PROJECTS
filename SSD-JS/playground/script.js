const product = {
  name: "Socks",
  price: 1090,
};

console.log(product);

console.log(product.name);

console.log(product.price);

product.name = "çorap";

console.log(product);

product.newProperty = true;

console.log(product);

delete product.name;

console.log(product);
