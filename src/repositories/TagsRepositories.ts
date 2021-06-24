import { EntityRepository, Repository } from "typeorm";
import { Tag } from "../entities/Tag";
 
@EntityRepository(Tag)
class TagsRepositories extends Repository<Tag>{
  //static create: any;
  
}

export { TagsRepositories };