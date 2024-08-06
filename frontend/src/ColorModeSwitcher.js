import { FaMoon, FaSun } from 'react-icons/fa';
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';

export const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  return (<
    IconButton size="md"
    fontSize="lg"
    variant="ghost"
    color="current"
    marginLevel="2"
    onClick={toggleColorMode}
    icon={< SwitchIcon />}
  />
  )

}