# localDatabase
Creates an object to hold and maintain data in an array of [Occurrence](./occurrence.md) objects. The object offers several features
usage:
```javascript
// ### create a local database with the name db ###
var db;

if (response.data.someArrayOfObject) {
   // ### directly put all data into the local database ###
   db = localDatabase(response.data.someArrayOfObject);
} else {
   // ### or define a blank database ###
   db = localDatabase();
}
```
## methods and functions
* [`buildKey()`](#buildKey)
* [`clear()`](#clear)
* [`commit()`](#commit)
* [`data()`](#data)
* [`drop()`](#drop)
* [`find()`](#find)
* [`getFieldScope()`](#getFieldScope)
* [`getIndex()`](#getIndex)
* [`getKey()`](#getKey)
* [`getKeyField()`](#getKeyField)
* [`getModifiedOccs()`](#getModifiedOccs)
* [`getNewOccs()`](#getNewOccs)
* [`getTouchedOccs()`](#getTouchedOccs)
* [`ignoreOnFind()`](#ignoreOnFind)
* [`insert()`](#insert)
* [`merge()`](#merge)
* [`occs()`](#occs)
* [`refresh()`](#refresh)
* [`rollback()`](#rollback)
* [`setKeyField()`](#setKeyField)
* [`setCustomIndex()`](#setCustomIndex)
* [`sortString()`](#sortString)
* [`sortNumeric()`](#sortNumeric)
* [`subscribe()`](#subscribe)
* [`updateIndex()`](#updateIndex)
* [`updateCustomIndex()`](#updateCustomIndex)

## buildKey
The function tries to return a key to for an occurrence. 
#### params:
* `String` | `Object` | `Array`: the Key to the Occurrence or the Object will all data needed to build the key
```javascript
 var occ = {a: 1, b: "Hello"};

 // ### make db a new local database object with 1 occurrence ###
 var db = localDatabase(occ);

 // ### db is indexed by b ###
 db.setKeyField("b");

 // ###  build the key for occ ! ###
 var key = db.buildKey(occ); // ### key is "Hello"
```
## clear
clears the data
```javascript
var db = localDatabase(),
    occ = {a: 1, b: "Hello"};
   
db.insert(occ); // ### db holds 1 occurrence

// ### clear the db ###
db.clear(); // ### db hold NO occurrence
```

## commit
commits the occurrences that yet are not committed
```javascript
var db = localDatabase();

// ### commit all changes ###
db.commit();
```
## data
Returns the data at array position or returns all data as array of object. Usually this is used to filter
#### params:
* `Number`: the position in the array to return, starting with 0! this is optional (and yes, ... an early idea!)
```javascript
var db = localDatabase(
    [
    {a: 1, b: "Hello"},
    {a: 2, b: "Hello too"}
    ]
]);

// ### return entry 2 of the object ###
db.data(1); // ### returns Occurrence holding {a: 2, b: "Hello too"}
db.data()[1]; // ### returns the same :)

// ### return the array of object ###
db.data(); // ### returns [Occurrence,Occurrence]
```

## drop
drops an entry from the data
#### params:
* `Occurrence` | `String` | `Array`: The data to determine the key of the occurrence
```javascript
 var occ = {a: 1, b: "Hello"};

 // ### make db a new local database object with 1 occurrence ###
 var db = localDatabase([{a: 1, b: "initial value"}]);

 // ### setting "a" and "b" to become the key ###
 db.setKeyField(["a","b"]);

 // ### drop by Occurrence object ### 
 db.drop(occ);

 // ### drop by key string ### 
 db.drop("1Hello");
 // or 
 db.drop( db.buildKey(occ) );

// ### drop by Array ### 
 db.drop(["1","Hello"]);
```

## find
searches for a value and returns any occurrence with a hit as an array
* case-insensitive
* any member aside the [ignored ones](#ignoreOnFind)
```javascript
var myArray = db.find("acme");
```
## getFieldScope
returns an array of the used fields in the first occurrence
```javascript
// ### get the field scope of a local database ###
var myFieldScope = db.getFieldScope(); // ### ["field1","field2",...]
```

## getIndex
find the array index of an occurrence in dataPackage

## getKey
return the occurrence matching to the key(s) in pKey (String or Array)
#### params:
* `String` | `Array`: value of the key or ["value","value",...]
```javascript
 var occ = {a: 1, b: "Hello"};

 // ### make db a new local database object with 1 occurrence ###
 var db = localDatabase([{a: 1, b: "initial value"}]);

 // ### make member "a" the key! ###
 db.setKeyField("a"); 

 // ### the occurrence where a is 1 ###
 db.getKey(1); // ### returns the occurrence object
```
## getKeyFields
returns the defined key field name(s) of the localdatabase.
#### returns:
* null | `String` | `Array`: Name of the key or ["name","name",...]
```javascript
 // ### make db a new local database object with 1 occurrence ###
 var db = localDatabase([{a: 1, b: "initial value"}]);

 // ### with no key defined ###
 db.getKeyFields(); // ### returns null

 // ### make member "a" the key! ###
 db.setKeyField("a"); 

 // ### with One field ###
 db.getKeyFields(); // ### returns the String "a"

 // ### make member "a" and "b" the key! ###
 db.setKeyField(["a","b"]); 

 db.getKeyFields(); // ### returns an Array with the names of the key fields ["a","b"]
```

## getModifiedOccs
returns an array with all modified and new occurrence objects (see Occurrence for more)
```javascript
// ### return the array of object with occurrences marked as modified ###
db.getModifiedOccs(); // ### returns [Occurrence,Occurrence]
```
## getNewOccs
returns an array with all new occurrence objects (see Occurrence for more)
```javascript
// ### return the array of object with occurrences marked as new ###
db.getNewOccs(); // ### returns [Occurrence,Occurrence]
```
## getTouchedOccs
Returns an Array of touched or new occurrences
```javascript
// ### return the array of object with occurrences marked as touched ###
db.getTouchedOccs(); // ### returns [Occurrence,Occurrence]
```

## ignoreOnFind
marks the delivered field names to ignore while using [find()](#find).
#### params:
* `String` | `Array`: Field names as "fieldname" or ["fieldname","fieldname",...]
```javascript
// ### ignore these fields on search ###
db.ignoreOnFind(["MODUL", "HISTKEY", "HISTORIE_NUMMER", "HIST_NUMMER", "hasDetail", "DATUM", "UHRZEIT", "DATUMUHRZEIT", "AKT_DATUM", "AKT_UHRZEIT"]);
```
## insert
inserts an entry to the data

## merge
merges object with the existing data

## occs
returns the amount of entries in the data object

## refresh
changes the contents of the occurences in the key. In case the key fields are made of more than one field and the keys are incomplete (e.g. the last part of the key is determined in backend on creation), refresh tries to find the matching occurrence in the occurrences marked as new! 

If the occurrence could't be found, then it will return `false` and not refresh anything.

#### params:
* `String` | `Object`: the Key to the Occurrence or the Object will all data needed to build the key
* `Object` : The new set of data ... optional as can be provided in param 1
```javascript
 var occ = {a: 1, b: "Hello"};

 // ### make db a new local database object with 1 occurrence ###
 var db = localDatabase([{a: 1, b: "initial value"}]);

 // ###  make member "a" the key! ###
 db.setKeyField("a"); 

 // ### Lazy mode: refresh the contents of an occurrence. The members of the KEY must be in the object! ###
 db.refresh(occ);

 // ### alternativly : two param mode! We want refresh the occurrence with a=1 and the data in the object occ ###
 db.refresh(1,occ);
```

## rollback
rollback on the occurrences that yet are not committed
```javascript
// ### wipe all changes in the commit cache of any occurrence ###
db.rollback();
```
## setKeyField
defines the field to be used as a key
```javascript
// ### db is indexed by myField! ###
db.setKeyField("myField");
```
## setCustomIndex
Enables to build up/set custom sortable fields by a callback function
#### params:
* `String`: the name of the index
* `function`: callback to fill the value

## sortString
to sort the Data as a String

## sortNumeric
to sort the Data as numeric data

## subscribe 
Get a callback on 
* `insert()`, 
* `drop()`, 
* `merge()`, 
* `set()`
* `clear()`
some actions return the occurrence as first parameter!
#### params:
* `function`: callback
* `String`: allowed values "insert","delete","clear","commit" or "rollback" while "merge" is like "insert"
```javascript
var db = LocalDatabase(),
    occ = {a: 1, b: "Hello"};

gotInserted = function(pOcc) {
    console.log("I've been Inserted: " +  pOcc.get("a");
};
   
db.subscribe(gotInserted,"insert"); // ### I've been Inserted: 1
```

## updateIndex
lets callback functions update the defined custom indexes. This is used while working with occurrences that changes their key values over time. 
#### params:
* `String` | `Object`| `Occurrence`| `Array`: OldKey - which currently represents the occurrence in the index
* `Occurrence`: The Occurrence or object holding the new values for a key
```javascript
var db = LocalDatabase([{a: 1, b: "Hello"}]),
    occ,
    occObject;

// ### setting "a" and "b" to become the key ###
db.setKeyField(["a","b"]);

// ### make new occurrence ###
occ = {a: 1, b: ""};
occObject = db.insert(occ); // current key in the index is like "1"

// ### now we update b to hold a new value ###
occObject.set("b","Hola"); 

// ### we need to update the index for this occurrence to have it working right ###
db.updateIndex(occ,occObject); // ### done!
```
## updateCustomIndex
lets callback functions update the defined custom indexes
