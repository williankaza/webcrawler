import { EntityRepository, Like, Repository } from "typeorm";
import Appearences from "../models/Appearences";

@EntityRepository(Appearences)
class AppearencesRepository extends Repository<Appearences>{
    public async findByUrlAndLevel(url: string, level: number){
        const findAppearences = await this.find({
            where: {
                url, level
            }
        })

        return findAppearences || null;
    }

    public async findUrlInOccurrence(url: string, level: number, searchUrl: string){
        const findAppearences = await this.find({
            where: {
                url, level, appearences: Like(searchUrl)
            }
        })
    }
}

export default AppearencesRepository