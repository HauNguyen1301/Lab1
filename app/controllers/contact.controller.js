const { ObjectId } = require("mongodb");
const ApiError = require("../api-error");
const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Name cannot be empty"));
    }
    try {
        const ContactService = new ContactService(MongoDB.client);
        const document = await ContactService.create(req.body);
        return res.send(document);
    }catch(error){
        return next(
            new ApiError(500,"An error occurred while create the contact")
        );
    }
}; 
/* exports.create = (req, res) => {
    res.send({ message: "create handler"});
}; */

/* exports.findAll = (req, res) => {
    res.send({ message: "findAll handler"});
}; */
exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const contactService = new ContactService(MongoDB.client);
        const {name} = req.query;
        if (name) {
            documents = await contactService.findByName(name);
        }else {
            documents = await contactService.find({});
        }
    }catch(error){
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        )
    };
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    // res.send({ message: "findOne handler"});
    try{
        const ContactService = new ContactService(MongoDB.client);
        const document = await ContactService.findByID(req.params.id);
        
        if(!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send(document);

    }catch(error){
        return next(new ApiError(500, "Cannot get contact"));
    }
};

exports.update = async (req, res, next) => {
    // res.send({ message: "update handler"});
  if(Object.keys(req.body).length === 0) {
    return next (new ApiError(400, "Data to upodate cannot be empty"));
  }
  try{
    const contactService = new contactService(MongoDB.client);
    const document = await contactService.update(req.params.id, req.body);
    if(!document){
        return next(new ApiError(404, "Contact not found"));
    }
    return res.send({Message: "Contact was update successfully"});
  }catch(error){
    return next(
        new ApiError (500, `Error updating contact with id=${req.params.id}`)
    );
  }
};

exports.delete = async (req, res, next) => {
    // res.send({ message: "delete handler"});
    try {
        const contactService = new contactService(MongoDB.client);
        const document = await contactService.delete(req.params.id);
        if(!document){
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({Message: "Contact was deleted successfully"});
    }catch(error){
        return next(
        new ApiError (500, `Error delete contact with id=${req.params.id}`)
        );
    }    
};

exports.deleteAll = async (_req, res, next) => {
    // res.send({ message: "deleteAll handler"});
    try {
        const contactService = new contactService(MongoDB.client);
        const deleteCount = await contactService.deleteAll;
        return res.send({Message: `${deleteCount}Contact was deleted successfully`});
    }catch(error){
        return next(
        new ApiError (500, `Error while removing all contacts`)
        );
    }    
};

exports.findAllFavorite = async (_req, res, next) => {
    // res.send({ message: "findAllFavorite handler"});
    try {
        const contactService = new contactService(MongoDB.client);
        const documents = await contactService.findAllFavorite();
        return res.send(documents);
    }catch(error){
        return next(
        new ApiError (500, "An error occurred while retrieving favorite contacts")
        );
    }    
};

