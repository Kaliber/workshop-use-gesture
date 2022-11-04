import { useSpring, animated } from '@react-spring/web'
import { pseudoRandom } from '@kaliber/math'
import styles from './App.css'
import { useDrag } from '@use-gesture/react'

export default function App({ sticker, seed }) {
  const x = pseudoRandom(`${seed}x`)
  const y = pseudoRandom(`${seed}y`)
  const bind = useDrag(handleDrag)

  const [active, setActive] = React.useState(false)
  const [spring, api] = useSpring(() => ({ x: 0, y: 0, immediate: true }))

  return (
    <div className={styles.component} style={{ '--x': x, '--y': y }}>
      <animated.img
        className={cx(styles.sticker, active && styles.active)}
        src={sticker}
        alt=''
        style={spring}
        draggable={false}
        {...bind()}
      />
    </div>
  )

  function handleDrag(state) {
    const { offset: [x, y] } = state
    setActive(state.active)
    api.start({ x, y })
  }
}
