const express = require("express");
const router = express.Router();
const Package = require('../controllers/package');

//Get all package.
router.get('/package', async (req,res) => {
    try{
        const packages = await new Package().getPackages();
        res.status(200).json(packages);
    }
    catch(error){
        return res.status(500).json(error);
    }
});

//Create a package.
router.post('/package', async (req,res) => {
    try {
        const package = req.body;
        const packages = await new Package().createPackages(package)
        return res.status(200).json(packages);
    } catch (error) {
        return res.status(500).json(error);
    }
});

//Update a package.
router.put('/package/:packageId', async (req,res) => {
    try {
        const {packageId} = req.params;
        await new Package().updatePackages(packageId);
        const packages = await new Package().getPackages();
        return res.status(200).json(packages);
    } catch (error) {
        return res.status(500).json(error);
    }
});

//Delete a package.
router.delete('/package/:packageId', async (req,res) => {
    const {packageId} = req.params;
    await new Package().deletePackages(packageId);
    const packages = await new Package().getPackages();
    return res.status(200).json(packages);
});

module.exports = router;
