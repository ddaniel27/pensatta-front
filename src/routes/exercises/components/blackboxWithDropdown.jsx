import blackboxSrc from '../../../../public/images/exercises/40/blackbox.svg'

export default function BlackboxWithDropdown () {
  return (
    <div className='blackbox-with-dropdown'>
      <img src={blackboxSrc} alt='blackbox' />
      <div className='blackbox-with-dropdown__dropdown'>
      </div>
    </div>
  )
}
