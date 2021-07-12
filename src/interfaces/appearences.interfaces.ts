export interface IAppearences {
    url: string,
    level: number,
    appearences: Array<IAppearencesReturn>
}

export interface IAppearencesReturn{ 
    url: string, 
    totalApperences: number, 
    levels: Array<IAppearencesLevels> 
}

export interface IAppearencesLevels{ 
    level: number, 
    quantity: number,
    percentage?: number
}
