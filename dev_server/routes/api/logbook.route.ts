import { Express,Response } from "express"
// import { Cars} from "../../db";
import { authorizeToken } from "../../services/auth";

const route = (app:Express) => {

      // USER - get particular logbook by car id
    //   app.get('/record/:id',authorizeToken, async(req,res) => {
      app.get('/record/:id', async(req,res) => {
        const {id } = req.params
        
        res.status(200).json({msg:'ok'})
    })

        // USER - create new logbook record in a particular car
    // app.post('/record',authorizeToken, async(req,res) => {
    app.post('/record', async(req,res) => {
        const newRecordData =  req.body;
            // const newRecord = await 
        console.log('BODY: ',req.body)

    })

    // USER -  update longbook data - one by one or empty whole book to rewrite data
    // app.put('/record/:id', authorizeToken,(req,res) => {
    app.put('/record/:id',(req,res) => {
        const {id, column,value} = req.body;
        console.log('ID: ', id, 'COLUMN: ', column, 'VALUE: ',value)
        res.status(200).json({message: 'ok'})
    })

    // ADMIN - erase logbook 
    // app.delete('/record/:id', authorizeToken,(req,res) => {
    app.delete('/record/:id', (req,res) => {
        const {id} = req.params
        console.log('DELETE RECORD: ',id)
        res.status(200).json({message: 'ok'})
    })
}

export default route