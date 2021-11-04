import * as cors from "cors"
import * as express from "express"
import * as helmet from "helmet"
import * as http from "http"
import "reflect-metadata"
import { createConnection } from "typeorm"
import routes from "./routes"

// Connects to the Database -> then starts the express
createConnection()
    .then(async (connection) => {
        connection.runMigrations().catch((error) => console.log(error))
        // Create a new express application instance
        const app = express()

        // Call midlewares
        app.use(cors())
        app.use(helmet())
        app.use(express.json())
        app.use(express.json({ limit: "50mb" }))
        app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))

        // Set all routes from routes folder
        app.use("/", routes)

        // Create http server
        const server = http.createServer(app)

        server.listen(3000, "0.0.0.0", () => {
            console.log("Server started on port 3000!")
        })
    })
    .catch((error) => console.log(error))
