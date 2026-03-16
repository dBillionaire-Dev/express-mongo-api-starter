import mongoose from "mongoose";

export const ConnectToDB = async (): Promise<void> => {
    try{
        const mongoURL: string | undefined = process.env.MONGO_URI;

        if(!mongoURL) {
            throw new Error(`MONGO_URI isn't defined in environment variables`)
        }

        await mongoose.connect(mongoURL);
        console.log("Connection to database: Successful");

        process.on("SIGINT", async () => {
            await mongoose.connection.close();
            process.exit(0)
        })

    } catch (e) {
        console.error(`Error connecting to database: ${e}`);
        process.exit(1);
    }
}

export const DisconnectFromDB = async (): Promise<void> => {
    try{
        await mongoose.connection.close();
    } catch (err){
        console.error(`Error disconnecting from database: ${err}`);
        process.exit(1);
    }
}