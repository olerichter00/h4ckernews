import Link from 'next/link'

export default function Header() {
  return (
    <nav className="pl-2 pr-4 py-4 sm:py-5 shadow-md">
      <div className="max-w-3xl sm:px-2 m-auto items-center justify-between flex flex-wrap">
        <div className="ml-1 mr-3">
          <a href="/">
            <img
              src="logo.png"
              alt="Speak Everywhere"
              height="60"
              width="200"
              className="pt-1"
            />
          </a>
        </div>
        <div className="invisible sm:visible ml-3">
          <a href="https://github.com/olerichter00/h4ckernews">
            <span className="text-md text-orange-700 hover:underline">
              About
            </span>
          </a>
        </div>
      </div>
    </nav>
  )
}
