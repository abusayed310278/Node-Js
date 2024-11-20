exports.getOverview=(req,res)=>{
    res.status(200).render('overview',{
        title:'all tours'
    })
}

exports.getTour=(req,res)=>{
    res.status(200).render('tour',{
        title:'the forest hiker tour'
    })
}
