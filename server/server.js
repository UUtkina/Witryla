const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Настройка подключения к базе данных
const sequelize = new Sequelize("eventdb", "root", "root", {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
});

// Определение модели Event
const Event = sequelize.define(
    "Event",
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        categories: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        speakers: {
            type: DataTypes.JSON,
            allowNull: false,
        },
    },
    {
        timestamps: true,
    }
);

// Создание таблицы, если она не существует
sequelize
    .sync()
    .then(() => {
        console.log("Database synced");
    })
    .catch((err) => {
        console.error("Unable to sync the database:", err);
    });

// Маршруты API
app.get("/api/events", async (req, res) => {
    try {
        const events = await Event.findAll();
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/api/events/add", async (req, res) => {
    try {
        const { title, description, startDate, categories, speakers } =
            req.body;
        const newEvent = await Event.create({
            title,
            description,
            startDate,
            categories: categories.join(","), // Сохранение категорий как строки
            speakers,
        });
        res.json(newEvent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
