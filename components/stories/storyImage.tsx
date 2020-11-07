import FadeTransition from '../common/fadeTransition'

type StoryImageProps = {
  imageUrl: string
  show: Boolean
  placeholderText?: string
}

export default function StoryImage({ imageUrl, show, placeholderText }: StoryImageProps) {
  return (
    <FadeTransition show={show}>
      <div
        className="flex justify-center flex-col overflow-hidden h-40 w-full mb-2 sm:mb-0 sm:h-32 sm:w-48 flex-none bg-cover bg-center rounded-md bg-gray-200 hover:opacity-75 transition-opacity duration-500 ease-in-out"
        style={{
          backgroundImage: `url('${imageUrl}')`,
        }}
      >
        {!imageUrl && (
          <div
            className="pt-10 mx-auto text-white font-semibold"
            style={{ fontSize: '9rem', lineHeight: 1, marginLeft: '-10px' }}
          >
            {placeholderText}
          </div>
        )}
      </div>
    </FadeTransition>
  )
}
