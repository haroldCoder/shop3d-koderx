
import mysql from "mysql2";
import Connection from "./connection";


class ConnectMysql extends Connection{
    public connect?: mysql.Connection;
    public isconect: boolean = false

    constructor(){
        super();
        if(!this.isconect){
            this.connect = mysql.createConnection({
                user: process.env.MYSQL_USER!,
                password: process.env.MYSQL_PASSWORD!,
                host: process.env.MYSQL_HOST!,
                port: parseInt(process.env.MYSQL_PORT!),
                database: process.env.MYSQL_DATABASE!
            })  
            this.isconect = true;
        }
              
    }

    connectDB(): void {
        this.connect!.on("connection",()=>{})
        console.log('connect to mysql');
        this.connect!.on("error", (err)=>{
            console.log(err);
            
        })
    }
}

export default ConnectMysql;