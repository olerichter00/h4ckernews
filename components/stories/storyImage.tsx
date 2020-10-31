import FadeTransition from '../common/fadeTransition'

type StoryImageProps = {
  imageUrl: String
  show: Boolean
}

export default function Story({ imageUrl, show }: StoryImageProps) {
  return (
    <FadeTransition show={show}>
      <div
        className="overflow-hidden h-40 w-full mb-2 sm:mb-0 sm:h-32 sm:w-48 flex-none bg-cover bg-center rounded-md bg-gray-200 hover:opacity-75 transition-opacity duration-500 ease-in-out"
        style={{
          backgroundImage: `url('${imageUrl}')`,
        }}
      ></div>
    </FadeTransition>
  )
}
