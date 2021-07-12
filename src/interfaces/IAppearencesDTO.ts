import IAppearencesReturn from "./IAppearencesReturn";

export default interface IAppearences {
    url: string,
    level: number,
    appearences: Array<IAppearencesReturn>
}

