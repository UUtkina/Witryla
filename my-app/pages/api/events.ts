import { NextApiRequest, NextApiResponse } from "next";
import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("eventdb", "root", "root", {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
});

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

sequelize.sync().catch((err) => {
    console.error("Unable to sync the database:", err);
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        try {
            const { title, description, startDate, categories, speakers } =
                req.body;
            const newEvent = await Event.create({
                title,
                description,
                startDate,
                categories: categories.join(","),
                speakers,
            });
            res.status(201).json(newEvent);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Unknown error" });
            }
        }
    } else if (req.method === "GET") {
        try {
            const events = await Event.findAll();
            res.status(200).json(events);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Unknown error" });
            }
        }
    } else {
        res.setHeader("Allow", ["POST", "GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;
