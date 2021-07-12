import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('url_relations')
class UrlRelation{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    origin: string;

    @Column()
    destination: string;

    @Column({ default: 1 })
    quantity: number;
}

export default UrlRelation;