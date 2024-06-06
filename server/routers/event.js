const router = require("express").Router();
const Event = require("../models/event.model");

router.route("/").get(async (req, res) => {
    try {
        const events = await Event.findAll();
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.route("/add").post(async (req, res) => {
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

module.exports = router;
