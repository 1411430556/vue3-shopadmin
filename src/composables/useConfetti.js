import confetti from 'canvas-confetti'

export function useConfetti() {
  // 播放烟花动画
  function playConfettiAnimation() {
    const end = Date.now() + 3 * 1000
    const colors = ['#bb0000', '#ffffff']

    function frame() {
      // 从左边边缘发射五彩纸屑
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      })
      // 从右边边缘发射五彩纸屑
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      })

      // 如果还未到结束时间，继续请求下一帧动画
      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    frame()
  }

  return {
    playConfettiAnimation,
  }
}
