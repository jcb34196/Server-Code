const express = require('express')
const router = express.Router();
const bodyParser = require("body-parser")


const Excercise = require('../../models/Excercise')

router.get('/', (req, res) => {
    Excercise.find().
    then((excercies) => res.json(excercies))
    .catch((err) => res.status(404).json({noitemsfound: "No excercies found."}))
    //res.send("testing get /item route.")
})




router.get('/:id', (req, res) => {
    Excercise.findById(req.params.id).
    then((excercies) => res.json(excercies))
    .catch((err) => res.status(404).json({noitemsfound: "No excercie found."}))
})


router.post('/', bodyParser.json(), (req, res) => {
    //res.send("testing post / route.")
    Excercise.create(req.body)
        .then((excercise) => res.json({msg: 'Item added successfully.'}))
        .catch((err) => res.status(400).json({ error: 'Unable to add this item'}))
})

router.put('/:id', bodyParser.json(), (req, res) => {
    Excercise.findByIdAndUpdate(req.params.id, req.body)
        .then((excercise) => res.json({msg: 'Updated successfully.'}))
        .catch((err) => res.status(400).json({error: 'Unable to update the databse.'}))
})

router.delete('/:id', (req, res) => {
    Excercise.findByIdAndDelete(req.params.id)
        .then((excercise) => res.json({msg: 'Item entry successfully deleted'}))
        .catch((err) => res.status(404).json({error: 'No such item'}))
})


module.exports = router;  