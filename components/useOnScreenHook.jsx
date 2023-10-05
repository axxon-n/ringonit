import React from 'react';

export default function IsOnScreen(ref) {

  const [isIntersecting, setIntersecting] = React.useState(false)

  const observer = React.useMemo(() => new React.IntersectionObserver(
    ([entry]) => React.setIntersecting(entry.isIntersecting)
  ), [ref])


  React.useEffect(() => {
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return isIntersecting
};