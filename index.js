const { MongoClient } = require("mongodb");

const CONNECTION_STRING  = "mongodb+srv://root:UrHFQ5G25CwP2RLF@cluster0.rrns7um.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(CONNECTION_STRING);


const connectionToMongoDb = async () => {
    try {
        await client.connect();
        console.log("Connected");
        const dbs =  await client.db().admin().listDatabases();   
        console.table(dbs.databases);
        client.close()
        .then(console.log("Desconected"))
    }catch(error)
    {
        console.log(`Error: ${error}`);
    }
}

connectionToMongoDb();