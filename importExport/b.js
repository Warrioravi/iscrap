let name="Abhishek";
let age=21;
//multipe exports as an object
module.exports.name=name;
module.exports.age=age;
//single export as a string
module.exports = name; //now this export statement will overwrite the earlier export object
