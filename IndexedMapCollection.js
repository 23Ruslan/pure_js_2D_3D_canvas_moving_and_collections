class IndexedMap{
    animals = [ 
        { key: 'Vasya', value: 'Cat'}, // setting the default array for all instances
        { key: 'Murka', value: 'Cat'},
        { key: 'Varna', value: 'Turtle'},
        { key: 'Kesha', value: 'Parrot'},
        { key: 'Nayda', value: 'Dog'},
        { key: 'Pufic', value: 'Hamster'},
        { key: 'Randy', value: 'dog'},
    ]
    set(key, value){
        if (!this.has(key)) // check if there is such a key
            this.animals.push( { key: key, value: value} );
    }
    has(key){
        function isTrue(element) {
            return element.key == key;
        }
        return this.animals.some(isTrue); // there is at least one true. callback
    }
    print(){
        this.animals.forEach( animal => {
            console.log(` ${animal.key} - ${animal.value}`);
        });
        console.log();
    }
    hasIndex(index) {
        let temporaryArray = this.animals;
        function isTrue(element) {
            return temporaryArray.indexOf(element) == index;
        }
        return this.animals.some(isTrue); // there is at least one true. callback
    }
    get(key) {
        for (let i = 0; i < this.animals.length; i++)
            if (this.animals[i].key == key)
                return this.animals[i];
        return null;
    }
    getByIndex(i) {
        return this.animals[i];
    }
    remove(key) {
        for (let i = 0; i < this.animals.length; i++)
            if (this.animals[i].key == key)
                this.animals.splice(i, 1); // next indexes (after that) move
        return this;
    }
    removeAt(index, count = 1) { // remove elements after the given element
        if (index + count < this.animals.length)
            this.animals.splice( index + 1, count ); // next indexes (after that) move
        return this;
    }
    setTo(index, key, value) { // add element after index
        if (index + 1 < this.animals.length) // do not access an element outside the array
            this.animals.splice( index, 0, { // next indexes (after that) move
                key: key,
                value: value
            });
        else
            this.set(key, value); // setting a new element after the last one, i.e. increasing the length of an array
        return this;
    }
    sort(sortByValue = (a, b) => a.value > b.value ? 1 : -1) { // default sort is sort alphabetically by value
        this.animals.sort(sortByValue); 
        return this;
    }
    sortIndexes(sortByIndex = (a, b) => this.animals.indexOf(a) > this.animals.indexOf(b) ? 1 : -1) { // default sort is sort by index in ascending order
        this.animals.sort(sortByIndex); 
        return this;
    }
    union(collection2) { // collection2 is the second collection we add to the current one
        this.animals = this.animals.concat(collection2.animals);
        return this;
    }
    uniq(){
        for (let i = 0; i < this.animals.length; i++)
            for(let j = i + 1; j < this.animals.length; j++)
                if( this.animals[i].key === this.animals[j].key )
                    this.animals.splice(j, 1);
        return this;
    }        
}

let collection1 = new IndexedMap(); // FINAL TESTING COMMANDS (run all together):

console.log(collection1.has('Vova'));
collection1.set('Vova', 'Dog');
console.log(collection1.has('Vova'));
collection1.print();

console.log(collection1.hasIndex(8));
console.log(collection1.hasIndex(1));
collection1.set('Vova', 'Dog');
collection1.print();

console.log(collection1.get('Murka1'));
console.log(collection1.get('Murka'));
console.log(collection1.get('Vova'));
collection1.remove('Murka');
collection1.print();

console.log(collection1.hasIndex(0));
console.log(collection1.hasIndex(1));
console.log(collection1.hasIndex(2));
console.log(collection1.hasIndex(3));
console.log(collection1.hasIndex(4));
console.log(collection1.hasIndex(5));
console.log(collection1.hasIndex(6));
console.log(collection1.hasIndex(7));
console.log(collection1.hasIndex(8));
console.log();

collection1.removeAt(4, 2);
console.log(collection1.hasIndex(3));
console.log(collection1.hasIndex(4));
console.log(collection1.hasIndex(5));
console.log(collection1.hasIndex(6));
console.log(collection1.hasIndex(7));
console.log(collection1.hasIndex(8));
console.log();

collection1.setTo(3, 'Lola', 'Cat');
console.log(collection1.hasIndex(3));
console.log(collection1.hasIndex(4));
console.log(collection1.hasIndex(5));
console.log(collection1.hasIndex(6));
console.log(collection1.hasIndex(7));
console.log(collection1.hasIndex(8));
console.log(collection1.get('Lola'));

collection1.print();
collection1.sort();
collection1.print();

collection1.sortIndexes();
collection1.print();

let collection2 = new IndexedMap();
collection1.union(collection2);
collection1.print();

collection1.uniq();
collection1.print();

console.log(collection1.getByIndex(3));