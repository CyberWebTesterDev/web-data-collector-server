//Спред-оператор
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var obj = { a: 1, b: 2, c: 3 };
var obj2 = { d: 4 };
console.log(__assign({}, obj)); //выводит {a: 1, b:2, c: 3}
console.log(__assign(__assign({}, obj), obj2)); // выводит расширенный объект { a: 1, b: 2, c: 3, d: 4 }
//расширяем объект новой парой ключ-значение
console.log(__assign(__assign({}, obj), { e: 5 })); // выводит { a: 1, b: 2, c: 3, e: 5 }
//сам объект прежний
console.log(obj); // выводит { a: 1, b: 2, c: 3 }
//можно клонировать объект
var objClone = __assign({}, obj);
console.log(objClone); // выводит { a: 1, b: 2, c: 3 }
var arr = ['a', 'b', 'c'];
console.log.apply(console, arr); //выводит a b c
//расширяем массив
console.log.apply(//выводит a b c
console, __spreadArray(__spreadArray([], arr), ['d'])); //выводит a b c d
//при этом сам массив прежний
console.log(arr); //выводит [ "a", "b", "c" ]
