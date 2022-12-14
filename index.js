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
        // await removeAllDocuments();
        //await res.forEach(res=>console.log(res))
        // console.log(res);
        await queringAllDocuments();
        client.close()
        //     .then(console.log("Desconected"))
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
        // const response = await dbCollection.findOne({/* Here goes a condition*/ name: "alexis", age: 20});
        const response = await dbCollection.findOne({name:{ $eq: "jose"}})
        console.log(response)
        // return response;
    }
    catch(error)
    {
        console.log(error);
    }
}


// -> It is time to quering more than one element. In this case you can use dbCollection.find()

async function queringAllDocuments() {
    try
    { 
        const response = await dbCollection.find({name: {$eq:"alexis"}})
        // console.log(response);
        // -> print documents
        await response.forEach(doc => console.log(doc));
    }
    catch(error)
    {
        console.log(error);
    }
}



/*

    UPDATE DOCUMENTS

*/

// -> As a first step i gonna use dbCollection.updateOne to update one document in a one collection

async function updateDoc() {
    try
    {
        // -> Update one has two arguments collection(<Conditional that references a document to update>, <new values to added>)
        const response = await dbCollection.updateOne({ name: "alexis" }, { $set: { age: 26 } });
        /*
             -> When you excecute the updateOne you should have an output like
            {
                {
                acknowledged: true,
                modifiedCount: 1,
                upsertedId: null,
                upsertedCount: 0,
                matchedCount: 1
                }
            }
        */
        console.log(response);
    }
    catch(error)
    {
        console.log(error);
    }
}


// -> Now to update many documents you'll using collection.updateMany(<argument>, <secoundArgument>)
//$push
async function updateDocuments()
{
    try{
        // -> updateMany method can get multpile docs and remove each one 
        const response = await dbCollection.updateMany({name:"alexis"},{$set: { age: 21 }} )
        console.log(response);
    }catch(error)
    {
        console.log(error);
    }
}

/*

    REMOVE DOCUMENTS

*/


async function removeDocument()
{
    try 
    {
        const response = await dbCollection.deleteOne({computer: "asus"})
        console.log(response);
    }
    catch(error)
    {
        console.log(error)
    }
}

async function removeAllDocuments()
{
    try
    {
        const response = await dbCollection.deleteMany({age: 21});
        console.log(response);
    }
    catch(error)
    {
        console.log(response);
    }
}


// TRANSACTIONS 

// -> ... https://www.mongodb.com/docs/manual/core/transactions/
