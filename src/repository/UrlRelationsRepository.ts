import { EntityRepository, Like, Repository } from "typeorm";
import UrlRelation from "../models/UrlRelation";

@EntityRepository(UrlRelation)
class UrlRelationsRepository extends Repository<UrlRelation>{
    public async findByOriginAndDestination(origin: string, destination: string){
        const findUrlRelation = await this.find({
            where: {
                origin, destination
            }
        })

        return findUrlRelation
    }

    public async findByOrigin(origin: string){
        const findUrlRelation = await this.find({
            where: {
                origin
            }
        })

        return findUrlRelation
    }

    public async findByDestination(searchUrl: string){
        const  findUrlRelation = await this.find({
            where:{
                destination: Like(`%${searchUrl}%`)
            }
        })

        return findUrlRelation
    }
}

export default UrlRelationsRepository