import projectsService from '#src/services/projectService'


const exposeController = {

    allProjects:async (req,res)=>{
        const {query} = req
        const allProjects = await projectsService.findAllProjects(query)
        return res.json(allProjects)
    },
    oneProject:async (req,res)=>{
        const {params:{id}} = req
        const oneCrea = await ProjectsService.findOneProject({id})
        if(!oneCrea) return res.sendStatus(404)
        return res.json(oneCrea)
    },
    createProject:async (req,res)=>{
        const {body}  = req
        try {
                const newCrea = await ProjectsService.createProjects(body)     
                return res.status(201).json(newCrea)
            } catch (error) {
               return res.sendStatus(400)
            // return res.json({error})
        }
    },
    updateProject:async (req,res)=>{
        const {body}  = req
        const {id}    = req.params
        try {
               
                const toUpdate = await projectsService.updateProject({id,body})     
                
                return res.json(toUpdate)
            } catch (error) {
               return res.sendStatus(400)
            // return res.json({error})
        }
        
    },
    patchProject:async (req,res)=>{
        const {body}  = req
        const {id}    = req.params
        try {
               
                const toPatch = await projectsService.patchProject({id,body})     
                return res.json(toPatch)
            } catch (error) {
               return res.sendStatus(400)
            // return res.json({error})
        }
        
    }


}

export default exposeController