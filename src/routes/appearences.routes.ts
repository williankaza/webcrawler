import { Router } from "express";
import { errorMsg, isNullOrUndefined } from "../generics/utils";
import AppearencesService from "../services/appearences.service";
import { IPredicition } from "../interfaces/urlRelations.interfaces";
import IAppearencesReturn from "../interfaces/IAppearencesReturn";

const appearencesRouter = Router();
const appearencesService = new AppearencesService()

appearencesRouter.post('/find', async(request, response)=>{
    const { url, level } = request.body;
    if (isNullOrUndefined(url) || isNullOrUndefined(level)){
        return response.status(400).json(errorMsg('Body request need an URL and Level to proceed.'))
    }
    return response.status(200).json(await appearencesService.findOnHistory(url, level))
})

appearencesRouter.post('/', async (request, response)=>{
    const { url, level } = request.body;
    let arrResults: Array<IAppearencesReturn> = []

    if (isNullOrUndefined(url) || isNullOrUndefined(level)){
        return response.status(400).json(errorMsg('Body request need an URL and Level to proceed.'))
    }

    try {
        const history = await appearencesService.findOnHistory(url, level)

        if (history.length > 0){
            arrResults = history[0].appearences
        } else {
            arrResults = await appearencesService.findAppearences(arrResults, url, 0, level);
            arrResults = arrResults.map((response)=>{
                for (const levelIndex in response.levels) {
                    if (Object.prototype.hasOwnProperty.call(response.levels, levelIndex)) {
                        response.levels[levelIndex].percentage = response.levels[levelIndex].quantity/response.totalApperences
                    }
                }
                return response
            })

            appearencesService.addNewProcessMade(url, level, arrResults)
        }
        
        return response.status(200).json({ response: arrResults })
    } catch (error) {
        return response.status(500).json(errorMsg(error))
    }
})

appearencesRouter.post('/predictions', async (request, response)=>{
    const { initialURL, predictURL } = request.body;
    if (isNullOrUndefined(initialURL) || isNullOrUndefined(predictURL)){
        return response.status(400).json(errorMsg('Body request need an initialURL and predictURL to proceed.'))
    }

    const arrResponse: IPredicition = await appearencesService.predictOccurrences(initialURL, predictURL)

    return response.status(200).json(arrResponse)
})

appearencesRouter.get('/relations', async (request, response)=>{
    return response.status(200).json({ response: await appearencesService.getAllURLRelations() })
})

export default appearencesRouter;
