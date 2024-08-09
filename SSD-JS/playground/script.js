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
console.log(typeof console.log); // function

const jsonString = JSON.stringify(product);
console.log(jsonString);

console.log("hello".toUpperCase());
console.log("hello".length);
console.log("====================================");
console.log();
console.log("====================================");

////////////////////////

const object1 = {
  message: "hello",
};

const object2 = object1;

object1.message = "good job";

console.log(object1.message);

const object3 = {
  message: "good job",
};

console.log(object1 === object3); //false
console.log(object1 === object2); //true

const object4 = {
  message: "Good job!",
  price: "799",
};

console.log("====================================");
console.log("shortcuts");
console.log("====================================");
//shortcuts

//const message = object4.message;
const { message, price } = object4; //*kısayol*// messageyi object4'ten alır ve message adında değişken oluşturup kaydeder

console.log(message);
console.log(price);

const object5 = {
  //message: message,
  message, //*kısayol// değişken adıyla değişken değeri aynı ise sadece 1 kere yazabilirsin.

  //method: function helloYazdir() {
  //console.log("hello");
  //},
  method() {
    console.log("hello");
  }, //*KISAYOL//
};
console.log(object5);
console.log(object5.message);
object5.method();

console.log("====================================");
console.log("practices");
console.log("====================================");
//practices
//1
const product2 = {
  name: "basketball",
  price: 2095,
};

const product3 = {
  name: "t-shirt",
  price: 3399,
};
console.log(product2);
product2.price += 500;
console.log(product2);

product2["delivery-time"] = "3 days";

console.log(product2);
function comparePrice(product1, product2) {
  if (product1.price > product2.price) return product1.name;
  else return product2.name;
}
console.log(comparePrice(product2, product3));

//2

const product4 = {
  name: "futball ball",
  price: 1099,
};

const product5 = {
  name: "futball ball",
  price: 1099,
};

function isSameProduct(product1, product2) {
  if (product1.name !== product2.name || product1.price !== product2.price)
    return false;
  else return true;
}

console.log(isSameProduct(product4, product5));

//3
let morningMsg = "good morning";
//morningMsg.toUpperCase(); //*!bu çalışmaz
console.log(morningMsg.toUpperCase()); // 'GOOD MORNING'

//4

let repeatedMsg = "Again";

console.log(repeatedMsg.repeat(22));
