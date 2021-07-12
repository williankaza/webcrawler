import { isNullOrUndefined } from "../generics/utils";
import Appearences from "../models/Appearences";
import UrlRelation from "../models/UrlRelation";
import { getCustomRepository } from "typeorm";
import AppearencesRepository from "../repository/AppearencesRepository";
import UrlRelationsRepository from "../repository/UrlRelationsRepository";
import { ICalcPrediction, IPredicition } from "../interfaces/urlRelations.interfaces";
import IAppearences from "../interfaces/IAppearencesDTO";
import IAppearencesReturn from "../interfaces/IAppearencesReturn";

const http = require('http');
const https = require('https');
const fetch = require('node-fetch');
const getHrefs = require('get-hrefs');

class AppearencesService{
    arrRelations: Array<UrlRelation> = []
    arrProcessMade: Array<Appearences> = []

    public async addNewProcessMade(originalURL: string, levels: number, processed: Array<IAppearencesReturn>){
        const appearencesRepository = getCustomRepository(AppearencesRepository)

        const newAppearence = new Appearences()
        newAppearence.url = originalURL
        newAppearence.level = levels
        newAppearence.appearences = JSON.stringify(processed)
        appearencesRepository.create(newAppearence)

        return await appearencesRepository.save(newAppearence)
    }

    public async findOnHistory(url: string, levels: number): Promise<Array<IAppearences>> {
        const appearencesRepository = getCustomRepository(AppearencesRepository)
        return (await appearencesRepository.findByUrlAndLevel(url, levels)).reduce(
            (acc, appearence)=>{
                let newAppearence: IAppearences = {
                    url: appearence.url,
                    level: appearence.level,
                    appearences: JSON.parse(appearence.appearences)
                }
                acc.push(newAppearence)
                return acc
            }, new Array<IAppearences>()
        )
    }

    public async printRelations(){
        const urlRelationsRepository = getCustomRepository(UrlRelationsRepository)
        return await urlRelationsRepository.find()
    }

    public async saveRelation(urlOrigem: string, urlDestino: string){
        const urlRelationsRepository = getCustomRepository(UrlRelationsRepository)
        const arrRelations = await urlRelationsRepository.findByOriginAndDestination(urlOrigem, urlDestino)

        if (arrRelations.length >= 0){
            
            let newUrlRelation: UrlRelation = new UrlRelation();
            newUrlRelation.origin = urlOrigem
            newUrlRelation.destination = urlDestino

            return urlRelationsRepository.save(newUrlRelation)
        }
        return arrRelations
    }

    public async findAppearences(
        arrResults: Array<IAppearencesReturn>, 
        newUrl: string, 
        level: number = 0, 
        maxLevel=1): Promise<Array<IAppearencesReturn>>{
        console.log("Level Atual: " + level + "| Maximo:" + maxLevel)
        if (maxLevel === level){
            return arrResults
        } else {
            level++
            try {
                const fetchReturn = await fetch(newUrl)  
                const data = await (<string>fetchReturn.text());  
                const arrHRefs: any[] = getHrefs(data)

                for (const hrefsIndex in arrHRefs) {
                    if (Object.prototype.hasOwnProperty.call(arrHRefs, hrefsIndex)) {
                        const href = arrHRefs[hrefsIndex];
                        const fullUrl = this.buildUrl(href, newUrl);
        
                        console.log(fullUrl + " | Level:" + level + " | Max:" + maxLevel + " | From:" + newUrl)
                        this.saveRelation(newUrl, fullUrl)
                        arrResults = await this.addResult(arrResults, fullUrl, level, maxLevel)
                    }
                }
                return arrResults;
            } catch (error) {
                console.log(error)
                return arrResults
            }
        }
    }

    buildUrl(hrefFound: string, url: any): string{
        const urlBase = new URL('/', url)
        const urlRoot = urlBase.origin

        if (hrefFound.indexOf('//') == 0){
            return urlBase.protocol + hrefFound
        } else if (hrefFound.indexOf('/') == 0){
            return urlBase.origin + hrefFound
        } else if (hrefFound.indexOf('#') == 0){
            return url
        } else if (hrefFound.indexOf('?') == 0){
            return url + hrefFound
        } else if (hrefFound.length > 0){
            return hrefFound
        } else {
            return ''
        }
    }
    
    async addResult(arrResults: Array<IAppearencesReturn>, 
        url: string, 
        currentLevel: number,
        maxLevel: number): Promise<Array<IAppearencesReturn>>{
        const indexUrl = arrResults.findIndex(x=> x.url === url);
        
        if (indexUrl === -1){
            arrResults = [...arrResults, {
                url: url,
                totalApperences: 1,
                levels: [
                    {
                        level: currentLevel,
                        quantity: 1
                    }
                ]
            }]
        } else {
            let urlFoundObject = arrResults[indexUrl];
            const indexLevels = urlFoundObject.levels.findIndex(index => index.level == currentLevel)
            
            urlFoundObject.totalApperences++;
            if (indexLevels === -1){
                urlFoundObject.levels = [...urlFoundObject.levels, { level: currentLevel, quantity: 1 }]
            } else {
                urlFoundObject.levels[indexLevels].quantity++;
            }

            arrResults[indexUrl] = urlFoundObject;
        }
        arrResults = await this.findAppearences(arrResults, url, currentLevel, maxLevel)
        return arrResults
    }

    public async predictOccurrences(originURL: string, searchURL: string): Promise<IPredicition>{
        const urlRelationsRepository = getCustomRepository(UrlRelationsRepository)
        const arrOccurences = await urlRelationsRepository.findByOriginAndDestination(originURL, searchURL)

        if ( arrOccurences.length > 0){
            return {
                quantity: arrOccurences.length,
                type: 'calculated'
            }
        } else {
            const arrOccurrencesByDestination = await urlRelationsRepository.findByDestination(searchURL);

            if (arrOccurrencesByDestination.length > 0){
                const url = new URL(originURL)
                const arrGroupedOccurrences = arrOccurrencesByDestination.reduce((acc, occurrence)=>{
                    const itemOccurenceIndex = acc.findIndex(x=> x.url ==  occurrence.origin);

                    if (itemOccurenceIndex !== -1){
                        acc[itemOccurenceIndex].quantity++;
                    } else {
                        acc = [... acc, {quantity: 1, url: occurrence.origin}]
                    }
                    return acc
                }, new Array<ICalcPrediction>())
                
                var urlSubStr = originURL.substr(0,originURL.lastIndexOf('/'))
                let resultFilter: Array<ICalcPrediction> = []
                
                try {
                    while (resultFilter.length === 0 && new URL(urlSubStr)){
                        resultFilter = arrGroupedOccurrences.filter(
                            (occurrence)=>{
                                return occurrence.url.indexOf(urlSubStr) > -1
                            }
                        )
    
                        if (resultFilter.length === 0){
                            urlSubStr = urlSubStr.substr(0,urlSubStr.lastIndexOf('/'))
                        } else {

                        }
                    }

                    if (resultFilter.length > 0){
                        return {
                            quantity: 0,
                            type: 'predictedByDestination'
                        }
                    } else {
                        return {
                            quantity: -1,
                            type: 'predictedByDestination'
                        }
                    }
                    console.log(resultFilter)
                } catch (error) {
                    console.log(error)
                    return {
                        quantity: 0,
                        type: 'error'
                    }
                }
            } else {
                return {
                    quantity: -1,
                    type: 'error'
                }
            }
        }
    }
}

export default AppearencesService;