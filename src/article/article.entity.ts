import { UserEntity } from "@app/user/user.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeUpdate,
  ManyToOne,
} from "typeorm";

@Entity({ name: "articles" })
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;

  @Column()
  title: string;

  @Column({ default: "" })
  description: string;

  @Column({ default: "" })
  body: string;

  @Column("simple-array")
  tagList: string[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createAt: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updateAt: Date;

  @Column({ default: 0 })
  favoritesCount: number;

  @BeforeUpdate()
  updateTimestamp() {
    this.updateAt = new Date();
  }

  @ManyToOne(() => UserEntity, (user) => user.articles, { eager: true })
  author: UserEntity;
}
