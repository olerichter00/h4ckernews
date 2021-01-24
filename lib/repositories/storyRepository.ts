import { injectable } from 'inversify'
import Story from '../models/story'
import { Story as IStory } from '../types'

@injectable()
class StoryRepository {
  findStory = async (id: string): Promise<IStory[] | null> => {
    return Story.findOne({ id }).exec()
  }

  findStories = async (ids: string[]): Promise<IStory[]> => {
    return Story.find({ id: { $in: ids } })
  }

  createStory = async (story: IStory): Promise<IStory> => {
    return Story.create(story)
  }
}

export default StoryRepository
