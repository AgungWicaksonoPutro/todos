const todos = require('../models/todo');
const { response } = require('../helpers/response')

module.exports = {
    createTodo: async (req, res)=>{
        try {
            const {title, description, createdAt} = req.body
            const data = {
                title,
                description,
                status: false,
                createdAt,
                updatedAt: new Date()
            }
            const todo = new todos(data)
            await todo.save().then(result=>{
                response(res, {msg: 'Created!', id: result._id}, 200, null)
            })
        } catch (err){
            response(res, null, 500, err)
        }
    },
    getAllTodo: async (req, res)=>{
        try {
            await todos.find()
              .exec()
              .then(result => {
                response(res, result, 200, null)
              });
          } catch (err) {
            response(res, null, 500, err)
          }
    },
    getTodoById:async(req, res) => {
        try {
          const id = req.params.id;
    
          await todos.findById(id, (err, result) => {
            if (err) response(res, null, 500, err)
            response(res, result, 200, null)
          });
        } catch (err) {
            response(res, null, 500, err)
        }
    },
    updateTodo: async (req, res)=>{
        try {
            const id = req.params.id;
            const { title, description, status, updatedAt } = req.body;
            const data = {
                title,
                description,
                status,
                updatedAt
            };
      
            await todos.findByIdAndUpdate(id, data, (err, result) => {
              if (err) response(res, {msg: err}, 500, err)
              response(res, {msg: 'Updated!'}, 200 , null)
            });
          } catch (err) {
            response(res, {msg: err}, 500, err)
          }
    },
    deleteTodoById: async (req, res) => {
        try {
          const id = req.params.id;
    
          await todos.findByIdAndDelete(id).then(result => {
            response(res, {msg: 'Deleted!'}, 200, null)
          });
        } catch (err) {
          response(res, {msg: 'Fatal!'}, 500, err)
        }
      }
}