const user= require("../models/productModel");


// get all data
const getdetail= async(req, res) => {

    try {
        
      
       
        const data= await user.find();

            res.status(200).send({success: true, msg: "All details :", data: data});

    } catch (error) {
        res.status(400).send(error.message);
    }

}


// get data by id
const getdetailbyid= async(req, res) => {
    try {
        
        const id= req.body.id;
       
        const data= await user.findOne({ _id: id});

        if (data) {


            res.status(200).send({success: true, msg: "product details :", data: data});
            
        } else {
            res.status(200).send({ success: false, msg: "id not found!"});
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
 }


 // insert data
const insertproduct= async(req, res) =>{

    try{  

        const getdata= new user({
             title: req.body.title,
             description: req.body.description,
             price: req.body.price,
             images: req.file.filename,
        });
        const product_data= await getdata.save();

        res.status(200).send({success: true, msg: "product Details", data: product_data})

    }

    catch (error) {
        res.status(400).send({success: false, msg: error.message});
    }
}


// update data
const updateproduct= async(req, res) =>{
    try {
        
        const id= req.body.id;
        const title= req.body.title;
        const description= req.body.description;
        const price= req.body.price;
        const images= req.file.filename;

        const data= await user.findOne({ _id: id});

        if (data) {

            const userData= await user.findByIdAndUpdate({ _id: id}, {$set: {
                title: title, description: description, price: price, images: images
            }});

            res.status(200).send({success: true, msg: "your data has been updated"});
            
        } else {
            res.status(200).send({ success: false, msg: "id not found!"});
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
 }


 // delete data
 const deleteproduct= async(req, res) =>{
    try {
        
        const id= req.body.id;
       

        const data= await user.findOne({ _id: id});

        if (data) {

            const userData= await user.deleteOne({ _id: id});

            res.status(200).send({success: true, msg: "your data has been deleted"});
            
        } else {
            res.status(200).send({ success: false, msg: "id not found!"});
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
 }


module.exports={
    getdetail,
    getdetailbyid,
    insertproduct,
    updateproduct,
    deleteproduct
    
}