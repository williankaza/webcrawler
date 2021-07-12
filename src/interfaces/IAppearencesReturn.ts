import IAppearencesLevels from "./IAppearencesLevels";

export default interface IAppearencesReturn{ 
    url: string, 
    totalApperences: number, 
    levels: Array<IAppearencesLevels> 
}