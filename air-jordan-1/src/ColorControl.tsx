import Control, { ControlProps } from './Control';

const ColorControl = ({
  ...props
}: ControlProps) => {
  return (
    <Control
      icon={true}
      as="input"
      type="color"
      {...props} />
  )
}

export default ColorControl;