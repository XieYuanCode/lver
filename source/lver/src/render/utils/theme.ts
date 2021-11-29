import { ThemeType } from "../model/theme";

export const switchTheme = (theme: ThemeType) => {
  if (theme === ThemeType.Dark) {
    document.body.setAttribute('arco-theme', 'dark')
    removeSystemThemeChangedEventListener()
  } else if (theme === ThemeType.Light) {
    document.body.removeAttribute('arco-theme')
    removeSystemThemeChangedEventListener()
  } else if (theme === ThemeType.System) {
    const isDark = window.matchMedia('(prefers-color-scheme: Dark)').matches

    if (isDark) {
      document.body.setAttribute('arco-theme', 'dark')
    } else {
      document.body.removeAttribute('arco-theme')
    }

    addSystemThemeChangedEventListener()
  }
}

const handler = () => {
  switchTheme(ThemeType.System)
}

const eventTarget = window.matchMedia('(prefers-color-scheme: Dark)')

export const addSystemThemeChangedEventListener = () => {
  eventTarget.addEventListener('change', handler)
}
export const removeSystemThemeChangedEventListener = () => {
  eventTarget.removeEventListener('change', handler)
}