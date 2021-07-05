const User = require('../models/usersModel');
const Room = require('../models/roomModel')
const {
    validationResult
} = require('express-validator');
const fs =require('fs')

module.exports.getRoom = async (req, res) => {
  
    const room = await Room.find({});
    res.status(200).json({
        data: room
    });

}

async function deletephoto(photos){
    await fs.unlinkSync(photos)
    return
}

module.exports.addRoom = async (req, res) => {
  
    try {
         /// validation check result
         const messages = []
         if (!validationResult(req).isEmpty()) { 
             // remove profile image
             const photo = req.files;
             
             if(photo.length != 0){
                photo.map(item=>{
                const photos=`upload/room/${item.filename}`
                deletephoto(photos)
                
                })
            }
             const errors = validationResult(req).array()
             for (const i of errors) {
                 messages.push(i);
             }

             return res.status(303).json({
                 message: messages
             });
         }
  
    /*  wifi,
            food,
            water,
            electric,
            bathrooms,
            listed_by,
            parking,
            description, */
     
     
    const {
            name,
            price,
            address,
            facility,
            description,
            details
        } = req.body;
        
        

      
        const createroom = await Room.create({
            name,
            price,
            address,
            facility,
            description,
            details

           
        });
        createroom.users.push(req.userID)
        const image =req.files
        image.map(item=>{
            createroom.images.push(`upload/room/${item.filename}`)
        })
        createroom.save()
        res.status(201).json({
            message: createroom
        });
 
    } catch (err) {
        
       res.status(403).json({
            messages: err
        });
    }


}