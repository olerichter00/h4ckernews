import App from 'components/containers/appContainer'
import { StoryType } from 'lib/types'
import { STORY_TYPES } from 'lib/utils/constants'

type TypePageProps = { type: StoryType }

const TypePage: React.FC<TypePageProps> = ({ type }) => {
  return <App initialType={type} />
}

export const getStaticProps = async ({ params }: any) => {
  return { props: { type: params.type } }
}

export const getStaticPaths = async () => {
  return {
    paths: STORY_TYPES.map((type: StoryType) => ({ params: { type } })),
    fallback: false,
  }
}

export default TypePage
