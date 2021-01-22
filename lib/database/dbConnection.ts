import mongoose from 'mongoose'
import { injectable } from 'inversify'
import config from '../config'

@injectable()
class DBConnection {
  public connect = async () => {
    // check if we have a connection to the database or if it's currently
    // connecting or disconnecting (readyState 1, 2 and 3)
    if (mongoose.connection.readyState >= 1) {
      return
    }

    return mongoose.connect(config.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
  }
}

export default DBConnection
