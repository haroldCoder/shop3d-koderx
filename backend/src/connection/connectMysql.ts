
import mysql from "mysql2";
import Connection from "./connection";


class ConnectMysql extends Connection{
    public connect : mysql.Connection;

    constructor(){
        super();
        this.connect = mysql.createConnection({
            user: process.env.MYSQL_USER!,
            password: process.env.MYSQL_PASSWORD!,
            host: process.env.MYSQL_HOST!,
            port: parseInt(process.env.MYSQL_PORT!),
            database: process.env.MYSQL_DATABASE!
        })        
    }

    connectDB(): void {
        this.connect.connect(()=>{
            console.log('connect to mysql');
            
        })
    }
}

export default ConnectMysql;