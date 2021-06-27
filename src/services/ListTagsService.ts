import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../repositories/TagsRepositories"
import { classToPlain } from "class-transformer";


class ListTagsService {
  async execute() {
    const tagsRepository = getCustomRepository(TagsRepositories);

    const tags = await tagsRepository.find();
    
    // let tags = await tagsRepository.find();
    // tags = tags.map(tag => ({...tag, nameCustom: `#${tag.name}`}));

    return classToPlain(tags);
  }
}

export { ListTagsService }