import { injectable } from 'inversify'
import Story from 'lib/models/story'
import { Story as IStory } from 'lib/types'

@injectable()
class StoryRepository {
  public findStory = async (id: string): Promise<IStory[] | null> => {
    return Story.findOne({ id }).exec()
  }

  public findStories = async (ids: string[]): Promise<IStory[]> => {
    const stories = await Story.find({ id: { $in: ids } })

    return this.sortStories(stories, ids)
  }

  public createStory = async (story: IStory): Promise<IStory> => {
    return Story.create(story)
  }

  private sortStories = (stories: IStory[], ids: string[]): IStory[] => {
    return stories.sort((a, b) => {
      return ids.findIndex(id => a.id === String(id)) - ids.findIndex(id => b.id === String(id))
    })
  }
}

export default StoryRepository
