export const createRenameInput = (): HTMLInputElement => {
  const input = document.createElement('input');
  input.style.width = "200px"
  input.style.height = "12px"
  input.style.marginLeft = "22px"
  input.style.fontSize = "12px"
  input.style.color = "var(--color-text-1)"
  input.style.backgroundColor = "var(--color-fill-2)"
  input.style.border = "1px solid var(--color-border-2)"
  input.style.borderRadius = "var(--border-radius-small)"
  input.style.lineHeight = "1.667"
  input.style.padding = '5px'
  input.style.transition = "color .1s cubic-bezier(0,0,1,1),border-color .1s cubic-bezier(0,0,1,1),background-color .1s cubic-bezier(0,0,1,1)"
  input.style.outline = "none"
  input.spellcheck = false;

  return input
}

export const createNewGroupInput = (): HTMLInputElement => {
  return createRenameInput()
}