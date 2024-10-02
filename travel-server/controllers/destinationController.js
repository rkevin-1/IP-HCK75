const { Destination } = require('../models');

const getAllDestinations = async (req, res) => {
    try {
        const destinations = await Destination.findAll();
        res.status(200).json(destinations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createDestination = async (req, res) => {
    try {
        const newDestination = await Destination.create(req.body);
        res.status(201).json(newDestination);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateDestination = async (req, res) => {
    try {
        const { id } = req.params;
        await Destination.update(req.body, { where: { id } });
        const updatedDestination = await Destination.findByPk(id);
        res.status(200).json(updatedDestination);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteDestination = async (req, res) => {
    try {
        const { id } = req.params;
        await Destination.destroy({ where: { id } });
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllDestinations,
    createDestination,
    updateDestination,
    deleteDestination
};
