// Using ES6 Classes
class esArray {
    constructor(){
        // edge case: there are no input arguments, make sure length is set to 0
        this.length = 0

        // iterate through all arguments
        for(let i = 0; i < arguments.length; i++){
            // create each new argument as key/value pair
            this[i] = arguments[i]
            // set length
            this.length = i + 1
        }

    }
    push(input){

        // create new key/value pair based on input
        this[this.length] = input
        // increment length
        this.length++

        // return new length
        return this.length
    }
    pop(){
        // create copy of the element at the end of the array
        let returnVal = this[this.length-1]

        // delete item at end of the array
        delete this[this.length-1]

        // decrement the length prop
        this.length--

        // return the copied end value
        return returnVal

    }
    filter(callback){

        // create a new empty array to eventually return
        let returnArray = new esArray()

        // iterate through all items in array
        for(let i = 0; i < this.length; i++){
            // if the provided callback function is satisfied
            if(callback(this[i])){
                // push the item to the return array
                returnArray.push(this[i])
            }
        }
        
        // return returnArray
        return returnArray
    }
}

// Using functional instantiation
function fiArray(){
    // make it default to it's own prototype on failed lookups to link up prototype methods
    let returnObj = Object.create(fiArray.prototype)

    // track length, default value 0 in case of no arguments
    let length = 0;

    // add each element sent in
    for(let i=0; i < arguments.length; i++){
        returnObj[i] = arguments[i]
        length = i + 1
    }

    // add in length as a property
    returnObj.length = length

    // return the return object
    return returnObj
}
fiArray.prototype.push = function(input) {
    // create new key/value pair based on input
    this[this.length] = input
    // increment length
    this.length++

    // return new length
    return this.length
}
fiArray.prototype.pop = function() {
    // create copy of the element at the end of the array
    let returnVal = this[this.length-1]

    // delete item at end of the array
    delete this[this.length-1]

    // decrement the length prop
    this.length--

    // return the copied end value
    return returnVal
}
fiArray.prototype.filter = function(callback) {

    // create a new empty array to eventually return
    let returnArray = fiArray()

    // iterate through all items in array
    for(let i = 0; i < this.length; i++){
        // if the provided callback function is satisfied
        if(callback(this[i])){
            // push the item to the return array
            returnArray.push(this[i])
        }
    }
    
    // return returnArray
    return returnArray
}

// ES6 array class testing
let friends = new esArray('Jordyn', 'Mikenzi')
console.log(friends)

friends.push('Joshy')
console.log(friends)

friends.push('Jake')
console.log(friends)

friends.pop()
console.log(friends)

friends = friends.filter( (friend) => 
    friend.charAt(0) !== "J"
)
console.log(friends)

// Functional Instatiation class testing
let friendsFi = fiArray('JordynFi', 'MikenziFi')

friendsFi.push('JoshyFi')
console.log(friendsFi)

friendsFi.push('JakeFi')
console.log(friendsFi)

friendsFi.pop()
console.log(friendsFi)

friendsFi = friendsFi.filter( (friend) => 
    friend.charAt(0) !== "J"
)
console.log(friendsFi)