import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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