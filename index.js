const { MongoClient } = require("mongodb");

const CONNECTION_STRING = "mongodb+srv://root:UrHFQ5G25CwP2RLF@cluster0.rrns7um.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(CONNECTION_STRING);


// -> Connection to mongoBD 


// -> user 

const user = {
    name: "alexis",
    age: 21,
    country: "mexico",
    isMarried: false
}


const connectionToMongoDb = async () => {
    try {
        await client.connect();
        console.log("Connected");
        const dbs = await client.db().admin().listDatabases();
        // console.table(dbs.databases);
        // const res = await dbCollection.insertOne(user);
        const res = await getDocument();
        console.log(res);
        client.close()
            .then(console.log("Desconected"))
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}
connectionToMongoDb();
// -> CRUD

// -> The first step that you has completed is set your database and your collection
const dbCollection = client.db("main").collection("mainCollection");

/*

    INSERT DOCUMENTS 

*/

// -> When you want insert only one document you need use the db.collection.insertOne();

async function insertOneDocument(document = {}) {
    try {
        const response = await dbCollection.insertOne();
        console.log(response);
        // -> IF everything happend ok you should see the next output 
        /*
            output: 
            {
                acknowledged: true,
                insertedId: new ObjectId('randomID');
            }
        */
    }
    catch (error) {
        console.log(error);
    }
}

// -> Also you can insert multiple documents using db.collection.insertMany([documents array])

async function insertManyDocuments(documents = []) {
    try {
        const response = await dbCollection.insertMany(documents);
        // -> Again if all it's ok you see something like
        /*
            output:
            {
                acknowledged: true,
                insertCount: 2,
                insertedIDs: {
                    new ObjectId('randomID'),
                    new ObjectId('randomID')
                }
            }
        */
            return response;
        }
    catch (error) {
        console.log(error);
    }
}

/*

    QUERING A MONGODB COLLECTION

*/

// -> To find one or more documents you need to use collection.findOne() to find one or collection.find() to get all exists documents


// -> To get only one document you need to follow the next code.

/*
    COMPARATIVE OPERATORS
        Some operators that you can use to make a queries are:
        $gt gratter than 
        $lt less than
*/

async function getDocument() {
    try 
    {
        const response = await dbCollection.findOne({/* Here goes a condition*/ age: {$et: 21}});
        return response;
    }
    catch(error)
    {
        console.log(error);
    }
}





// async function queringAllDocuments(){
//     try
//     { 
//         const response = await dbCollection.findOne({name: "alexis"})
//         console.log(response);
//         // response.forEach(console.log)
//     }
//     catch(error)
//     {
//         console.log(error);
//     }
// }
