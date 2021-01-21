import config from '../lib/config'
import App from '../components/containers/appContainer'
import { StoryType } from '../lib/types'

type TypePageProps = { type: StoryType }

const TypePage: React.FC<TypePageProps> = ({ type }) => {
  return <App initialType={type} />
}

export const getStaticProps = async ({ params }: any) => {
  return { props: { type: params.type } }
}

export const getStaticPaths = async () => {
  return {
    paths: config.storyTypes.map((type: StoryType) => ({ params: { type } })),
    fallback: false,
  }
}

export default TypePage
