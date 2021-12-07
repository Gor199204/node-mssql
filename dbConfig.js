const config = {
    server: '(localdb)\\MSSQLLocalDB',
    port: 1433,
    database: 'Students',
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true,
        enableArithAbort: true,
        instancename: 'MSSQLLOCALDB',
        trustServerCertificate: true
    }
}

module.exports = config