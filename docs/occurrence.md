# Occcurence
The occurence is backbone of several other object holding your data with nice features. Instead of using a regular object it supports you with changes by offering a cache, infos about if it has been altered and the option of setting it back to how it was before!
This class is used for `localDatabase`.

## usage
```JavaScript
 // ### let's put some data together ###
 let data = {
    id: 1,
    text: "some text",
    group: "whatever-you-get-in-mind",
    uselessMember: true
 }

 // ### make our data an Occurrence ###
 let occ = new Occurrence(data);

 // ### changing a member ###
 occ.set("group","admin");

 // ### has the occurence been altered? ###
 console.log("modified:", occ.isModified);

 // ### remove a member for the occ ###
 occ.drop("uselessMember");

 // ### add another member with an initial value ###
 occ.addMember("status","good");

 // ### subscribe to changes done with "set" ###
 myCallBack = (newOcc) => {
    console.log(newOcc.data());
 }
 occ.subscribe(myCallBack,"set"); 
```

## Flags
An occurrence has several flags which are raised or lowered over time
### isModified
An occurrence is marked as modified when
* the data has been altered with `set()` and is NOT commited yet

### isTouched
An occurrence is marked as touched when
* the data has been altered with `set()` and is commited

### isNew
An occurrence can be marked as new to make it easy to determine it if needs to be updated or inserted in the backend. The flag will be set false if a `refesh()` is done or it is flagged down manually with `isNew(false)`!

### isSaving
An occurrence can be marked as currently being saved to represent it the right way in the front-end

## Methods and functions
* [`get()`](#get)
* [`set()`](#set)
* [`drop()`](#drop)
* [`subscribe()`](#subscribe)
* [`commit()`](#commit)
* [`rollback()`](#rollback)
* [`data()`](#data)
* [`refresh()`](#refresh)
* [`isNew()`](#isNew)
* [`isModified()`](#isModified)
* [`isTouched()`](#isTouched)
* [`isSaving()`](#isSaving)
* [`setNDB()`](#setNDB)

## get
getter for a member of the occurrence
#### params: 
* `String`: Member
```javascript
var occ = Occurrence( {a: 1, b: "Hello"} );
var value = occ.get(b); // ### "Hello"
```

## set
sets value to become the value of member
#### params: 
* `String`: Member,
*  `any`: value
```javascript
var occ = Occurrence( {a: 1, b: "Hello"} );
occ.set("a",1337); // ### {a: 1337, b: "Hello"}
```

## drop
drops a member from the occurrence
#### params:
* `String`: Member
```javascript
var occ = Occurrence( {a: 1, b: "Hello"} );
occ.drop("a"); // ### {b: "Hello"}
```

## subscribe
subscribe callback for an action
* none/`commit`: if not  provided, it will subscribe to "commit"
* `set`: changes of the occurrence have been committed
* `refresh`: the occurrence has been refresh (e.g. after update in backend) - this callBack only happens ONCE!

#### params: 
* `function`: callback
* `String`: optional, supporting "commit", "set", "refresh"
```javascript
var occ = Occurrence( {a: 1, b: "Hello"} ),
    gotRefreshed = function() {
      console.log("I've been refreshed");
    };

occ.subscribe(gotRefreshed,"refresh"); // ### {b: "Hello"}
```

## commit
Commit changes done to the occurrence.
* Subscribers for `commit` are receiving callbacks.
```javascript
var occ = Occurrence( {a: 1, b: "Hello"} );

occ.set("a",1337); // ### commit cache {a: 1337}, data {a: 1, b: "Hello"}
occ.commit(); // ### commit cache {}, data {a: 1337, b: "Hello"}
```
## refresh
Changes the contents of the occurences in the key
* resets `isComitted`, `isModified`, `isTouched`, `isSaving` and `isNew`
* commitCache is cleared 
* subscribers for `refresh` get callbacks
```javascript
var occ = Occurrence( {a: 1, b: "Hello", crc: "12345" } );

occ.refresh({a: 1, b: "Hello", crc: "67890" });
```
## rollback
Rollback the changes on the occurrence
```javascript
var occ = Occurrence( {a: 1, b: "Hello"} );

occ.set("a",1337); // ### commit cache {a: 1337}, data {a: 1, b: "Hello"}
occ.rollback(); // ### commit cache {}, data {a: 1, b: "Hello"}
```

## data
Returns the complete data object with all members and their values. Data in commit cache is preferred over the main data!
```javascript
var occ = Occurrence( {a: 1, b: "Hello"} );

occ.set("a",1337); // ### commit cache {a: 1337}, data {a: 1, b: "Hello"}
occ.data(); // ### {a: 1337, b: "Hello"}
```

## isModified
Returns Boolean to indicate if a occurrence is modified and NOT committed yet. After a `commit()` this turns false!

## isTouched
Returns Boolean to indicate if a occurrence has been altered or not! This doesn't change unless a refresh has been done. 

## isNew
Returns Boolean to indicate if a occurrence is new or not! If a boolean is provided as param, this is set. It will become `false` if the occurrence gets a `refresh()`

## isSaving
Returns Boolean to indicate if a occurrence has been altered or not! If a boolean is provided as param, this is set
#### params: 
* `Boolean`: the boolean to be set if the parameter is provided


## setNDB
Put a no-database-field with a value to the occurrence. The value can be called with [`get()`](#get) but will not be returned with [`data()`](#data). Commonly used to set a custom index field for sorting in localDatabase objects
#### params: 
* `String`: Member,
*  `any`: value
```javascript
var occ = Occurrence( {a: 1, b: "Hello"} );

occ.setNDB("idxOrder","1-Hello-5"); // ###  data {a: 1, b: "Hello"}, NDB { idxOrder: "1-Hello-5"}
```
