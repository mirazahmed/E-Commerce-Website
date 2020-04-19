const dashboardLoader = (req,res,next)=>{

    if(req.session.userInfo.type=="Admin"){
        
        res.render("User/adminDashboard")
    }

    else{
        res.render("User/userDashboard")
    }
}

module.exports=dashboardLoader;