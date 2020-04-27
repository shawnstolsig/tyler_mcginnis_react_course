import React from 'react'
import PropTypes from 'prop-types'

const styles = {
  content: {
    fontSize: '35px',
    position: 'absolute',
    left: '0',
    right: '0',
    marginTop: '20px',
    textAlign: 'center',
  }
}

export default function Loading({speed=300, text="Loading"}){
  const [ content, setContent ] = React.useState(text)

  React.useEffect( () => {

    const int = window.setInterval( () => {
      content === text + '...'
        ? setContent(text)
        : setContent((c) => c + '.')
    }, speed)

    return () => window.clearInterval(int)
    
  }, [speed, text])


  return (
    <p style={styles.content}>
      {content}
    </p>
  )

}

Loading.propTypes = {
  text: PropTypes.string,
  speed: PropTypes.number,
}
