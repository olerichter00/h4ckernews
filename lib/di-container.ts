import 'reflect-metadata'
import { Container } from 'inversify'
import HackernewsClient from './clients/hackernewsClient'
import BuildStoryService from './services/buildStoryService'
import MetadataService from './services/metadataService'
import UpdateService from './services/updateService'
import QueryService from './services/queryService'
import DBConnection from './database/dbConnection'
import ImageService from './services/imageService'
import StoryRepository from './repositories/storyRepository'
import StorySerializer from './serializer/storySerializer'

const DIContainer = new Container()

// DB Connection
DIContainer.bind<DBConnection>(DBConnection).toSelf().inSingletonScope()

// Clients
DIContainer.bind<HackernewsClient>(HackernewsClient).toSelf().inSingletonScope()

// Repositories
DIContainer.bind<StoryRepository>(StoryRepository).toSelf().inSingletonScope()

// Services
DIContainer.bind<UpdateService>(UpdateService).toSelf().inSingletonScope()
DIContainer.bind<QueryService>(QueryService).toSelf().inSingletonScope()
DIContainer.bind<BuildStoryService>(BuildStoryService).toSelf().inSingletonScope()
DIContainer.bind<MetadataService>(MetadataService).toSelf().inSingletonScope()
DIContainer.bind<ImageService>(ImageService).toSelf().inSingletonScope()

// Serializer
DIContainer.bind<StorySerializer>(StorySerializer).toSelf().inSingletonScope()

export default DIContainer
