import { IAppearencesReturn } from "../interfaces/appearences.interfaces"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { uuid } from "uuidv4";

@Entity('appearences')
class Appearences{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    url: string;

    @Column()
    level: number;

    @Column()
    appearences: string;

}

export default Appearences;