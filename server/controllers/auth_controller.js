import { User } from "../models/user.js"

export const createNewSession = async (req, res)=>{
    if(!req.body){
        console.log(["Please add a body {email,password}"])
        res.status(401).send("No Body")
        return
    }
    const user = await User.findOne({email: req.body.email, password: req.body.password})
    if(user === null){
        console.log("Your credentials can't be seen in the database.")
        res.status(401).send(["Invalid credentials"])
        return
    }
    req.session.profile =  user? {id: user._id,email: req.body.email, type: user.type} : null
    req.session.loggedIn = true
    console.log(req.session.profile)
    console.log(["session created"])
    res.send(req.session.profile)
}

export const getUserProfile = (req,res) =>{
    if(req.session.loggedIn){   
        const profile = req.session.profile
        res.send(profile)
    } else{
        res.status(400).send(["error"])
    }
}

export const deleteSession = (req, res) => {
    if (req.session) {
      req.session.destroy(err => {
        if (err) {
          res.status(400).send(['Unable to log out'])
        } else {
          res.send(['Logout successful'])
        }
      });
    } else {
      res.end()
    }
  }
