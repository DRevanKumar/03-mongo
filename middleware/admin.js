// Middleware for handling auth
const { Admin }=require("../db")
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const username=req.headers.username
    const password=req.headers.passwords
    let response= await Admin.findOne({
        username:username,
        password:password
    })
    if(response){
        next()
    }
    else{
        res.status(403).json({
            msg:"Admin not found"
        })
    }


}

module.exports = adminMiddleware;