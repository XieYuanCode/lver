import { createI18n } from "vue-i18n"
import ch from "./ch"
import en from "./en"
import jp from "./jp"
import fr from "./fr"
import kor from "./kor"

const i18n = createI18n({
  locale: 'en',
  messages: {
    ch,
    en,
    jp,
    fr,
    kor
  }
})

export default i18n