const express = require('express');
const cors = require('cors'); // Para permitir requisições do Angular
const bodyParser = require('body-parser'); // Para lidar com corpos de requisição JSON

// Se sua API usa sqlite3 e precisa inicializar o banco de dados
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data2.db', (err) => {
    if (err) {
        console.error('Erro ao abrir o banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
        // Opcional: Criar tabelas se não existirem
        db.run(`CREATE TABLE IF NOT EXISTS vehicle (
            id TEXT PRIMARY_KEY,
            model TEXT,
            year INTEGER,
            color TEXT,
            price REAL,
            chassis TEXT UNIQUE,
            status TEXT,
            type TEXT,
            image TEXT,
            totalSales INTEGER,
            connectedVehicles INTEGER,
            softwareUpdated INTEGER
        )`);
        db.run(`CREATE TABLE IF NOT EXISTS vehicleData (
            id TEXT PRIMARY KEY,
            code TEXT UNIQUE,
            status TEXT,
            location TEXT,
            lastUpdate TEXT,
            maintenanceRequired INTEGER,
            -- Adicione aqui os 5 campos que você precisa na sua tabela (removido #, usando -- para compatibilidade SQLITE)
            field1 TEXT,
            field2 TEXT,
            field3 TEXT,
            field4 TEXT,
            field5 TEXT
        )`);
        // Se precisar de dados iniciais, pode inseri-los aqui ou ter um script de seed
    }
});

module.exports = function() {
    const app = express();

    // Configurações e Middlewares
    app.set('port', 3001); // Definindo a porta para 3001 para evitar conflitos

    app.use(cors()); // Permite que seu frontend Angular faça requisições
    app.use(bodyParser.json()); // Habilita o parseamento de JSON para requisições POST/PUT

    // Rotas (exemplo - você precisará adicionar as rotas reais do seu projeto)
    // Estas rotas precisam interagir com o 'data2.db'
    app.get('/vehicle', (req, res) => {
        db.all("SELECT * FROM vehicle", [], (err, rows) => {
            if (err) {
                res.status(500).json({ "error": err.message });
                return;
            }
            res.json(rows);
        });
    });

    app.get('/vehicleData', (req, res) => {
        db.all("SELECT * FROM vehicleData", [], (err, rows) => {
            if (err) {
                res.status(500).json({ "error": err.message });
                return;
            }
            res.json(rows);
        });
    });

    // Adicione outras rotas aqui, como login, cadastro de veículos, etc.
    // Exemplo de rota de login (simplificada - você precisará de autenticação real)
    app.post('/login', (req, res) => {
        const { username, password } = req.body;
        // Apenas para teste. Em produção, use um sistema de autenticação seguro.
        if (username === 'admin' && password === 'admin') {
            // Em um cenário real, você geraria um JWT token aqui
            res.json({ message: 'Login bem-sucedido!', token: 'fake-jwt-token' });
        } else {
            res.status(401).json({ message: 'Credenciais inválidas' });
        }
    });

    return app;
};