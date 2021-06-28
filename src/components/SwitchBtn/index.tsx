import Switch from 'react-switch';
import { useTheme } from '../../hooks/useTheme';

export function SwitchBtn() {
    const { theme, toggleTheme } = useTheme();

    function handleChangeTheme() {
        toggleTheme();
    }
    return (
        <Switch 
            onChange={handleChangeTheme}
            checked={theme.title === 'dark'}
            checkedIcon={false}
            uncheckedIcon={false}
            height={15}
            width={40}
            handleDiameter={20}
            onColor={theme.colors.secondary}
            offColor={theme.colors.primary}
        />
    )
}