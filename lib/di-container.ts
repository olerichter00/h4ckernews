import 'reflect-metadata'
import { Container } from 'inversify'
import HackernewsClient from './clients/hackernewsClient'
import StoryCollections from './collections/storyCollections'
import StoryBuilder from './services/storyBuilder'
import MetadataScraper from './services/metadataScraper'
import StoryUpdater from './services/storyUpdater'
import StoryQuery from './services/storyQuery'
import DBConnection from './database/dbConnection'
import ImageResizer from './services/imageResizer'

const DIContainer = new Container()

DIContainer.bind<StoryCollections>(StoryCollections).toSelf()
DIContainer.bind<StoryUpdater>(StoryUpdater).toSelf()
DIContainer.bind<StoryBuilder>(StoryBuilder).toSelf()
DIContainer.bind<HackernewsClient>(HackernewsClient).toSelf()
DIContainer.bind<MetadataScraper>(MetadataScraper).toSelf()
DIContainer.bind<StoryQuery>(StoryQuery).toSelf()
DIContainer.bind<DBConnection>(DBConnection).toSelf()
DIContainer.bind<ImageResizer>(ImageResizer).toSelf()

export default DIContainer
