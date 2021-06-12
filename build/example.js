//Спред-оператор
let obj = { a: 1, b: 2, c: 3 };
let obj2 = { d: 4 };
console.log({ ...obj }); //выводит {a: 1, b:2, c: 3}
console.log({ ...obj, ...obj2 }); // выводит расширенный объект { a: 1, b: 2, c: 3, d: 4 }
//расширяем объект новой парой ключ-значение
console.log({ ...obj, e: 5 }); // выводит { a: 1, b: 2, c: 3, e: 5 }
//сам объект прежний
console.log(obj); // выводит { a: 1, b: 2, c: 3 }
//можно клонировать объект
let objClone = { ...obj };
console.log(objClone); // выводит { a: 1, b: 2, c: 3 }
let arr = ['a', 'b', 'c'];
console.log(...arr); //выводит a b c
//расширяем массив
console.log(...arr, 'd'); //выводит a b c d
//при этом сам массив прежний
console.log(arr); //выводит [ "a", "b", "c" ]
