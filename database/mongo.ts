const MongoClient = require('mongodb').MongoClient

const url = 'mongodb+srv://jmarchant:XyIWQYpZuJwGkKbN@default.xb0hjgi.mongodb.net/goblinShark?retryWrites=true&w=majority'

interface Itinerary {
    name: string,
    dest: string
}

export const createItinerary = async <Itinerary> (req: Request, res: Response) => {

    const newTrip = {
        name: req.body.name,
        dest: req.body.dest
    }

    const client = new MongoClient(url)

    try {
        await client.connect()
        const db = client.db()
        const result = db.collection('test').insertOne(newTrip)
    } catch (error) {
        return res.json({message: "Could not store data"})
    }
    // client.close()

    res.json(newTrip)
}

export const createPackingList = async (req: Request, res: Response) => {

}

