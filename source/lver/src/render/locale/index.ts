import { createI18n } from "vue-i18n"
import ch from "./ch"
import en from "./en"
import jp from "./jp"
import kor from "./kor"

const i18n = createI18n({
  locale: 'ch',
  messages: {
    ch,
    en,
    jp,
    kor
  }
})

export default i18n