const userController = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const verifyToken = require('../middlewares/verifyToken')
const { request } = require('express')

userController.get('/find/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password')
        if (!user) throw new Error("No such user")
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

userController.put('/:id', verifyToken, async (req, res) => {
    console.log(req.body)
    if (req.params.id === req.user.id.toString()) {
        try {
            if (req.body.password) {
                const newPassword = await bcrypt.hash(req.body.password, 10)
                req.body.password = newPassword
            }
            const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })

            return res.status(200).json(updatedUser)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    } else {
        return res.status(403).json({ msg: 'You can update only your profile' })
    }
})

// userController.delete('delete/:id',  async(req, res) => {
//     const user = await User.findById(req.params.id)
//     console.log("hii")
//     if(!user) {
//         return res.status(500).json({ msg: 'No such user' })
//     }


//     if(req.user.id.toString() === user._id.toString()) {
//     // try {
//     //     console.log(User)
//     //     await user.deleteOne()

//     //     return res.status(200).json({ msg: 'Successfully deleted' })
//     // } catch (error) {
//     //     return res.status(500).json(error.message)
//     // }
//     await user.deleteOne()
// } else {
//     // return res.status(403).json({ msg: 'You can delete only your profile' })
//     return user
// }
// }
// )

userController.delete('/:id', verifyToken,  async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        console.log(user)
        // if (property.currentOwner.toString() !== req.user.id) {
        //     throw new Error("You are not allowed to delete other people properties")
        // }
        // else{
            
        // await property.delete()

        // }
        await user.deleteOne()


        return res.status(200).json({ msg: "Successfully deleted User" })
    } catch (error) {
        return res.status(500).json(error)
    }
})

module.exports = userController