import pit from '/images/avocados/pit.svg'
import styles from './App.css'
import { useDrag } from '@use-gesture/react'
import { useSpring, animated } from '@react-spring/web'

export default function App() {
  const bind = useDrag(
    handleDrag, {
      from: () => [spring.x.get(), spring.y.get()],
      bounds: { left: -300, right: 300, top: -300, bottom: 300 },
      rubberband: true,
    })

  const [spring, api] = useSpring(() => ({
    x: 0,
    y: 0,
  }))

  const [active, setActive] = React.useState(false)

  return (
    <div className={styles.component}>
      <div className={cx(styles.avocado, active && styles.scared)}>
        <animated.img
          className={cx(styles.pit )}
          src={pit} alt=''
          {...bind()}
          draggable={false}
          style={spring}
        />
      </div>
    </div>
  )

  function handleDrag(state) {
    const { offset: [x, y], down } = state
    api.start({ x, y })
    setActive(state.active)
    console.log(active)

    if (!down) {
      api.start({ x: 0, y: 0 })
    }
  }
}
