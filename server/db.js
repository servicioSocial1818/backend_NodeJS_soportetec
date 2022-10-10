import { createPool } from 'mysql2/promise'

export const pool = new createPool({
    host: '31.22.4.229',
    port: 3306,
    user: 'suacdaps_adminSoporte',
    password: 'bintec123',
    database: 'suacdaps_soportetec'
})



