export default function FadeTransition({ children, show }) {
  const classes = `transition-opacity duration-1000 ease-in-out opacity-0 ${
    show ? 'opacity-100' : ''
  }`

  return <div className={classes}>{children}</div>
}
