const express = require('express')
const userController = require('../controllers/user')

const userRouter = express.Router()
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: List of API operations to manage users
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user
 *         firstname:
 *           type: string
 *           description: The firstname of the user
 *         lastname:
 *           type: string
 *           description: The lastname of the user
 *       required:
 *        - username
 *        - firstname
 *        - lastname
 *       example:
 *         username: gprevost
 *         firstname: Guillaume
 *         lastname: Prevost
 */

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             example: { status: "success", msg: "User was successfully created" }
 *       '400':
 *         description: Request failed
 *         content:
 *           application/json:
 *             example: { status: "error", msg: "Request body invalid" }
 */
userRouter
  .post('/', (req, resp) => {
    userController.create(req.body, (err, res) => {
      let respObj
      if(err) {
        respObj = {
          status: "error",
          msg: err.message
        }
        return resp.status(400).json(respObj)
      }
      respObj = {
        status: "success",
        msg: res
      }
      resp.status(201).json(respObj)
    })
  })

  /**
 * @swagger
 * /user/{username}:
 *   get:
 *     summary: Get user by username
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The username of the user
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             example: { status: "success", msg: { username: "roibouta", firstname: "Rayane", lastname: "Bouaita" } }
 *       '400':
 *         description: Request failed
 *         content:
 *           application/json:
 *             example: { status: "error", msg: "Invalid username" }
 */
  .get('/:username', (req, resp, next) => {

     const username = req.params.username
        userController.get(username, (err, res) => {
        let respObj
        if(err) {

            respObj = {
                status: "error",
                msg: err.message
            }

            return resp.status(400).json(respObj)
        }
        respObj = {
            status: "success",
            msg: res
        }
        resp.status(200).json(respObj);
        });
  })

/**
 * @swagger
 * /user/{username}:
 *   put:
 *     summary: Update user by username
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The username of the user
 *         schema:
 *           type: string
 *     requestBody: 
 *       required: true
 *       description: The updated user details
 *       schema:
 *         $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             example: 
 *               status: "success"
 *               msg: "User was successfully updated"
 *       '400':
 *         description: Request failed
 *         content:
 *           application/json:
 *             example: 
 *               status: "error"
 *               msg: "Invalid username"
 */

    .put('/:username', (req, resp, next) => {
        const username = req.params.username
            userController.update(username, req.body, (err, res) => {
                let respObj
                if(err) {
                    respObj = {
                        status: "error",
                        msg: err.message
                    }
                    return resp.status(400).json(respObj)
                }
                respObj = {
                    status: "success",
                    msg: res
                }
                resp.status(200).json(respObj);
            });

        })

/**
 * @swagger
 * /user/{username}:
 *   delete:
 *     summary: Delete user by username
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The username of the user
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             example: 
 *               status: "success"
 *               msg: "User was successfully deleted"
 *       '400':
 *         description: Request failed
 *         content:
 *           application/json:
 *             example: 
 *               status: "error"
 *               msg: "Username was not found"
 */

    .delete('/:username', (req, resp, next) => {
        const username = req.params.username
        userController.delete(username, (err, res) => {
            let respObj
            if(err) {
                respObj = {
                    status: "error",
                    msg: err.message
                }
                return resp.status(400).json(respObj)
            }
            respObj = {
                status: "success",
                msg: res
            }
            resp.status(200).json(respObj);
        });
    });
module.exports = userRouter